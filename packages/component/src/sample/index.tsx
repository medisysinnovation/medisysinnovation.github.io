import React from 'react';
import classnames from 'classnames';
import styles from './index.module.less';
import { jobStatusColorMapping } from '../constant/colorMap';
console.log(styles);
interface JobStatusTagProps {
  hidePrefix?: boolean;
  status: string;
  isAttentionRequired?: boolean;
  className?: any;
  float?: 'left' | 'right';
}

const textColor = {
  new: '#000',
};

const JobStatusTag2: React.FC<JobStatusTagProps> = props => {
  const {
    hidePrefix = false,
    status,
    isAttentionRequired,
    className,
    float = 'left',
  } = props;
  const classes = classnames(
    styles.tag,
    {
      [styles.floatLeft]: float === 'left',
      [styles.floatRight]: float === 'right',
    },
    className,
  );
  const attnReqText = 'Attn. Required';
  const statusText = isAttentionRequired ? `${status}(${attnReqText})` : status;

  return (
    <div
      className={classes}
      style={{
        //@ts-ignore
        backgroundColor: jobStatusColorMapping[status.toLowerCase()],
        //@ts-ignore
        color: textColor[status.toLowerCase()] ?? '#fff',
      }}
    >
      {hidePrefix ? '' : 'Job Status:'}
      {statusText}
    </div>
  );
};

export { JobStatusTag2 };
