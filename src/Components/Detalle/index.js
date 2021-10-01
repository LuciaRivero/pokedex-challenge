import React, {useState, useEffect} from 'react';
import { StyleSheet, Image, Text, View , SafeAreaView, StatusBar} from 'react-native';
import {backgroundColors, textColor, colors} from './colors';
import LoadingIndicator from '../LoadingIndicator';
import { apiRequest } from '../../utils';
import { Card, Chip  } from 'react-native-paper';


const Detalle = ({ route }) => {

    const { item, uriPokemon, index } = route.params;
    const [pokemon, setPokemon] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const idProp = item.id ? item.id : index + 1;

    useEffect(() => {
        getPokemon();
      }, []);
    
      const getPokemon = () => {
        apiRequest(
          `pokemon/${idProp}`,
          {},
          getSuccess,
          getFail
        ) 
      };

    const getSuccess = (res) => {
        const { types, id, base_experience, name, height, weight} = res;

        setPokemon({ types, id, base_experience, name, height, weight})
        setIsLoading(false);
    }

    const getFail = (res) => {
        setIsLoading(false);
    }

    const CardInfo = ({firstText, secondText}) => {
      return (
        <Card style={styles.card}>
          <Image style={styles.iconStats} source={require('../../../assets/stats.png')}/>
          <Text style={styles.textInfo}>{firstText}</Text>
          <Text style={styles.textInfo}>{secondText}</Text>
        </Card>
      )
    }

   const { types, id, base_experience, name, height, weight} = pokemon;

    return ( 
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#000" />
            {isLoading ? <LoadingIndicator/> :
             <View style={styles.containerContent}>
                <Image
                    style={styles.avatar}
                    source={{ uri: uriPokemon }}
                />
                <Text style={styles.number}>{`#${id}`}</Text>
                <Text style={styles.title}>{name}</Text>
                <View style={styles.containerDetails}>
                    <View style={styles.chipContainer}>
                      {types.map((i, index) => {
                        return (
                          <Chip 
                            key={index}
                            style={{
                              padding:2, 
                              color:textColor.white, 
                              backgroundColor:colors[i.type.name]}}>
                              {i.type.name}
                          </Chip>
                        )
                      })}
                    </View>
                    <View style={styles.containerCards}>

                      <CardInfo firstText="Altura" secondText={`${height}Mts`}/>
                      <CardInfo firstText="Peso" secondText={`${weight}Kg`}/>
                      <CardInfo firstText="Experiencia" secondText={`${base_experience}`}/>
                      
                    </View>
                    
                </View>
            </View>}
        </SafeAreaView>
     );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor:'#fff'
        
    },
    containerContent:{
      alignItems: 'center',
      backgroundColor:'#fff'
    },
    avatar:{
        width: 200,
        height: 200
    },
    title: {
        fontSize: 26,
        color: "#363636",
        textAlign:'center'
      },
      number: {
        fontSize: 18,
        color: textColor.number,
        textAlign:'center'
      },
      containerDetails:{
        flexDirection: 'column',
        justifyContent: 'flex-start',
        textAlign:'left',
        margin:10,
        color:textColor.white
      },
      chipContainer:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-around',
        padding:10
      },
      chip:{
        padding:2
      },
      containerCards:{
        display:'flex',
        flexDirection:'row',
      },
      card:{
        display:'flex',
        flexDirection:'column',
        padding:30,
        margin:5,
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center',
    },
    iconStats:{
      width: 60,
      height: 60
    },
    textInfo:{
      textAlign:'center',
      marginTop:5
    }
  });

export default Detalle;