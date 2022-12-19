import React, { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import styled from "@emotion/styled";

import Tabs from "../components/Tabs";
import useSpecies from "../hooks/useSpecies";
import PokemonInfo from "../components/PokemonInfo";
import usePokemon from "../hooks/usePokemon";
import { PokemonResponse } from "../types";
import Stats from "../components/Stats";
import Evolution from "../components/Evolution";
import About from "../components/About";

type Params = {
  id: string;
};

type Tab = "about" | "stats" | "evolution";

const Container = styled.section`
  display: flex;
  flex-direction: column;
`;

const TabsWrapper = styled.div`
  margin: 24px auto 0;
`;

const DetailPage: React.FC = () => {
  const { id } = useParams<Params>();
  const [selectedTab, setSelectedTab] = useState<Tab>("about");

  const pokemonQueryResult = usePokemon<PokemonResponse>(id);
  const speciesResult = useSpecies(id);

  const { name, types, height, weight, abilities, baseExp, stats } = useMemo(
    () => ({
      name: pokemonQueryResult.data?.data.name,
      types: pokemonQueryResult.data?.data.types,
      height: pokemonQueryResult.data?.data.height,
      weight: pokemonQueryResult.data?.data.weight,
      abilities: pokemonQueryResult.data?.data.abilities,
      baseExp: pokemonQueryResult.data?.data.base_experience,
      stats: pokemonQueryResult.data?.data.stats,
    }),
    [pokemonQueryResult]
  );

  const {
    color,
    growthRate,
    flavorText,
    genderRate,
    isLegendary,
    isMythical,
    evolutionChainUrl,
  } = useMemo(
    () => ({
      color: speciesResult.data?.data.color,
      growthRate: speciesResult.data?.data.growth_rate.name,
      flavorText: speciesResult.data?.data.flavor_text_entries[0].flavor_text,
      genderRate: speciesResult.data?.data.gender_rate,
      isLegendary: speciesResult.data?.data.is_legendary,
      isMythical: speciesResult.data?.data.is_mythical,
      evolutionChainUrl: speciesResult.data?.data.evolution_chain.url,
    }),
    [speciesResult]
  );

  const handleClick = (tab: Tab) => {
    setSelectedTab(tab);
  };

  return (
    <Container>
      <PokemonInfo id={id} name={name} types={types} color={color} />
      <Tabs tab={selectedTab} onClick={handleClick} />
      {selectedTab === "about" && (
        <About
          isLoading={pokemonQueryResult.isLoading || speciesResult.isLoading}
          color={color}
          growthRate={growthRate}
          flavorText={flavorText}
          genderRate={genderRate}
          isLegendary={isLegendary}
          isMyhical={isMythical}
          types={types}
          weight={weight}
          height={height}
          baseExp={baseExp}
          abilites={abilities}
        />
      )}
      {selectedTab === "stats" && (
        <Stats
          isLoading={pokemonQueryResult.isLoading || speciesResult.isLoading}
          color={color}
          stats={stats}
        />
      )}
      {selectedTab === "evolution" && (
        <Evolution
          id={id}
          isLoading={speciesResult.isLoading}
          color={color}
          url={evolutionChainUrl}
        />
      )}
    </Container>
  );
};

export default DetailPage;
