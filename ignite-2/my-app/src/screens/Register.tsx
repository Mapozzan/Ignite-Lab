import { VStack } from 'native-base';
import { useState } from 'react';


import { Header } from '../Components/Header';
import { Input } from '../Components/Input';
import { Button } from '../Components/Button';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import firestore from '@react-native-firebase/firestore';

export function Register() {

    const [isLoading,setIsLoading] = useState(false);
    const [patrimony, setPatrimony] = useState('');
    const [description, setDescription] = useState('');
    const navigation = useNavigation();

    function handleNewOrderRegister(){
        
        if(!patrimony || ! description) {
            return Alert.alert('Sair', 'Error de Logout.')
        }

        setIsLoading(true);

        firestore()
        .collection('orders')
        .add({
            patrimony,
            description,
            status: 'open',
            created_at: firestore.FieldValue.serverTimestamp()
        })
        .then(() =>{
            Alert.alert("Solicitação", "Solicitação registrada com sucesso.")
            navigation.goBack();
        })
        .catch((error) =>{
            setIsLoading(false);
            return Alert.alert('Solicitação', 'Não foi registrado a solicitação.')
        })
    }

    return (

<VStack flex={1} p={6} bg='gray.600'>
        <Header title='Nova Solicitação' />
        <Input placeholder='Numero do Patrimonio' mt={4} onChangeText={setPatrimony}/>
        <Input  placeholder='Descrição do Problema' flex={1} mt={5} multiline textAlignVertical='top' onChangeText={setDescription}/>
        <Button title='Cadastrar' mt={5} isLoading={isLoading} onPress={handleNewOrderRegister}/>
    </VStack>
    );
}