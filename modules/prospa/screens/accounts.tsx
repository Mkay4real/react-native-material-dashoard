import * as React from "react";
import { Text, BottomNavigation, Card, Subheading, Colors, ProgressBar, Title, Divider, Caption, } from "react-native-paper";
import { StyleSheet, View, Image, FlatList, ImageBackground } from "react-native";
import NavigationService from "../../../shared/utils/NavigationService";
import ScrollableScreen from "../components/ScrollableScreen";
import { TouchableOpacity } from "react-native-gesture-handler";
import Spacer from "../components/Spacer";

const AccountsRoute = () => <Text>Accounts</Text>;
const TransferRoute = () => <Text>Transfer</Text>;
const InvoiceRoute = () => <Text>Invoice</Text>;
const MoreRoute = () => <Text>More</Text>;

const primary ="#FA4A84";
const backgroundColor ="#1b003b";

const HelloView = () => (
    <View style={{flexDirection:"row",  alignItems: 'baseline', marginTop: (25), justifyContent:"space-between"}}>
        <Title style={styles.welcome}>{"Hello, Kathy! "}</Title>
        <Image source={require("../assets/avatar.png")} style={{width: (41), height: (41)}} />
    </View>
)


type TransactionItem = {
  title: string;
  amount: string;
  date: string;
  type?: "transfer"| "internet" | "general";
};

const transactionIcons = {
"transfer": require("../assets/tx_transfer.png"),
"internet": require("../assets/tx_internet.png"),
"general": require("../assets/tx_home.png"),
}

const TransactionItem = ({ title= "Transfer Fee", type="general", amount= "-N234", date="12:49 AM"}: TransactionItem) => (
  <View style={{flexDirection: 'row', alignItems: 'center', paddingVertical: (5)}}>
      <Image source={transactionIcons[type] || require("../assets/tx_home.png")} style={{width: (40), height:(40), marginRight: (20)}} />
      <View>
          <Title style={styles.transactionTitle}>{title}</Title>
          <Subheading style={styles.transactionSubTitle}>{date} </Subheading>
      </View>
      <Text style={[styles.balance, styles.transactionAmount, {marginLeft: "auto"}]}>{amount}</Text>
  </View>
);

const Transactions = ({data }: any)=>(
    <FlatList
          data={data}
          ItemSeparatorComponent={Divider}
          renderItem={({item: { title, ...props}}) => {
            return (
              <TransactionItem title={title} {...props} />
            );
          }}
        //   renderItem={({item: {type, title, description}}) => {
        //     return (
        //       <View style={{padding: 10}}>
        //         <Title>{title}</Title>
        //         <HStack alignItems="center" justifyContent="space-between">
        //           <Subheading style={{color: Colors.grey600}}>
        //             {description}
        //           </Subheading>
        //           <Subheading style={{color: Colors.grey600}}>
        //             {type}
        //           </Subheading>
        //         </HStack>
        //       </View>
        //     );
        //   }}
        />
)

const Promo = ()=>(
    <ImageBackground source={require("../assets/promo1.png")} style={{width: (166), height: (141)}} />
)
const ItemSeperator = () => <View style={{width: (10)}} />;
const PromoItems = ({data }: any)=>(
    <FlatList
          data={data}
          horizontal={true}
          ItemSeparatorComponent={ItemSeperator}
          renderItem={({item: { title, ...props}}) => {
            return (
              <Promo title={title} {...props} />
            );
          }}
        //   renderItem={({item: {type, title, description}}) => {
        //     return (
        //       <View style={{padding: 10}}>
        //         <Title>{title}</Title>
        //         <HStack alignItems="center" justifyContent="space-between">
        //           <Subheading style={{color: Colors.grey600}}>
        //             {description}
        //           </Subheading>
        //           <Subheading style={{color: Colors.grey600}}>
        //             {type}
        //           </Subheading>
        //         </HStack>
        //       </View>
        //     );
        //   }}
        />
)

