import * as React from "react";
import { Text, BottomNavigation, Card, Subheading, Colors, ProgressBar, Title, Divider, TouchableRipple, Paragraph, Portal, Modal, } from "react-native-paper";
import { StyleSheet, View, Image, FlatList, ImageBackground, TouchableOpacity } from "react-native";
import Spacer from "../components/Spacer";
import ScrollableScreen from "../components/ScrollableScreen";
import NavigationService from "../../../shared/utils/NavigationService";

const primary ="#FA4A84";
const backgroundColor ="#1b003b";

const HeaderView = ({title= "SAVINGS ACC ****1234", amount= "N75,539,342", decimal="45", onMenuClick= ()=>{}, onBackClick=()=>{}}: any) => (
  <View style={{ flexDirection: "column", paddingHorizontal: (23), minHeight: (150), paddingTop: (50), backgroundColor: "#1C1335", justifyContent: "space-between" }}>
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
    <TouchableRipple onPress={onBackClick}>
      <Image source={require("../assets/close.png")} resizeMode="cover" style={{ width: (16), height: (16) }} />
    </TouchableRipple>
      <Image source={require("../assets/acc_progress.png")} resizeMode="center" style={{ width: (67), height: (16) }} />
      <TouchableRipple onPress={onMenuClick}>
        <Text style={styles.optionsMenu}>{"Options"}</Text>
      </TouchableRipple>
    </View>
    <View style={{ flexDirection: "column", alignItems:'center', justifyContent: "center" }}>
    <Subheading style={[{color: '#8397AB', fontFamily: 'BRFirma-Medium', fontSize: (11)}]}>
        {title}
      </Subheading>
      <Text style={[styles.headerSubTitle,]}>{amount}<Text style={[styles.headerSubTitle, { fontSize: (18)}]}>.{decimal}</Text></Text>
      </View>
  </View>
);


const Categories = () => (
  <View style={{ flexDirection: 'row',  marginVertical: (0), justifyContent: 'space-around' }}>
    <View style={{alignItems:'center',}}>
      <Image source={require("../assets/acc_transfer.png")} style={styles.categoriesImg} />
      <Text style={styles.categoriesTitle}>Transfer</Text>
    </View>
    <View style={{alignItems:'center',}}>
      <Image source={require("../assets/acc_utilities.png")} style={styles.categoriesImg} />
      <Text style={styles.categoriesTitle}>Utilities</Text>
    </View>
    <View style={{alignItems:'center',}}>
      <Image source={require("../assets/acc_card.png")} style={styles.categoriesImg} />
      <Text style={styles.categoriesTitle}>Card</Text>
    </View>
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
        />
)

