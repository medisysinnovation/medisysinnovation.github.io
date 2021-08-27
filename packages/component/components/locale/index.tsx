import React, { useContext } from 'react';
import { ConfigProvider as AntdConfigProvider } from '../provider';

import en_US from 'antd/lib/locale/en_US';

import zhCN from './locale/zh_CN';
import enUS from './locale/en_US';
export type ProSchemaValueEnumType = {
  /** @name 演示的文案 */
  text: React.ReactNode;

  /** @name 预定的颜色 */
  status: string;
  /** @name 自定义的颜色 */
  color?: string;
  /** @name 是否禁用 */
  disabled?: boolean;
};

/**
 * 支持 Map 和 Object
 *
 * @name ValueEnum 的类型
 */
export type ProSchemaValueEnumMap = Map<
  React.ReactText,
  ProSchemaValueEnumType | React.ReactNode
>;

export type ProSchemaValueEnumObj = Record<
  string,
  ProSchemaValueEnumType | React.ReactNode
>;

export type BaseProFieldFC = {
  /** 值的类型 */
  text: React.ReactNode;
  /** 放置到组件上 props */
  fieldProps?: any;
  /** 模式类型 */
  mode: ProFieldFCMode;
  /** 简约模式 */
  plain?: boolean;
  /** 轻量模式 */
  light?: boolean;
  /** Label */
  label?: React.ReactNode;
  /** 映射值的类型 */
  valueEnum?: ProSchemaValueEnumObj | ProSchemaValueEnumMap;
  /** 唯一的key，用于网络请求 */
  proFieldKey?: React.Key;
};

export type ProFieldFCMode = 'read' | 'edit' | 'update';

/** Render 第二个参数，里面包含了一些常用的参数 */
export type ProFieldFCRenderProps = {
  mode?: ProFieldFCMode;
  placeholder?: string | string[];
  value?: any;
  onChange?: (...rest: any[]) => void;
} & BaseProFieldFC;

export type ProRenderFieldPropsType = {
  render?:
    | ((
        text: any,
        props: Omit<ProFieldFCRenderProps, 'value' | 'onChange'>,
        dom: JSX.Element,
      ) => JSX.Element)
    | undefined;
  renderFormItem?:
    | ((
        text: any,
        props: ProFieldFCRenderProps,
        dom: JSX.Element,
      ) => JSX.Element)
    | undefined;
};

export type IntlType = {
  locale: string;
  getMessage: (id: string, defaultMessage: string) => string;
};

function get(
  source: Record<string, unknown>,
  path: string,
  defaultValue?: string,
): string | undefined {
  // a[3].b -> a.3.b
  const paths = path.replace(/\[(\d+)\]/g, '.$1').split('.');
  let result = source;
  let message = defaultValue;
  // eslint-disable-next-line no-restricted-syntax
  for (const p of paths) {
    message = Object(result)[p];
    result = Object(result)[p];
    if (message === undefined) {
      return defaultValue;
    }
  }
  return message;
}

/**
 * 创建一个操作函数
 *
 * @param locale
 * @param localeMap
 */
const createIntl = (
  locale: string,
  localeMap: Record<string, any>,
): IntlType => ({
  getMessage: (id: string, defaultMessage: string) =>
    get(localeMap, id, defaultMessage) || defaultMessage,
  locale,
});

const zhCNIntl = createIntl('zh_CN', zhCN);
const enUSIntl = createIntl('en_US', enUS);

const intlMap: any = {
  'zh-CN': zhCNIntl,
  'en-US': enUSIntl,
};

const intlMapKeys = Object.keys(intlMap);

export type ParamsType = Record<string, any>;

export { enUSIntl, zhCNIntl, intlMap, intlMapKeys };

export type ConfigContextPropsType = {
  intl: IntlType;
  valueTypeMap: Record<string, ProRenderFieldPropsType>;
};

const ConfigContext = React.createContext<ConfigContextPropsType>({
  intl: {
    ...enUSIntl,
    locale: 'default',
  },
  valueTypeMap: {},
});

const { Consumer: ConfigConsumer, Provider: ConfigProvider } = ConfigContext;

/**
 * 根据 antd 的 key 来找到的 locale 插件的 key
 *
 * @param localeKey
 */
const findIntlKeyByAntdLocaleKey = (localeKey: string | undefined) => {
  if (!localeKey) {
    return 'zh-CN';
  }
  const localeName = localeKey.toLocaleLowerCase();
  return intlMapKeys.find(intlKey => {
    const LowerCaseKey = intlKey.toLocaleLowerCase();
    return LowerCaseKey.includes(localeName);
  });
};

/**
 * 如果没有配置 locale，这里组件会根据 antd 的 key 来自动选择
 *
 * @param param0
 */
const ConfigProviderWrap: React.FC<Record<string, unknown>> = ({
  children,
}) => {
  const { locale } = useContext(AntdConfigProvider.ConfigContext);
  // 如果 locale 不存在自动注入的 AntdConfigProvider
  const Provider = locale === undefined ? AntdConfigProvider : React.Fragment;
  return (
    <ConfigConsumer>
      {value => {
        const localeName = locale?.locale;

        const key = findIntlKeyByAntdLocaleKey(localeName);
        // antd 的 key 存在的时候以 antd 的为主
        const intl =
          localeName && value.intl?.locale === 'default'
            ? intlMap[key!]
            : value.intl || intlMap[key!];

        // 自动注入 antd 的配置
        const configProvider =
          locale === undefined
            ? {
                locale: en_US,
              }
            : {};

        return (
          <Provider {...configProvider}>
            <ConfigProvider
              value={{
                ...value,
                intl: intl || zhCNIntl,
              }}
            >
              {children}
            </ConfigProvider>
          </Provider>
        );
      }}
    </ConfigConsumer>
  );
};

export { ConfigConsumer, ConfigProvider, ConfigProviderWrap, createIntl };

export function useIntl(): IntlType {
  const context = useContext(ConfigContext);
  return context.intl || zhCNIntl;
}

export default ConfigContext;
