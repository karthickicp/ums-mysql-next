"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IUsers } from "@/types";
import { useCallback, useEffect, useState } from "react";
import { createUser, getUser, updateUser } from "@/network";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const UserModal = () => {
  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();
  const modalType = params?.get("type") ?? "";
  const userId = params?.get("id");
  const [open, setOpen] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IUsers>({values: {
    first_name: "",
    last_name: "",
    email: "",
    avatar: "",
  }});

  const getUserDetail = useCallback(async () => {
    const res = await getUser(Number(userId));
    if(res?.id){
      reset({...res})
    }
},[userId, reset]);

  useEffect(() => {
    setOpen(["create", "edit"].includes(modalType) ? true : false);
    if (modalType === "edit") {
      getUserDetail();
    }
  }, [modalType, getUserDetail]);

  const onSubmit: SubmitHandler<IUsers> = async (data) => {
    await modalType === 'create' ? createUser(data) : updateUser(data, +userId!);
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
    router.replace(pathname);
    reset();
  };
  return (
    <>
        <Dialog open={open}>
          <DialogContent className="sm:max-w-[50dvw]">
            <DialogHeader>
              <DialogTitle className="capitalize">{modalType} User</DialogTitle>
              <DialogClose onClick={handleClose} />
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="first_name" className="text-right">
                    First Name
                  </Label>
                  <Input
                    id="first_name"
                    className="col-span-3"
                    {...register("first_name", { required: true })}
                  />
                  {errors.first_name && <p>This field is required</p>}
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="last_name" className="text-right">
                    Last Name
                  </Label>
                  <Input
                    id="last_name"
                    {...register("last_name", { required: true })}
                    className="col-span-3"
                  />
                  {errors.last_name && <p>This field is required</p>}
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="email"
                    {...register("email", { required: true })}
                    className="col-span-3"
                  />
                  {errors.email && <p>This field is required</p>}
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="avatar" className="text-right">
                    Avatar
                  </Label>
                  <Input
                    id="avatar"
                    {...register("avatar")}
                    className="col-span-3"
                  />
                  {errors.avatar && <p>This field is required</p>}
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">
                  {modalType === "create" ? `Save` : "Update"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
    </>
  );
};
