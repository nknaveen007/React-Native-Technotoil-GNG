import React,{useState,useEffect, useContext} from 'react'
import {Image,  StyleSheet, View,SafeAreaView, TouchableOpacity,Alert,StatusBar ,ActivityIndicator} from 'react-native'
import { DrawerItem, DrawerContentScrollView, DrawerItemList} from '@react-navigation/drawer';
import {useTheme,Avatar, Title,Caption,Paragraph,Drawer,Text,TouchableRipple,Switch} from 'react-native-paper';
import { MaterialCommunityIcons,FontAwesome5,Feather } from '@expo/vector-icons';
import {useFonts} from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import { Icon ,Button,Overlay} from 'react-native-elements'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../components/Context';
import instance from '../src/api/Gng';
import * as WebBrowser from 'expo-web-browser';



const DrawerScreen = ({...props}) => {

  const {signOut}=useContext(AuthContext)
  const [userlist, setuserlist] = useState({})
  const [countryName, setcountryName] = useState('')
  const [stateName, setstateName] = useState('')
  const[count,setCount]=useState(0)
  const [fname, setfname] = useState('')
  const [lname, setlname] = useState('')
  const [phone, setphone] = useState('')
  
  

  const [loader,setloader]=useState(false) //loader
  const [visible, setVisible] = useState(false);  //overly
  const[userdata,setuserdata]=useState({})
  const [load,setload]=useState(true)

 
  useEffect(() => {
    (async()=>{
      try{
        setloader(true)
        setVisible(true)
        const cid1 = await AsyncStorage.getItem('cid')
        const result1=await instance.get(`/customer/${cid1}`)
        setfname(result1.data.fname)
        setlname(result1.data.lname)
        setphone(result1.data.contact)

        const jsonValue1 = await AsyncStorage.getItem('userdata')
          const parseData1=JSON.parse(jsonValue1)
          console.log('user',parseData1)
          setuserdata(parseData1)
  
          setloader(false)
          setVisible(false)
     }catch(err){
           console.log(err) 
      }
    })()
   
    
  }, [])
    

   
  
  const [loaded] = useFonts({
        RobotoSlab: require('../assets/fonts/RobotoSlab-Regular.ttf'),
        RobotoMono:require('../assets/fonts/RobotoMono-Bold.ttf'),
        ReemKufi:require('../assets/fonts/ReemKufi.ttf'),
        rose:require('../assets/fonts/RedRose-Regular.ttf'),
        Gotham:require('../assets/fonts/GothamMedium.ttf'),
    GothamBold:require('../assets/fonts/GothamBold.ttf'),


      });

if (!loaded) {
        
        return null;
      }

    const createTwoButtonAlert = () =>
    Alert.alert(
      "Logout",
      "Logout of GNG ?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => {signOut()}}
      ],
      { cancelable: false }
    );
      

    return (
      <DrawerContentScrollView {...props}  style={{backgroundColor:'#A8062A'}}>
           
           
      <StatusBar barStyle='dark-content' backgroundColor='white' />
      
      <SafeAreaView style={styles.drawerContent}>
        <View>
{loader?<Overlay isVisible={visible}  style={{flex:1,justifyContent:'center',alignItems:'center'}}>
               <ActivityIndicator size="large" color="gray" />
</Overlay>:null}
       
<View style={styles.userInfoSection}>
 {userdata?<Avatar.Image
   source={{
     uri:userdata.image
   }}
   size={60}
   style={{marginLeft:'8%'}}
 />:<Avatar.Image
 source={require('../assets/camera.jpg')}
 size={60}
 style={{marginLeft:'8%'}}
/>}
 
 <View style={styles.nameContainer}>
    <Title style={styles.title}>{fname} {lname}</Title>
    <Title style={styles.subtitle}>{phone}</Title>
 </View>
</View>

<View style={{borderWidth:0.3,borderColor:'#BBB9B9',width:'95%',alignSelf:'center'}}></View>

<Drawer.Section style={styles.drawerSection}>
 <DrawerItem 
   icon={({ color, size }) => (
     <MaterialCommunityIcons
       name="view-dashboard-outline"
       color={'white'}
       size={size}
     />
   )}
   label="Home"
   labelStyle={{color:'white',fontFamily:'Gotham'}}
   onPress={() => {props.navigation.navigate('HomeSt')}}
 />
 {console.log(userlist.fname)}
 <DrawerItem
   icon={({ color, size }) => (
     <MaterialCommunityIcons name="account-circle-outline" color={'white'} size={size} />
   )}
   label="My Profile"
   labelStyle={{color:'white',fontFamily:'Gotham'}}
   onPress={() =>props.navigation.navigate('MyProfile')
    }
    
 />
 <DrawerItem
   icon={({ color, size }) => (
     <MaterialCommunityIcons
       name='newspaper-variant-multiple-outline'
       color={'white'}
       size={size}
     />
   )}
   label="Latest News"
   labelStyle={{color:'white',fontFamily:'Gotham'}}
   onPress={() =>props.navigation.navigate('News') }
 />
 <DrawerItem
   icon={({ color, size }) => (
     <MaterialCommunityIcons
       name="message-video"
       color={'white'}
       size={size}
     />
   )}
   label="Book Video Call"
   labelStyle={{color:'white',fontFamily:'Gotham'}}
   onPress={() => {props.navigation.navigate('BookVideo')}}
 />
 <DrawerItem
   icon={({ color, size }) => (
     <MaterialCommunityIcons
       name="information-outline"
       color={'white'}
       size={size}
     />
   )}
   label="About Us"
   labelStyle={{color:'white',fontFamily:'Gotham'}}
   onPress={() => {props.navigation.navigate('AboutUs')}}
 />

 <DrawerItem
   icon={({ color, size }) => (
     <MaterialCommunityIcons
       name="account-group"
       color={'white'}
       size={size}
      
     />
   )}
   label="Contact Us"
   labelStyle={{color:'white',fontFamily:'Gotham'}}
   onPress={() => {props.navigation.navigate('ContactUs')}}
 />
 
 <DrawerItem
   icon={({ color, size }) => (
     <MaterialCommunityIcons
       name="shield-lock-outline"
       color={'white'}
       size={size}
     />
   )}
   label="Privacy Policy"
   labelStyle={{color:'white',fontFamily:'Gotham'}}
   onPress={() => {props.navigation.navigate('Policy')}}
 />
</Drawer.Section>
</View>

<View style={styles.socialIconContainer}>
<Icon
  raised
  name='instagram'
  type='feather'
  color='#A8062A'
  size={20}
  onPress={async() => {
    
       await WebBrowser.openBrowserAsync('https://www.instagram.com/?hl=en');
       
    
  }} />

<Icon
  raised
  name='facebook'
  type='font-awesome'
  color='#A8062A'
  size={20}
  onPress={async() => await WebBrowser.openBrowserAsync('https://www.facebook.com')} />

<Icon
  raised
  name='google-plus'
  type='font-awesome'
  color='#A8062A'
  size={20}
  onPress={async() => await WebBrowser.openBrowserAsync('https://myaccount.google.com/?utm_source=sign_in_no_continue')} />

<Icon
  raised
  name='twitter'
  type='font-awesome'
  color='#A8062A'
  size={20}
  onPress={async() => await WebBrowser.openBrowserAsync('https://twitter.com/?lang=en')} />
  

</View>
<View style={{borderWidth:0.3,borderColor:'#BBB9B9',width:'95%',alignSelf:'center',marginTop:10}}></View>
<Image source={require('../assets/TechSimba.png')} style={{width:80,height:40,alignSelf:'center',backgroundColor:'white',marginTop:'5%',borderRadius:2,marginBottom:'3%'}}/>
<Text style={styles.bottomText} onPress={async() => await WebBrowser.openBrowserAsync('https://techsimba.in')}>Powered By TechSimba</Text>
<Button
type='outline'
buttonStyle={{width:'45%',alignSelf:'center',borderColor:'white',marginVertical:'5%',borderWidth:1.5,borderRadius:10}}
onPress={createTwoButtonAlert}
  icon={
    <Icon
      name="logout"
      size={24}
      color="white"
    />
  }
  title="Logout"
  titleStyle={{color:'white',marginLeft:'10%',fontFamily:'Gotham'}}
/>
</SafeAreaView>


</DrawerContentScrollView>
       
      )
}

