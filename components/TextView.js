import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const TextView = ({title,value}) => {
    return (
        
            <View style={styles.textView}>
                  <Text style={styles.text}>{title} :</Text>
                 <Text style={styles.text2}>{value}</Text>
             </View>
        
    )
}

export default TextView

const styles = StyleSheet.create({
    text:{
        fontSize:18,
        fontWeight:'bold',
        marginRight:'5%'
       }
     ,text2:{
      alignSelf:'center',
      fontSize:18
     },
     textView:{
       flexDirection:'row',
       marginTop:'5%'
       
     }
})
