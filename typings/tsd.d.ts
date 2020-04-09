interface Creep {
  run(): void;
}

interface CreepMemory {
  building: boolean;
  needResource: boolean;
  node: Source;
}

interface RoomMemory {
  nodes: Array;
}

interface Structure {
  store: Store;
}