export default DrawerScreen

const styles = StyleSheet.create({
    drawerContent: {
        backgroundColor:'#A8062A',
        alignContent:'space-between',
        flex:1
      },
      headerContainer:{
        top:-4,
        flexDirection:'row',
        height:50,
        width:'100%',
        justifyContent:'space-around',
        alignItems:'center',
        backgroundColor:'white',
        paddingRight:'10%',
    
      },
      logoImage:{
        width:45,
        height:25
      },
      mainTitle:{
        color:'#A8062A',
        fontFamily:'Gotham',
        fontSize:20
      },
      nameContainer:{
        marginLeft:'6%',
        width:'80%',
        
      },
      userInfoSection: {
        width:'100%',
        flexDirection:'row',
        alignItems:'center',
        paddingVertical:8,
        marginBottom:10,
       
        
      },
      title: {
       
        fontFamily:'GothamBold',
        color:'white',
        fontSize:18,
      },
      subtitle:{
        fontFamily:'Gotham',
        color:'white',
        fontSize:16
      },
      caption: {
        fontSize: 14,
        lineHeight: 14,
        color:'white',
        fontFamily:'Gotham'
      },
      row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
      },
      section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
      },
      paragraph: {
        
        marginRight: 3,
      },
      drawerSection: {
        marginTop: 5,
      },
      preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
      },
      socialIconContainer:{
        flexDirection:'row',
        justifyContent:'space-around',
        paddingTop:5,
        paddingBottom:5, 
        paddingHorizontal:'8%'
       
      },
      bottomText:{
      color:'#fff' ,
    fontFamily:'Gotham',
    fontSize:17,
    alignSelf:'center',
    textDecorationLine:'underline',
    
    
    
    
       }
})
