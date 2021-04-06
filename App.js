import React,{useEffect,useState,useMemo, useReducer} from 'react';
import { View, Text ,StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import { AntDesign } from '@expo/vector-icons';
import LoginScreen from './screens/LoginScreen';
import OtpScreen from './screens/OtpScreen';
import ProfileScreen from './screens/ProfileScreen';
import HomeScreen from './screens/HomeScreen';
import ReferalScreen from './screens/ReferalScreen';
import DrawerScreen from './screens/DrawerScreen'
import NotificationScreen from './screens/NotificationScreen';
import MyProfileScreeen from './screens/MyProfileScreen';
import NewsScreen from './screens/NewsScreen';
import BookingVideoCallScreen from './screens/BookingVideoCallScreen';
import AboutusScreen from './screens/AboutusScreen';
import Contactus from './screens/Contactus';
import PrivicyPolicy from './screens/PrivicyPolicy';
import UpcomingCall from './screens/UpcomingCall';
import { Icon } from 'react-native-elements'
import { MaterialCommunityIcons,FontAwesome5,Feather } from '@expo/vector-icons';
import {useFonts} from 'expo-font';
import { TouchableOpacity } from 'react-native';
import TermsConditions from './screens/TermsConditions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native';
import {AuthContext} from './components/Context'
import instance from './src/api/Gng';
import NewsWebView from './screens/NewsWebView';
import { set } from 'react-native-reanimated';
import ProfileScreen2 from './screens/ProfileScreen2';
import PickerView from './screens/PickerView';
import PickerView2 from './screens/PickerView2';
import Pratice from './screens/Pratice';
import BookAppoinment from './screens/BookAppoinment';
import BookingHistory from './screens/BookingHistory';
import SampleScreen from './screens/SampleScreen';







const MainStack = createStackNavigator();
const HomeStack =createStackNavigator();
const DrwaweStack=createDrawerNavigator();
const RootStack = createStackNavigator();
const TopTabStack=createMaterialTopTabNavigator();
const TabStack=createStackNavigator();
const NewsStack = createStackNavigator();
const PickerStack = createStackNavigator();



const MainStackScreens=()=>{
  return(
  <MainStack.Navigator initialRouteName='Login'>
    <MainStack.Screen name='Login' component={LoginScreen} options={{headerShown:false}} />
    <MainStack.Screen name="Otp" component={OtpScreen} options={{headerShown:false}}/>
    <MainStack.Screen name="Profile" component={ProfileScreen} options={{headerShown:false}}/>
    <MainStack.Screen name='PickerView' component={PickerView} options={{headerShown:false}} />
    <MainStack.Screen name='PickerView2' component={PickerView2} options={{headerShown:false}} />
    <MainStack.Screen name="Terms" component={TermsConditions}  options={{headerShown:false}}/>
    <MainStack.Screen name="Profile2" component={ProfileScreen2} options={{headerShown:false}}/>
  </MainStack.Navigator>

  )
  }   

  


  const MaterialTopTabScreen=({navigation})=>{
  
    return(
      <>
      <View style={styles.headerContainer}>
                   <AntDesign name="arrowleft" size={26} color="white" onPress={()=>navigation.goBack()}/>
                   <Text style={styles.headingText}>Book Video Call</Text>
              </View>

    <TopTabStack.Navigator initialRouteName='Book' sceneContainerStyle={{backgroundColor:'white'}} tabBarOptions={{ showIcon:true,activeTintColor:'#A8062A',inactiveTintColor:'gray',indicatorStyle:{backgroundColor:'#A8062A',borderWidth:2,borderRadius:10,borderColor:'#A8062A',width:'45%',marginLeft:'2.5%'},labelStyle:{fontFamily:'monospace',fontSize:14,fontWeight:'900'}}}> 
      <TopTabStack.Screen  name='Book' component={BookingVideoCallScreen}  options={{tabBarLabel:'Book Video call',
      }}/>
      <TopTabStack.Screen name='upcoming' options={{tabBarLabel:'upcoming'}} component={UpcomingCall}/>
   </TopTabStack.Navigator>
   </>
    )
 
  }

  const TabStackScreen=({navigation})=>{
    return(
      <TabStack.Navigator initialRouteName='Tab'  >
       
        <TopTabStack.Screen name='Tab' component={MaterialTopTabScreen} options={{headerShown:false}}/>
      </TabStack.Navigator>
    )
  }



  const HomeStackScreen=()=>{
    return(
      <HomeStack.Navigator>
        <HomeStack.Screen name="Home" component={HomeScreen} options={{headerShown:false}}/>
        <HomeStack.Screen name="HomeProfile" component={MyProfileScreeen} options={{headerShown:false}}/>
        <HomeStack.Screen name="Notification" component={NotificationScreen} options={{headerShown:false}}/>
        <HomeStack.Screen name="Referal" component={ReferalScreen} options={{headerShown:false}}/>
         <HomeStack.Screen name="Booking" component={BookAppoinment} options={{headerShown:false}}/>
         <HomeStack.Screen name="History" component={BookingHistory} options={{headerShown:false}}/>
         <HomeStack.Screen name="sample" component={SampleScreen} options={{headerShown:false}}/>
      </HomeStack.Navigator>
    )
  }


  const NewsStackScreen=()=>{
    return(
    <MainStack.Navigator initialRouteName='NewsList'>
      <MainStack.Screen name='NewsList' component={NewsScreen} options={{headerShown:false}} />
      <MainStack.Screen name="NewsView" component={NewsWebView} options={{headerShown:false}}/>
    </MainStack.Navigator>
  
    )
    } 

  const ProfileStackScreen=()=>{
      return(
      <MainStack.Navigator >
        <MainStack.Screen name='Picker1' component={MyProfileScreeen} options={{headerShown:false}} />
        <MainStack.Screen name='PickerView' component={PickerView} options={{headerShown:false}} />
        <MainStack.Screen name="PickerView2" component={PickerView2} options={{headerShown:false}}/>
      </MainStack.Navigator>
    
      )
      } 
  

const DrawerStackScreen=()=>{
  
  return(
    <DrwaweStack.Navigator  drawerContent={props=><DrawerScreen {...props}/> }>
      <DrwaweStack.Screen name="HomeSt"   component={HomeStackScreen} />
      <DrwaweStack.Screen name="MyProfile" component={ProfileStackScreen} />
      <DrwaweStack.Screen name="News"   component={NewsStackScreen} />
      <DrwaweStack.Screen name="BookVideo" component={BookAppoinment} />
      <DrwaweStack.Screen name="AboutUs"   component={AboutusScreen} />
      <DrwaweStack.Screen name="ContactUs" component={Contactus} />
      <DrwaweStack.Screen name="Policy"   component={PrivicyPolicy} />
     
    </DrwaweStack.Navigator>
  )
}


const RootStackScreens=()=>{
  
  
    return(
      <RootStack.Navigator initialRouteName='main' >
      <RootStack.Screen name='main' component={MainStackScreens} options={{headerShown:false}}/>
      <RootStack.Screen name='Drawer' component={DrawerStackScreen} options={{headerShown:false}}/>
    </RootStack.Navigator>
    )
 
}



function App() {
  


 
 const [isLoading, setIsLoading] = useState(true);
 const [userToken, setUserToken] = useState(null); 
 



 AsyncStorage.getItem('cid').then(value=>{
  setUserToken(value) //we need to change this into value
})


 const authContext = useMemo(() => ({
    signIn: (number) => {
 
    AsyncStorage.getItem('cid').then(value=>{
      setUserToken(value)
    })

    
  instance.get(`/CustomerPhone/${number}`).then(value=>{
    const jsonValue= JSON.stringify({
      name:value.data.fname,
      email:value.data.email,
      image:value.data.image
   })
   console.log('js',jsonValue)
   AsyncStorage.setItem('userdata', jsonValue)
  })
    
   
 
 
},

  signOut: () => {
    AsyncStorage.clear()
     setUserToken(null);
    
   
  },
 
 
}),[]);

 useEffect(() => {
  
  setTimeout(() => {
     setIsLoading(false);
     
    
  }, 1000);
}, []);

if(isLoading){
  return(
    <View style={{flex:1,justifyContent:'center',alignContent:'center'}}>
         <ActivityIndicator size='small' color="gray" />
    </View>
     

  )
}

 
 return(
   <AuthContext.Provider value={authContext}>
  <NavigationContainer>
    {userToken !==null?<DrawerStackScreen/>:<MainStackScreens/>}
  </NavigationContainer>
  </AuthContext.Provider>
 )

}
export default App;

const styles = StyleSheet.create({
  headerContainer:{
      padding:'3%',
      flexDirection:'row',
      backgroundColor:'#A8062A'
      
  },
  headingText:{
      alignSelf:'center',
      fontSize:20,
      fontFamily:"Gotham",
      marginLeft:'5%',
      color:'white'
  }
})