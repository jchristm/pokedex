import React from 'react';
import { View, Text, Image } from 'react-native';

import { gql } from 'graphql-tag';
import { graphql } from '@apollo/client/react/hoc';
import { formatName } from '../../utils';

const SelectedPokemon = (props) => {
  const { pokemon } = props;

  const renderTypes = (pokeTypes) => {
    let combinedTypeArray = [];
    pokeTypes.forEach((pType) => {
      combinedTypeArray.push(pType.type.name);
    });

    const combinedType = combinedTypeArray.join(", ");

    if(combinedTypeArray.length > 1) {
      return <Text>Types: {combinedType}</Text>
    }

    return <Text>Type: {combinedType}</Text>;
  }

  if(pokemon) {
    const { id, name, height, weight, types } = pokemon;
    return (
      <View>
        <Image
          style={{height: 200, width: 200}}
          source={{uri: props.thumbnail }}
        />
        <Text>Id: {id}</Text>
        <Text>Name: {formatName(name)}</Text>
        <Text>Height: {height}</Text>
        <Text>Weight: {weight}</Text>
        {renderTypes(types)}
      </View>
    )
  }

  return (
    <View/>
  )
};

const GetPokemonQuery = gql`
  query GetPokemon($name: String!) {
    pokemon(name: $name) {
      id
      name
      height
      weight
      types {
        type {
          name
        }
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

export const queryGetPokemon = graphql(GetPokemonQuery, {
  props: marshallData,
});

export default queryGetPokemon(SelectedPokemon);