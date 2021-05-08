import React from 'react';
import './App.css';
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import SearchCountries from './components/SearchCountries';
import SearchBar from './components/SearchBar';

function App() {
  const client = new ApolloClient({
    uri: process.env.REACT_APP_API_URL,
    cache: new InMemoryCache(),
  });

  console.log(process.env.REACT_APP_API_URL);

  return (
    <ApolloProvider client={client}>
      <div>
        <SearchBar />
      </div>
    </ApolloProvider>
  );
}

export default App;
