import React from 'react';

import { JobStatusTag } from '@medisys/component';
// import '@medisys/component/dist/@medisys/component.css';
export default function() {
  const btnConfig = {
    variant: 'contained',
    color: 'secondary',
  };
  return (
    <div>
      <JobStatusTag status="New" />
    </div>
  );
}
