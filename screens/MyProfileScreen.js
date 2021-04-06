import React,{useState,useEffect,useRef,useCallback,useContext } from 'react'
import  {BackHandler,TouchableOpacity,StyleSheet, Text, View,StatusBar,Platform,ToastAndroid,SafeAreaView,Image, ScrollView,ActivityIndicator} from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import { AntDesign,FontAwesome5 } from '@expo/vector-icons';
import {useFonts} from 'expo-font';
import {Picker} from 'native-base'
import DateTimePicker from '@react-native-community/datetimepicker';
import instance from '../src/api/Gng';
import validator from 'validator';
import {Overlay,CheckBox } from 'react-native-elements'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions,useNavigation,useFocusEffect} from '@react-navigation/native'
import {AuthContext} from '../components/Context'
import { TextInput,Divider } from 'react-native-paper';






const ProfileScreen = ({navigation,route}) => {
   

  const [countrydata, setcountrydata] = useState({countryName:'Country'})
  const [statedata, setstatedata] = useState({StateName:'State'})

  const {authContext}=useContext(AuthContext)

  


   
  const[localnumber,setlocalnumber]=useState('')
  const[localcid,setlocalcid]=useState('')

  const [visiblepic, setVisiblepic] = useState(false);
    
  const toggleOverlay = () => {
    setVisiblepic(!visiblepic);
  }
 
   
  const [loader,setloader]=useState(false) //loader
  const [visible, setVisible] = useState(false);  //overly

    const [userList,setUserList]=useState({})

    const [name,setname]=useState('')
    const [lastname,setlastname]=useState('')
    const [address,setaddress]=useState('')
    const [zipcode,setzipcode]=useState('')
    const [email,setemail]=useState('')
    const [date, setDate] = useState(new Date());
    const [image, setImage] = useState(null);
    const [dob, setdob] = useState('');
    const [countryName, setcountryName] = useState('')
    const [Phone, setPhone] = useState('')
    


      //statelist
    const [countryList, setCountrylist] = useState([{}]);//countrylist
    const [stateList, setStatelist] = useState([]);  //statelist

    const input1=useRef()
    const input2=useRef()
    const input3=useRef()
    const input4=useRef()
    const input5=useRef()
    const input6=useRef()


    const [checked,setchecked]=useState(false) 
    const [MailError, setMailError] = useState(false)
    const [dateshow,setdateshow]=useState(true) 
    const [datetextShow,setdateTextshow]=useState(false)

    const [datecolor,setdatecolor]=useState('#ACABAB')
    const [stateid,setstateid]=useState('')       //stateID
    const [country,setcountry]=useState('')
    const [countryid,setcountryid]=useState('')
    const [state1,setstate1]=useState('')
    const [city,setcity]=useState({city:'City'})
    const [date1, setDate1] = useState(false); 
  const [mode, setMode] = useState();
  const [show, setShow] = useState(false);
  const [dateofbirth1, setdateofbirth1] = useState('')

  const getOrdinalNum = (number) => {
    let selector;
  
    if (number <= 0) {
      selector = 4;
    } else if ((number > 3 && number < 21) || number % 10 > 3) {
      selector = 0;
    } else {
      selector = number % 10;
    }
  
    return number + ['th', 'st', 'nd', 'rd', ''][selector];
  };
   
  
  

    let cdate=date.getDate()
    let cmonth=date.getMonth()
   // let cmonth=date.getMonth()+1
    let cyear=date.getUTCFullYear()
    var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let dateName=getOrdinalNum(cdate)
    let month=monthNames[cmonth]
    let dateofbirth=`${dateName} ${month} ${cyear}`
    
    
    
    
    

    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShow(Platform.OS === 'ios');
      if(event.type == "set") {
        
    let cdate=currentDate.getDate()
    let cmonth=currentDate.getMonth()
   // let cmonth=date.getMonth()+1
    let cyear=currentDate.getUTCFullYear()
    var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let dateName=getOrdinalNum(cdate)
    let month=monthNames[cmonth]
    let dateofbirth=`${dateName} ${month} ${cyear}`
        setdateofbirth1(dateofbirth)
        setDate(date)
        setdateshow(false)
        setDate1(true)
        setdatecolor('black')
        setdateTextshow(true) 
    } else {
        return null
    }
        
        
      };
    
      const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
      };
    
      const showDatepicker = () => {
        showMode('date');
      };
    
      const showTimepicker = () => {
        showMode('time');
      };

      
   useEffect(() => {

    const unsubscribe = navigation.addListener('focus', async() => {
      (async()=>{
        setloader(true)
            setVisible(true)
            try{
              const countrylistResponce=await instance.get('/country')
                setCountrylist(countrylistResponce.data)
  
                const result1=await instance.get(`/customer/${cid1}`)
                console.log(result1.data)
       const country=await instance.get(`/country/${result1.data.country}`)
       const statelistResponce=await instance.get(`/state/${country.data.countryCode}`)
       setStatelist(statelistResponce.data) 
                
              setloader(false)
              setVisible(false)
              }catch(err){
                console.log(err)
              }
             
      
            
          })();
          (async()=>{
               
        try{
          setloader(true)
          setVisible(true)
          const num = await AsyncStorage.getItem('number')
          const cid1 = await AsyncStorage.getItem('cid')
         
          console.log('parse',num ,cid1)
          setlocalnumber(num)
          setlocalcid(cid1)
          
          
       const result1=await instance.get(`/customer/${cid1}`)
       const country=await instance.get(`/country/${result1.data.country}`)
       
       const state=await instance.get(`/stateById/${result1.data.state}`)
  
       const statelistResponce=await instance.get(`/state/${country.data.countryCode}`)
       console.log('stateresponce',statelistResponce.data)
       setStatelist(statelistResponce.data) 
  
       
       setcountrydata({countryName:country.data.countryName})
       setstatedata({StateName:state.data[0].StateName})
  
       console.log('customer',result1.data)
       console.log('image y:',result1.data.image)
  
       setUserList(result1.data)
       setname(result1.data.fname)
       setemail(result1.data.email)
       setaddress(result1.data.address)
       setlastname(result1.data.lname)
       setstateid(result1.data.state)
       setcountryid(result1.data.country)
       setImage(result1.data.image)
       setzipcode(result1.data.pincode)
       setPhone(result1.data.contact)
       
     
  
  
       
       setdob(result1.data.dob)
                  
                  console.log('userlist :', result1.data)
                  const jsonValue1 = JSON.stringify({
                      name:result1.data.fname,
                      email:result1.data.email,
                      image:result1.data.image
                  })
                  await AsyncStorage.setItem('userdata',jsonValue1)
      
       
                  const countryresponce=await instance.get(`country/${result1.data.country+1}`)
                  console.log('country name:',countryresponce.data)
                  setcountryName(countryresponce.data.countryName)
                  setloader(false)
                  setVisible(false)
                }catch(err){
      console.log(err)
        }})();
         
             
      });
      
      return ()=>{
          unsubscribe
          
      };

     

    

   }, [navigation]) 

   useEffect(() => {

    if (route.params?.countryName) {
     
      setcountrydata({countryName:route.params.countryName});
      setcountryid(route.params.countryId);
     (async()=>{
      setloader(true)
      setVisible(true)
      
      const statelistResponce=await instance.get(`/state/${route.params.countryCode}`)
 
      setStatelist(statelistResponce.data) 
     
      
  setloader(false)
  setVisible(false)
  setloader(true)
     })();
      
    }

    if(route.params?.StateName){
      setstatedata({StateName:route.params.StateName})
      setstateid(route.params.stateId)
    }
  }, [route.params?.countryName,route.params?.StateName]);

    
  useEffect(() => {
 

    (async () => {
     setdatecolor('#ACABAB')
     setMode('Date')
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();

     },[pickImage,pickCamera]);

  const pickImage = async () => {
    setVisiblepic(false)
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
     setImage(result.uri);
     
      
    }
  };

  const pickCamera = async () => {
    setVisiblepic(false)
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
     
    });

    

    if (!result.cancelled) {
     setImage(result.uri);
      }
  };

  const [loaded] = useFonts({
    RobotoSlab: require('../assets/fonts/RobotoSlab-Regular.ttf'),
    RobotoMono:require('../assets/fonts/RobotoMono-Bold.ttf'),
    Gotham:require('../assets/fonts/GothamMedium.ttf'),
    GothamBold:require('../assets/fonts/GothamBold.ttf'),
  });

  if (!loaded) {
    return null;
  }


  const validation=async()=>{

      if(name===''||lastname===''||address===''||zipcode===''||email===''){
        ToastAndroid.showWithGravityAndOffset(
            "All Fields Are Required",
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
            25,
            50
          );
      }
      else{
        

        
          const valid=validator.isEmail(email)
           if(valid===true){
              try{
  
                const formData = new FormData();
                // formData.append('data', JSON.stringify(data));
                formData.append('firstname', name);
                formData.append('lastname', lastname);
                formData.append('contact',localnumber);
                formData.append('email',email);
                formData.append('pincode',zipcode);
                formData.append('address',address);
                formData.append('dob',dateofbirth);
               // formData.append('image',image);
                formData.append('country',countryid);
                formData.append('state',stateid);
                formData.append('status','1'); 
                console.log(image);
                formData.append('image', {
                           uri: image,// ,//Your Image File Path
                          type: 'image/jpeg', 
                          name: "image.jpg",
                        });
                        setloader(true)
                        setVisible(true)
                      await  axios({
                          url    : `https://develop-c.cheshtainfotech.com/CEA/api/customer/${localcid}`,
                          method : 'POST',
                          data   : formData,
                          headers: {
                                       'Content-Type': 'multipart/form-data',
                                       'Authorization':'@CEAUTH09#'
                                   }
                               })
                               .then(function (response) {
                                       console.log("response :", response.data);
                                       const jsonValue = JSON.stringify({
                                        name:name,
                                        email:email,
                                        image:image
                                    })
                                     AsyncStorage.setItem('userdata', jsonValue)          
                                    
                              })
                              .catch(function (error) {
                                       console.log('Myprofile error',error);
                              })
                              
                              
                            setloader(false)
                    
                          }catch(err){
                            
                            console.log(err)
                            alert('Something Goes Wrong')
                          } 
                        
                          setloader(false)
                           setVisible(false)
                           ToastAndroid.showWithGravityAndOffset(
                            "Please Updated Seccessfully",
                            ToastAndroid.LONG,
                            ToastAndroid.CENTER,
                            25,
                            50
                          );
                           navigation.goBack()
            }
           else{
            ToastAndroid.showWithGravityAndOffset(
              "Please Enter A Valid Email",
              ToastAndroid.LONG,
              ToastAndroid.CENTER,
              25,
              50
            );

           }
           
 
          
         
      }
  }

    return (
        
       <SafeAreaView style={styles.mainContainer} >
            
            <View style={styles.headerContainer}>
          <View style={{flexDirection:'row'}}>
          <AntDesign name="arrowleft" size={26} color="#A8062A" style={{alignSelf:'center'}} onPress={()=>navigation.goBack()}/>
                   <Text style={styles.headingText}>My Profile</Text>
          </View>
                   
                   <Image source={require('../assets/Gnglogo.png')} style={{width:50,height:30}}/>
              </View>
              <Divider style={{backgroundColor:'#A8062A',height:1}}/>

         <ScrollView 
         keyboardShouldPersistTaps='handled'
         keyboardDismissMode='on-drag'
         showsVerticalScrollIndicator={false}
         >


         {loader?<Overlay isVisible={visible}  style={{flex:1,justifyContent:'center',alignItems:'center'}}>
               <ActivityIndicator size="large" color="gray" />
      </Overlay>:null}

           <StatusBar barStyle='dark-content' backgroundColor='white' />
          

        

    <View style={styles.bodyContainer}>



          
    <TouchableOpacity onPress={toggleOverlay}> 
              {image?<Image source={{uri:image}} style={styles.image}/>:<Image source={require('../assets/profile.png')} style={styles.image}/>}
    </TouchableOpacity> 
    

<TouchableOpacity onPress={toggleOverlay} style={styles.addphotoView}> 
   <Text style={styles.addphotoText}>Add Photo</Text>
   <FontAwesome5 name="arrow-circle-up" size={18} color="#6200EE" style={{alignSelf:'center',marginTop:'3%'}}/>
</TouchableOpacity>          

<Overlay isVisible={visiblepic} onBackdropPress={toggleOverlay}>

<View style={{flexDirection:'row',justifyContent:'space-between',width:'60%',paddingHorizontal:'5%'}}>

  <TouchableOpacity onPress={pickImage} style={{flex:1}}>
      <Image source={require('../assets/gallery.png')}  style={{width:50,height:50,marginTop:'3%'}}/>
      <Text style={{fontFamily:'Gotham',marginBottom:'5%'}}>Gallery</Text>
  </TouchableOpacity>
      
  <TouchableOpacity onPress={pickCamera}>
            <Image source={require('../assets/camera.jpg')}  style={{width:50,height:50,marginTop:'3%'}}/>
            <Text style={{fontFamily:'Gotham',marginBottom:'3%'}}>Camera</Text> 
  </TouchableOpacity>
     
      </View>

</Overlay>

          
          

          <View style={styles.InputContainer}>

          <TextInput
                    type="flat"
                    mode='outlined'
                    label='First Name*'
                    autoCorrect={false}
                    style={styles.inputField}
                    value={name}
                    onChangeText={(value)=>{
                      let val=value
                      val=val.replace(/[^A-Za-z]/ig,'')
                      setname(val)
                    }}
                    ref={input1}
                    onSubmitEditing={()=>input2.current.focus()}
                    
                     />

                   
                    
                    
                 <TextInput
                 type="flat"
                 mode='outlined'
                 label='Last Name*'
                 style={styles.inputField}
                    autoCorrect={false}
                    
                    value={lastname}
                    onChangeText={(value)=>{
                      let val=value
                      val=val.replace(/[^A-Za-z]/ig,'')
                      setlastname(val)
                    }}
                    ref={input2}
                  
                    onSubmitEditing={()=>input3.current.focus()}
                    

                    
                 />
                   
                   <TextInput
                    type="flat"
                    mode='outlined'
                    label='Phone number'
                    style={styles.inputField}
                    value={Phone}
                    
                    
                     />

                   <TouchableOpacity onPress={showDatepicker}>

                   
<View style={{borderWidth:1,
borderRadius:5,
borderColor:'gray',
paddingLeft:'5%',
paddingVertical:'5%',
marginTop:'2%',
marginBottom:'5%',
flexDirection:'row',
justifyContent:'space-between',
paddingRight:'5%'}}>
   
   {dateshow?
  <Text style={{fontSize:15,
marginVertical:'1.5%',
fontFamily:'Gotham',color:'black'}}>{dob}</Text>:null}

  {datetextShow?<Text  style={{fontSize:15,
marginVertical:'1.5%',
fontFamily:'Gotham',color:'black'}} >{dateofbirth1}</Text>:null}
<FontAwesome5 name="calendar-alt" size={24} color="#6200EE" />   
</View>

</TouchableOpacity> 
{show && (
<DateTimePicker
testID="dateTimePicker"
value={date}
mode={mode}
is24Hour={true}
display='spinner'
onChange={onChange}
minimumDate={new Date().getFullYear()-10}
maximumDate={new Date().setFullYear(new Date().getFullYear()-10)}


/>
)}



                 <TextInput
                    type="flat"
                    mode='outlined'
                    label='Email'
                    error={MailError}
                    style={styles.inputField}
                    autoCorrect={false}
                    value={email}
                    onChangeText={(value)=> setemail(value)}
                    ref={input3}
                    onSubmitEditing={()=>
                      {
                        const valid=validator.isEmail(email)
                        if(valid===true){
                          setMailError(false)
                          input4.current.focus()
                        }
                        else{
                          setMailError(true)
                         
                        }
                      }
                      }
                    
                     />
                    
                    
             <TouchableOpacity style={[styles.pickerInput,{marginBottom:'5%'}]} onPress={()=>{
               navigation.navigate('PickerView',{countrylist:countryList,navView:'Picker1'})
               setloader(false)
               }}>
                <Text style={[{fontFamily:'Gotham',fontSize:16},{color:(countrydata.countryName==='Country*')?"gray":"black"}]} >{countrydata.countryName}</Text>
             </TouchableOpacity>


             <TouchableOpacity style={[styles.pickerInput,{marginBottom:'5%'}]} onPress={()=>{
               navigation.navigate('PickerView2',{stateList:stateList,navView:'Picker1'})}}>
                <Text style={[{fontFamily:'Gotham',fontSize:16},{color:(statedata.StateName==='State*')?"gray":"black"}]} >{statedata.StateName}</Text>
             </TouchableOpacity>   

              <TextInput
                 type="flat"
                 mode='outlined'
                 label='Address*'
                 multiline={true}
                 numberOfLines={4}
                 style={styles.inputField}
                 onFocus={()=>{
                  const valid=validator.isEmail(email)
                  if(email!==''){
                    if(valid===true){
                      setMailError(false)
                      input4.current.focus()
                    }
                    else{
                      input3.current.focus()
                      setMailError(true)
                     
                    }
                  }else{
                    setMailError(false)
                      input4.current.focus()
                  }
                 }}
                     
                    autoCorrect={false}
                    autoCompleteType='street-address' 
                    value={address}
                    underlineColorAndroid="transparent"
                    onChangeText={(value)=>setaddress(value)}
                    ref={input4}
                    onSubmitEditing={()=>
                      {
                        const valid=validator.isEmail(email)
                        if(email!==''){
                          if(valid===true){
                            setMailError(false)
                            input4.current.focus()
                          }
                          else{
                            setMailError(true)
                           
                          }
                        }else{
                          setMailError(false)
                            input4.current.focus()
                        }
                        
                      }}
                   
                    
                    
                    
                 />
                    

                   
                    
                 <TextInput
                 type="flat"
                 mode='outlined'
                 label='Zip Code*'
                 onFocus={()=>{
                  const valid=validator.isEmail(email)
                  if(email!==''){
                    if(valid===true){
                      setMailError(false)
                      input5.current.focus()
                    }
                    else{
                      input3.current.focus()
                      setMailError(true)
                     
                    }
                  }else{
                    input5.current.focus()
                      setMailError(false)
                  }
                 }}
                    ref={input5}
                    style={styles.inputField}
                    autoCorrect={false}
                    keyboardType='phone-pad'
                    value={zipcode}
                    onChangeText={(value)=>
                      {
                        let val=value
                      val=val.replace(/[^0-9]/ig,'')
                      setzipcode(val)
                      }
                      }
                   maxLength={6}
                    
                    
                 />    
                
                   

    </View>
</View>
  

    <TouchableOpacity  onPress={validation} style={styles.buttonTouch}>
                    <Text style={styles.buttonStyle}>Update</Text>
                </TouchableOpacity>
    </ScrollView>

       </SafeAreaView>
     
      
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
  mainContainer:{
    backgroundColor:'white',
   },
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
bodyContainer:{
    alignItems:'center',
    justifyContent:'center',
    marginBottom:'2%'
},
image:{
    width:100,
    height:100,
    borderRadius:50,
    borderWidth:1,
    borderColor:'#E5E5E5'
    
},

InputContainer:{
    width:'90%',
    marginTop:'5%'
    
},
inputView:{
  marginBottom:'5%'  
    
    
},
inputField:{
    width:'100%',
    fontFamily:'Gotham',
    fontSize:15,
    backgroundColor:'white',
    marginBottom:'5%'
},
inputFieldAddress:{
  width:'100%',
  fontFamily:'Gotham',
  fontSize:15,
  height:50,
  backgroundColor:'white'
},
inputViewAddress:{
  marginBottom:'5%'
},
date:{
    fontSize:15,
    marginVertical:'2%',
    color:'#ACABAB',
    fontFamily:'Gotham',
    
    
},

buttonStyle:{
    fontFamily:'Gotham',
    color:'#fff',
    fontSize:16,
    alignSelf:'center',
    marginVertical:13
    
},
buttonTouch:{
    height:45,
    backgroundColor:'#A8062A',
    borderRadius:7,
    width:'70%',
    alignSelf:'center',
    marginBottom:'25%',
    marginTop:'5%'
    
    
    
},
addphotoText:{
  fontSize:17,
  color:'#6200EE',
  marginTop:'3%',
  fontFamily:'Gotham',
  marginRight:'1.5%'
  
},
addphotoView:{
   flexDirection:'row',
   

},
picker:{
  height: 30, 
  width: '100%',
  left:-10,
  color:'gray',
  fontFamily:'Gotham',
},

pickerInput:{
  borderWidth:1,
  width:'100%',
  alignSelf:'center',
  borderColor:'gray',
  borderRadius:5,
  paddingLeft:'3.3%',
  paddingVertical:'5.5%',
  marginTop:'2%'
  
}
})
