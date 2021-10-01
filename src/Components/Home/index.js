import React, {useState, useEffect,useRef} from 'react';
import { 
    FlatList, 
    StyleSheet, 
    Text, 
    View, 
    StatusBar, 
    Image, 
    SafeAreaView, 
    TouchableOpacity 
} from 'react-native';
import { Card } from 'react-native-paper';
import { apiPromise } from '../../utils';
import EmptyList from '../EmptyList';
import SearchBar from '../SearchBar';
import Button from '../Button';

import {URI_SRC_IMG} from '../../utils/constants'

  const Home = ({navigation}) => {
    const [pokemons, setPokemons] = useState([]);
    const [offset, setOffset] = useState(0);
    const [limitPokemons, setLimitPokemons] = useState(20)
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage ] = useState('');
    const [auxPokemons, setAuxPokemons] = useState([])

    useEffect(() => {
        getPokemons()
      }, [offset]);
    const revertir = () => setPokemons(auxPokemons)
    const getPokemons = () => {
      setIsLoading(true);

        apiPromise(`pokemon/?offset=${offset}&limit=${limitPokemons}`,{})
            .then(getSuccess)
            .catch(getFail)
    };

    
    const getSuccess = (res) => {  
      if(pokemons.length == 1) return
      const nuevos = [...pokemons, ...res.results]
      setPokemons(nuevos);
      setAuxPokemons(nuevos)
      setIsLoading(false);
    }

    const getFail = () => {
      setPokemons([])
      setErrorMessage("No pudimos obtener tu pokemon, intenta realizar otra busqueda.")
      setIsLoading(false);
    }

    const renderItem = ({ item, index }) => {
        const uriPokemon = item.sprites ? item.sprites.front_default :`${URI_SRC_IMG}${index +1}.png`;

        return (
              <TouchableOpacity onPress={() => navigation.navigate('Detalle', {
                  item,
                  uriPokemon,
                  index
              })}>
                <Card style={styles.card}>
                  <View>
                      <Image style={styles.itemImageStyle} source={{ uri: uriPokemon }} />
                          <Text style={{textAlign:'center'}}>{`${item.name}`}</Text>
                      </View>
                </Card> 
              </TouchableOpacity>
          
        );
    };

    const loadMoreItem = () => {
      setOffset(offset + limitPokemons);
    };

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="#000" />
        <SearchBar 
          setPokemons={setPokemons} 
          getFail={getFail} 
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          setErrorMessage={setErrorMessage}/>
          <View style={{flex:1, padding: 5}}>
              <FlatList
                  numColumns={3}
                  initialNumToRender={151} 
                  data={pokemons}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={renderItem}
                  onEndReached={loadMoreItem}
                  onEndReachedThreshold={0.5}
                  ListEmptyComponent={
                  <EmptyList 
                    error={errorMessage} 
                    revertir={revertir} 
                    isLoading={isLoading}
                  />}
              />
              { pokemons.length == 1 && <Button
                onPress={revertir}
                text="Ver todos los pokemons"/>
              }
          </View>
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        marginTop:StatusBar.currentHeight
    },
    heading: {
        fontSize: 32,
        color: "#363636"
      },
      subHeading: {
        fontSize: 16,
        color: 'grey',
      },
    itemImageStyle: {
      width: 100,
      height: 100,
    },
    loaderStyle: {
      marginVertical: 16,
      alignItems: "center",
    },
    search:{
        padding:5,
        margin:5
    },
    card:{
        flex:1,
        padding:10,
        margin:5,
        backgroundColor:'#fff',
        borderRadius:10,
        alignItems:'center',
        justifyContent:'center',
        textAlign:'center'
    }
  });
 
export default Home;