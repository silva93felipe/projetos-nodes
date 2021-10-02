import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import Anuncios from './pages/Anuncios';
import Anuncio from './pages/Anuncio';


export default function Rotas(){

    const screenOptionsStyle = {
        headerStyle: {
            backgroundColor: '#050c3d' 
        },

        headerTintColor: '#00a1fc',
        headerBackTitle: "Voltar"
    } 
    
    return(
        <NavigationContainer>
            <Stack.Navigator screenOptions={screenOptionsStyle}>
                <Stack.Screen name='Anuncios' component={ Anuncios } />
                <Stack.Screen name='Anuncio' component={ Anuncio } />
            </Stack.Navigator>
        </NavigationContainer>
    )
}