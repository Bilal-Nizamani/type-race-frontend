import React from "react";
import SinglePlayer from "@/component/single-player/SinglePlayer";
import Navbar from "@/component/Navbar";
import Footer from "@/component/Footer";
const page = () => {
  return (
    <div>
      <Navbar />
      <SinglePlayer />
      <Footer />
    </div>
  );
};

export default page;
