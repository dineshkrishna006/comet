"use client";
import { Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
// import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { deleteCategory } from "@/actions/category";
export default function Categorybox({
  name,
  id,
  user_id,
}: {
  name: string;
  id: string;
  user_id: string;
}) {
  const router = useRouter();
  const handleDelete = async () => {
    try {
      const res = await deleteCategory(user_id, id);
      if (res.status === 200) {
        toast.success("Deleted successfully");
      } else {
        toast.error("Couldn't delete");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      console.log("Error in deleting category");
      toast.error("Couldn't delete");
    } finally {
      router.refresh();
    }
  };
  return (
    <div className="m-2 border rounded-md p-2">
      <div className="flex justify-between items-center">
        <Link className="w-[90%]" href={`/${name}/${id}`}>
          <p className="text-2xl font-mono text-black">{name}</p>
        </Link>
        <Button
          className="p-1 h-8 w-8 rounded-md z-30 hover:cursor-grab"
          onClick={handleDelete}
        >
          <Trash2 size={20} />
        </Button>
      </div>
    </div>
  );
}
