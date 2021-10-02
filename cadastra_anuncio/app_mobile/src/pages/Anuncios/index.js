
import { useFocusEffect, useNavigation } from '@react-navigation/core';
import React, { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import api from '../../config/api';

import {Container, Header, ListAnuncios, Item, ItemImagem, ItemInfo, ItemTitle, ItemDescription, Description } from './styles'

export default function Anuncios(){

    const[anuncios, setAnuncios] = useState();
    const[endImagemIp, setEndImagemIp] = useState();
    const navigation = useNavigation();

    const getAnuncios = async () =>{
        try{
            const response = await api.get('/');
            setEndImagemIp(response.data.endImagemIp);
            setAnuncios(response.data.anuncios);

        }catch(err){
            Alert.alert("", "Erro: Nenhum anúnio encontrado, tente mais tarde.")
        }
    }

    useFocusEffect(
        useCallback(() =>{
            getAnuncios();
        }, [])
    )

    return(
        <Container>
            <Header>Listar Anúncios</Header>
            <ListAnuncios 
                data= { anuncios }
                
                renderItem = {({item}) =>(
                    <Item onPress={() =>{
                        navigation.navigate('Anuncio', {
                            anuncioId: item.id
                        })
                    }}>
                        <ItemImagem source={{ uri: endImagemIp + item.imagem }} />
                        <ItemInfo>
                            <ItemTitle>{item.titulo}</ItemTitle>
                            <ItemDescription>
                                <Description>{item.descricao}</Description>
                            </ItemDescription>
                        </ItemInfo>                        
                    </Item>
                )} keyExtractor = {anuncio => String(anuncio.id)}
            />
        </Container>    
    )
}