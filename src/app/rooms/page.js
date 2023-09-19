"use client";
import React from "react";
import Footer from "@/component/Footer";
import Navbar from "@/component/Navbar";
import RoomListContainer from "@/component/manual-rooms/RoomListContainer";

const rooms = () => {
  return (
    <>
      <Navbar /> <RoomListContainer /> <Footer />
    </>
  );
};

export default rooms;
