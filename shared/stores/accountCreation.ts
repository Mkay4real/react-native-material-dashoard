import create from 'zustand';

type Store = {
  bvn?: string;
  email?: string;
  currency?: string;
  phoneNumber?: string;
  businessType?: string;
  businessName?: string;
  requestFlowReference?: string;
  correlationId?: string;
  rcNumber?: string;
  taxId?: string;
  setDetails(details: Omit<Store, 'setDetails'>): void;
};

const accountCreationStore = create<Store>((set, get) => ({
  setDetails: (details) => set({...get(), ...details}),
}));

export default accountCreationStore;