const RecentTransactions = () => (
    <Card style={[styles.card, { backgroundColor: "white" }]} onPress={()=>NavigationService.navigate("AccountInfo")}>
        {/* <Card.Title
            title={"Recent transactions"}
            titleStyle={styles.sectionTitle}
        /> */}
        <Card.Content>
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingBottom: (10), justifyContent: 'space-between' }}>
    
    <Text style={styles.sectionTitle}>{"Recent transactions"}</Text>
    <Image source={require("../assets/right.png")} resizeMode="contain" style={{ width: (8), height: (12) }} />
   
    </View>

            <Transactions data={[
                { title: "Transfer Fee", date: "12:49 AM", amount: "-N345.60" },
                { title: "Adam Chapman", date: "12:49 AM", amount: "-N345.60" },
                { title: "Shirley Barnes", date: "12:49 AM", amount: "-N345.60" },
            ]} />
        </Card.Content>

    </Card>
);

type MoneyBar={
  amount: string,
  type: "in" | "out" | "difference";
  percent: number;
}
const MoneyBar = ({ amount, type= "in", percent = 2 }: MoneyBar) => {
  const colors = {
      "in": "#4CD964",
      "out": "#FA4A84",
      "difference": "#FCBA06",
  }
  const titles = {
      "in": "Money in",
      "out": "Money out",
      "difference": "Difference",
  }
  return (
      <View style={styles.moneyBar}>
          <View style={styles.moneyBarHeader}>
              <Text style={styles.moneyBarTitle}>{titles[type]}</Text>
              <Text style={[styles.moneyBarAmount, {color: colors[type]}]}>{amount}</Text>
          </View>
          <ProgressBar style={{marginVertical: (5)}} progress={percent} color={colors[type]} />
      </View>

  )
};


type AccountCard={
    title: string,
    subtitle: string,
    amount: string,
    decimal: string,
    showExtra: boolean,
    // type: "in" | "out" | "difference";
    // percent: number;
}
const AccountCard = ({ title, subtitle, amount, decimal, showExtra= false}: AccountCard) => (
    <Card style={[styles.card, {padding: 0,}]}>
    {/* <Card.Title
      title={title}
      titleStyle={{color: Colors.black}}
    /> */}
    <Card.Content>
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
    <View>
    <Text style={styles.sectionTitle}>{title}</Text>
      <Caption style={styles.cardSubTitle}>
        {subtitle}
      </Caption>
    </View>
    <TouchableOpacity onPress={()=>NavigationService.navigate("AccountInfo")}>
     {showExtra?
     <Image source={require("../assets/overflow.png")} resizeMode="contain" style={{ width: (16), height: (16) }} />:
     <Image source={require("../assets/card.png")} resizeMode="contain" style={{ width: (41), height: (41) }} />
    }
    </TouchableOpacity>
    </View>

    {/* <Text style={styles.sectionTitle}>{title}</Text>
      <Caption style={styles.cardSubTitle}>
        {subtitle}
      </Caption> */}
      <Text style={styles.balance}>{amount}<Text style={[styles.balance, { fontSize: (24)}]}>.{decimal}</Text> </Text>
      {showExtra ? 
      <View>
          <MoneyBar amount="N450,000.45" type="in" percent={1} />
          <MoneyBar amount="N250,000.45" type="out" percent={0.7} />
          <MoneyBar amount="N150,000.45" type="difference" percent={0.3} />
      </View>: null
      }

    </Card.Content>
    <Card.Actions>
    </Card.Actions>
  </Card>
);

const CreateSubAccount = () => (
    <TouchableOpacity
        // elevation={2}
        // onPress={onPress}
        style={[styles.card, { padding:0, }]}>
        <ImageBackground
            source={require("../assets/gradient.png")} resizeMode="stretch"
            style={{ position:'relative', flexDirection: "row", minHeight :(70),  backgroundColor: 'transparent' , paddingHorizontal: (20), margin: -5, alignItems:'center', justifyContent: "space-between" }}
        >
            <Text style={{maxWidth: '75%', color: Colors.white, fontSize: (16)}}>{"Create multiple sub-accounts and manage your money with ease!"}</Text>
            <Image source={require("../assets/add.png")} resizeMode="cover" style={{ width: (36), height: (36) }} />
        </ImageBackground>
    </TouchableOpacity>
)

