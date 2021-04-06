import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View,FlatList,ActivityIndicator,Image } from 'react-native'
import {Overlay } from 'react-native-elements'
import axios from 'axios';
import { AntDesign,FontAwesome5 } from '@expo/vector-icons';
import instance from '../src/api/Gng';
import { Card,Divider} from 'react-native-paper';
import {useFonts} from 'expo-font';

const BookingHistory = ({navigation}) => {
    
  const [loader,setloader]=useState(false) //loader
  const [visible, setVisible] = useState(false);  //overly
  const [bookinglist, setbookinglist] = useState([])


  useEffect(() => {
    (async()=>{
        
        try{
        setloader(true)
        setVisible(true)
        
        const BookedResult=await instance.get('/VideoBooking')
        setbookinglist(BookedResult.data)
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

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

let date=''
let date1=''
let splitFulldate=''
let splitDate=''
let splitMonth=''
let monthname=''
let splitStartTime=''
let splitEndTime=''

    return (
        <View style={{marginBottom:'10%'}}>
            
            <View style={styles.headerContainer}>
          <View style={{flexDirection:'row'}}>
          <AntDesign name="arrowleft" size={26} color="#A8062A" style={{alignSelf:'center'}} onPress={()=>navigation.goBack()}/>
                   <Text style={styles.headingText}>My Bookings</Text>
          </View>
                   
                   <Image source={require('../assets/Gnglogo.png')} style={{width:50,height:30}}/>
              </View>
              <Divider style={{backgroundColor:'#A8062A',height:1}}/>

            {loader?<Overlay isVisible={visible}  style={{flex:1,justifyContent:'center',alignItems:'center'}}>
               <ActivityIndicator size="large" color="gray" />
      </Overlay>:null}

      <FlatList
      data={bookinglist}
      keyExtractor={(item,index)=>item.book_datetime}
      style={{marginBottom:'5%'}}
      showsVerticalScrollIndicator={false}
      renderItem={({item})=>{
        if(item.id_users_customer==='4'){
          date=item.start_datetime
          date1=item.end_datetime
          splitFulldate=date.substr(0,10)
          splitDate=splitFulldate.substr(8,10)
          splitMonth=splitFulldate.substr(6,1)
          splitStartTime=date.substr(11,5)
          splitEndTime=date1.substr(11,5)
          monthname=monthNames[splitMonth-1]

          
         
         return(
          <Card style={{width:'95%',alignSelf:'center',marginBottom:'3%'}}>
          <Card.Content  style={{flexDirection:'row'}}>
            <View style={{marginRight:'18%',alignSelf:'center',backgroundColor:'#D4F1F4',padding:'4%',borderRadius:10}}>
                <Text style={{fontFamily:'GothamBold',paddingBottom:'2%'}}>{monthname}</Text>
                <Text style={{fontFamily:'Gotham',color:'gray',textAlign:'center',fontSize:16}}>{splitDate}</Text>
            </View>
            <View>
                <Text style={{fontFamily:'GothamBold',paddingBottom:'2%'}}>Name   : <Text style={{fontFamily:'Gotham',color:'gray'}}>{item.bookingName}</Text></Text>
                <Text style={{fontFamily:'GothamBold',paddingBottom:'2%'}}>Mobile : <Text style={{fontFamily:'Gotham',color:'gray'}}>{item.bookingContact}</Text></Text>
                <Text style={{fontFamily:'GothamBold',paddingBottom:'2%'}}>Time    : <Text style={{fontFamily:'Gotham',color:'gray'}}>{splitStartTime} - {splitEndTime}</Text></Text>
                <Text style={{fontFamily:'GothamBold',width:200}}>Description  : <Text style={{fontFamily:'Gotham',color:'gray'}}>{item.notes}</Text></Text>
            </View>
            
          </Card.Content>
        </Card>
         )
        }else{
         null
         
        }
          
      }}
      />

            
        </View>
    )
}

export default BookingHistory

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
