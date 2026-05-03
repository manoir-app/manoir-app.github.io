import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  to: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Self-Host Installation',
    to: '/docs/installation',
    description: (
      <>
        Deploy the full MaNoir stack on your own infrastructure. Follow our
        step-by-step guide to get up and running quickly.
      </>
    ),
  },
  {
    title: 'User Guide',
    to: '/docs/user-guide',
    description: (
      <>
        Learn how to use MaNoir for administration, home automation, daily life
        management, and tracking your possessions.
      </>
    ),
  },
  {
    title: 'Developer Guide',
    to: '/docs/developer',
    description: (
      <>
        Extend MaNoir with custom plugins. Browse the API reference and learn
        how to package and publish your plugin.
      </>
    ),
  },
];

function Feature({title, to, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md padding-vert--md">
        <Heading as="h3">
          <Link to={to}>{title}</Link>
        </Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
