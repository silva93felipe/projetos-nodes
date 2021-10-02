import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './Pages/Home'
import Editar from './Pages/Editar';

const Stack = createStackNavigator();

export default function Routes() {
    const screenOptionsStyle = {
        headerStyle: {
            backgroundColor: "#007280"
        },
        headerTintColor: "#f1f1f1",
        headerBackTitle: "Voltar",
    }

    return(
        <NavigationContainer>
            <Stack.Navigator screenOptions={screenOptionsStyle}>
                <Stack.Screen name="Home" component={Home} /> 
                <Stack.Screen name="Editar" component={Editar} /> 
            </Stack.Navigator>
        </NavigationContainer>
    )
}