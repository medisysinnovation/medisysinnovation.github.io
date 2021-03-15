---
nav:
  title: Components
  path: /components
group:
  title: Form
  path: /form
---

<code src="./test.tsx" title='Playground' desc='For Dev & Test only' />


## Form

<code src="./index.tsx" title='Dirty Check Form' desc='Form have dirty field checking prompt' />

The form will prompt confirmation if any field has been touched when

- Navigate to other page with react router
- Refresh on current page
- Click Button with `triggerDiscard` props


## Modal Form

<code src="./modal.tsx" title='Form inside Modal' desc='If there is a Form component inside Modal, auto dirty check when close Modal' />

To disable check on modal close, check [Modal](/components/modal#api) API


## API
  
| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| discardCheck | Enable dirty form check | boolean | false |  |
| onDirtyCheck | Listening to dirty check event | string | ((location: H.Location, action: H.Action) => string \| boolean) |  |
| resetOnSubmit | disable warning once form.submit called | boolean | true |  |
