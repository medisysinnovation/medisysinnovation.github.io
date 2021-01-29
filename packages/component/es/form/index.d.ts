/// <reference types="react" />
declare let MIForm: <Values = any>(
  props: import('./form').MIFormProps<Values> & {
    children?: import('react').ReactNode;
  } & {
    ref?:
      | ((instance: import('antd').FormInstance<Values> | null) => void)
      | import('react').RefObject<import('antd').FormInstance<Values>>
      | null
      | undefined;
  },
) => import('react').ReactElement<
  any,
  | string
  | ((
      props: any,
    ) =>
      | import('react').ReactElement<
          any,
          | string
          | any
          | (new (props: any) => import('react').Component<any, any, any>)
        >
      | null)
  | (new (props: any) => import('react').Component<any, any, any>)
>;
export default MIForm;
