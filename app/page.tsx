import { DialogDemo } from "@/components/category";
import { get } from "http";

export default async function Home() {
  const getData = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/categories");
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  getData();
  // const { userId } = await auth();
  return (
    <div className="max-w-screen-md m-auto min-h-[92vh] mt-[8vh] flex flex-col p-4">
      <div className="flex justify-between">
        <p className="text-start text-4xl">Categories</p>
        <DialogDemo />
      </div>
    </div>
  );
}
