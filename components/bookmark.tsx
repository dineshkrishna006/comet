/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { DialogClose } from "@radix-ui/react-dialog";

import { createBookmark } from "@/actions/bookmark";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
export function Bookmarkadd({ category_id }: { category_id: string }) {
  const [name, setName] = useState("");
  const [url_, setUrl_] = useState("");
  const router = useRouter();
  const handleAdd = async () => {
    try {
      const res = await createBookmark(name, category_id, url_);
      if (res.status === 200) {
        toast.success("Bookmark created");
        router.refresh();
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Failed to create Bookmark");
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="hover:cursor-grab">Add</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] w-[350px] rounded-lg">
        <DialogHeader>
          <DialogTitle>New Bookmark</DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Input
              id="name"
              onChange={(e) => setName(e.target.value)}
              className="bg-white"
              placeholder="title"
            />
            <Input
              id="url"
              onChange={(e) => setUrl_(e.target.value)}
              className="bg-white"
              placeholder="url"
            />
            {/* <Select onValueChange={(value) => setC_id(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Fruits</SelectLabel>
                  {categories.map((item) => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.category_name}
                    </SelectItem>
                  ))}
                 
                </SelectGroup>
              </SelectContent>
            </Select> */}
          </div>
        </div>
        <DialogFooter className="">
          <DialogClose asChild>
            <Button
              type="button"
              disabled={!(name.length > 0 && url_.length > 0)}
              onClick={() => {
                console.log(url_, name);
                handleAdd();
              }}
            >
              Submit
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
