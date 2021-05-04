import React from 'react'
import { StyleSheet, Text, View ,FlatList,Image} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

const storage = () => {
    const lists = [
        {name:"Akshay Kumar Meme",image:"https:\/\/randomuser.me\/api\/portraits\/women\/26.jpg"},{name:"Akshay Kumar Meme",image:"https:\/\/randomuser.me\/api\/portraits\/women\/26.jpg"},{name:"Akshay Kumar Meme",image:"https:\/\/randomuser.me\/api\/portraits\/women\/26.jpg"},{name:"Akshay Kumar Meme",image:"https:\/\/randomuser.me\/api\/portraits\/women\/26.jpg"},{name:"Akshay Kumar Meme",image:"https:\/\/randomuser.me\/api\/portraits\/women\/26.jpg"},{name:"Akshay Kumar Meme",image:"https:\/\/randomuser.me\/api\/portraits\/women\/26.jpg"},{name:"Akshay Kumar Meme",image:"https:\/\/randomuser.me\/api\/portraits\/women\/26.jpg"},{name:"Akshay Kumar Meme",image:"https:\/\/randomuser.me\/api\/portraits\/women\/26.jpg"},{name:"Akshay Kumar Meme",image:"https:\/\/randomuser.me\/api\/portraits\/women\/26.jpg"},{name:"Akshay Kumar Meme",image:"https:\/\/randomuser.me\/api\/portraits\/women\/26.jpg"},{name:"Akshay Kumar Meme",image:"https:\/\/randomuser.me\/api\/portraits\/women\/26.jpg"},{name:"Akshay Kumar Meme",image:"https:\/\/randomuser.me\/api\/portraits\/women\/26.jpg"},{name:"Akshay Kumar Meme",image:"https:\/\/randomuser.me\/api\/portraits\/women\/26.jpg"},{name:"Akshay Kumar Meme",image:"https:\/\/randomuser.me\/api\/portraits\/women\/26.jpg"},{name:"Akshay Kumar Meme",image:"https:\/\/randomuser.me\/api\/portraits\/women\/26.jpg"},{name:"Akshay Kumar Meme",image:"https:\/\/randomuser.me\/api\/portraits\/women\/26.jpg"}
        
        ]

        const list = [
            {name:"Akshay Kumar Meme",image:"https:\/\/randomuser.me\/api\/portraits\/women\/26.jpg"},{name:"Akshay Kumar Meme",image:"https:\/\/randomuser.me\/api\/portraits\/women\/26.jpg"},{name:"Akshay Kumar Meme",image:"https:\/\/randomuser.me\/api\/portraits\/women\/26.jpg"},{name:"Akshay Kumar Meme",image:"https:\/\/randomuser.me\/api\/portraits\/women\/26.jpg"},{name:"Akshay Kumar Meme",image:"https:\/\/randomuser.me\/api\/portraits\/women\/26.jpg"},{name:"Akshay Kumar Meme",image:"https:\/\/randomuser.me\/api\/portraits\/women\/26.jpg"},{name:"Akshay Kumar Meme",image:"https:\/\/randomuser.me\/api\/portraits\/women\/26.jpg"},{name:"Akshay Kumar Meme",image:"https:\/\/randomuser.me\/api\/portraits\/women\/26.jpg"},{name:"Akshay Kumar Meme",image:"https:\/\/randomuser.me\/api\/portraits\/women\/26.jpg"},{name:"Akshay Kumar Meme",image:"https:\/\/randomuser.me\/api\/portraits\/women\/26.jpg"},{name:"Akshay Kumar Meme",image:"https:\/\/randomuser.me\/api\/portraits\/women\/26.jpg"},{name:"Akshay Kumar Meme",image:"https:\/\/randomuser.me\/api\/portraits\/women\/26.jpg"},{name:"Akshay Kumar Meme",image:"https:\/\/randomuser.me\/api\/portraits\/women\/26.jpg"},{name:"Akshay Kumar Meme",image:"https:\/\/randomuser.me\/api\/portraits\/women\/26.jpg"},{name:"Akshay Kumar Meme",image:"https:\/\/randomuser.me\/api\/portraits\/women\/26.jpg"},{name:"Akshay Kumar Meme",image:"https:\/\/randomuser.me\/api\/portraits\/women\/26.jpg"}
            
            ]
    return (
        <View>
            <FlatList 
            nestedScrollEnabled={true}
            data={list}
            keyExtractor={(item,index)=>index.toString()}
            horizontal={true}
            renderItem={({item})=>{
                return(
                    <View >
                        <Image source={{uri:item.image[0]}} style={{width:100,height:100}}/>
           <FlatList 
            data={lists}
            keyExtractor={(item,index)=>index.toString()}
            
            renderItem={({item})=>{
                
                return(
                    <View style={{flex:1}}>
                        <Image source={{uri:item.image}} style={{width:100,height:100}}/>
                      
     <FlatList 
            data={list}
            keyExtractor={(item,index)=>index.toString()}
            
            renderItem={({item})=>{
                
                return(
                    <View >
                        <Image source={{uri:item.image[0]}} style={{width:100,height:100}}/>
                      
                    </View>
                )
            }}
            />
                    </View>
                )
            }}
            />
                    </View>
                )
            }}
            />

            
        </View>
    )
}

export default storage

const styles = StyleSheet.create({})
