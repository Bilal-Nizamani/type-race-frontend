import React from "react";

const CreateRoom = ({ getCreateRoomPopupDisplay }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    getCreateRoomPopupDisplay();
  };
  return (
    <div className="fixed inset-0 flex items-center shadow-lg justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-gray-800 rounded-lg p-6 w-96">
        <h2 className="text-2xl font-semibold text-white mb-4">
          Create a Room
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="roomName"
              className="block text-gray-300 font-medium mb-2"
            >
              Room Name
            </label>
            <input
              type="text"
              id="roomName"
              name="roomName"
              className="w-full bg-gray-600 border rounded-md px-3 py-2 text-white placeholder-gray-400 outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter room name"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-300"
            >
              Create Room
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRoom;
