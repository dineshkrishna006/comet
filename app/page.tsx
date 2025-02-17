"use client";
import { DialogDemo } from "@/components/category";
import axios from "axios";
import { useEffect, useState } from "react";
export default function Home() {
  const [data_, setData] = useState([]);
  const getData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3001/api/category/67b1f27be3091bcb54f62091"
      );
      const data = await res.data;
      setData(data);
      console.log(res.status);
      console.log(data_);
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="max-w-screen-md m-auto min-h-[92vh] mt-[8vh] flex flex-col p-4">
      <div className="flex justify-between">
        <p className="text-start text-4xl">Categories</p>
        <DialogDemo />
      </div>
      {/* <p>{data_?.id || "hello"}</p> */}
    </div>
  );
}
