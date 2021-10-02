import React, { useCallback, useState  } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native'
// import { useFocusEffect, useNavigation } from '@react-navigation/core';
import { Alert, Text } from 'react-native';

import { Container, TituloAnuncio, DescricaoAnuncio, ImagemAnuncio} from './styles'
import api from '../../config/api';

export default function Anuncio({route}){

    const [ anuncio, setAnuncio ] = useState('');
    const [ endImagemIp, setImagemIp ] = useState();

    const navigation = useNavigation();

    const getAnuncio = async() =>{
        try {
            const { anuncioId } = route.params;
            const response = await api.get('/visualizar/' + anuncioId);
            setImagemIp(response.data.endImagemIp);
            setAnuncio(response.data.anuncio);
        } catch (error) {
            if(error){
                Alert.alert("", error.response.data.message);
                navigation.navigate('Anuncios');
            }else{
                Alert.alert("", "Anúncio não encontrado, tente novamente.");
                navigation.navigate('Anuncios');
            }
            
        }
    }

    useFocusEffect(
        useCallback(() =>{
            getAnuncio();
        }, []) 
    )
    return(
        <Container>
            <ImagemAnuncio source={{uri: endImagemIp }}/>
            <TituloAnuncio>{anuncio.titulo}</TituloAnuncio>
            <DescricaoAnuncio>{anuncio.descricao}</DescricaoAnuncio>
            
        </Container>
        
    )
}