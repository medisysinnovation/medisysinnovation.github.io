import React from 'react';

import { abc } from '@medisys/test';
import { Button } from '@medisys/component';
import { Input } from 'antd';

export default function() {
  const btnConfig = {
    variant: 'contained',
    color: 'secondary',
  };
  return (
    <div>
      <Input id="input-test" />
      <Button
        onClick={() => {
          abc(document.getElementById('input-test').value);
        }}
      >
        Test
      </Button>
    </div>
  );
}
