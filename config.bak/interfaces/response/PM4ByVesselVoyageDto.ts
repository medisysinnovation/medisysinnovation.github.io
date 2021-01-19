export interface PM4ByVesselVoyageDto {
  cntrGrp: string;
  orgC: string;
  pm4Details: PM4Detail[];
}

export interface PM4Detail {
  unN: string;
  imoClC: string;
  pkgGrpC: string;
  pkgTyX: string;
  flashPtN: string;
  substnDgGrp: string;
  unqtyQN: string;
  wtQ: string;
  tankCntrI: string;
  psnM: string;
  technicalM: string;
  mpaApprStC: string;
  psaApprStC: string;
}
