import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

const metrics = [
  {
    value: '2',
    label: 'Deployment targets',
    detail: 'Docker today, Kubernetes next',
  },
  {
    value: '4',
    label: 'Home domains',
    detail: 'Admin, automation, daily life, possessions',
  },
  {
    value: '1',
    label: 'Primary bootstrap',
    detail: 'Gaia converges the minimum vital stack',
  },
  {
    value: '∞',
    label: 'Extension paths',
    detail: 'Custom plugins and home integrations',
  },
];

const watchItems = [
  {
    title: 'Run the house',
    body: 'Install MaNoir on infrastructure you control and bring up the shared runtime with Gaia.',
    to: '/docs/installation',
    cta: 'Open installation',
  },
  {
    title: 'Operate daily life',
    body: 'Manage the home, devices, automations, day-to-day workflows, and tracked possessions.',
    to: '/docs/user-guide',
    cta: 'Explore usage',
  },
  {
    title: 'Add your plugins',
    body: 'Extend MaNoir with your own modules, integration points, and deployment packages.',
    to: '/docs/developer',
    cta: 'Open developer docs',
  },
];

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={styles.heroBanner}>
      <div className={clsx('container', styles.heroGrid)}>
        <section className={styles.heroMain}>
          <p className={styles.eyebrow}>Manoir documentation . maison.local</p>
          <Heading as="h1" className={styles.heroTitle}>
            The self-hosted
            <span className={styles.heroAccent}> home platform.</span>
          </Heading>
          <p className={styles.heroSubtitle}>
            {siteConfig.tagline} MaNoir brings together administration, home
            automation, daily life management, and possession tracking in a
            system you install and operate yourself.
          </p>
          <div className={styles.buttons}>
            <Link className="button button--primary button--lg" to="/docs/installation">
              Start installation
            </Link>
            <Link className="button button--secondary button--lg" to="/docs/user-guide">
              Explore usage
            </Link>
          </div>
        </section>
        <aside className={styles.heroAside}>
          <div className={styles.statusPill}>
            <span className={styles.statusDot} />
            Self-hosting first
          </div>
          <dl className={styles.heroFacts}>
            <div>
              <dt>Bootstrap</dt>
              <dd>Gaia starts MongoDB, NATS, MQTT, Redis, and the Core Admin UI</dd>
            </div>
            <div>
              <dt>Deployment</dt>
              <dd>Docker is the most concrete installation path today</dd>
            </div>
            <div>
              <dt>Extension</dt>
              <dd>Plugins adapt the platform to the way your home actually runs</dd>
            </div>
          </dl>
        </aside>
      </div>
      <div className={clsx('container', styles.metricsGrid)}>
        {metrics.map((metric) => (
          <article key={metric.label} className={styles.metricCard}>
            <p className={styles.metricValue}>{metric.value}</p>
            <p className={styles.metricLabel}>{metric.label}</p>
            <p className={styles.metricDetail}>{metric.detail}</p>
          </article>
        ))}
      </div>
    </header>
  );
}

function WatchSection() {
  return (
    <section className={styles.watchSection}>
      <div className="container">
        <div className={styles.sectionHeading}>
          <p className={styles.sectionEyebrow}>Overview</p>
          <Heading as="h2" className={styles.sectionTitle}>
            Three ways into MaNoir.
          </Heading>
          <p className={styles.sectionLead}>
            Start from infrastructure, household usage, or platform extension,
            depending on the path you actually need first.
          </p>
        </div>
        <div className={styles.watchGrid}>
          {watchItems.map((item) => (
            <article key={item.title} className={styles.watchCard}>
              <p className={styles.watchKicker}>Module</p>
              <Heading as="h3" className={styles.watchTitle}>
                {item.title}
              </Heading>
              <p className={styles.watchBody}>{item.body}</p>
              <Link className={styles.inlineLink} to={item.to}>
                {item.cta}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function HomeSections() {
  return (
    <main>
      <WatchSection />
      <HomepageFeatures />
    </main>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="MaNoir self-hosted smart home platform documentation">
      <HomepageHeader />
      <HomeSections />
    </Layout>
  );
}
