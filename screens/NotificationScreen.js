import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View ,ActivityIndicator,FlatList,Image} from 'react-native'
import {Overlay } from 'react-native-elements'
import axios from 'axios';
import { AntDesign,FontAwesome5,MaterialCommunityIcons,Fontisto,Ionicons,MaterialIcons } from '@expo/vector-icons';
import instance from '../src/api/Gng';
import { Divider,Avatar} from 'react-native-paper';
import {useFonts} from 'expo-font';


const NotificationScreen = ({navigation}) => {
  
  const [loader,setloader]=useState(false) //loader
  const [visible, setVisible] = useState(false);  //overly
  const [NotificationList, setNotificationList] = useState([])
  
  useEffect(() => {
    (async()=>{
        
      try{
      setloader(true)
      setVisible(true)
      const NotificationResult=await instance.get('/NotificationMsgM')
      console.log(NotificationResult.data)
      setNotificationList(NotificationResult.data)
        

     
      setloader(false)
      }catch(err){
      console.log(err)
      setloader(false)
      }
      setloader(false)
     
     
  })();
    
  }, [])

  const [loaded] = useFonts({
    RobotoSlab: require('../assets/fonts/RobotoSlab-Regular.ttf'),
    RobotoMono:require('../assets/fonts/RobotoMono-Bold.ttf'),
    Gotham:require('../assets/fonts/GothamMedium.ttf'),
    GothamBold:require('../assets/fonts/GothamBold.ttf'),
  });

  if (!loaded) {
    return null;
  }


  return (
    <View style={{marginBottom:'10%'}}>
       <View style={styles.headerContainer}>
          <View style={{flexDirection:'row'}}>
          <AntDesign name="arrowleft" size={26} color="#A8062A" style={{alignSelf:'center'}} onPress={()=>navigation.goBack()}/>
                   <Text style={styles.headingText}>Notification</Text>
          </View>
                   
                   <Image source={require('../assets/Gnglogo.png')} style={{width:50,height:30}}/>
              </View>
              <Divider style={{backgroundColor:'#A8062A',height:1}}/>

            {loader?<Overlay isVisible={visible}  style={{flex:1,justifyContent:'center',alignItems:'center'}}>
               <ActivityIndicator size="large" color="gray" />
      </Overlay>:null}
      
      <FlatList 
      data={NotificationList}
      keyExtractor={(item,index)=>index}
      renderItem={({item})=>{
        return(
    <View style={{width:'95%',alignSelf:'center',marginBottom:'3%',paddingRight:'10%',backgroundColor:'#ededed',borderRadius:20}}>
  <View style={{paddingVertical:'4%',width:'95%',alignSelf:'center',flexDirection:'row',paddingHorizontal:'2%'}}>
      <View>
         <Avatar.Image size={60} source={{uri:item.image}} />
      </View>
      
       <View style={{marginLeft:'5%',paddingRight:'20%'}}>
         <View style={{flexDirection:'row',marginBottom:'2%'}}>
           <MaterialCommunityIcons name="subtitles-outline" size={20} color="black" />
           <Text style={{fontFamily:'Gotham',paddingVertical:'1%',color:'gray',alignSelf:'center',marginLeft:'4%'}}>{item.title}</Text>
         </View>

         <View style={{flexDirection:'row',marginBottom:'2%'}}>
         <MaterialIcons name="description" size={24} color="black" />
         <Text style={{fontFamily:'Gotham',paddingVertical:'1%',color:'gray',alignSelf:'center',marginLeft:'4%'}}>{item.short_desc}</Text>
         </View>

         <View style={{flexDirection:'row',marginBottom:'2%'}}>
         <Ionicons name="document-text-outline" size={24} color="black" style={{alignSelf:'center'}}/>
         <Text style={{fontFamily:'Gotham',paddingVertical:'1%',color:'gray',lineHeight:20,alignSelf:'center',marginLeft:'4%'}}>{item.long_desc}</Text>
         </View>

         <View style={{flexDirection:'row',marginBottom:'2%'}}>
         <MaterialCommunityIcons name="format-title" size={24} color="black" />
         <Text style={{fontFamily:'Gotham',paddingVertical:'1%',color:'gray',alignSelf:'center',marginLeft:'4%'}}>{item.promo_title}</Text>
         </View>

         <View style={{flexDirection:'row'}}>
         <Fontisto name="date" size={20} color="black" />
         <Text style={{fontFamily:'Gotham',paddingVertical:'1%',color:'gray',alignSelf:'center',marginLeft:'4%'}}>{item.date}</Text>
         </View>
        
         
         
         
        
  
       </View>
  </View>
     
  </View>
        )
      }}
      />
    </View>
  )
}

/** 
 <Text style={{fontFamily:'GothamBold',color:'black'}}>Title : </Text>
 <Text style={{fontFamily:'GothamBold',color:'black'}}>Short_desc : </Text>
 <Text style={{fontFamily:'GothamBold',color:'black'}}>Long_desc : </Text>
 <Text style={{fontFamily:'GothamBold',color:'black'}}>Promo_title : </Text>
 <Text style={{fontFamily:'GothamBold',color:'black'}}>Date : </Text>
  **/
export default NotificationScreen

const styles = StyleSheet.create({
  headerContainer:{
    padding:'3%',
    flexDirection:'row',
    backgroundColor:'white',
    justifyContent:'space-between',
    paddingHorizontal:'3%'
    
},
headingText:{
    alignSelf:'center',
    fontSize:20,
    fontFamily:"Gotham",
    marginLeft:'5%',
    color:'#A8062A'
},
})
