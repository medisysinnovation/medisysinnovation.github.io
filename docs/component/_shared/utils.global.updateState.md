In real project you may want to call MedisysConfig.updateState on state change, like for umi js, you can add something like this under app.ts file

```js
import { MedisysConfig, StateProps } from '@medisys/utils';

export const dva = {
  config: {
    onStateChange(state: StateProps) {
      //state:{loading:{models:{somename:Boolean}}}
      MedisysConfig.updateState(state)
    },
  },
}
```
