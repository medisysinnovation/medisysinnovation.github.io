import CargoAttachmentDto from './CargoAttachmentDto';
import JobAttachmentDto from './JobAttachmentDto';

export default interface JobImagesDto {
  cargoAttachments: CargoAttachmentDto[];
  jobAttachments: JobAttachmentDto[];
}
