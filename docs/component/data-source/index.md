---
nav:
  title: Components
  path: /components
group:
  title: DataSource
  path: /datasource
---

<code src="./data-source.tsx" title='Update DataSource' desc='use `MIConfig` to update dataSource' />


```js
import { MIConfig } from '@medisys/utils';

MIConfig.setConfig({
    dataLoader:  ({ code }) => {
       dispatch({
        type: 'codeTable/getCodeTable',
        payload: {
          ctName: code,
        },
      });
    },
  });

```

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| code | key prop to indicate which data to load | string |  |  |
| url | get data from particular url | string |  |  |
| text | display as text | boolean |  |  |
| valueField | value property | string | id |  |
| displayField | display property | string | text |  |
| dataSource | fixed datasource object | object[] |  |  |



  



