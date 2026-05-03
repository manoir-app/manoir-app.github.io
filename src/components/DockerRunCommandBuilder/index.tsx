import {useState} from 'react';
import CodeBlock from '@theme/CodeBlock';
import styles from './styles.module.css';

type HostPlatform = 'windows' | 'linux' | 'linux-rpi-under-5';

const imageRepository = 'ghcr.io/manoir-app/manoir-agents-gaia';
const defaultImageTag = 'latest';
const defaultContainerName = 'manoir-agents-gaia';

const defaultRoots: Record<HostPlatform, string> = {
  windows: 'C:\\ProgramData\\MaNoir\\home-automation',
  linux: '/srv/manoir/home-automation',
  'linux-rpi-under-5': '/srv/manoir/home-automation',
};

function combineHostPath(platform: HostPlatform, rootPath: string, childPath: string): string {
  const trimmedRoot = rootPath.trim().replace(/[\\/]+$/, '');
  if (platform === 'windows') {
    return `${trimmedRoot}\\${childPath.replaceAll('/', '\\')}`;
  }

  return `${trimmedRoot}/${childPath.replaceAll('\\', '/')}`;
}

function buildCommand(lines: string[], continuation: string): string {
  return lines
    .map((line, index) => (index === lines.length - 1 ? line : `${line} ${continuation}`))
    .join('\n');
}

function toBase64(bytes: Uint8Array): string {
  let binary = '';
  bytes.forEach((value) => {
    binary += String.fromCharCode(value);
  });

  return btoa(binary);
}

function generateBase64Secret(byteCount: number): string {
  return toBase64(crypto.getRandomValues(new Uint8Array(byteCount)));
}

function generateRandomString(length: number): string {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%^&*_-+=';
  const randomBytes = crypto.getRandomValues(new Uint8Array(length));

  return Array.from(randomBytes, (value) => alphabet[value % alphabet.length]).join('');
}

