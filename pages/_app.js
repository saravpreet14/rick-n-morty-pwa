import "../styles/globals.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { Provider } from "next-auth/client";
// const client = new ApolloClient({
//   uri: "https://48p1r2roz4.sse.codesandbox.io",
//   cache: new InMemoryCache(),
// });

const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql/",
  cache: new InMemoryCache(),
  // link: errorLink,
});

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </Provider>
  );
}

export default MyApp;
