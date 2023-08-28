// 'use client'

// import socket from '@/config/socket';
// import {  useEffect, useState } from 'react';

// const RealTimeComponent = () => {
//   const [roomData, setRoomData] = useState({roomName:'',userName:''})
//   const [roomCreatedMessage, setRoomCreatedMessage] = useState()

//   const createRoomHandler = ()=>{
//     // if(roomData.roomName.length>1, roomData.userName.length>1){
//     //   socket.emit('create_room',roomData)
      
//     // }else{alert('fill the data')}
//     socket.emit('user_ready_to_play','i am wiaint' )
//   }
//   const roomNameHandler = (e)=>{
//     setRoomData((old)=> { return {...old,roomName:e.target.value}})
//   }
//   const userNameHandler = (e)=>{
//     setRoomData((old)=> { return {...old,userName:e.target.value}})
//   }

//   useEffect(() => {

//    socket.on('match_found', (room)=>{
//     console.log('found this ',room)
//    })
  
//     socket.on('room_created',(roomConfirmation)=>{
//     setRoomCreatedMessage(roomConfirmation)
//     })

//     // Clean up the socket connection on component unmount
//     return () => {
//       socket.of(room_created,roomConfirmation)
//       socket.disconnect();
//     };
//   }, []);



//   return (
//     <div className="container flex flex-col justify-center max-w-[600px] mx-auto p-5">
//       {/* {roomCreatedMessage && (
//         <div className="bg-green-200 text-green-800 p-2 rounded mb-4">{roomCreatedMessage}</div>
//       )} */}
//       <input
//         className="w-full px-3 py-2 border rounded mb-2"
//         value={roomData.roomName}
//         onChange={roomNameHandler}
//         placeholder="Room Name"
//       />
//       <input
//         className="w-full px-3 py-2 border rounded mb-2"
//         value={roomData.userName}
//         onChange={userNameHandler}
//         placeholder="Your Name"
//       />
//       <button
//         className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
//         onClick={createRoomHandler}
//       >
//       Play Game
//       </button>
//       <div className="mt-4">

//       </div>
//     </div>
//   );
// };

// export default RealTimeComponent;
