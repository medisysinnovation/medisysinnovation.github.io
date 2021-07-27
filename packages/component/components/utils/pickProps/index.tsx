const proFieldProps = `valueType request plain renderFormItem render text formItemProps valueEnum`;

const proFormProps = `fieldProps isDefaultDom groupProps contentRender submitterProps submitter`;

export default function pickProps(
  props: Record<string, any>,
  fields: string[],
) {
  const propList = fields
    ? fields
    : `${proFieldProps} ${proFormProps}`.split(/[\s\n]+/);

  const attrs = {};
  Object.keys(props || {}).forEach(key => {
    if (!propList.includes(key)) {
      return;
    }
    //@ts-ignore
    attrs[key] = props[key];
  });
  return attrs;
}
