'use client'
import { useEffect, useState } from 'react';
import socket from '@/config/socket';

const RealTimeComponent = () => {
  const [rcvNumber, setRcvNumber] = useState('');

  useEffect(() => {
    const handleReceiveMessage = ({ number }) => {
      console.log('Received:', number);
      setRcvNumber(number);
    };

    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('receive_message', handleReceiveMessage);

    // Clean up the socket connection on component unmount
    return () => {
      socket.off('receive_message', handleReceiveMessage);
      socket.disconnect();
    };
  }, []);

  const sendRandomValue = () => {
    socket.emit('randomNumber', { rdmNumber: Math.random() });
  };

  return (
    <div>
      <p>Real-time component</p>
      <div> Yes I am the number {rcvNumber} </div>
      <button onClick={sendRandomValue}> Get random Number</button>
    </div>
  );
};

export default RealTimeComponent;
