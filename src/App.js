import { useState } from 'react';
import './App.css';
import Map from './components/Map';
import Map2 from './components/Map2';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, } from 'react-instantsearch';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax


const searchClient = algoliasearch(
  process.env.REACT_APP_ALGOLIA_API_ID,
  process.env.REACT_APP_ALGOLIA_API_KEY
);


function App() {
 
  return (
    <InstantSearch indexName="epwhyc_users" searchClient={searchClient}>
      <Map /> 
    </InstantSearch>
  );
}

export default App;
