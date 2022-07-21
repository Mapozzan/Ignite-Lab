import { VStack } from 'native-base';
import { Header } from '../Components/Header';
import { useRoute } from '@react-navigation/native';7

type RouteParams = {
    orderId: string;
}

export function Details() {

    const route = useRoute();
    const {orderId} = route.params as RouteParams;

    return (
        <VStack flex={1} bg="gray.700">
            <Header title='Soliciação' />
        </VStack>
    );
}