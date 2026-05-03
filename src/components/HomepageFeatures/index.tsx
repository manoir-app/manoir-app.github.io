import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

type FeatureItem = {
  kicker: string;
  title: string;
  to: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    kicker: 'I.',
    title: 'Self-host installation',
    to: '/docs/installation',
    description: (
      <>
        Deploy the full MaNoir stack on your infrastructure with a path focused
        on prerequisites, deployment and first run checks.
      </>
    ),
  },
  {
    kicker: 'II.',
    title: 'User guide',
    to: '/docs/user-guide',
    description: (
      <>
        Navigate administration, home automation, daily life workflows and
        possession tracking without digging through the codebase.
      </>
    ),
  },
  {
    kicker: 'III.',
    title: 'Developer guide',
    to: '/docs/developer',
    description: (
      <>
        Extend MaNoir with plugins, integration points and packaging guidance
        kept close to the platform conventions.
      </>
    ),
  },
];

function Feature({kicker, title, to, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4', styles.featureColumn)}>
      <div className={styles.featureCard}>
        <p className={styles.featureKicker}>{kicker}</p>
        <Heading as="h3" className={styles.featureTitle}>
          <Link to={to}>{title}</Link>
        </Heading>
        <p className={styles.featureDescription}>{description}</p>
        <Link className={styles.featureLink} to={to}>
          Open section
        </Link>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={styles.headingRow}>
          <p className={styles.headingEyebrow}>Le tableau de bord</p>
          <Heading as="h2" className={styles.headingTitle}>
            Continuer selon votre besoin.
          </Heading>
        </div>
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
