const deleteRoom = (oldRooms, roomToDelete) => {
  let keys = [...oldRooms.keys];
  let updatedRooms = { ...oldRooms.rooms };
  keys.indexOf(roomToDelete.key);
  keys.splice(keys.indexOf(roomToDelete.key), 1);
  delete updatedRooms[roomToDelete.id];
  return { keys: keys, rooms: updatedRooms };
};

export { deleteRoom };
