import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentOptions,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { FlatList, Image, StyleSheet, View, ScrollView, Linking } from 'react-native';
import { Colors, Divider, Drawer as PaperDrawer, List } from 'react-native-paper';
import AccountIcon from './assets/account.svg';
import ChevronRightIcon from './assets/chevron-right.svg';
import AccountServices from './modules/account-service/App';
import ChangePassword from './modules/settings/screens/ChangePassword';
import Settings from './modules/settings/screens/Main';
import Profile from './modules/settings/screens/Profile';
import Security from './modules/settings/screens/Security';
import { dashboardOptions, drawerOptions } from './shared/utils/headerOptions';
import Transactions from './modules/dashboard/transactions/App';
import Notifications from './modules/dashboard/notifications/App';
import Roles from './modules/dashboard/roles/App';
import EmployeePayments from './modules/dashboard/employee-payments/App';
import userInfoStore from './shared/stores/userInfo';
import { getUserById, getMenusByUserId, getCorpById } from './shared/services/userServices';
import Button from './shared/components/Button';
import { notify } from './shared/utils/utils';
import { useLinkTo } from '@react-navigation/native';
import _ from 'lodash';

const handlePress = async (url: string, type?: "applink"| "link") => {
  //check if linking is supported
  let supported = false;
  try {
    supported = await Linking.canOpenURL(url);
  } catch (error) {
    console.error(error);
  }
  if (supported) {
    Linking.openURL(url);
  } else {
    notify({ message: "Can't open this url " + url })
    if(type == "link"){
      
    }
  }


}

const groupMenuBy = (menus: [], keyName: string) => {
  return _.groupBy(menus, keyName)
}

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const navSections = [
  { label: 'Transactions', name: 'Transactions' },
  { label: 'Notifications', name: 'Notifications' },
  { label: 'Users & roles', name: 'Roles' },
  { label: 'Settings', name: 'Settings' },
];

const hideSections= ['EmployeePayments'];

const sections = navSections.map(({ name }) => name);

const Bio = ({ firstName = "John", lastName = "Doe", companyName = "Johnson & Sons" }) => {
  return (
    <List.Item
      title={`${firstName} ${lastName}`}
      description={companyName}
      left={(props) => (
        <Image {...props} style={{ width: 60, height: 60 }} source={require('./assets/avatar.png')} />
      )}
    />
  );
};

const DrawerContent = (
  props: DrawerContentComponentProps<DrawerContentOptions> & { user: any; userMenus: [] | any; corp: any, handlePress: any, linkTo: any },
) => {
  const nav = props.navigation;
  const newState = { ...props.state };

  // I had to find a way to add the custom footer
  // added to the design, but that requires adding those
  // items to the Drawer Navigator. But adding them to the
  // navigator means they'd be displayed like the other drawer
  // items. And we don't want that, we only need access to the
  // props so that we can be able to toggle the drawer.

  // So we remove the top-level screen component housing
  // the footer screen items, which gives us the navigator props
  // but doesn't display the item.
  newState.routes = newState.routes.filter(
    ({ name }: any) => (!sections.includes(name) && !hideSections.includes(name)),
  );

  const { userMenus } = props;
  const groupedMenus = groupMenuBy(userMenus, 'parentMenuName');
  console.log({ groupedMenus });

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <Bio firstName={props.user?.firstName} lastName={props.user?.lastName} companyName={props.corp?.name} />
      <View style={{ marginTop: 15, flex: 1, justifyContent: 'space-between' }}>
        {/* <View style={{maxHeight: '60%'}}> */}
        <ScrollView style={{ maxHeight: '80%' }}>
          <DrawerItemList {...props} state={newState} />

          {Object.keys(groupedMenus).map((parent, index) => (
            <List.Accordion title={parent}
              // left={props => <List.Icon {...props} icon='folder' />} 
              left={props => <List.Icon {...props} icon={AccountIcon}> </List.Icon>}
               >
              {groupedMenus[parent].map((child: any, i) => (
                <List.Item
                  title={child?.menuName}
                  left={props => <List.Icon {...props} icon={AccountIcon}> </List.Icon>}
                  onPress={() => props.linkTo("/"+(child?.mobileMenuController || child?.menuController))}
                />
              ))}
            </List.Accordion>
          ))}

          <List.Section>
          <List.Item
            title={"Logout"}
            left={props => <List.Icon {...props} icon={AccountIcon}> </List.Icon>}
            onPress={() => nav.navigate("Login")}
          />
           
          </List.Section>
          {/* </View> */}
        </ScrollView>
        <PaperDrawer.Section style={{ backgroundColor: Colors.grey200 }}>
          <Divider
            style={{
              height: 1.5,
              backgroundColor: 'rgba(204, 204, 216, 0.5)',
            }}
          />
          <FlatList
            data={navSections}
            style={{ margin: 20 }}
            ItemSeparatorComponent={() => {
              return <View style={style.separator} />;
            }}
            renderItem={({ item: { label, name } }) => {
              return (
                <List.Item
                  title={label}
                  right={ChevronRightIcon}
                  onPress={() => nav.navigate(name)}
                />
              );
            }}
          />
        </PaperDrawer.Section>
      </View>
    </DrawerContentScrollView>
  );
};

const DrawerFooterScreens = () => {
  return (
    <Stack.Navigator screenOptions={dashboardOptions}>
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={drawerOptions}
      />

      <Stack.Screen name="Profile" component={Profile} />

      <Stack.Screen
        name="Security"
        component={Security}
        options={{ title: 'Login & security' }}
      />

      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{ title: 'Change password' }}
      />
    </Stack.Navigator>
  );
};

export default function AppDrawer() {
  const localStore = userInfoStore(({ userId, corporateId, corporateCode, setDetails }) => ({
    userId, corporateId, corporateCode, set: setDetails,
  }));

  const [user, setUser] = React.useState({});
  const [userCorp, setUserCorp] = React.useState({});
  const [userMenus, setUserMenus] = React.useState([]);

  const linkTo = useLinkTo();

  React.useEffect(() => {
    (async () => {
      console.log('getting basic info');

      // const token = await getToken();
      const loggedUser = await getUserById(localStore.userId as string);
      console.log({ loggedUser });
      setUser(loggedUser);

      const loggedUserCorp = await getCorpById(localStore.corporateId as string);
      console.log({ loggedUserCorp });
      setUserCorp(loggedUserCorp);

      const loggedUserMenus = await getMenusByUserId(localStore.userId as string);
      console.log({ loggedUserMenus });
      setUserMenus(loggedUserMenus as []);

      // setToken(token);
    })();
  }, [localStore.userId]);

  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} user={user} corp={userCorp} userMenus={userMenus} linkTo={linkTo} handlePress={handlePress} />}>
      <Drawer.Screen
        name="Dashboard"
        component={AccountServices}
        options={{ drawerIcon: (props) => <AccountIcon {...props} /> }}
      />

      <Stack.Screen
        name="Transactions"
        component={Transactions}
      // options={drawerOptions}
      />
      <Stack.Screen
        name="Notifications"
        component={Notifications}
      // options={drawerOptions}
      />
      <Stack.Screen
        name="Roles"
        component={Roles}
      />
      <Stack.Screen name="EmployeePayments" component={EmployeePayments} />

      <Drawer.Screen name="Settings" component={DrawerFooterScreens} />
    </Drawer.Navigator>
  );
}

const style = StyleSheet.create({
  separator: {
    height: 7,
  },
});
