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
    title: '易於使用',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Docusaurus 從設計之初就注重易於安裝和使用，讓您能夠快速建立並運行網站。
      </>
    ),
  },
  {
    title: '專注於重要內容',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Docusaurus 讓您專注於文檔內容，我們會處理其他瑣事。只需將您的文檔放入 <code>docs</code> 目錄即可。
      </>
    ),
  },
  {
    title: '基於 React 構建',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        通過重用 React 來擴展或自訂網站佈局。Docusaurus 可以在重用相同頁首和頁尾的同時進行擴展。
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
