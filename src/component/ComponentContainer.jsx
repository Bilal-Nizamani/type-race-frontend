"use client";
import React, { useEffect } from "react";
import { addUserShareData } from "@/redux-store/features/socketShareDatasSlice";
import { useDispatch } from "react-redux";

import HomePage from "@/component/home-page/HomePage";

const ComponentContainer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const userName = "guest" + Math.random();
    const car = Math.floor(Math.random() * 6) + 1;
    dispatch(addUserShareData({ userName: userName, car: car }));
  }, [dispatch]);

  return <HomePage />;
};

export default ComponentContainer;
