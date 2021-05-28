import * as React from "react";
import { Text, BottomNavigation, Colors } from "react-native-paper";
import { Image } from "react-native";
import Accounts from "./accounts";
import AccountInfo from "./accountinfo";

const AccountsRoute = () => <Accounts/>;
const TransferRoute = () => <Text>Transfer</Text>;
const InvoiceRoute = () => <AccountInfo/>;
const MoreRoute = () => <Text>More</Text>;

const primary ="#FA4A84";

const Dashboard = () => {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'accounts', title: 'Accounts',  color: 'red',
        icon: ()=><Image source={require("../assets/tab_accounts.png")} resizeMode={"contain"} style={{width: (28), height: (28)}}/> },
        { key: 'transfer', title: 'Transfer', icon: ()=><Image source={require("../assets/tab_transfer.png")} resizeMode={"cover"} style={{width: (28), height: (28)}}/> },
        { key: 'invoice', title: 'Invoice', icon: ()=><Image source={require("../assets/tab_invoice.png")} resizeMode={"contain"} style={{width: (28), height: (28)}}/> },
        { key: 'more', title: 'More', icon: ()=><Image source={require("../assets/tab_more.png")} resizeMode={"contain"} style={{width: (28), height: (28)}}/> },
    ])

    const renderScene = BottomNavigation.SceneMap({
        accounts: AccountsRoute,
        transfer: TransferRoute,
        invoice: InvoiceRoute,
        more: MoreRoute,
    });

    return (
        <BottomNavigation
            navigationState={{ index, routes }}
            shifting={false}
            barStyle={{maxHeight: (69), justifyContent:'center', backgroundColor: Colors.grey100}}
            activeColor={primary}
            onIndexChange={setIndex}
            renderScene={renderScene}
        />
    );
};

export default Dashboard;