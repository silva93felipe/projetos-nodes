import React, { useMemo, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AuthContext } from './contexts/auth'

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

const Stack = createStackNavigator();

function routes() {

    const [token, setToken] = useState(null);

    const authContext = useMemo( () =>{
        return {
            signIn: async () => {
                const valToken = AsyncStorage.getItem("@token");
                setToken(valToken);
            },

            signOut: () =>{
                AsyncStorage.removeItem("@token");
                setToken(null)
            }
        }
    }, []);

    const getToken = async () =>{
        try {
            const valToken = await AsyncStorage.getItem("@token");
            console.log(valToken);
            if(valToken !== null){
                setToken(valToken)
            }
        } catch (error) {
            setToken(null)
        }
    }

    useEffect(() =>{
        getToken();
    }, [])

    return(
        <AuthContext.Provider value={authContext}>
            <NavigationContainer>
            <Stack.Navigator>
                {token ? (
                    <Stack.Screen name="Dashboard" component={Dashboard}/>    
                ): (
                    <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
                )}
                
            </Stack.Navigator>
        </NavigationContainer>
        </AuthContext.Provider>
        
    )
}

export default routes;