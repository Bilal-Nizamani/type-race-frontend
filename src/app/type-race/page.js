"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/component/Navbar";
import Footer from "@/component/Footer";
import RaceGameContainer from "@/component/home-page/RaceGameContainer";

const typeRace = () => {
  return (
    <div>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <RaceGameContainer />
      </main>
      <Footer />
    </div>
  );
};

export default typeRace;
