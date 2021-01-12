const { REACT_APP_ENV } = process.env;
console.log(REACT_APP_ENV);
const LOCAL_STORAGE_KEY = {
  accessTokenKey: "cargo_clique_access_token" + REACT_APP_ENV,
  refreshTokenKey: "cargo_clique_refresh_token",
  userAccessRightsKey: "cargo_clique_user_access_rights",
  lastActiveTime: "last_active_time",
};

export const SystemSettingKey = {
  ExitKioskPassword: "ExitKioskPassword",
  KioskHelperUrl: "KioskHelperUrl",
  LabelPrintUrl: "LabelPrintUrl",
  DocumentPrintUrl: "DocumentPrintUrl",
  SessionTimout: "SessionTimout",
};

export default LOCAL_STORAGE_KEY;
