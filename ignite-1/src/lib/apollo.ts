import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
    uri : 'https://api-sa-east-1.graphcms.com/v2/cl4oj5g8g0aaf01z4g9shbdne/master',
    cache : new InMemoryCache()
})