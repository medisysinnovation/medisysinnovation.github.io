import ProLayout, {
  PageContainer,
  SettingDrawer,
} from '@ant-design/pro-layout';
import type { BasicLayoutContext } from '@ant-design/pro-layout/lib/BasicLayout';

type MIProLayout = BasicLayoutContext & {
  PageContainer: typeof PageContainer;
  SettingDrawer: typeof SettingDrawer;
};
export { PageContainer, SettingDrawer };
//@ts-ignore
const MIProLayout = ProLayout as MIProLayout;
MIProLayout.PageContainer = PageContainer;
MIProLayout.SettingDrawer = SettingDrawer;

export default MIProLayout;
