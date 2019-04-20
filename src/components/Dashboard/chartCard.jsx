/*
 * @Author: wangtaidong
 * @Date: 2018-10-10 09:38:41
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import styles from './index.less';

const card = ({
  title,
  action,
  children,
}) => (
  <Card>
    <div className={styles.titleWrap}>
      <span className={styles.chartTitle}>{title}</span>
      {action && <div className={styles.actionBox}>{action}</div>}
    </div>
    <div>
      {children}
    </div>
  </Card>
);

card.propTypes = {
  title: PropTypes.string,
  action: PropTypes.node,
  children: PropTypes.node,
};

export default card;
