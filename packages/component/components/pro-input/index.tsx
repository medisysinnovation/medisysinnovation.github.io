import { ProFormText } from '@ant-design/pro-form';

type ComponentProps = React.ComponentProps<typeof ProFormText>;

const ProInput = (props: ComponentProps) => {
  return <ProFormText width="xs" {...props} />;
};
ProInput.Password = ProFormText.Password;
export default ProInput;