const RecentTransactions = () => (
    <Spacer gap={10}>
      <View style={{padding: (10)}} />
        <Paragraph style={styles.transactionSectionTitle}>Today</Paragraph>
        <Transactions data={[
                { title: "Transfer Fee", date: "12:49 AM", amount: "-N145.90", type: "transfer" },
                { title: "Akanni Samuel", date: "12:49 AM", amount: "-N2,000.00" },
                { title: "Shirley Barnes", date: "12:49 AM", amount: "-N345.60" },
            ]} />
        <Paragraph style={styles.transactionSectionTitle}>Yesterday</Paragraph>
        <Transactions data={[
                { title: "Internet & Telephone", date: "12:49 AM", amount: "-N145.90", type: "internet" },
                { title: "Gbadebo Samuel", date: "12:49 AM", amount: "-N2,000.00" },
            ]} />
      </Spacer>
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

type SummaryCard={
    title?: string,
    subtitle?: string,
    amount?: string,
    showExtra?: boolean,
    // type: "in" | "out" | "difference";
    // percent: number;
}
const SummaryCard = ({ title = "Summary", subtitle = "This month", amount="N850,000.00", showExtra = true }: SummaryCard) => (
  <Card style={[styles.card, { padding:0, backgroundColor: "white" }]}>
    <Card.Content>
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
    <Text style={styles.sectionTitle}>{"Summary"}</Text>
      <Subheading style={[styles.sectionRight, { flexDirection: 'row'}]}>
        {subtitle}
        <Image source={require("../assets/down.png")} resizeMode="contain" style={{ width: (16), height: (16) }} />
      </Subheading>
    </View>
      {showExtra ?
        <View>
          <MoneyBar key="in" amount="N450,000.45" type="in" percent={0.5} />
          <MoneyBar key="out" amount="N250,000.45" type="out" percent={0.3} />
          <MoneyBar key="diff" amount="N150,000.45" type="difference" percent={0.2} />
        </View> : null
      }
    </Card.Content>
    <Card.Actions>
    </Card.Actions>
  </Card>
);

const AccountInfo = () => {
   const [showModal, setShowModal] = React.useState(false);
    return (
       <ScrollableScreen style={{
        flex: 1,
        padding: 0,
        backgroundColor: '#F4F8FB',
       }}>
         <HeaderView onMenuClick={()=>setShowModal(true)} onBackClick={()=>NavigationService.pop()}/>
         <View style={styles.container}>
         <Categories />
           <SummaryCard 
                // title="CURRENT ACCOUNT" 
                // subtitle="PROVIDUS BANK - 900004384" 
                // amount="N814,800.45"
                // showExtra={true}
                />
            <RecentTransactions />
            <Portal>
              <Modal dismissable={true} visible={showModal} onDismiss={()=>setShowModal(false)}>
                <View style={{left: 0, right: 0, top:120, position: 'absolute'}}>
                  <View style={styles.card}>
                    <TouchableOpacity style={styles.optionsButton}>
                      <Text style= {styles.optionsButtonSave}>Saving rules</Text>
                    </TouchableOpacity>
                    <Divider/>
                    <TouchableRipple style={styles.optionsButton}>
                      <Text style= {styles.optionsButtonDelete}>Delete Account</Text>
                    </TouchableRipple>
                    <Divider/>
                  </View>
                  <View style={[styles.card, {marginTop: (10)}]}>
                    <TouchableOpacity activeOpacity={0.8} onPress={()=>setShowModal(false)} style={styles.optionsButton}>
                      <Text style= {styles.optionsButtonCancel}>Cancel</Text>
                    </TouchableOpacity>
                    <Divider/>
                  </View>
                </View>
              </Modal>
            </Portal>
            </View>
       </ScrollableScreen>
    );
};

export default AccountInfo;


const styles = StyleSheet.create({
    screen: {
      padding: 0,
      backgroundColor: 'white',
      justifyContent: 'space-between',
    },
    container: {
      paddingVertical: 20,
      // alignItems: 'center',
      paddingHorizontal: 16,
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
      padding: 10,
      borderRadius: 8,
    },
    cardSubTitle: {
      fontSize: 17,
      marginBottom: 10,
      color: Colors.grey200,
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
      fontSize: 13,
      fontFamily: 'BRFirma-SemiBold',
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
        flexDirection:'column',
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

    //Options Modal
    optionsButton: {
      // borderWidth: 1,
      // borderRadius: 5,
      backgroundColor: "rgba(248,248,248,0.8196078431372549)",
      // borderColor: Colors.grey300,
      padding: (10),
      alignItems: 'center',
      justifyContent: 'center',
      height: (57),
    },
    optionsButtonSave: {
      color: "#007AFF",
      fontFamily: 'BRFirma-Medium',
      fontSize: (18),
      textAlign: 'center',
    },
    optionsButtonDelete: {
      color: "#FF3B30",
      fontFamily: 'BRFirma-Medium',
      fontSize: (16),
      textAlign: 'center',
    },
    optionsButtonCancel: {
      color: "#007AFF",
      fontFamily: 'BRFirma-SemiBold',
      fontSize: (16),
      textAlign: 'center',
    },

    categoriesImg: {
      width: (44),
      padding: (0),
      height: (44),
    },
    categoriesTitle: {
      padding: (10),
      fontFamily: 'BRFirma-Medium',
      fontSize: (13),
      color: primary,
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
  