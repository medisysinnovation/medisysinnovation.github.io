import React from 'react';

import { abc } from '@medisys/test';
import { Button } from '@medisys/component';
import { Input } from 'antd';
import { GET } from '@medisys/utils';

export default function() {
  const btnConfig = {
    variant: 'contained',
    color: 'secondary',
  };
  return (
    <div>
      <Button
        // size="who am I"
        onClick={async () => {
          // abc(document.getElementById('input-test').value);
          const r = await GET('/api/users');
          console.log(r);
        }}
      >
        Test
      </Button>
    </div>
  );
}
