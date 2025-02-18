// "use client";
"use server";
import { DialogDemo } from "@/components/category";
import { auth } from "@clerk/nextjs/server";

import Categorybox from "@/components/category-box";

//
export default async function Home() {
  const { userId } = await auth();
  // const getData = async () => {
  //   try {
  //     const api_ = process.env.API_URL;
  //     const res = await axios.get(`${api_}/67b1f27be3091bcb54f62091`);
  //     const data = await res.data;
  //     console.log(res.status);
  //     console.log(data);
  //     return data;
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //     throw error;
  //   }
  // };
  const getCategories = async () => {
    try {
      const api_ = process.env.API_URL;
      const origin = process.env.ORIGIN_URL;
      const req_type = "get";
      const res = await fetch(api_ || "", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Origin: origin || "",
        },
        body: JSON.stringify({
          user_id: userId,
          req_type,
        }),
      });
      const data = await res.json();
      return data?.docs;
    } catch (error) {
      console.log(error);
    }
  };
  // const data_ = await getData();
  const category_data = await getCategories();
  // console.log(userId);
  // console.log(abc);
  return (
    <div className="max-w-screen-md m-auto min-h-[92vh] mt-[8vh] flex flex-col p-4">
      <div className="flex justify-between">
        <p className="text-start text-4xl">Categories</p>
        <DialogDemo user_id={userId || ""} />
      </div>
      <div className="grid sm:grid-cols-2  mt-6 items-center  w-full">
        {category_data?.map((category) => (
          <Categorybox
            key={category.id}
            name={category.category_name}
            id={category.id}
            user_id={userId || ""}
          />
        ))}
      </div>
    </div>
  );
}