export default function DockerRunCommandBuilder() {
  const [platform, setPlatform] = useState<HostPlatform>('linux');
  const [imageTag, setImageTag] = useState(defaultImageTag);
  const [webPort, setWebPort] = useState('5056');
  const [coreAdminUiPort, setCoreAdminUiPort] = useState('81');
  const [ensureIntervalSeconds, setEnsureIntervalSeconds] = useState('300');
  const [homeAutomationRoot, setHomeAutomationRoot] = useState(defaultRoots.linux);
  const [apiKey, setApiKey] = useState('<your-api-key>');
  const [secretsSalt, setSecretsSalt] = useState('<base64-salt>');
  const [jwtSigningKey, setJwtSigningKey] = useState('<jwt-signing-key-min-32-chars>');
  const [developmentInstance, setDevelopmentInstance] = useState(false);
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'failed'>('idle');

  const dockerSocketSource = '/var/run/docker.sock';
  const imageReference = `${imageRepository}:${imageTag.trim() || defaultImageTag}`;
  const mongoImageOverride = platform === 'linux-rpi-under-5' ? 'mongo:4.4.18' : '';
  const sharedServicesHostRootPath = combineHostPath(platform, homeAutomationRoot, 'shared-services');
  const pluginRepositoriesHostRootPath = combineHostPath(platform, homeAutomationRoot, 'plugins');
  const sharedServicesContainerPath = '/home-automation/shared-services';
  const pluginRepositoriesContainerPath = '/home-automation/plugins';
  const isWindows = platform === 'windows';
  const continuation = isWindows ? '`' : '\\';
  const language = isWindows ? 'powershell' : 'bash';

  const commandLines = [
    'docker run --detach',
    `  --name "${defaultContainerName}"`,
    '  --restart unless-stopped',
    `  --publish ${webPort}:8080`,
    `  --mount "type=bind,source=${dockerSocketSource},target=/var/run/docker.sock"`,
    `  --mount "type=bind,source=${homeAutomationRoot},target=/home-automation"`,
    '  --env "ASPNETCORE_URLS=http://0.0.0.0:8080"',
    '  --env "DOCKER_HOST=unix:///var/run/docker.sock"',
    `  --env "HOMEAUTOMATION_APIKEY=${apiKey}"`,
    `  --env "HOMEAUTOMATION_SECRETS_SALT=${secretsSalt}"`,
    `  --env "HOMEAUTOMATION_AUTH_JWT_SIGNING_KEY=${jwtSigningKey}"`,
    ...(mongoImageOverride ? [`  --env "MANOIR_MONGO_IMAGE=${mongoImageOverride}"`] : []),
    `  --env "MANOIR_CORE_ADMINUI_HOST_PORT=${coreAdminUiPort}"`,
    `  --env "MANOIR_SHARED_SERVICES_HOST_ROOT_PATH=${sharedServicesHostRootPath}"`,
    `  --env "Gaia__SharedServicesRootPath=${sharedServicesContainerPath}"`,
    `  --env "Gaia__PluginRepositoriesRootPath=${pluginRepositoriesContainerPath}"`,
    `  --env "Gaia__EnsureIntervalSeconds=${ensureIntervalSeconds}"`,
    '  --env "Gaia__AutoEnsureSharedServicesOnStartup=true"',
    ...(developmentInstance ? ['  --env "MANOIR_DEVELOPMENT_INSTANCE=true"'] : []),
    `  "${imageReference}"`,
  ];

  const preparationScript =
    !isWindows
      ? [
          `sudo mkdir -p "${homeAutomationRoot}"`,
          `sudo mkdir -p "${sharedServicesHostRootPath}"`,
          `sudo mkdir -p "${pluginRepositoriesHostRootPath}"`,
          `sudo chown -R "$USER":"$USER" "${homeAutomationRoot}"`,
        ].join('\n')
      : '';

  const dockerRunCommand = buildCommand(commandLines, continuation);
  const command = preparationScript ? `${preparationScript}\n\n${dockerRunCommand}` : dockerRunCommand;

  async function copyCommand() {
    try {
      await navigator.clipboard.writeText(command);
      setCopyStatus('copied');
    } catch {
      setCopyStatus('failed');
    }
  }

  function handlePlatformChange(nextPlatform: HostPlatform) {
    setPlatform(nextPlatform);
    setHomeAutomationRoot(defaultRoots[nextPlatform]);
    setCopyStatus('idle');
  }

  function generateApiKey() {
    setApiKey(crypto.randomUUID());
    setCopyStatus('idle');
  }

  function generateSecretsSalt() {
    setSecretsSalt(generateBase64Secret(32));
    setCopyStatus('idle');
  }

  function generateJwtSigningKey() {
    setJwtSigningKey(generateRandomString(48));
    setCopyStatus('idle');
  }

  function generateAllSecrets() {
    generateApiKey();
    generateSecretsSalt();
    generateJwtSigningKey();
  }

  return (
    <section className={styles.builder}>
      <div className={styles.headerRow}>
        <div>
          <h3 className={styles.title}>Docker Command Builder</h3>
          <p className={styles.subtitle}>
            Generate a docker run command that mirrors the current Gaia helper script.
          </p>
        </div>
        <button className="button button--primary" onClick={copyCommand} type="button">
          {copyStatus === 'copied' ? 'Copied' : copyStatus === 'failed' ? 'Copy failed' : 'Copy command'}
        </button>
      </div>

      <div className={styles.toolbar}>
        <button className="button button--secondary button--sm" onClick={generateAllSecrets} type="button">
          Generate all secrets
        </button>
      </div>

      <div className={styles.grid}>
        <label className={styles.field}>
          <span>Host platform</span>
          <select value={platform} onChange={(event) => handlePlatformChange(event.target.value as HostPlatform)}>
            <option value="linux">Linux</option>
            <option value="linux-rpi-under-5">Linux on Raspberry Pi &lt; 5</option>
            <option value="windows">Windows</option>
          </select>
        </label>

        <label className={styles.field}>
          <span>Image tag</span>
          <input value={imageTag} onChange={(event) => setImageTag(event.target.value)} />
        </label>

        <label className={styles.field}>
          <span>Gaia web port</span>
          <input value={webPort} onChange={(event) => setWebPort(event.target.value)} />
        </label>

        <label className={styles.field}>
          <span>Core Admin UI host port</span>
          <input value={coreAdminUiPort} onChange={(event) => setCoreAdminUiPort(event.target.value)} />
        </label>

        <label className={styles.field}>
          <span>Ensure interval in seconds</span>
          <input value={ensureIntervalSeconds} onChange={(event) => setEnsureIntervalSeconds(event.target.value)} />
        </label>

        <label className={`${styles.field} ${styles.fieldWide}`}>
          <span>Home automation root on the host</span>
          <input value={homeAutomationRoot} onChange={(event) => setHomeAutomationRoot(event.target.value)} />
        </label>

        <label className={styles.field}>
          <span>API key</span>
          <div className={styles.fieldControl}>
            <input value={apiKey} onChange={(event) => setApiKey(event.target.value)} />
            <button className="button button--secondary button--sm" onClick={generateApiKey} type="button">
              Generate
            </button>
          </div>
        </label>

        <label className={styles.field}>
          <span>Secrets salt</span>
          <div className={styles.fieldControl}>
            <input value={secretsSalt} onChange={(event) => setSecretsSalt(event.target.value)} />
            <button className="button button--secondary button--sm" onClick={generateSecretsSalt} type="button">
              Generate
            </button>
          </div>
        </label>

        <label className={styles.field}>
          <span>JWT signing key</span>
          <div className={styles.fieldControl}>
            <input value={jwtSigningKey} onChange={(event) => setJwtSigningKey(event.target.value)} />
            <button className="button button--secondary button--sm" onClick={generateJwtSigningKey} type="button">
              Generate
            </button>
          </div>
        </label>

        <label className={`${styles.checkboxField} ${styles.fieldWide}`}>
          <input
            checked={developmentInstance}
            onChange={(event) => setDevelopmentInstance(event.target.checked)}
            type="checkbox"
          />
          <span>Enable development-oriented instance mode</span>
        </label>
      </div>

      <div className={styles.summary}>
        <div>
          <strong>Container name:</strong> {defaultContainerName}
        </div>
        <div>
          <strong>Image reference:</strong> {imageReference}
        </div>
        {mongoImageOverride ? (
          <div>
            <strong>Mongo image override:</strong> {mongoImageOverride}
          </div>
        ) : null}
        <div>
          <strong>Host shared-services path:</strong> {sharedServicesHostRootPath}
        </div>
        <div>
          <strong>Host plugins path:</strong> {pluginRepositoriesHostRootPath}
        </div>
        <div>
          <strong>Container plugin path:</strong> {pluginRepositoriesContainerPath}
        </div>
        <div>
          <strong>Docker socket source:</strong> {dockerSocketSource}
        </div>
      </div>

      <CodeBlock language={language} title={`docker run (${platform})`}>
        {command}
      </CodeBlock>
    </section>
  );
}