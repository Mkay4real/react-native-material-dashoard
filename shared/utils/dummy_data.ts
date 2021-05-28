import { AccountDetails } from "../services/api";

export const accounts = [
  {
    balance: '5,000,000',
    accountName: 'Acc Name',
    accountNumber: '123456',
  },
  {
    balance: '5,000,000',
    accountName: 'Acc Name',
    accountNumber: '123456',
  },
  {
    balance: '5,000,000',
    accountName: 'Acc Name',
    accountNumber: '123456',
  },
];

export const employees = new Array(5).fill(0).map((id) => {
  const rand = Math.random().toString(32).substr(2);

  return {
    id: rand,
    salary: '#80,000',
    lastName: 'Mendy',
    accountNumber: rand,
    bank: 'keystone bank',
    firstName: 'Benjamin',
  };
});

export type Roles = 'initiator' | 'approver';

export const roles: {label: string; value: Roles}[] = [
  {label: 'Initiator', value: 'initiator'},
  {label: 'Initiator', value: 'approver'},
];

export type Attributes =
  | 'Signatory'
  | 'ViewBalance'
  | 'UseToken'
  | 'GlobalAccessToken';

export const attributes: {label: string; value: Attributes}[] = [
  {
    label: 'Signatory',
    value: 'Signatory',
  },
  {
    label: 'Global Access Token',
    value: 'GlobalAccessToken',
  },
  {
    label: 'View Balance',
    value: 'ViewBalance',
  },
  {
    label: 'Use TOKEN',
    value: 'UseToken',
  },
];

export const accountDetails= {
  "AccountNumber": 1112223330,
  "AccountStatus": "ongoing",
  "AccountType": "CASA",
  "AvailableBalance": 0,
  "BookBalance": 0,
  "Branch": "567890",
  "BranchCode": 0,
  "CurrencyCode": "NGN",
  "CustomerId": "2484094644532",
  "Email": "testmobile@sytem.com",
  "ErrorDetail": {},
  "FreezeCode": "00",
  "ISOCode": "234",
  "LienAmount": 0,
  "MobileNo": "09098769876",
  "Product": "new",
  "ProductCode": "0000",
  "RelationshipManagerId": "0000",
  "UnclearedBalance": 0,
  "name": "Test Mobile Account",
  "requestReferenceId": "34534365476575686",
  "responseCode": "00",
  "responseMessage": "ok"

} as AccountDetails