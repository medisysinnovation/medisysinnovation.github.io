import React from 'react';
import { InputNumber, InputNumberProps, Statistic } from 'antd';

export interface MIInputNumberProps extends InputNumberProps {
  readonly?: boolean;

  // code?: string;
  // url?: string;
  // text?: boolean;
  // valueField?: string;
  // displayField?: string;
  // dataSource?: object[];
  // dataSourceLoader?: (code: string, params?: any) => Promise<object[]>;
  // filter?: (options: object[]) => object[];

  /* deprecated */
  text?: boolean;
}

type RefInputProps = InputNumberProps;

const MIInput: React.ForwardRefRenderFunction<
  RefInputProps | undefined,
  MIInputNumberProps
> = (props, ref) => {
  const { text = false, readonly = false, ...restProps } = props;

  const myRef = React.useRef<RefInputProps>();
  React.useImperativeHandle(ref, () => {
    if (!myRef.current) {
      return undefined;
    }
    return myRef.current;
  });

  if (text || readonly) return <Statistic {...restProps} />;
  return <InputNumber {...restProps} ref={myRef as any} />;
};

const RefMIInputNumber = React.forwardRef<RefInputProps, MIInputNumberProps>(
  MIInput,
);

export default RefMIInputNumber;
