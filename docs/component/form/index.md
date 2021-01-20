---
nav:
  title: Components
  path: /components
group:
  title: Form
  path: /form
---

## Form

<code src="./index.tsx" title='Dirty Check Form' desc='Form have dirty field checking prompt' />

The form will prompt confirmation if any field has been touched when

- Navigate to other page with react router
- Refresh on current page
- Click Button with `triggerUnsavedChangesWarning` props

> Note that `Form` must be present inside [React Route](https://reactrouter.com/web/api/Route), if you are using umi, it already been included.


### FormInstance
  
| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| enableDirtyCheck | Enable dirty form check | boolean | false |  |
| onDirtyCheck | Listening for dirty check event | string | ((location: H.Location, action: H.Action) => string \| boolean) |  |