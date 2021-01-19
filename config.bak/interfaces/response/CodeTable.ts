export interface CodeTable {
  code: string;
  name: string;
  id: string;
  isDeleted: boolean;
  recordVersion: string;
}

export interface CodeTableDto {
  code: string;
  displayValue: string;
  description: string;
  isActive: boolean;
  sortOrder: number;
  id: string;
  isDeleted: boolean;
  recordVersion: string;
}