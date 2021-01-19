import React from 'react';

import { JobStatusTag } from '@medisys/component';

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
