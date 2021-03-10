import React from 'react';
import { Input, InputProps } from 'antd';

export interface MIInputProps extends InputProps {
  trim?: boolean;
  // code?: string;
  // url?: string;
  // text?: boolean;
  // valueField?: string;
  // displayField?: string;
  // dataSource?: object[];
  // dataSourceLoader?: (code: string, params?: any) => Promise<object[]>;
  // filter?: (options: object[]) => object[];
}

export type InputType = Input;
export interface RefInputProps {
  focus: () => void;
  blur: () => void;
}

const MIInput: React.ForwardRefRenderFunction<RefInputProps, MIInputProps> = (
  props,
  ref,
) => {
  const { trim = true, onBlur, onChange, value, ...restProps } = props;
  console.log(ref);

  return (
    <Input
      {...restProps}
      // value={localValue}
      onBlur={e => {
        //@ts-ignore
        ref.current.input.value = e.target.value?.trim();
        //@ts-ignore
        ref.current.handleChange(e);
        // // setLocalValue(e.target.value?.trim());
        // if (onBlur) onBlur(e);
      }}
      onChange={e => {
        // setLocalValue(e.target.value);
        if (onChange) onChange(e);
      }}
      ref={ref as any}
    />
  );
};

const RefMIInput = React.forwardRef<RefInputProps, MIInputProps>(MIInput);

export default RefMIInput;
