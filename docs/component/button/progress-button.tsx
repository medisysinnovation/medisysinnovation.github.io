import React from 'react';
import { MedisysConfig } from '@medisys/utils';
import { Button } from '@medisys/component';

const { ProgressButton } = Button;

export default function() {
  const updateLoading = status => {
    MedisysConfig.updateState({
      loading: {
        models: {
          somename: status,
        },
      },
    });
  };
  return (
    <div>
      <ProgressButton
        model="somename"
        onClick={() => {
          updateLoading(true);
          setTimeout(() => {
            updateLoading(false);
          }, 5000);
        }}
      >
        Async Call
      </ProgressButton>
      <ProgressButton loading>Forever loading</ProgressButton>
    </div>
  );
}
