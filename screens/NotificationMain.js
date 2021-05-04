import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View ,ActivityIndicator,Image} from 'react-native'
import {Overlay } from 'react-native-elements'
import { AntDesign } from '@expo/vector-icons';
import instance from '../src/api/Gng';
import { Avatar, Button, Card, Title, Paragraph,Divider } from 'react-native-paper';
import {useFonts} from 'expo-font';
import { WebView } from 'react-native-webview';

const NotificationMain = ({navigation,route}) => {
  const [loader,setloader]=useState(false) //loader
  const [visible, setVisible] = useState(false);  //overly
  const [data, setdata] = useState({})

  const id=route.params.id

  useEffect(() => {
    (async()=>{
        
      try{
      setloader(true)
      setVisible(true)
      
      const NotificationResult=await instance.get(`/NotificationMsgM/${id}`)
      console.log(NotificationResult.data)
      setdata(NotificationResult.data[0])
      
        

     
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
        <>
            <View style={styles.headerContainer}>
          <View style={{flexDirection:'row'}}>
          <AntDesign name="arrowleft" size={26} color="#A8062A" style={{alignSelf:'center'}} onPress={()=>navigation.goBack()}/>
                   <Text style={styles.headingText}>Notification Detail</Text>
          </View>
                   
                   <Image source={require('../assets/Gnglogo.png')} style={{width:50,height:30}}/>
              </View>
              <Divider style={{backgroundColor:'#A8062A',height:1}}/>

            {loader?<Overlay isVisible={visible}  style={{flex:1,justifyContent:'center',alignItems:'center'}}>
               <ActivityIndicator size="large" color="gray" />
      </Overlay>:null}

<View style={{width:'100%',alignSelf:'center',marginTop:'2%',backgroundColor:'white',paddingHorizontal:'3%'}}>
      <Card>
      <Card.Cover source={{uri:data.image}} /> 
      </Card>

      <View style={{flexDirection:'row',justifyContent:'space-between',flexWrap:'wrap'}}>
         <Text style={{fontFamily:'GothamBold',fontSize:16,marginTop:'3%',marginBottom:'1.5%',lineHeight:20,paddingHorizontal:'2%'}}>{data.title} Title of the content is too Long</Text>
         <Text style={{fontFamily:'Gotham',fontSize:14,marginTop:'1.5%',marginBottom:'3%',color:'gray',paddingLeft:'2%'}}>{data.date}</Text>
      </View>
   
     

    </View>
{loader?null:
    <WebView 
    style={{marginHorizontal:'1.5%'}}
        originWhitelist={['*']}
        source={{ html: data.long_desc }}
        injectedJavaScript={`const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=0.5, maximum-scale=0.5, user-scalable=0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `}
        scalesPageToFit
        />}
        

           
        </>
    )
}

export default NotificationMain

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
