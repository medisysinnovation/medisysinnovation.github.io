import React from 'react';
interface JobStatusTagProps {
  hidePrefix?: boolean;
  status: string;
  isAttentionRequired?: boolean;
  className?: any;
  float?: 'left' | 'right';
}
declare const JobStatusTag: React.FC<JobStatusTagProps>;
export { JobStatusTag };
