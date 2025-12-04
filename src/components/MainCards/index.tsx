import type { ReactNode } from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

type CardItem = {
  title: string;
  description: string;
  link?: string;
  icon?: string;
};

const CardList: CardItem[] = [
  {
    title: 'Card 1',
    description: '這是第一張卡片的描述內容',
    link: '/docs/intro',
    icon: '📋',
  },
  {
    title: '卡片 2',
    description: '這是第二張卡片的描述內容',
    link: '/docs/intro',
    icon: '💡',
  },
  {
    title: '卡片 3',
    description: '這是第三張卡片的描述內容',
    link: '/docs/intro',
    icon: '🚀',
  },
];

function Card({ title, description, link, icon }: CardItem) {
  const cardContent = (
    <div className={styles.card}>
      {}
      <Heading as="h3" className={styles.cardTitle}>
        {title}
      </Heading>
      <p className={styles.cardDescription}>{description}</p>
      {link && (
        <Link className={styles.cardLink} to={link}>
          了解更多 →
        </Link>
      )}
    </div>
  );

  return (
    <div className={clsx('col col--4')}>
      {link ? (
        <Link to={link} className={styles.cardWrapper}>
          {cardContent}
        </Link>
      ) : (
        cardContent
      )}
    </div>
  );
}

export default function MainCards(): ReactNode {
  return (
    <section className={styles.cardsSection}>
      <div className="container">
        <div className="row">
          {CardList.map((props, idx) => (
            <Card key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
