import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import AppLoading from 'expo-app-loading';
import { BatchHttpLink } from "@apollo/client/link/batch-http";

import configureStore from './store';
import MainApp from './src/components/MainApp';

/* NOTE: Class component part of an older boilerplate that hasn't been updated */
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      client: null,
      store: null,
    };

    this.loadingApp = this.loadingApp.bind(this);
    this.initializeSettings = this.initializeSettings.bind(this);
  }

  async loadingApp() {
    const thunkExtraArgument = { client: null, history: null };
    const store = configureStore(thunkExtraArgument);

    const link = new BatchHttpLink({
      uri: 'https://graphql-pokeapi.vercel.app/api/graphql',
    });
    const cache = new InMemoryCache();

    const defaultOptions = {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
        errorPolicy: 'all',
      },
      query: {
        fetchPolicy: 'network-only',
        errorPolicy: 'all',
      },
    };

    const client = new ApolloClient({ link, cache, defaultOptions });

    thunkExtraArgument.client = client;
    return { client, store };
  }

  initializeSettings() {
    Promise.resolve(this.loadingApp()).then(({ client, store }) => {
      this.setState({ isReady: true, client, store });
    });
  }

  render() {
    const { store, client, isReady } = this.state;

    if (!isReady) {
      return (
        <AppLoading
          startAsync={this.initializeSettings}
          onFinish={() => { console.log('loading complete'); }}
          onError={console.warn}
        />
      );
    }

    return (
      <ApolloProvider client={client}>
        <Provider store={store}>
          <MainApp />
        </Provider>
      </ApolloProvider>
    );
  }
}


