interface Creep {
  run(): void;
}

interface CreepMemory {
  role: string | undefined;
  building?: boolean | undefined;
  needResource?: boolean | undefined;
  node?: Source | undefined;
}

interface RoomMemory {
  nodes: Array;
}

interface Structure {
  store: Store;
}
