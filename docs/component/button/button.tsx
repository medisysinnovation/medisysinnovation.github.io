import React from 'react';

import { abc } from '@medisys/test';
import { Button } from '@medisys/component';
import { Input } from 'antd';

export default function() {
  return (
    <div>
      <Input id="input-test" style={{ width: 300, marginRight: 10 }} />
      <Button
        type="primary"
        onClick={() => {
          abc(document.getElementById('input-test').value);
        }}
      >
        Test
      </Button>
    </div>
  );
}
