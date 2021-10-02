import React, { useState, useContext } from 'react';
import {Alert, Image, ScrollView} from 'react-native';
import { Container, Logo, Input, ButtomForm, TextForm } from './style';

import { useNavigation } from '@react-navigation/native';
import {AuthContext} from '../../contexts/auth'

import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../../config/api'


export default function Login(){

    const {signIn} = useContext(AuthContext);

    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    // const navigation = useNavigation();

    
    const handleLogin = async () =>{
        const headers = {
            'Content-Type': 'application/json'
        }   
        await api.post("/login", {usuario, senha}, {headers})
        .then((res) =>{
            if (res.data.erro) {
                Alert.alert("", res.data.message);
            } else {
                AsyncStorage.setItem("@token", res.data.token)
                signIn();
                // navigation.navigate("Dashboard");
            } 
        })
        .catch(() =>{
            Alert.alert("", "Tente mais tarde.")
        })
    }

    return(
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <Container>
                <Logo>
                    <Image source={require('../../assets/favicon.png')} />
                </Logo>

                <Input placeholder="Usuário" autoCorrect={false} keyboardType="email-address"
                autoCapitalize="none" onChangeText={text => setUsuario(text)}/>
                <Input placeholder="Senha" autoCorrect={false}  autoCapitalize="none"
                secureTextEntry={true} onChangeText={text => setSenha(text)}/>
                
                <ButtomForm onPress={handleLogin}>
                    <TextForm>
                        Acessar
                    </TextForm>
                </ButtomForm>
            </Container>
        </ScrollView>
    )
}