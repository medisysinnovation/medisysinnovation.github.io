import React from 'react';
import { Space } from 'antd';
import styles from './index.module.less';
const JobCounter = (props: any) => {
  const { title, count, color, titleColor } = props;
  return (
    <Space
      direction="vertical"
      align="center"
      className={styles.counterContainer}
      style={{
        borderColor: color,
      }}
    >
      <div
        className={styles.countertitle}
        style={{
          backgroundColor: color,
          color: titleColor,
        }}
      >
        {title}
      </div>
      <h2
        style={{
          color: 'grey',
        }}
      >
        {count}
      </h2>
    </Space>
  );
};
export { JobCounter };
