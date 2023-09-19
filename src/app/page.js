"use client";
import Navbar from "@/component/Navbar";
import Footer from "@/component/Footer";
import { useEffect } from "react";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-between p-24"></main>
      <Footer />
    </>
  );
}
