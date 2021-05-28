import create from 'zustand';
import { AccountDetails } from '../services/api';

type Admin ={
  username?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
}
type Business ={
  name?: string;
  type?: string;
  address?: string;
  nature?: string;
  sector?: string;
  turnover?: string;
}
type CorporateID ={
  id: string;
}
type Store = {
  bvn?: string;
  accountNumber?: string;
  accountNumberDetails?: AccountDetails;
  requestReferenceId?: string;
  businessDetails?: Business;
  corporateAccountDetails?: CorporateID;
  adminMakerDetails?: Admin;
  adminCheckerDetails?: Admin;

  isSME?: boolean;


  email?: string;
  currency?: string;
  phoneNumber?: string;
  businessType?: string;
  businessName?: string;

  correlationId?: string;
  rcNumber?: string;
  setDetails(details: Omit<Store, 'setDetails'>): void;
};

const corporateProfilingStore = create<Store>((set, get) => ({
  setDetails: (details) => set({...get(), ...details}),
}));

export default corporateProfilingStore;
