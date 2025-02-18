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
import { createCategory } from "@/actions/category";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
export function DialogDemo({ user_id }: { user_id: string }) {
  const [name, setName] = useState("");
  const router = useRouter();
  const handleClick = async () => {
    try {
      const res = await createCategory(name, user_id);
      if (res.status === 409) {
        toast.error("Category exists");
      }
      if (res.status === 200) {
        toast.success("Category created");
      }
    } catch (error) {
      console.log("error in creating category", error);
    } finally {
      router.refresh();
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="hover:cursor-grab">Add</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] w-[350px] rounded-lg">
        <DialogHeader>
          <DialogTitle>New Category</DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Input
              id="name"
              onChange={(e) => setName(e.target.value)}
              className="bg-white"
              placeholder="Category Name"
            />
          </div>
        </div>
        <DialogFooter className="">
          <DialogClose asChild>
            <Button type="button" disabled={!name} onClick={handleClick}>
              Submit
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
