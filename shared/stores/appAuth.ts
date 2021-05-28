import create from 'zustand';

type Auth = {
  //for client
  token?: string;
  refreshToken?: string;

  //for system maker
  userToken?: string;
  userRefreshToken?: string;

  //for system checker
  approvalToken?: string;
  approvalRefreshToken?: string;

  setToken(token?: string, refreshToken?: string): void;
  setUserToken(userToken?: string, userRefreshToken?: string): void;
  setApprovalToken(approvalToken?: string, approvalRefreshToken?: string): void;
};

const appAuthStore = create<Auth>((set) => ({
  setToken(token, refreshToken) {
    set({token, refreshToken});
  },
  setUserToken(userToken, userRefreshToken) {
    set({userToken, userRefreshToken});
  },
  setApprovalToken(approvalToken, approvalRefreshToken) {
    set({approvalToken, approvalRefreshToken});
  },
}));

export default appAuthStore;
