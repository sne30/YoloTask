import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
  Image,
  ImageBackground,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {faker} from '@faker-js/faker';
import {SafeAreaView} from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();

const YoloPayScreen = () => {
  const [isFrozen, setIsFrozen] = useState(false);
  const [paymentTabSelected, setpaymentTabSelected] = useState<number | null>(
    null,
  );
  const [animation] = useState(new Animated.Value(0));
  const paymentTabs = ['pay', 'card'];
  const cardDetails = {
    number: faker.finance.creditCardNumber(),
    expiry: faker.date.future().toISOString().slice(0, 7),
    cvv: faker.finance.creditCardCVV(),
  };

  const toggleFreeze = () => {
    Animated.timing(animation, {
      toValue: isFrozen ? 0 : 1,
      duration: 500,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
    setIsFrozen(!isFrozen);
  };

  const opacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.4],
  });

  const blurEffect = isFrozen ? '**** **** **** ****' : cardDetails.number;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>select payment mode</Text>
      <Text
        style={[
          styles.headerTitle,
          {fontSize: 16, marginTop: '5%', color: '#AEAEAE'},
        ]}>
        choose your preferred payment method to make payment.
      </Text>

      <View style={styles.payTabsView}>
        {paymentTabs.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.tabsButton,
                {borderColor: paymentTabSelected === index ? 'red' : '#fff'},
              ]}
              onPress={() => {
                setpaymentTabSelected(index);
              }}>
              <Text style={styles.tabsText}>{item}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <Text
        style={[
          styles.headerTitle,
          {fontSize: 15, marginTop: '12%', color: '#696969'},
        ]}>
        YOUR DIGITAL DEBIT CARD
      </Text>
      <View style={styles.cardContainer}>
        <Animated.View
          style={[
            styles.card,
            {
              // opacity,
              backgroundColor: isFrozen ? '#555' : '#000',
            },
          ]}>
          {isFrozen ? (
            <ImageBackground
              style={styles.imageBackground}
              source={require('./assets/cardBackground.png')}></ImageBackground>
          ) : (
            <View style={styles.overlayContent}>
              <View
                style={{
                  flexDirection: 'row',
                  height: '10%',
                  width: '100%',
                  margin: '6%',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Image
                  style={{
                    height: '50%',
                    width: '25%',
                    marginLeft: '6%',
                  }}
                  source={require('./assets/yoloLogo.png')}></Image>
                <Image
                  style={{
                    height: '50%',
                    width: '25%',
                    marginRight: '6%',
                  }}
                  source={require('./assets/yesBankLogo.png')}></Image>
              </View>
              <View
                style={{
                  height: '50%',
                  width: '100%',
                  flexDirection: 'row',
                  alignItems: 'center'
                }}>
                <View style ={{width: '50%', justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={[styles.cardText, {width: '50%', fontWeight: '800'}]}>
                    1234 5678 9012 3456
                  </Text>
                </View>
                <View style ={{width: '50%',justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={[styles.cardText, {width: '50%'}]}>Expiry {cardDetails.expiry}</Text>
                  <Text style={[styles.cardText, {width: '50%'}]}>cvv {cardDetails.cvv}</Text>
                </View>
              </View>
              <View style ={{height: '30%',  width: '100%', justifyContent: 'space-between'}}>
                <View style ={{flexDirection: 'row', gap: '3%'}}>
                  <Feather
                    marginLeft = {'3%'}
                    name={'copy'}
                    size={25}
                    color="red"
                  />
                  <Text style={[styles.cardText, {color: 'red', fontWeight: '500'}]}>
                    copy details
                  </Text>
                </View>
                <Image
                  style={{
                    position: 'absolute', 
                    right: '3%',
                    bottom: '3%',
                    height: '50%',
                    width: '45%',
                  }}
                  source={require('./assets/rupayLogo.png')}></Image>
              </View>
            </View>
          )}
        </Animated.View>
        <TouchableOpacity style={styles.freezeButton} onPress={toggleFreeze}>
          <Icon
            name={'snow-outline' }
            size={25}
            color={isFrozen ? "red" : "#fff"}
          />
          <Text style={[styles.freezeText, {color: isFrozen ? 'red' : '#fff' }]}>
            {isFrozen ? 'Unfreeze' : 'Freeze'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const HomeScreen = () => (
  <SafeAreaView style={styles.container}>
    <Text style={styles.title}>Home Screen</Text>
  </SafeAreaView>
);

const GinieScreen = () => (
  <SafeAreaView style={styles.container}>
    <Text style={styles.title}>Ginie Screen</Text>
  </SafeAreaView>
);

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: styles.tabBar,
          tabBarActiveTintColor: '#fff',
          tabBarInactiveTintColor: '#888',
        }}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon name="home-outline" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Yolo Pay"
          component={YoloPayScreen}
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon name="qr-code-sharp" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Ginie"
          component={GinieScreen}
          options={{
            tabBarIcon: ({color, size}) => (
              <Feather name="divide-circle" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  imageBackground: {
    flex: 1,
    height: '100%',
    width: '100%',
    borderRadius: 30,
    overflow: 'hidden',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  overlayContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  headerTitle: {
    marginLeft: '3%',
    alignSelf: 'flex-start',
    color: 'white',
    fontSize: 25,
  },
  title: {
    color: 'white',
    fontSize: 20,
    marginBottom: 20,
  },
  payTabsView: {
    flexDirection: 'row',
    marginTop: '5%',
    height: '7%',
    width: '100%',
    gap: '2%',
    paddingLeft: '3%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  tabsButton: {
    height: '100%',
    width: '28%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderRadius: 30,
  },
  tabsText: {
    fontSize: 20,
    color: '#fff',
  },
  cardContainer: {
    height: '45%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
    marginTop: '5%',
    alignItems: 'center',
  },
  card: {
    width: '55%',
    height: '100%',
    marginLeft: '3%',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden', 

  },
  cardText: {
    color: 'white',
    fontSize: 16,
    marginVertical: 5,
  },
  freezeButton: {
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
  },
  freezeText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
    marginTop: '30%',
  },
  tabBar: {
    backgroundColor: '#000',
    borderTopWidth: 0,
  },
});
