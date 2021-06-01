import React, { useEffect } from 'react';
import { Input, InputProps } from 'antd';

export interface MIInputProps extends InputProps {
  trim?: boolean;
  readonly?: boolean;
  onBlur?: (e: Event) => void;
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

export interface _RefInputProps {
  focus?: () => void;
  blur?: () => void;
}

type RefInputProps = Input & _RefInputProps;

const MIInput: React.ForwardRefRenderFunction<
  RefInputProps | undefined,
  MIInputProps
> = (props, ref) => {
  const {
    trim = true,
    text = false,
    readonly = false,
    onBlur,
    ...restProps
  } = props;

  const myRef = React.useRef<RefInputProps>();
  React.useImperativeHandle(ref, () => {
    if (!myRef.current) {
      return undefined;
    }
    // myRef.current.focus = () => {
    //   return a++;
    // };
    return myRef.current;
  });

  useEffect(() => {
    // console.log(ref);
    // console.log(myRef);
  }, []);

  if (text || readonly) return <span>{restProps.value || ''}</span>;

  return (
    <Input
      {...restProps}
      //@ts-ignore
      onBlur={(e: Event) => {
        if (trim && myRef.current) {
          //@ts-ignore
          myRef.current.input.value = e.target?.value?.trim();
          //@ts-ignore
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
