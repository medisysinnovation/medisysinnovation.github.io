In real project you may want to call MIConfig.updateState on state change, like for umi js, you can add something like this under app.ts file

```js
import { MIConfig } from '@medisys/utils';

export const dva = {
  config: {
    onStateChange(state) {
      //state:{loading:{models:{somename:Boolean}}}
      MIConfig.updateState(state)
    },
  },
}
```
