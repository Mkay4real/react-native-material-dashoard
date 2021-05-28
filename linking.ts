import { LinkingOptions, PathConfigMap } from "@react-navigation/native";

const config = {
  screens: {
    // Home: {
    //   path: "home/:id",
    //   parse: {
    //     id: (id)=> `${id}`,
    //   }
    // },
    // Profile: {
    //   path: "profile/:id",
    //   parse: {
    //     id: (id)=> `${id}`,
    //   }
    // },
    Notifications: "notifications",
    Dashboard: {
      screens: {
        Dashboard: {
          initialRouteName: "Accounts",
          // path:"dashboard",
          screens: {
            Accounts: { path: "accounts", exact: true}, // "accounts",
            AccountServices: "service-requests",
            CheckbookRequest: "service-requests/cheque-book-requests",
            AccountStatementRequest: "service-requests/account-statement-requests",
            AccountDetails: "service-requests/cheque-book-requests",
          },
        },
        Settings: "settings",
        EmployeePayments: {
          screens: {
            Payment: "transfers/corporate-transfer"
          }
        }
      }
    },
    CorporateProfiling: "sme",
    NonSMECorporateProfiling: "non-sme",
    NotFound: "*"
  } as PathConfigMap
};

const linking: LinkingOptions = {
  prefixes: ["parallex://app", "https://parallexbank.com/app"],
  config,
};

export default linking;