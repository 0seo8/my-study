import axios, { AxiosResponse } from "axios";
import { useQueries, UseQueryResult } from "react-query";

import { Ability, AbilityResponse } from "../types";

type ReturnType = AxiosResponse<AbilityResponse>;

const useAbilites = (
  abilites: Array<Ability>
): Array<UseQueryResult<ReturnType, Error>> => {
  const queries = abilites.map(({ ability }, idx) => ({
    queryKey: ["ability", idx],
    queryFn: () => axios.get(ability.url),
  }));

  return useQueries(queries) as Array<
    UseQueryResult<AxiosResponse<AbilityResponse>, Error>
  >;
};

export default useAbilites;
