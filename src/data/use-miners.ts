import { useMutation, useQuery } from "react-query";
import { Apis } from "./api";
import { Miner, MinerCreation } from "./types";

const minerKey = "miners";

export function useMiners({ planetId }: { planetId?: string }) {
  return useQuery<Miner[]>([minerKey, planetId], () => fetchMiners(planetId), {
    refetchInterval: 1000,
    enabled: !!planetId,
  });
}

type ValidationError = {
  kind: string;
  message: string;
  name: string;
  path: string;
};

export type CreationError = {
  errors: {
    carryCapacity: ValidationError;
    target: ValidationError;
    miningSpeed: ValidationError;
    travelSpeed: ValidationError;
    name: ValidationError;
  };
};

export function useMinersCreate(planetId: string) {
  const { data, ...rest } = useMutation<
    Miner | CreationError,
    CreationError,
    MinerCreation
  >(["miner-post", planetId], postMiners);

  return { data, ...rest };
}

function fetchMiners(planetId?: string) {
  return fetch(`${Apis.miners}?planetId=${planetId}`).then((res) => res.json());
}

function postMiners(params: MinerCreation): Promise<Miner> {
  return fetch(`${Apis.miners}`, {
    body: JSON.stringify(params),
    method: "post",
    headers: {
      "content-type": "application/json; charset=utf-8",
    },
  }).then((res) => res.json());
}
