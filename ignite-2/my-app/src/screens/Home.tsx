import { HStack, IconButton, VStack, useTheme, Text, Heading, FlatList, Center } from 'native-base';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import Logo from '../assets/logo_primary.svg'
import { SignOut, ChatTeardropText } from 'phosphor-react-native'

import { Filter } from '../Components/Filter';
import { Button } from '../Components/Button';
import { Order, OrderProps } from '../Components/Order';

export function Home() {

    const [statusSelected, setstatusSelected] = useState<'open' | 'closed'>('open');
    const [orders, setOrders] = useState<OrderProps[]>([])
    const { colors } = useTheme();
    const navigation = useNavigation();


    function handleNewOrder(){
        navigation.navigate('new')
    }

    function hanldeOpenDetails(orderId: string) {
        navigation.navigate('details',{orderId})
    }


    return (
        <VStack flex={1} pb={6} bg="gray.700">
            <HStack w="full" justifyContent="space-between" alignItems="center" bg="gray.700"
                pt={12} pb={5} px={6}>

                <Logo />
                <IconButton icon={< SignOut size={26} color={colors.gray[300]} />} />
            </HStack>

            <VStack flex={1} px={6}>
                <HStack w="full" mt={8} mb={4} justifyContent="space-between" alignItems="center">
                    <Heading color="gray.100"> Meus Chamados </Heading>
                    <Text color="gray.200"> 4 </Text>
                </HStack>

                <HStack space={3} mb={8}>
                    <Filter type='open' title='em andamento' onPress={() => setstatusSelected('open')} isActive={statusSelected === 'open'} />
                    <Filter type='closed' title='finalizados' onPress={() => setstatusSelected('closed')} isActive={statusSelected === 'closed'} />
                </HStack>

                <FlatList
                    data={orders}
                    keyExtractor= {item => item.id}
                    renderItem={({item}) => <Order data={item} onPress={() => hanldeOpenDetails(item.id)}/>}
                    contentContainerStyle ={{paddingBottom:100}}
                    ListEmptyComponent={() => (<Center>
                        <ChatTeardropText color={colors.gray[300]} size={40} />
                        <Text color="gray.300" fontSize="xl" mt={6} textAlign="center">Você não possui {'\n'} solicitações 
                        {statusSelected === 'open' ? 'em aberto' : 'finalizados'} </Text>
                    </Center>)}
                />

                <Button title='Nova solicitação' onPress={handleNewOrder} />
            </VStack>
        </VStack>
    );
}