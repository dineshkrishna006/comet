"use client";

import { Pencil, Trash2, Clipboard, PencilOff } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { deleteBookmark, updateBookmar } from "@/actions/bookmark";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "./ui/input";
// import { useState } from "react";

export default function Bookmarkbox({
  id,
  title,
  url,
  category_id,
}: {
  id: string;
  title: string;
  url: string;
  category_id: string;
}) {
  const router = useRouter();
  const [url_, setUrl_] = useState(url);
  const [isediting, setisEditing] = useState(false);
  const handleDelete = async () => {
    try {
      const res = await deleteBookmark(id, category_id);
      if (res.status === 200) {
        toast.success("Deleted bookmark");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log("Error in deleting bookmark", error);
      toast.error("Internal error");
    } finally {
      router.refresh();
    }
  };
  const handleUpdate = async () => {
    try {
      const res = await updateBookmar(url_, id);
      if (res.status === 200) {
        toast.success("Updated bookmark");
        router.refresh();
      } else {
        toast.error("Something we wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to Update");
    } finally {
      setisEditing(false);
    }
  };
  return (
    <div className="m-2 border flex flex-col gap-2 rounded-md p-2">
      <div className="flex items-center justify-between">
        <p className="text-2xl font-light w-[75%] truncate">{title}</p>
        <div className="flex gap-2">
          <Button
            className="p-1 h-8 w-8 rounded-md z-30 hover:cursor-grab"
            onClick={() => setisEditing(!isediting)}
          >
            {isediting ? <PencilOff size={20} /> : <Pencil size={20} />}
          </Button>
          <Button
            className="p-1 h-8 w-8 rounded-md z-30 hover:cursor-grab"
            onClick={handleDelete}
          >
            <Trash2 size={20} />
          </Button>
        </div>
      </div>

      {isediting ? (
        <div className="flex flex-col items-start gap-2">
          <Input
            value={url_}
            onChange={(e) => {
              setUrl_(e.target.value);
            }}
          />
          <Button
            disabled={url_ === url}
            className="hover:cursor-grab py-1 px-2 rounded"
            onClick={() => {
              handleUpdate();
            }}
          >
            Save Changes
          </Button>
        </div>
      ) : (
        <div className="flex items-center justify-between gap-2 ">
          <textarea
            disabled
            rows={1}
            className="border p-1 w-[90%] rounded"
            value={url}
          ></textarea>
          <Button
            className="p-1 h-8 w-8 rounded-md z-30 hover:cursor-grab"
            onClick={() => {
              navigator.clipboard.writeText(url);
              toast.success("Copied to clipboard");
            }}
          >
            <Clipboard size={20} />
          </Button>
        </div>
      )}
    </div>
  );
}
