import create from 'zustand';

type Store = {
  username?: string;
  userId?: string;
  corporateCode?: string;
  corporateId?: string;
  password?: string;
  newPassword?: string;
  email?: string;


  bvn?: string;
  currency?: string;
  phoneNumber?: string;
  requestFlowReference?: string;
  correlationId?: string;
  rcNumber?: string;
  setDetails(details: Omit<Store, 'setDetails'>): void;
};

const userInfoStore = create<Store>((set, get) => ({
  setDetails: (details) => set({...get(), ...details}),
}));

export default userInfoStore;
