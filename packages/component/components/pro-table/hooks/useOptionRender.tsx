import React, { useCallback, useState } from 'react';
import type { ProCoreActionType } from '@ant-design/pro-utils';
import { DeleteWrapper } from '../ActionButton';
import { uniqueid } from '@medisys/utils';
import type {APIInterface, MIRowEditableConfig} from '../typing'
import { message } from 'antd';
import type { TableFeature, ColumnAction } from './useColumns';
import useHighlight from './useHighlight';
import { useIntl } from '@medisys/provider';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useOptionRender = <
  T extends {
    isUserMaintainable: boolean;
  } & {
    [key: string]: number | string | boolean,
   },
>({
  features = [],
  rowKey,
  api,
  tableRef,
  editable,

}: {
  features?: TableFeature<T>[];
  rowKey: string;
  api: APIInterface<T>;
  tableRef: React.MutableRefObject<HTMLDivElement | undefined>;
  editable?: MIRowEditableConfig<T>;

}) => {
  const intl = useIntl();

  const [lastRowId, setLastRowId] = useState<string>();
  useHighlight({
    tableRef,
    lastRowId,
  });
  const { remove, create, query, update } = api;
  const cb = useCallback(
    (
      _dom: React.ReactNode,
      entity: T,
      _index: number,
      action: ProCoreActionType,
      // schema: ProSchema<T>,
    ) => {
      // console.log(dom, entity, index, action, schema);
      const ary: JSX.Element[] = [];
      const defaultFeatures = {
        edit: (
          <a
            key="edit"
            disabled={entity.isUserMaintainable === false}
            onClick={() => action.startEditable?.(entity[rowKey] as React.Key)}
          >
            {intl.getMessage('table.action.edit','Edit')}
          </a>
        ),
        duplicate: (
          <a
            key="duplicate"
            onClick={async () => {
              const opt = (features.find((o) => (o as ColumnAction<T>)?.code === 'duplicate') || {
                getNewValue: (v: T) => v,
              }) as ColumnAction<T>;
              const { data: latestEntity } = query
                ? ((await query!({ id: entity[rowKey] as string })) as any)
                : { data: entity };

              const newId: any = await create!({
                ...opt.getNewValue(latestEntity),
                // @ts-ignore
                [rowKey]: uniqueid(),
              });
              if (opt) await action?.reloadAndRest?.();
              message.success(intl.getMessage('table.action.recordDuplicated','Record duplicated'));
              setLastRowId(newId);
              editable?.onRowDataChanged?.([newId]);

            }}
          >
            {intl.getMessage('table.action.duplicate','Duplicate')}
            
          </a>
        ),
        remove: (
          <DeleteWrapper
            key="remove"
            rowKey={rowKey as string}
            onRemove={remove!}
            onComplete={(success) => {
              if (success) action?.reloadAndRest?.();
            }}
            rows={[entity]}
          >
            <a disabled={entity.isUserMaintainable === false}>{intl.getMessage('table.action.delete','Delete')}</a>
          </DeleteWrapper>
        ),
        toggleStatus: () => {
          const opt = (features.find((o) => (o as ColumnAction<T>)?.code === 'toggleStatus') || {
            filedName: 'isActive',
          }) as ColumnAction<T>;
          return (
            <a
              key="toggleStatus"
              // @ts-ignore
              onClick={async () => {
                const { data: latestEntity } = query
                //@ts-ignore
                  ? ((await query!({ id: entity[rowKey] })) as any)
                  : { data: entity };
                if (entity[opt.filedName] !== latestEntity[opt.filedName]) {
                  message.warning(intl.getMessage('table.message.dirtyDataUpdate','Data has been changed'));
                  action?.reload();
                  return;
                }
                const newEntity = {
                  ...latestEntity,
                  [opt.filedName]: !latestEntity[opt.filedName],
                };
                await update!(newEntity);
                if (opt) await action?.reloadAndRest?.();
                message.success('Status updated');
                editable?.onRowDataChanged?.([newEntity]);

              }}
            >
              {entity[opt.filedName] === true ? intl.getMessage('table.action.deactivate','Deactivate') : intl.getMessage('table.action.activate','Activate')}
            </a>
          );
        },
      };
      features.forEach((f) => {
        const action = (fn: TableFeature<T>, list: JSX.Element[]) => {
          if (typeof fn === 'string') {
            //@ts-ignore
            if (defaultFeatures[fn]) action(defaultFeatures[fn], list);
          } else if (typeof fn === 'object' && (fn as ColumnAction<T>)?.code) {
            list.push(
              (fn as ColumnAction<T>)?.render
                ? (fn as ColumnAction<T>)?.render(entity)
                //@ts-ignore
                : defaultFeatures[(fn as ColumnAction<T>)?.code],
            );
          } else if (typeof fn === 'function') {
            list.push(fn(entity));
          } else {
            list.push(fn as JSX.Element);
          }
        };
        action(f, ary);
      });

      return ary;
    },
    [features, remove, rowKey, create, update, query, setLastRowId,editable],
  );

  return cb;
};

export default useOptionRender;
