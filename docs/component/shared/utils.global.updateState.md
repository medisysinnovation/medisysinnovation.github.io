In real project you may want to call global.updateState on state change, like for umi js, you can add something like this under app.ts file

```js
import { global, StateProps } from '@medisys/utils';

export const dva = {
  config: {
    onStateChange(state: StateProps) {
      //state:{loading:{models:{somename:Boolean}}}
      global.updateState(state)
    },
  },
}
```
