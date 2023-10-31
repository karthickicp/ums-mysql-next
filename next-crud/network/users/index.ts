"use server";
import { HttpMethods } from "@/constants";
import { IApiMessageRes, IApiResId, IUsers } from "@/types";
import { revalidatePath, revalidateTag } from "next/cache";

export const getUsers = async (): Promise<(IUsers & IApiResId)[]> => {
  try {
    const res: any = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/user`,
      {
        cache: "no-store",
        next: {
          tags: ["users"],
        },
        method: HttpMethods.GET,
      }
    );
    const users = await res.json();
    return users.data;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const getUser = async (id: number): Promise<(IUsers & IApiResId) | null> => {
  try {
    const res: any = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/${id}`,
      {
        cache: "no-store",
        method: HttpMethods.GET,
      }
    );
    const users = await res.json();
    return users.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const createUser = async (data: IUsers): Promise<IApiMessageRes> => {
  try {
    const res: any = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/user`,
      {
        method: HttpMethods.POST,
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const response = await res.json();
    revalidateTag("users");
    return response;
  } catch (err: any) {
    return {message: err}
  }
};

export const updateUser = async (data: IUsers, id: number): Promise<IApiMessageRes> => {
  try {
    const res: any = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/${id}`,
      {
        method: HttpMethods.PUT,
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const response = await res.json();
    revalidateTag("users");
    return response;
  } catch (err: any) {
    return {message: err}
  }
};

export const deleteUser = async (userId: number): Promise<any> => {
  try {
    const res: any = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/${userId}`,
      {
        method: HttpMethods.DELETE,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const response = await res.json();
    console.log(response, 'response')
    revalidateTag("users");
    return response;
  } catch (err) {
    return {message: err};
  }
};
