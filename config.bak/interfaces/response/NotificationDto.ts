export default interface NotificationDto {
  id: string;
  isDeleted: boolean;
  isRead: boolean;
  message: string;
  receivedDate: string;
  title: string;
}
