"use client";
import React, { useEffect } from "react";
import { addUserShareData } from "@/redux-store/features/socketShareDatasSlice";
import { useDispatch } from "react-redux";

import HomePage from "@/component/home-page/HomePage";

const ComponentContainer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const randomNumbers = Math.floor(10000 + Math.random() * 90000); // Generates a random 5-digit number
    const userName = "guest" + randomNumbers;
    const car = Math.floor(Math.random() * 5) + 1;
    dispatch(addUserShareData({ userName: userName, car: car }));
  }, [dispatch]);

  return <HomePage />;
};

export default ComponentContainer;
