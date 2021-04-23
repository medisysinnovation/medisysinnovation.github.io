import React from 'react';
import { List } from 'antd';
import { ListProps } from 'antd/lib/list';
import DataSource, { MIDataSourceProps } from '../data-source';
import { SelectValue } from 'antd/es/select';

export interface MIListProps<VT> extends ListProps<VT> {
  code?: boolean;
}

function MIList<
  VT extends SelectValue = SelectValue & { [index: string]: string }
>({ ...restProps }: MIListProps<VT>) {
  return (
    <DataSource {...(restProps as MIDataSourceProps<VT>)}>
      {({
        valueField = 'value',
        displayField = 'label',
        filter,
        ...payload
      }: MIDataSourceProps<VT>) => {
        return <List {...(payload as MIListProps<VT>)} />;
      }}
    </DataSource>
  );
}

// const MIModal: React.FC<MIModalProps> = ({
//   triggerDiscard = true,
//   model,
//   ...props
// }) => {
//   const ref = useRef() as React.MutableRefObject<HTMLDivElement>;

//   const getClosetForm = (el: HTMLElement | null) => {
//     let f = el?.closest('.ant-modal-content')?.querySelector('.medisys-form');

//     if (!f) {
//       return el?.querySelector('.medisys-form');
//     }
//     return f;
//   };
//   const { onCancel, visible, children, ...restProps } = props;
//   const [state, { setTrue, setFalse }] = useBoolean(visible);
//   const [spinning, setSpinning] = useState(false);

//   // console.log(state, visible);
//   // const onDiscardForm = (e: FormEvent) => {
//   //   if (onCancel)
//   //     //@ts-ignore
//   //     onCancel(e);
//   // };
//   useEventListener('discardform', (e: FormEvent) => {
//     if (onCancel && isVisible(ref?.current)) {
//       //@ts-ignore
//       onCancel(e);
//     }
//   });
//   useEventListener('loadingstatechanged', (e: FormEvent) => {
//     if (model && isVisible(ref?.current)) {
//       const models = e.detail?.models ?? {};
//       // console.log(model, models[model]);
//       setSpinning(!!models[model]);
//     }
//   });
//   useEffect(() => {
//     // const onDiscardForm = (e: FormEvent) => {
//     //   if (onCancel)
//     //     //@ts-ignore
//     //     onCancel(e);
//     // };
//     // console.log(ref.current, onDiscardForm);

//     if (visible === true) {
//       setTrue();

//       // setTimeout(() => {
//       //   if (ref.current)
//       //     ref.current.addEventListener('discardform', onDiscardForm);
//       // }, 1);
//     } else {
//       setFalse();
//     }

//     // return () => {
//     //   if (ref.current)
//     //     ref.current.removeEventListener('discardform', onDiscardForm);
//     // };
//   }, [visible]);

//   return (
//     <div>
//       <Modal
//         // footer={renderFooter()}
//         {...restProps}
//         confirmLoading={spinning}
//         visible={state}
//         onCancel={e => {
//           const form = getClosetForm(e.currentTarget);
//           // console.log(123123, form);

//           if (form && triggerDiscard) {
//             form.dispatchEvent(new CustomEvent('aboutdiscardform'));

//             return false;
//           } else {
//             if (onCancel) onCancel(e);
//           }
//         }}
//       >
//         <Spin spinning={spinning}>
//           <div ref={ref}>{children}</div>
//         </Spin>
//       </Modal>
//     </div>
//   );
// };

export default MIList;
