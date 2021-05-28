import { get, now, post, put, randomString } from '../utils/utils';
import { BusinessType, CompanyDetails, DocumentType, CompanyProfilingProgress } from '../../modules/account-creation/types';
import axios from 'axios';

export type AccountDetails={
  AccountNumber?: number;
  AccountStatus?: string;
  AccountType?: string;
  AvailableBalance?: number;
  BookBalance?: number;
  Branch?: string;
  BranchCode?: number;
  CurrencyCode?: string;
  CustomerId?: string;
  Email?: string;
  ErrorDetail?: any;
  FreezeCode?: string;
  ISOCode?: string;
  LienAmount?: number;
  MobileNo?: string;
  Product?: string;
  ProductCode?: string;
  RelationshipManagerId?: string;
  UnclearedBalance?: number;
  name?: string;
  requestReferenceId?: string;
  responseCode?: string;
  responseMessage?: string;
}

export const requestOtp = post<{
  requestFlowReference: string;
  valueToVerify?: unknown;
}>('/otp/request');

export const verifyOtp = (otp: string, reference?: string) => {
  return post('/otp/verify')({
    valueToVerify: otp,
    requestFlowReference: reference ||randomString(30),
  });
};

export const validateRCNumber = (type: string, regNumber: string) => {
  const data = { type, requestReferenceId: randomString(30)};
  return post('/business/validate-regNum')({ ...data, regNumber });
};


export const getAccountDetails =(account: string)=> get<AccountDetails>('/account/details?accountNumber='+account);

export const requestAccountOtp =(account: string)=> get<AccountDetails>('/account/otp?accountNumber='+account);

export const validateAccountOtp = (otp: string, reference?: string) => {
  return post('/account/validate-otp')({
    valueToVerify: otp,
    requestFlowReference: reference ||randomString(30),
  });
};

export const getBusinessTypes = get<BusinessType[]>('/business/nature-of-biz');

export const getCompanyTypes = get<string[]>('/commons/companyTypes');

export const saveCompany = post<CompanyDetails>('/company/details');

export const getCompanyProfilingProgress = get<CompanyProfilingProgress>('/company/profiling-progress');

export const getDocTypes = get<DocumentType[]>('/document/types');
