import React from 'react';
import { View, ActivityIndicator, StyleSheet,Text } from 'react-native';

const LoadingIndicator = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#f4511e" />
        </View>
    )
}


const styles = StyleSheet.create({

    container:{
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      flex:1
    },
  });

export default LoadingIndicator;

