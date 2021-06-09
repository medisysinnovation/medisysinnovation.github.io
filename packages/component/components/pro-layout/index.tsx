import ProLayout, {
  PageContainer,
  SettingDrawer,
} from '@ant-design/pro-layout';

type ComponentProps = React.ComponentProps<typeof ProLayout>;
type MIProLayout = ComponentProps & {
  PageContainer: typeof PageContainer;
  SettingDrawer: typeof SettingDrawer;
};
export { PageContainer, SettingDrawer };
//@ts-ignore
const MIProLayout = ProLayout as MIProLayout;
MIProLayout.PageContainer = PageContainer;
MIProLayout.SettingDrawer = SettingDrawer;

export default ProLayout;
