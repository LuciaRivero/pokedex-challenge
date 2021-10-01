import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from '../Components/Home';
import Detalle from '../Components/Detalle';

const Stack = createNativeStackNavigator()
const styleHead = {
    title: "Pokedex",
    headerStyle: {
        backgroundColor: '#f4511e',
      },
    headerTintColor: '#fff',
    headerTitleStyle: {
        fontWeight: 'bold',
    },
    headerTitleAlign: 'center',
}
const MainStack = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown:true
                }}
                
            >
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={styleHead}
                />
                <Stack.Screen
                    name="Detalle"
                    component={Detalle}
                    options={styleHead}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MainStack;