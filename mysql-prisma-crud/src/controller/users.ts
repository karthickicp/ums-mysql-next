// import prisma from "@/config/db";
import { NextFunction, Request, Response } from "express";
import prisma from "../config/db";
import { IApiMessage, IId, IUser } from "../types";

export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<IUser & IId>> => {
  try {
    const users = await prisma.users.findMany();
    return res.status(200).json({ data: users || [] });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "something went wrong, please try after some time" });
  }
};

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<IApiMessage>> => {
  try {
    const body = req.body;
    await prisma.users.create({ data: body });
    return res.status(200).json({ message: "user created successfully." });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "something went wrong, please try after some time" });
  }
};

export const getUnique = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<IUser & IId>> => {
  try {
    const user = await prisma.users.findUnique({
      where: { id: Number(req.params.id) },
    });
    return res.status(200).json({ data: user || null });
  } catch (err) {
    return res
      .setHeader("Content-Type", "application/json")
      .status(500)
      .json({ message: "something went wrong, please try after some time" });
  }
};
export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<IApiMessage>> => {
  try {
    await prisma.users.update({
      where: {
        id: Number(req.params.id),
      },
      data: req.body,
    });
    return res.status(200).json({ message: "user updated successfully." });
  } catch (err) {
    return res
      .header("Content-Type", "application/json")
      .status(500)
      .json({ message: "something went wrong, please try after some time" });
  }
};

export const remove = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<IApiMessage>> => {
  try {
    await prisma.users.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    return res
      .header("Content-Type", "application/json")
      .status(200)
      .json({ message: "user deleted successfully." });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "something went wrong, please try after some time" });
  }
};
