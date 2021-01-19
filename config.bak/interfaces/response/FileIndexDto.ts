export default interface FileIndexDto {
  fileExtension: string;
  fileName: string;
  fileSize: number;
  id: string;
  status?: string;
  response?: any;
  fileIndexId?: string;
  isDeleted?: boolean;
  j5FormId?: string;
}
