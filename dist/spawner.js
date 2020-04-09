var spawner = {
  /**
   * Try to spawn a creep
   * @param  {number} role       [description]
   * @param  {string[]} attributes [description]
   * @param  {number} goal       [description]
   * @param  {string} spawnerId  [description]
   * @return {bool} Did it spawn
   */
  trySpawn: function(role, attributes, goal, spawnerId) {
    if (!Game.spawns[spawnerId].spawning) {
      var roleCount = _.filter(Game.creeps, creep => creep.memory.role == role);
      if (roleCount.length < goal) {
        if (
          Game.spawns[spawnerId].spawnCreep(attributes, {
            dryRun: true
          }) === 0
        ) {
          Game.spawns[spawnerId].spawnCreep(
            attributes,
            `${role}-${Game.time}`,
            {
              memory: { role: role }
            }
          );
          return true;
        }
      }
    }
    return false;
  }
};

module.exports = spawner;
