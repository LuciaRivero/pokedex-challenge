import React, { cloneElement } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import Button from '../Button';
import LoadingIndicator from '../LoadingIndicator';


const EmptyList = ({error, revertir, isLoading }) => {
    if (isLoading) return <LoadingIndicator/>
    return ( 
        <View style={styles.container}>
            <Image style={styles.iconError} source={require('../../../assets/error.png')}/>
            <Text style={styles.title}>Lo sentimos!</Text> 
            <Text style={styles.subtitle}> {error}</Text> 
            <Button
                    onPress={revertir}
                    text="Ver todos los pokemons"/>
        </View>
        
     );
}


const styles = StyleSheet.create({
  container:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    flex:1
  },
  iconError:{
      width:100,
      height:100
  },
  title:{
    fontSize:24,
    textAlign:'center'
  },
  subtitle: {
    fontSize:16,
    textAlign:'center'
  },
  button:{
    margin:15,
    color:'#f4511e'
  }
});

 
export default EmptyList;