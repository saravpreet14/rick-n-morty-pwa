import "../styles/globals.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";
import { AppProps,NextWebVitalsMetric } from "next/app";
import Head from "next/head";
import { onError } from "@apollo/client/link/error";
import { Provider } from "next-auth/client";
import axios from 'axios';
// const client = new ApolloClient({
//   uri: "https://48p1r2roz4.sse.codesandbox.io",
//   cache: new InMemoryCache(),
// });

const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql/",
  cache: new InMemoryCache(),
  // link: errorLink,
});


export function reportWebVitals(metric: NextWebVitalsMetric) {
  switch (metric.name) {
    case 'FCP':
      console.log("FCP",metric);
      axios.post(`https://ricky-and-morty-project-default-rtdb.asia-southeast1.firebasedatabase.app/NextApp/${metric.name}.json`, metric.value);
      break
    case 'LCP':
      // handle LCP results
      console.log("LCP",metric);
      axios.post(`https://ricky-and-morty-project-default-rtdb.asia-southeast1.firebasedatabase.app/NextApp/${metric.name}.json`, metric.value);
      break
    case 'CLS':
      // handle CLS results
      console.log("CLS",metric);
      axios.post(`https://ricky-and-morty-project-default-rtdb.asia-southeast1.firebasedatabase.app/NextApp/${metric.name}.json`, metric.value);
      break
    case 'FID':
      // handle FID results
      console.log("FID",metric);
      axios.post(`https://ricky-and-morty-project-default-rtdb.asia-southeast1.firebasedatabase.app/NextApp/${metric.name}.json`, metric.value);
      break
    case 'TTFB':
      // handle TTFB results
      console.log("TTFB",metric);
      axios.post(`https://ricky-and-morty-project-default-rtdb.asia-southeast1.firebasedatabase.app/NextApp/${metric.name}.json`, metric.value);
      break
    default:
      break
  }
  
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider session={pageProps.session}>
      <ApolloProvider client={client}>        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
          />
          <meta name="description" content="Description" />
          <meta name="keywords" content="Keywords" />
          <title>Next.js PWA Example</title>

          <link rel="manifest" href="/manifest.json" />
          <link
            href="/icons/favicon-16x16.png"
            rel="icon"
            type="image/png"
            sizes="16x16"
          />
          <link
            href="/icons/favicon-32x32.png"
            rel="icon"
            type="image/png"
            sizes="32x32"
          />
          <link rel="apple-touch-icon" href="/apple-icon.png"></link>
          <meta name="theme-color" content="#317EFB" />
        </Head>
        <Component {...pageProps} />
      </ApolloProvider>
    </Provider>
  );
}

export default MyApp;
