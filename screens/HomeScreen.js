import React,{useEffect,useState,useRef} from 'react'
import {BackHandler, StyleSheet, Text, View,StatusBar,SafeAreaView, TouchableOpacity,ActivityIndicator,Alert,Platform,Image} from 'react-native'
import { EvilIcons,Ionicons ,AntDesign,MaterialCommunityIcons,MaterialIcons,FontAwesome5} from '@expo/vector-icons'; 
import {useFonts} from 'expo-font';
import {Overlay ,Button} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';



const HomeScreen = ({navigation}) => {
    
    const [localnumber,setlocalnumber]=useState('')
    const [localcid,setlocalcid]=useState('')
    const [state, setstate] = useState('')
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();


    async function registerForPushNotificationsAsync() {
        let token;
        if (Constants.isDevice) {
          const { status: existingStatus } = await Notifications.getPermissionsAsync();
          let finalStatus = existingStatus;
          if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
          }
          if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
          }
          
          token = (await Notifications.getDevicePushTokenAsync()).data;
          console.log("----");
          console.log(token);
          console.log("----");
        } else {
          alert('Must use physical device for Push Notifications');
        }
      
        if (Platform.OS === 'android') {
          Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
          });
        }
      
        return token;
      }

      useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
          setNotification(notification);
        });
    
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
          console.log(response);
        });
    
        return () => {
          Notifications.removeNotificationSubscription(notificationListener);
          Notifications.removeNotificationSubscription(responseListener);
        };
      }, [])
   
 useEffect(() => {

        const unsubscribe = navigation.addListener('focus', async() => {
        console.log('data load')
            try{
                const num = await AsyncStorage.getItem('number')
                const cid=await AsyncStorage.getItem('cid')
                setlocalnumber(num)
                setlocalcid(cid)
                
            }catch(err){
                console.log(err)
            }
           
               
        });
        
        return ()=>{
            unsubscribe
            
        };
      }, [navigation]);

   

    const [loaded] = useFonts({
        RobotoSlab: require('../assets/fonts/RobotoSlab-Regular.ttf'),
        RobotoMono:require('../assets/fonts/RobotoMono-Bold.ttf'),
        RobotoSlabBold:require('../assets/fonts/RobotoSlab-Bold.ttf'),
        Gotham:require('../assets/fonts/GothamMedium.ttf'),
        GothamBold:require('../assets/fonts/GothamBold.ttf'),
        
      });

      if (!loaded) {
        return null;
      }


    return (
        <SafeAreaView style={styles.mainContainer}>
            <StatusBar barStyle='dark-content' backgroundColor='white'/>
      

            <View style={styles.headerContainer}>
                <EvilIcons name="navicon" size={33} color="black" onPress={()=>navigation.openDrawer()}/>
                <Text style={{color:'#A8062A',fontSize:22,fontFamily:'RobotoSlabBold'}}>Home</Text>
                <Ionicons name="notifications" size={24} color="black" />
              </View>

          

        <View style={{flexDirection:'column',marginTop:'10%'}}> 
      

          <View style={{marginHorizontal:'3%',flexDirection:'row',height:'48%'}} >
             <View style={{flexDirection:'column',flex:3,marginRight:'3%'}}>

               <TouchableOpacity onPress={()=>navigation.navigate('Booking')} style={{height:'55%',borderRadius:3,backgroundColor:'#be4a93',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                 <AntDesign name="carryout" size={55} color="white" style={{alignSelf:'center'}}/>
                 <Text style={{color:'white',fontFamily:'Gotham',fontSize:16,alignSelf:'center',marginTop:'8%'}}>Shop Over Video Call</Text>
               </TouchableOpacity>

               <TouchableOpacity onPress={()=>navigation.navigate('History')} style={{height:'41%',marginTop:'6%',borderRadius:3,backgroundColor:'#b6bc50',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                 <MaterialCommunityIcons name="view-list" size={55} color="white" style={{alignSelf:'center',marginRight:'8%'}}/>
                 <Text style={{color:'white',fontFamily:'Gotham',fontSize:17,alignSelf:'center',width:'50%',lineHeight:20}}>My Bookings</Text>
               </TouchableOpacity>

               
            </View> 
            
            <View style={{flex:2}}>
              <TouchableOpacity onPress={()=>navigation.navigate('MyProfile')} style={{height:'100%',borderRadius:3,backgroundColor:'#d8555b',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
              <MaterialIcons name="account-circle" size={80} color="white" />
                 <Text style={{color:'white',fontFamily:'Gotham',fontSize:18,alignSelf:'center',marginTop:'10%'}}>My Profile</Text>
              </TouchableOpacity>  

            </View>
            </View>
              

          <View style={{marginTop:'3%',marginHorizontal:'3%',flexDirection:'row',height:'45%'}} >
             <View style={{flexDirection:'column',flex:2,}}>

               <TouchableOpacity onPress={()=>navigation.navigate('Notification')} style={{height:'48%',borderRadius:3,backgroundColor:'#2294db',flexDirection:'column',alignItems:'center',justifyContent:'center',}}>
               <Ionicons name="md-notifications" size={45} color="white" style={{alignSelf:'center'}}/>
                 <Text style={{color:'white',fontFamily:'Gotham',fontSize:18,alignSelf:'center',marginTop:'5%'}}>Notification</Text>
               </TouchableOpacity>

               <TouchableOpacity onPress={()=>navigation.navigate('Referal')} style={{height:'48%',borderRadius:3,backgroundColor:'#4abc3d',flexDirection:'column',alignItems:'center',justifyContent:'center',marginTop:'3%'}}>
               <FontAwesome5 name="share" size={45} color="white" style={{alignSelf:'center'}} />
                 <Text style={{color:'white',fontFamily:'Gotham',fontSize:16,alignSelf:'center',marginTop:'5%'}}>Share The App</Text>
               </TouchableOpacity>

             </View> 
         </View>
        </View>
        </SafeAreaView>
       
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    mainContainer:{
        backgroundColor:'white',
        flex:1
    },
    headerContainer:{
        paddingHorizontal:'3%',
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:'2%',
        alignItems:'center',
        
    },
    bodyContainer:{
        
    },
    firstContainer:{
        
        
        
        

    },
    button:{
        borderWidth:1.3,
        width:'65%',
        height:38,
        borderRadius:5,
        borderColor:'#BD0505',
        marginVertical:'3%'
    },
    buttonText:{
        textAlign:'center',
        height:35,
        textAlignVertical:'center',
        fontSize:18,
        fontFamily:'RobotoSlab',
        fontWeight:'900',
        color:'#BD0505'
    },
    button1:{
        borderWidth:1.3,
        width:'65%',
        height:45,
        borderRadius:5,
        borderColor:'#BD0505',
        marginTop:'35%',
        backgroundColor:'#A8062A',
        
    },
    buttonText1:{
        textAlign:'center',
        height:43,
        textAlignVertical:'center',
        fontSize:18,
        fontFamily:'RobotoSlab',
        color:'white'
    }
})
