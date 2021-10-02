import React, { useCallback, useState } from 'react';
import { Alert, Text, FlatList, TouchableOpacity } from 'react-native';
import {useNavigation ,useFocusEffect} from '@react-navigation/native'

import {formatNumber} from 'react-native-currency-input'
import moment from 'moment';
import api from '../../config/api'


export default function Home(){

    const navigation = useNavigation();

    const [lancamentos, setLancamentos] = useState("")

    const getLancamentos = async () =>{
        try {
            const res = await api.get("/listar/07/2021")
            setLancamentos(res.data.lancamentos)
        } catch (error) {
            Alert.alert("", "Erro: Nenhum lançamento encontrado. Tente novamente mais tarde.")
        }
    }   

    useFocusEffect(
        useCallback(()=>{
            getLancamentos()
        }, [])
    )

    return(
        <>
            <Text>Listar situação financeira</Text>
            <FlatList 
                data={lancamentos}
                renderItem={({item}) =>(
                    <>
                        <Text>{item.nome}</Text>
                        <Text>{item.tipo}</Text>
                        <Text>{item.situacao}</Text>
                        <Text>{moment(item.dataPagamento).format("DD/MM/YYYY")}</Text>
                        <Text>{formatNumber(item.valor, {
                            separator: ',',
                            prefix: "R$ ",
                            precision: 2,
                            delimiter: ".",
                            signPosition: "beforePrefix",
                        })}</Text>
                        <TouchableOpacity onPress={()=>{
                            navigation.navigate("Editar", {idLancamento: item.id})
                        }}>
                            <Text>Editar</Text>
                        </TouchableOpacity>
                    </>
                )}keyExtractor={lancamento => String(lancamento.id)}
            
            />
        </>
    )
}