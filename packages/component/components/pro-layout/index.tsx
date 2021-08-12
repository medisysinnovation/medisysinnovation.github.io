import ProLayout, {
  PageContainer,
  SettingDrawer,
} from '@ant-design/pro-layout';

type InternalType = typeof ProLayout;

interface ProLayoutInterface extends InternalType {
  PageContainer: typeof PageContainer;
  SettingDrawer: typeof SettingDrawer;
}

let MIProLayout = ProLayout as ProLayoutInterface;

export { PageContainer, SettingDrawer };

export default MIProLayout;
