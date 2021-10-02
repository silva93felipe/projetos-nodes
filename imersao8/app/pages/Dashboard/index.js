import React, { useContext } from 'react';
import { ScrollView, Text } from 'react-native';
import { ButtomSignOut, Container, TextSignOut } from './style';
import {AuthContext} from '../../contexts/auth'

export default function Dashboard() {

    const {signOut } = useContext(AuthContext)

    return(
        <ScrollView contentContainerStyle={{
            flexGrow: 1
        }} >
            <Container>
                <Text>
                    Dashboard
                </Text>
                <ButtomSignOut onPress={() =>
                signOut()}>
                    <TextSignOut>
                        Sair
                    </TextSignOut>
                </ButtomSignOut>
            </Container>
        </ScrollView>
    )
}