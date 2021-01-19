export default interface FumigationFormDto {
  id: string;
  isDeleted: boolean;
  recordVersion: string;

  applicantName: string;
  applicantContactNumber: string;
  applicantEmail: string;
  nameOfCompany: string;
  applicantPSAAccount: string;
}
