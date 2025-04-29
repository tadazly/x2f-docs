import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import Translate from '@docusaurus/Translate';

const FeatureList = [
  {
    title: <Translate id="homepage.feature1.title">
      轻松上手
    </Translate>,
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        <Translate id="homepage.feature1.description">
          X2F 让你在三分钟上手 FlatBuffers 转换流。
          只需一条命令，即可生成优化后的二进制数据。
        </Translate>
      </>
    ),
  },
  {
    title: <Translate id="homepage.feature2.title">
      结构自动化
    </Translate>,
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        <Translate id="homepage.feature2.description">
          无需手动编写结构定义 —— 我们为你自动生成 FlatBuffers Schema。
          只需在 Excel 中配置好数据属性，其余从 Schema 到二进制，交给 X2F 自动完成。
        </Translate>
      </>
    ),
  },
  {
    title: <Translate id="homepage.feature3.title">
      跨平台而生
    </Translate>,
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        <Translate id="homepage.feature3.description">
          无论是 Unity、C++ 还是 Web，生成的 FlatBuffers 都可直接使用。
          专为跨平台开发和性能敏感场景设计。
        </Translate>
      </>
    ),
  },
];

function Feature({ Svg, title, description }) {
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

export default function HomepageFeatures() {
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
