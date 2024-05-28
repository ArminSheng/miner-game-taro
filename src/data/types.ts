export type Asteroid = {
  _id: string;
  name: string;
  position: Position;
  minerals: number;
  status: number;
  currentMiner?: Miner;
};

export type Planet = {
  _id?: string;
  name: string;
  position: Position;
  minerals: number;
  miners: number;
};

export type Miner = {
  _id?: string;
  name: string;
  planet: Planet;
  x: number;
  y: number;
  target: Asteroid;
  angle: number;
  carryCapacity: number;
  travelSpeed: number;
  miningSpeed: number;
  status: number;
  minerals: number;
  targetType?: string;
};

export type MinerCreation = Omit<Miner, "planet" | "target"> & {
  planet: string;
  target: string;
};

export type History = {
  _id: string;
  year: number;
  planet: string;
  capacity: {
    current: number;
    max: number;
  };
  speed: {
    travel: number;
    mining: number;
  };
  position: Position;
  status: number;
  miner: Miner;
  updatedAt: string;
};

export type Position = {
  x: number;
  y: number;
};

export type TickData = {
  asteroids: Asteroid[];
  planets: Planet[];
  miners: Miner[];
  currentTick: number;
};

export const MinerStatuses = ["Idle", "Traveling", "Mining", "Transfering"];
export const HistoryStatuses = [
  "Idle",
  "Traveling to asteroid",
  "Mining",
  "Traveling back to planet",
  "Transferring to planet",
];
