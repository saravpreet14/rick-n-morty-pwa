import "../styles/globals.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import { AppProps,NextWebVitalsMetric } from "next/app";
import Head from "next/head";
import { onError } from "@apollo/client/link/error";
import { Provider } from "next-auth/client";
// import axios from 'axios';
// import printReadings from '../readings.js'


const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql/",
  cache: new InMemoryCache(),
  // link: errorLink,
});

// const readingsDatabse = "https://rick-and-morty-22d4d-default-rtdb.firebaseio.com/PWA/CPU6x";

//  export function reportWebVitals(metric: NextWebVitalsMetric) {
//   if (['FCP', 'LCP', 'CLS', 'FID', 'TTFB'].includes(metric.name)) {
//     console.log(metric.name, metric.value);
//     axios.post(`${readingsDatabse}/${metric.name}.json`, metric.value);
//     printReadings(readingsDatabse + '.json');
//   }
//  }

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
