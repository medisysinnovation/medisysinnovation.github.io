import React from 'react';
import classnames from 'classnames';
import { ConfigProvider } from 'antd';
// import styles from './index.module.less';
import { jobStatusColorMapping } from '../constant/colorMap';
interface JobStatusTagProps {
  hidePrefix?: boolean;
  status: string;
  isAttentionRequired?: boolean;
  className?: any;
  float?: 'left' | 'right';
  prefixCls: string;
}

const textColor = {
  new: '#000',
};

const JobStatusTag: React.FC<JobStatusTagProps> = props => {
  const {
    hidePrefix = false,
    status = '',
    isAttentionRequired,
    className,
    float = 'left',
  } = props;
  const { getPrefixCls } = React.useContext(ConfigProvider.ConfigContext);
  const prefixCls = getPrefixCls('', 'ant-jst');
  const classes = classnames(
    prefixCls,
    {
      [`${prefixCls}-tag`]: true,
      [`${prefixCls}-floatLeft`]: float === 'left',
      [`${prefixCls}-floatRight`]: float === 'right',
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

export { JobStatusTag };
