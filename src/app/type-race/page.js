"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/component/Navbar";
import Footer from "@/component/Footer";
import RaceGameContainer from "@/component/home-page/RaceGameContainer";

const typeRace = () => {
  return (
    <div>
      <Navbar />
      <RaceGameContainer />
      <Footer />
    </div>
  );
};

export default typeRace;
