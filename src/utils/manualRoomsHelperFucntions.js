const deleteRoom = (oldRooms, roomToDelete) => {
  const keys = [...oldRooms.keys];
  let updatedRooms = { ...oldRooms.rooms };
  const index = keys.indexOf(roomToDelete.id);
  keys.splice(index, 1);
  delete updatedRooms[roomToDelete.id];
  return { keys: keys, rooms: updatedRooms };
};

export { deleteRoom };
