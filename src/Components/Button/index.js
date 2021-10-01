import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';

const Button = ({onPress, text}) => {
    return ( 
        <TouchableOpacity onPress={onPress}>
            <View style={styles.button}>
                <Text style={styles.buttonText}>{text}</Text>
            </View>
        </TouchableOpacity>
     );
}
const styles = StyleSheet.create({
    button:{
        borderRadius:8,
        paddingVertical:14,
        paddingHorizontal:10,
        backgroundColor:'#f4511e',
        margin:10
    },
    buttonText:{
        color:'white',
        fontWeight:'bold',
        textTransform:'none',
        fontSize:16,
        textAlign:'center'
    }
})


export default Button;