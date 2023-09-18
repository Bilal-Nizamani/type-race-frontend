import React from "react";
import RoomList from "@/component/manual-rooms/RoomList";
import Footer from "@/component/Footer";
import Navbar from "@/component/Navbar";

const rooms = () => {
  return (
    <>
      <Navbar /> <RoomList /> <Footer />
    </>
  );
};

export default rooms;
