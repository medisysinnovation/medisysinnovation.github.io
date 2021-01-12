export default interface TaskListDto {
  notificationId: string;
  payload: string;
  description: string;
  taskActionTypeId: string;
  taskStatus: string;
  id: string;
  isDeleted: boolean;
  receivedDate: string;
  taskUpdateDate?: string;
}
