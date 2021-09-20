import React from 'react';
import { ProSchema } from '@ant-design/pro-utils';
import { MITableColumn } from './typing';
import { Statistic } from 'antd';
import { valueType } from 'antd/lib/statistic/utils';

export const getDefaultErrorMessage = (
  { required, min, max, len }: any,
  colSchema: ProSchema,
) => {
  if (required) return 'This field is required';
  const { valueType } = colSchema;
  if (
    !valueType ||
    valueType === 'password' ||
    valueType === 'text' ||
    valueType === 'textarea'
  ) {
    if (len !== undefined)
      return `This field must be exactly ${len} characters`;
    if (min !== undefined && max !== undefined)
      return `This field must be between ${min} and ${max} characters`;
    if (min !== undefined)
      return `This field must be at least ${min} characters`;
    if (max !== undefined)
      return `This field cannot be longer than ${min} characters`;
  } else if (valueType === 'digit') {
    if (len !== undefined) return `This field must equal ${len}`;
    if (min !== undefined && max !== undefined)
      return `This field must be between ${min} and ${max}`;
    if (min !== undefined) return `This field cannot be greater than ${min}`;
    if (max !== undefined) return `This field cannot be less than ${max}`;
  }

  return 'Validation error';
};

const localeMapper: {
  [key: string]: string;
} = {
  en: 'en-US',
};

export const columnConverter = ({ locale }: Record<string, any>) => <
  T,
  ValueType
>(
  col: MITableColumn<T, ValueType>,
) => {
  if (!['money', 'digit', 'date', 'dateTime'].includes(col.valueType as string))
    return col;
  const { valueType, ...o } = col;

  const opts: Record<string, any> = {};

  switch (valueType) {
    case 'date':
      opts.fieldProps = {
        format: 'DD-MMM-YYYY',
        ...o?.fieldProps,
      };
      opts.valueType = valueType;
      break;
    case 'dateTime':
      opts.fieldProps = {
        format: 'DD-MMM-YYYY HH:mm:ss',
        ...o?.fieldProps,
      };
      opts.valueType = valueType;
      break;
    case 'digit':
      opts.render = (
        _: any,
        entity: { [x: string]: valueType | undefined },
      ) => {
        return (
          <Statistic
            value={entity[col.dataIndex as any]}
            {...col?.fieldProps}
          />
        );
      };
      break;
    default:
      break;
  }

  return {
    //@ts-ignore
    align: ['money', 'digit'].includes(valueType) ? 'right' : o.align,
    ...o,
    valueType: {
      type: valueType,
      ...(typeof valueType === 'object' ? valueType : {}),
      locale: localeMapper[locale],
    },
    ...opts,
  };
};
