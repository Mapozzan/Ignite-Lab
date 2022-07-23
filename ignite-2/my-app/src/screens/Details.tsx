import { HStack, useTheme, VStack,Text, ScrollView } from 'native-base';
import { useRoute,useNavigation } from '@react-navigation/native';
import { useState,useEffect, } from 'react';


import { Header } from '../Components/Header';
import { Input } from '../Components/Input';
import { Button } from '../Components/Button';
import { OrderProps } from '../Components/Order';
import { CardDetails } from '../Components/CardDetails';
import { OrderDto } from '../DTOs/OrderDto'
import { Loading } from '../Components/Loading';

import { CircleWavyCheck,DesktopTower,Hourglass,Clipboard } from 'phosphor-react-native';

import firestore from '@react-native-firebase/firestore';
import { dateFormat } from '../utils/firestoreDateFormat';
import { Alert } from 'react-native';

type RouteParams = {
    orderId: string;
}

type OrderDetails = OrderProps & {
    description: string;
    solution : string;
    closed : string;
}

export function Details() {

    const [order, setOrder] = useState<OrderDetails>({} as OrderDetails);
    const [isLoading,setIsLoading] = useState(true);
    const [solution,setSoltion] = useState(true);

    const {colors} = useTheme();

    const route = useRoute();
    const {orderId} = route.params as RouteParams;
    const navigation = useNavigation();


    function handleOrderClosed(){
        if(!solution){
            return Alert.alert("Solicitação","Informa a solução para encerrar")
        }
        firestore()
        .collection<OrderDto>('ordes')
        .doc(orderId)
        .update({
            status : "closed",
            closed_at : firestore.FieldValue.serverTimestamp()
        })
        .then(() =>{
            Alert.alert('Solicitação'," Solicitação encerrada")
            navigation.goBack()
        })
    }

    useEffect(() => {
        firestore()
        .collection<OrderDto>('orders')
        .doc(orderId)
        .get()
        .then((doc) =>{
            const {patrimony, description,status,created_at,closed_at,solution} = doc.data();

            const closed = closed_at ? dateFormat(closed_at) : null;

            setOrder({
                id: doc.id,
                patrimony,
                description,
                status,
                solution,
                when : dateFormat(created_at),
                closed
            });

            setIsLoading(false)
        })
    },[])

    if(isLoading){
        return<Loading />
    }

    return (
        <VStack flex={1} bg="gray.700">
            <Header title='Soliciação' />

            <HStack bg="gray.500" justifyContent="center" p={4}> 
                {
                    order.status ===  'closed'
                    ? <CircleWavyCheck size={22} color={colors.green[300]} />
                    : <Hourglass size={22} color={colors.secondary[700]} />
                }
                <Text fontSize="sm" ml={2} textTransform="uppercase"> {order.status ==='closed' ? 'finalizado' : 'em andamento'} </Text>
                
            </HStack>

            <ScrollView mx={5} showsHorizontalScrollIndicator={false}>
                <CardDetails title='equipamento' description={`Patrimonio ${order.patrimony}`} icon={DesktopTower} footer={order.when}/>
                <CardDetails title='Descrição do problema' description={order.description} icon={Clipboard} />
                <CardDetails title='Solução' description={order.description} icon={CircleWavyCheck} footer={order.closed && `Encerrado em ${order.closed}`}
                >
                    {
                        order.status === "open" &&
                        <Input placeholder='Descrição da solução' h={24} multiline textAlignVertical='top'/>
                    }
                </CardDetails>
            </ScrollView>

            {
                order.status === 'open' && <Button title='Encerrar solicitação' margin={5} onPress={handleOrderClosed} />
            }
        </VStack>
    );
}