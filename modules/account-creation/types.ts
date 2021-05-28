export type BusinessType = {name: string};

export type DocumentType = {
  name: string;
  code: string;
  mandatory: boolean;
  description: string;
};

export type CompanyDetails = {
  businessAddress: string;
  businessName: string;
  businessTypeCode: string;
  country: string;
  countryOfIncorporation: string;
  currency: string;
  dateOfIncorporation: string;
  incorporationNumber: string;
  natureOfBusiness: string;
  processInitiatorBvn: string;
  registeredOfficeAddress: string;
  requestReferenceId: string;
  sector: string;
  state: string;
  phone: string;
  email: string;
  taxId: string;
};

export type Shareholder = {
  id?: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  callbackUrl?: string;
  entityCategory: string;
  correlationId: string;
};

export type CompanyProfilingProgress = {
  responseCode: string;
  responseMessage: string;
  expectedDirectorCnt: number;
  expectedSignatoriesCnt: number;
  actualDirectorCnt: number;
  actualSignatoriesCnt: number;
  incompleteDirDetails: Array<Shareholder>;
  incompleteSigDetails: Array<Shareholder>;
};
