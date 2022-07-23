import { useState } from 'react'
import {VStack, Heading, Icon, useTheme} from 'native-base'
import { Alert } from 'react-native'

import {Envelope, Key} from 'phosphor-react-native'
import auth from '@react-native-firebase/auth'

import Logo from '../assets/logo_primary.svg'
import { Input } from '../Components/Input'
import { Button } from '../Components/Button'

export function SignIn() {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {colors} = useTheme();
    const [isLoading,setIsLoading] = useState(false);

    function handleSignIn(){
        if(!email || !password ) {
            return Alert.alert('Entrar', 'Informe Email e Senha')
        }

        setIsLoading(true);

        auth()
        .signInWithEmailAndPassword(email,password)
        .catch((error) =>{
            console.log(error);
            setIsLoading(false);

            if(error.code === 'auth/invalid-email'){
                return Alert.alert('Entrar', 'Email invalido.')
            }

            if(error.code === 'auth/user-not-found'){
                return Alert.alert('Entrar', 'Usuario não cadastrado.')
            }

            return Alert.alert('Entrar', 'Error ao acessar')
        });
    }

    return(
        <VStack flex={1} alignItems='center' bg="gray.600" px={8} pt={24} >
            <Logo />
            <Heading color="gray.100" fontSize='xl' mt={20} mb={6} >
                Acesse sua conta {email}
            </Heading>

            <Input placeholder='E-mail' mb={4} InputLeftElement={<Icon as={<Envelope color={colors.gray[300]} />} ml={4}  />} 
            onChangeText={setEmail}/>
            <Input placeholder='Senha' mb={8} InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} ml={4}  />} secureTextEntry
            onChangeText={setPassword} />

            <Button title="Entrar" w="full" onPress={handleSignIn} isLoading={isLoading}/>

        </VStack>
    )
}