const Accounts = () => {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'accounts', title: 'Accounts', icon: 'queue-music' },
        { key: 'transfer', title: 'Transfer', icon: 'queue-music' },
        { key: 'invoice', title: 'Invoice', icon: 'queue-music' },
        { key: 'more', title: 'More', icon: 'queue-music' },
    ])

    return (
       <ScrollableScreen style={styles.screen}>
            <View style={{position:"absolute", top:0, left:0, right:0, minHeight: (200), backgroundColor: backgroundColor}} />
         <Spacer gap={20}>
         <HelloView />
           <AccountCard 
                title="CURRENT ACCOUNT" 
                subtitle="PROVIDUS BANK - 900004384" 
                amount="N814,800"
                decimal="45"
                showExtra={true}
                />
           <AccountCard
                title="SAVINGS ACCOUNT" 
                subtitle="SUB BANK - 123400077" 
                amount="N39,342"
                decimal="45"
                showExtra={false}
                />
            <CreateSubAccount />
            <RecentTransactions />
            <View style={{padding: (5)}} />
            <PromoItems data={[
                { title: "Transfer Fee", date: "12:49 AM", amount: "-N345.60" },
                { title: "Adam Chapman", date: "12:49 AM", amount: "-N345.60" },
                // { title: "Shirley Barnes", date: "12:49 AM", amount: "-N345.60" },
            ]}  />
            </Spacer>
       </ScrollableScreen>
    );
};

export default Accounts;


const styles = StyleSheet.create({
  screen: {
    // padding: 0,
    backgroundColor: '#F4F8FB',
    // justifyContent: 'space-between',
  },
  welcome: {
    color: 'white',
    fontSize: (28),
    fontFamily: 'BRFirma-Bold',
  },
  icon: {
    borderRadius: 100,
  },
  btn: {
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#F5F6F7',
    borderColor: Colors.grey300,
  },
  btnContainer: {
    paddingVertical: 15,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  card: {
    padding: 5,
    borderRadius: 8,
    marginTop: (25),
  },


  cardSubTitle: {
    // marginBottom: 10,
    color: '#8397AB',
    fontFamily: 'BRFirma-Medium',
    fontSize: (11),
  },
  //
  optionsMenu: {
    fontSize: (12),
    fontFamily: 'BRFirma-Medium',
    color: '#FA4A84',
  },
  headerSubTitle: {
    fontSize: (28),
    fontFamily: 'BRFirma-SemiBold',
    marginBottom: 10,
    color: '#FFF',
  },
  balance: {
    color: '#1C1335', 
    fontSize: (32),
    textAlign: 'left',
    fontFamily: 'BRFirma-Medium',
  },

  //Custom Card sectiions
  sectionTitle: {
    color: '#1C1335',
    fontSize: 13,
    fontFamily: 'BRFirma-SemiBold',
  },
  sectionRight: {
    color: '#8397AB',
    fontSize: 12,
    textAlign: 'right',
    fontFamily: 'BRFirma-Medium',
  },


  //Money Bar
  moneyBar: {
    flexDirection: 'column',
  },
  moneyBarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: (23),
  },
  moneyBarTitle: {
    color: '#1C1335',
    fontSize: 13,
    textAlign: 'left',
    fontFamily: 'BRFirma-Medium',
  },
  moneyBarAmount: {
    color: '#1C1335',
    fontSize: 13,
    textAlign: 'right',
    fontFamily: 'BRFirma-SemiBold',
  },

  //Transactions
  transactionSectionTitle: {
    fontFamily: 'BRFirma-Medium',
    fontSize: (13),
    color: '#1C1335',
    textAlign: 'left',
  },
  transactionTitle: {
    // padding: (10),
    fontFamily: 'BRFirma-SemiBold',
    textAlign: 'left',
    fontSize: (14),
    color: '#1C1335',
  },
  transactionSubTitle: {
    fontFamily: 'BRFirma-Medium',
    textAlign: 'left',
    fontSize: (11),
    color: '#8397AB',
  },
  transactionAmount: {
    fontFamily: 'BRFirma-Medium',
    fontSize: (14),
    color: '#1C1335',
    textAlign: 'right',
  },
});
