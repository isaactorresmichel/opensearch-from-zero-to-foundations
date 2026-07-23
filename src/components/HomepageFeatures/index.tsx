import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: '🔍 Full-Text Search',
    Svg: require('@site/static/img/free.svg').default,
    description: (
      <>
        Powerful search capabilities with relevance scoring, tokenization, and 
        text analysis. Perfect for finding exactly what you need in large datasets.
      </>
    ),
  },
  {
    title: '⚡ Real-Time Analytics',
    Svg: require('@site/static/img/charts.svg').default,
    description: (
      <>
        Process and analyze data in real-time with distributed computing. Monitor 
        metrics, logs, and events as they happen across your infrastructure.
      </>
    ),
  },
  {
    title: '🚀 Easy to Get Started',
    Svg: require('@site/static/img/easy.svg').default,
    description: (
      <>
        Get OpenSearch running in minutes with Docker. No complex setup required. 
        Start learning and experimenting immediately with practical examples.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
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
