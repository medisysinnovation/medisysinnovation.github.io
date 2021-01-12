export default {
  login: "/connect/token",
  codetable: "/api/CodeTable",
  ctPort: "/api/CTPort",
  ctContainerOperator: "/api/CTContainerOperator",
  currentUser: "/api/User/Current",
  changePassword: "/api/User/ChangePassword",
  user: "/api/user",
  patient: "/api/patient",
  role: "/api/role",
  tenant: "/api/tenant",
  transporter: "/api/transporter",
  validateTransporter: "/api/Transporter/Validate",
  resetPassword: "/api/user/resetPassword",
  forgetPassword: "/api/user/forgetPassword",
  j5ApplicationForm: "/api/J5ApplicationForm",
  cancelApplication: "/api/J5ApplicationForm/Cancel",
  unNumberData: "/api/J5ApplicationForm/UNNumberData",
  j5Job: "/api/j5Job",
  initiateJob: "/api/j5Job/InitiateJob",
  cancelJob: "/api/j5Job/CancelJob",
  file: "/api/File",
  kdCargo: "/api/KDCargo",
  kioskJob: "/api/Kiosk",
  kioskReportIssue: "/api/Kiosk/ReportIssue",
  cargoLabel: "/api/Kiosk/cargoLabel",
  cargoDetails: "/api/CargoDetails",
  cargoDetailsAck: "/api/CargoDetails/Acknowledge",
  requestCargoImage: "/api/CargoDetails/RequestCargoImg",
  subscribeTopic: "/api/Message/SubscribeToTopic",
  unsubscribeTopic: "/api/Message/UnsubscribeFromTopic",
  notification: "/api/Notification",
  taskList: "/api/TaskList",
  approveContainerImage: "/api/J5ApplicationForm/ApproveContainerImg",
  approveCargoImage: "/api/CargoDetails/ApproveCargoImg",
  readAllNotification: "/api/Notification/ReadAll",
  requestContainerImage: "/api/J5ApplicationForm/RequestContainerImg",
  requestTransferOwnership: "/api/J5ApplicationForm/RequestTransferOwnership",
  approveTransferOwnership: "/api/J5ApplicationForm/ApproveTransferOwnership",
  validateCargoTransferOwnership:
    "/api/J5ApplicationForm/validateCargoTransferOwnership",
  systemSetting: "/api/SystemSetting",
  systemSettingExitKiosk: "/api/SystemSetting/ExitKiosk",
  systemSettingKioskHelper: "/api/SystemSetting/KioskHelperUrl",
  allSystemSetting: "/api/SystemSetting/All",
  storageList: "/api/StorageLayout/Storages",
  storageLayout: "/api/StorageLayout",
  storageOccupancy: "/api/StorageOccupancy",
  occupiedStorage: "/api/StorageOccupancy/Occupied",
  ctPublicHoliday: "/api/CTPublicHoliday",
  ctLabelPrinter: "/api/CTLabelPrinter",
  getJobImages: "/api/j5Job/images",
  validateImportSO: "/api/CargoDetails/ValidateImportSO",
  searchCargoDetails: "/api/CargoDetails/SearchCargo",
  ctUNNo: "/api/CTUNNo",
  unNoIMOClass: "/api/UNNoIMOClass",
  rptUNNoIMOClass: "/api/UNNumberReport",
  containerYard: "/api/ContainerYard",
  containerYardSummary: "/api/ContainerYard/Summary",
  inspectAll: "/api/ContainerMonitoring/InspectAll",
  containerMonitoring: "/api/ContainerMonitoring",
  updateSpecialDG: "/api/ContainerMonitoring/UpdateSpecialDG",
  updateContainerPhotos: "/api/ContainerMonitoring/UpdateContainerPhotos",
  getContainerReportData: "/api/ContainerMonitoring/ContainerReport",
  hauliers: "/api/Tenant/Hauliers",
  cargoSummary: "/api/CargoDetails/Summary",
  transferOwnership: "/api/J5ApplicationForm/TransferOwnership",
  getPM4Status: "/api/J5ApplicationForm/GetPM4Status",
  lotAllocationAck: "/api/CargoStoringOrderList/LotAllocationAck",
  dgSafetyInspectionReport: "/api/Report/DGSafetyInspection",
  sendDGSafetyInspection: "/api/Report/SendDGSafetyInspection",
  getInspectionAttachment: "/api/ContainerMonitoring/InspectionAttachment",
  getOtherLocationContainerMonitoring:
    "/api/ContainerMonitoring/OtherLocationContainerMonitoring",
  getYardTerminalGroup: "/api/ContainerMonitoring/GetYardTerminalGroup",
  getPastLocationAsync: "/api/ContainerMonitoring/GetPastLocation",
  getLatestContainerMonitoringData:
    "/api/ContainerMonitoring/GetLatestContainerMonitoringData",
  getByStoringOrderNumber: "/api/CargoDetails/GetByStoringOrderNumber",
  saveYardInspectionAttachment: "/api/ContainerYard/YardPhotos",
  downloadCargoCliqueReportTool: "/api/Download/CargoCliqueReportTool",
  report: "/api/report",
};