import { get, now, post, put, randomString } from '../../../shared/utils/utils';
import axios from '../../../shared/helpers/approval/axios';

export const onboardCorporate = async (isSME: boolean, payload: any) => {
  const {accountNumber, accountNumberDetails, adminMakerDetails, adminCheckerDetails, businessDetails, corporateAccountDetails } =
    payload;

  const requestPayload = {
    "requestHeader": {
      "requestTypeCode": "NEW",
      "menuCode": "3",
      "requestReference": randomString(30),
      "contextUrl": "aaa.com",
      "userSessionId": "aaa.com"
    },
    "name": businessDetails?.name || "Test Company",
    "address": businessDetails?.address || "Marina Lagos",
    "email": adminMakerDetails?.email || "test@test.com",
    "mobilePhoneNumber": accountNumberDetails?.MobileNo || "08011111111",
    "officePhoneNumber": accountNumberDetails?.MobileNo || "08022222222",
    "cbaCustomerId": "123cba",
    "postingOptionId": "1",
    "suspenseAccountId": "1",
    "autoApprovalEnabled": false,
    "tokenEnabled": true,
    "soleProprietor": false,
    "corporateTypeId": 3,
    "verifierTokenEnabled": false,
    "inputterTokenEnabled": true,
    "authorizerTokenEnabled": true,
    "narrationOptionId": "1",
    "hasToken": true,
    "sme": isSME,
    "code": corporateAccountDetails?.id || "COY5",
    "defaultApprovalLevelCount": "1",
    "defaultMandateSignatoryCount": "1",
    "verifierEnabled": true,
    "corporateAccounts": [
      {
        "corporateId": accountNumberDetails?.CustomerId || "123",
        "accountNumber": accountNumber || "1111111111",
        "accountName": accountNumberDetails?.name || "test accounts",
        "accountType": accountNumberDetails?.AccountType || "CASA",
        "ccy": accountNumberDetails?.CurrencyCode || "NGN",
        "transactionLimitAmount": accountNumberDetails?.LienAmount || 100000
      }
    ],
    "corporateAdminMaker": {
      "username": adminMakerDetails?.username || "testmaker@test.com",
      "firstName": adminMakerDetails?.firstName || "FTester",
      "lastName": adminMakerDetails?.lastName || "LTester",
      "middleName": "",
      "email": adminMakerDetails?.email || "testmaker5@test.com",
      "mobilePhoneNumber": adminMakerDetails?.phone || "08033333333",
      "officePhoneNumber": adminMakerDetails?.phone || "08044444444",
      "address": "Marina Lagos",
      "jobTitle": "Accountant",
      "userTypeId": "2",
      "approvalLimit": 10000000,
      "transferLimit": 10000000,
      "globalAccountAccessEnabled": true,
      "signatory": false,
      "autoApprovalEnabled": false,
      "tokenEnabled": true,
      "tokenDelivered": false,
      "viewBalanceEnabled": false,
      "authenticationModeId": 1
    },
   ...(!isSME && {
    "corporateAdminChecker": {
      "username": adminCheckerDetails?.username || "testchecker5@test.com",
      "firstName": adminCheckerDetails?.firstName || "FTester",
      "lastName": adminCheckerDetails?.lastName || "LTester",
      "middleName": "",
      "email": adminCheckerDetails?.email || "testmaker@test.com",
      "mobilePhoneNumber": adminCheckerDetails?.phone || "08033333333",
      "officePhoneNumber": adminCheckerDetails?.phone || "08044444444",
      "address": "Marina Lagos",
      "jobTitle": "Accountant",
      "userTypeId": "2",
      "approvalLimit": 10000000,
      "transferLimit": 10000000,
      "globalAccountAccessEnabled": false,
      "signatory": true,
      "autoApprovalEnabled": false,
      "tokenEnabled": true,
      "tokenDelivered": false,
      "viewBalanceEnabled": true,
      "authenticationModeId": 1
    }
  })
  };

  console.log('Onboarding corporate....', {isSME}, requestPayload?.corporateAdminChecker);
  try {
    const { data } = await axios.post(
      `/v1/corporate/on-boarding/${isSME? 'sme': 'non-sme'}`,
      JSON.stringify(requestPayload),
      {
        headers: {
          // "Accept": "*/*",
          'Content-Type': 'application/json',
        },
      },
    );

    console.log('Success response', data);
    return data;
  } catch (e) {
    const msg = e?.response?.data.error_description;
    console.log('Corporate Profiling error', e, msg);
    console.log('Full error', JSON.stringify(e?.response?.data));
    throw new Error(msg);
  }
};
