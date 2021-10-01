import React, {useState, useEffect, useRef} from 'react';
import { Searchbar } from 'react-native-paper';
import { 
    StyleSheet
} from 'react-native';
import { apiPromise } from '../../utils';
import LoadingIndicator from '../LoadingIndicator';

const SearchBar = ({ setPokemons, getFail, setIsLoading }) => {

    const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeSearch = query => setSearchQuery(query);

    const searchInput = () => {
        if(!searchQuery) return

        setIsLoading(true)

        apiPromise(`pokemon/${searchQuery.toLowerCase()}`, {})
            .then(getSuccessPokemon)
            .catch(() => {
                setSearchQuery('')
                getFail()
            })
    }

    const getSuccessPokemon = (res) => {
        setIsLoading(false)

        if (res !== undefined) {
            setPokemons([{name: res.name, sprites: res.sprites, id:res.id}]);
        }
    }

    return ( 
        <Searchbar 
            placeholder="Busca tu pokemon"
            onIconPress={searchInput}
            onChangeText={onChangeSearch}
            value={searchQuery}
            style={styles.search}
        />
     );
}


const styles = StyleSheet.create({
    search:{
        padding:5,
        margin:5
    }
  });
 
export default SearchBar;