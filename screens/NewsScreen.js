import React, { useState,useEffect } from 'react';
import { Image,StyleSheet ,ActivityIndicator,FlatList,StatusBar,View} from 'react-native';
import {useFonts} from 'expo-font';
import {Overlay} from 'react-native-elements'
import { Divider} from 'react-native-paper';
import instance from '../src/api/Gng';
import { AntDesign,FontAwesome5 } from '@expo/vector-icons';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body,Title,Subtitle,Right } from 'native-base';

const NewsScreen=({navigation})=> {
    const [loader,setloader]=useState(false) //loader
    const [visible, setVisible] = useState(false);  //overly
    const [newsList, setnewsList] = useState([])
    const [web,setweb]=useState(true)
    const [view,setview]=useState(true)
    useEffect(() => {
        
       (async()=>{
       
        try{
            setloader(true)
            setVisible(true)
            const responce=await instance.get('/news') 
           
            setnewsList(responce.data)
            setloader(false)
           
        }catch(err){
          console.log(err)
        }
    }
    )()
        
           
    }, [])

    const [loaded] = useFonts({
        Roboto_medium: require('../assets/fonts/RobotoSlab-Regular.ttf'),
        RobotoMono:require('../assets/fonts/RobotoMono-Bold.ttf'),
        Gotham:require('../assets/fonts/GothamMedium.ttf'),
        GothamBold:require('../assets/fonts/GothamBold.ttf'),
      });
    
      if (!loaded) {
        return null;
      }

     
     
  
    return (
      <>
       
      {loader?<Overlay isVisible={visible}  style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <ActivityIndicator size="large" color="gray" />
</Overlay>:null}

<View style={styles.headerContainer}>
          <View style={{flexDirection:'row'}}>
          <AntDesign name="arrowleft" size={26} color="#A8062A" style={{alignSelf:'center'}} onPress={()=>navigation.goBack()}/>
                   <Text style={styles.headingText}>News</Text>
          </View>
                   
                   <Image source={require('../assets/Gnglogo.png')} style={{width:50,height:30}}/>
              </View>
              <Divider style={{backgroundColor:'#A8062A',height:1}}/>

     <FlatList
      keyExtractor={news=>news.id}
      data={newsList}
      contentContainerStyle={{backgroundColor:'white'}}
      renderItem={({item})=>{
return(
 
        <Container style={{height:'10%',marginBottom:'5%',backgroundColor:'white'}}>
           <Content>
        
          <Card style={{flex: 1}}  >
            <CardItem  >
              <Left>
                <Thumbnail source={{uri: `${item.image}`}} />
                <Body>
                  <Text style={{fontFamily:'GothamBold',fontSize:20,marginBottom:'1%',color:'#A8062A'}}>{item.author}</Text>
                  <Text style={{fontFamily:'Gotham',lineHeight:17}} note>{item.headline}.</Text>
                 
                </Body>
              </Left>
              
            </CardItem>
            <CardItem button onPress={() =>
                
                    navigation.navigate('NewsView',{content:item.newshtmlcontent})
                
            }>
              <Body>
                <Image source={{uri: `${item.image}`}} style={{height: 200, width: '100%', flex: 1}}/>
                
                
                {loader?<Overlay isVisible={visible}  style={{flex:1,justifyContent:'center',alignItems:'center'}}>
               <ActivityIndicator size="large" color="gray" />
      </Overlay>:null}
              </Body>
              
            </CardItem>
            <Text style={{fontFamily:'Gotham',left:'5%'}}>{item.newsorigin}</Text>
            <CardItem style={{height:50,marginBottom:'3%'}}>
         
              <Left>
                <Button transparent textStyle={{color: '#87838B'}}>
                  <Icon name="newspaper-o" type='FontAwesome' style={{color:'#A8062A'}} />
                  <Text style={{color:'#A8062A',fontFamily:'Gotham'}}>{item.category}</Text>
                </Button>
              </Left>
              <Right>
              <Text style={{fontFamily:'GothamBold',lineHeight:17}} note>{item.entry_date}</Text>
              </Right>
            </CardItem>
          </Card>
          </Content> 
      </Container>
     
      )
      }}
      />
      
     
          
          
      </>    
     
   
    );
  }

  export default NewsScreen
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
