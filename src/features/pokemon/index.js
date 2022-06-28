import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity,  SafeAreaView } from 'react-native';

import { gql } from 'graphql-tag';
import { graphql } from '@apollo/client/react/hoc';
import SelectedPokemon from './selectedPokemon';
import { formatName } from "../../utils";

const Pokemon = (props) => {
  const [pokemonState, setPokemonState] = useState({ selectedPokemon: null });

  const onSelectItem = (item) => {
    setPokemonState({ selectedPokemon: item });
  };

  const { selectedPokemon } = pokemonState;
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{ flex: 1 }}>
        <View style={{flexDirection: 'column', flex: 0.5}}>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1}}>
              {props.pokemons && <FlatList
                data={props.pokemons.results}
                keyExtractor={(item, index) => item + index}
                renderItem={({item, index}) => {
                  return (
                    <TouchableOpacity onPress={() => { onSelectItem(item)} }>
                      <Text style={{borderWidth: 1, fontSize: 14, padding: 10}} key={item.id}>
                        {formatName(item.name)}
                        </Text>
                    </TouchableOpacity>
                  )
                }}
              />
              }
            </View>
          </View>
        </View>
        {selectedPokemon &&
          <View style={{flex: 0.5, alignItems: 'center'}}>
            <SelectedPokemon name={selectedPokemon.name} thumbnail={selectedPokemon.artwork} />
          </View>
        }
      </View>
    </SafeAreaView>
  )
};


const GetLotsOfPokemonQuery = gql`
  query GetLotsOfPokemon {
    pokemons(limit: 151, offset: 0) {
      count
      results {
        id
        name
        image
        artwork
      }
    }
  }
`;
const marshallData = ({ data }) => {
  if (data.loading) {
    return [];
  }
  return data;

};

export const queryGetLotsOfPokemon = graphql(GetLotsOfPokemonQuery, {
  props: marshallData,
});

export default queryGetLotsOfPokemon(Pokemon);