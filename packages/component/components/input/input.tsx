import React, { useEffect } from 'react';
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

export interface _RefInputProps {
  focus?: () => void;
  blur?: () => void;
}

type RefInputProps = Input & _RefInputProps;

let a = 0;
const MIInput: React.ForwardRefRenderFunction<
  RefInputProps | undefined,
  MIInputProps
> = (props, ref) => {
  const { trim = true, onBlur, ...restProps } = props;

  const myRef = React.useRef<RefInputProps>();
  React.useImperativeHandle(ref, () => {
    if (!myRef.current) {
      return undefined;
    }
    myRef.current.focus = () => {
      return a++;
    };
    return myRef.current;
  });

  useEffect(() => {
    // console.log(ref);
    // console.log(myRef);
  }, []);

  return (
    <Input
      {...restProps}
      onBlur={e => {
        if (trim && myRef.current) {
          myRef.current.input.value = e.target.value?.trim();
          myRef.current.handleChange(e);
        }
        if (onBlur) onBlur(e);
      }}
      // onChange={e => {
      //   // setLocalValue(e.target.value);
      //   if (onChange) onChange(e);
      // }}
      ref={myRef as any}
    />
  );
};

const RefMIInput = React.forwardRef<RefInputProps, MIInputProps>(MIInput);

export default RefMIInput;
