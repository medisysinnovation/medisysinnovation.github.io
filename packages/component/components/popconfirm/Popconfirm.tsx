import { Popconfirm } from 'antd';
import type { RenderFunction } from 'antd/es/_util/getRenderPropValue';

type ComponentProps = React.ComponentProps<typeof Popconfirm>;

export default ({
  children,
  ...props
}: Omit<ComponentProps, 'title'> & {
  title?: React.ReactNode | RenderFunction;
}) => {
  return (
    <Popconfirm title="Are you sure?" okText="Yes" cancelText="No" {...props}>
      {children}
    </Popconfirm>
  );
};
