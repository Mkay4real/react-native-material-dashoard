import { get, now, post, put, randomString } from '../../../shared/utils/utils';
import { BusinessType, CompanyDetails, DocumentType, CompanyProfilingProgress } from '../types';
import { DocumentPickerResponse } from 'react-native-document-picker';
import axios from '../../../shared/helpers/onboarding/axios';

export const initiateFlow = (bvn: string) => {
  const data = { bvn, requestReferenceId: randomString(30) };
  return post('/bvn/initiateProcess')(data);
};

export const validateBVN = (bvn: string) => {
  const data = { dob: '2020-10-20', requestReferenceId: randomString(30) };
  return post('/bvn/validateDOB')({ bvn, ...data });
};

export const requestOtp = post<{
  requestFlowReference: string;
  valueToVerify?: unknown;
}>('/otp/request');

export const verifyOtp = (otp: string, reference?: string) => {
  return post('/otp/verify')({
    valueToVerify: otp,
    requestFlowReference: reference || randomString(30),
  });
};
export const verifyOtp2 = post<{
  requestFlowReference: string;
  valueToVerify?: unknown;
}>('/otp/verify');

export const documentUpload2 = post<FormData>('/document/single');

export async function documentUpload(form: FormData) {

  try {
    const { data } = await axios.post('/document/single', form, {
      data: form,
      headers: {
        "Accept": "application/json",
        "Content-Type": "multipart/form-data",
      }
    });

    return data;
  } catch (error) {
    console.log(error, error.response.data);
  }
}

// export async function documentUpload2(file: DocumentPickerResponse) {
//   const formData = new FormData();

//   formData.append('file', file);

//   // TODO
//   formData.append('documentType', '');

//   formData.append('requestReferenceId', now());

//   try {
//     const {data} = await axios.post('/document/single', formData);

//     return data;
//   } catch (error) {
//     console.log(error, error.response.data);
//   }
// }

export type Initiator = {
  id: number;
  bvn: string;
  type: string;
  email: string;
  lastName: string;
  nextOfKin: string;
  firstName: string;
  otherNames: string;
  spouseName: string;
  dateOfBirth: string;
  phoneNumber: string;
  nationality: string;
  localGovtArea: string;
  maritalStatus: string;
  stateOfOrigin: string;
  nokRelationship: string;
  spouseOccupation: string;
  residentialAddress: string;
};

export type InitiatorProgressResponse = {
  correlationId: string;
  currentStep: string; 
  initiatorReference: string;
  lastMoveAt: string; 
  previousStep: string; 
};

export const getInitiator = post<{ bvn: string }, Initiator>('/initiator/info');

export const getInitiatorProgress = post<{ initiatorBvn: string, rcNumber: string }, InitiatorProgressResponse>('/initiator/progress');

export const updateInitiator = put<Initiator, any>('/initiator/update');

export const validateRCNumber = (type: string, regNumber: string, companyName: string) => {
  const data = { requestReferenceId: randomString(30), companyName };
  return post<any>('/business/validate-regNum')({ ...data, regNumber });
};

export const getBusinessTypes = get<BusinessType[]>('/business/nature-of-biz');

export const getCompanyTypes = get<string[]>('/commons/companyTypes');

export const saveCompany = post<CompanyDetails>('/company/details');

export const getCompanyProfilingProgress = get<CompanyProfilingProgress>('/company/profiling-progress');

export const getDocTypes = get<DocumentType[]>('/document/types');

export const stageEntity = (body: {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  callbackUrl: string;
  entityCategory: string;
}) => {
  const data = {
    ...body,
    requestReferenceId: randomString(30),
  };

  /*
  //sample director response
  {
  "responseCode": "00",
  "responseMessage": "Successful",
  "notified": false,
  "continuityReference": "https://parallex.com?correlationId=313233343536373839304d6f62696c65&reference=M2MzODU2YzlkODE2ZmI3ODA3ZTA2Zjg2YTMzOGVmYTlkMTRjNWYzYzJhYTQzN2ViMjk4NDM4YTYxMWU0MGQ0ZjhhNTk5ZTgxMjc5MDJkMDA3YzE3OWVkZmE3ZWUzNzkwZDkxM2UwYTNkOWFhZjA2Y2QwN2MyZTg3MTgwOWU3NDc=&isDirector=1",
  "correlationId": "313233343536373839304d6f62696c65"
}

  //sample signatory response
  {
  "responseCode": "00",
  "responseMessage": "Successful",
  "notified": false,
  "continuityReference": "https://parallex.com?correlationId=313233343536373839304d6f62696c65&reference=MDk2ZjQ5NTFhNTJlZTYxNjY1ZDJmM2EyOTQzZjBiYzQ1MjdiMmY2N2VkNGE1OWQzM2JlNzMzZTAyYzJmNTUwZDUzMjM3OTNjN2Y2NTk3MDUyZTUwMTZmNGViNzc2NDhlMjUyODY3NGRiODI5NzY5NjUyYmQzYTIxNGJlMWFiMDc=&isSignatory=1",
  "correlationId": "313233343536373839304d6f62696c65"
}
  */

  return post('/staging/entity')(data);
};

const printLn = (message?: any, ...optionalParams: any[])=> console.log(message,optionalParams);

export const createAccountNumber = (account: string) => {
  const data = { accountNumberOfChoice: account, requestReferenceId: randomString(30) };
  printLn("payload", data);
  return post('/company/create-account')(data);
};

export const getAccountDetails =(account: string)=> get<any>('/account/details?accountNumber='+account);
