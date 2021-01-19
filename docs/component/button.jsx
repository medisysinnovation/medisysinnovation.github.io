import React from 'react';

import { abc } from '@medisys/test';

export default function() {
  const btnConfig = {
    variant: 'contained',
    color: 'secondary',
  };
  return (
    <div>
      <input id="input-test" type="text" />
      <button
        onClick={() => {
          abc(document.getElementById('input-test').value);
        }}
      >
        Test
      </button>
    </div>
  );
}
