import express from "express";
import type { Request, Response } from "express";
import * as AvatarService from "./avatar.service";
import multer from "multer";
import { fileFilter, fileStorage } from "../middlewares/uploadImage";

export const avatarRouter = express.Router();

const upload = multer({ storage: fileStorage, fileFilter: fileFilter });

avatarRouter.post(
  "/", upload.single('image'),
  async (request: Request, response: Response) => {
    const name = request.file.filename
    try {
      const newAvatar = await AvatarService.createAvatar(name);
      return response.status(201).json(newAvatar);
    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  }
);

avatarRouter.get(
  "/", 
  async (request: Request, response: Response) => {
    try {
      const getLastAvatar = await AvatarService.listLastAvatar();
      return response.status(201).json(getLastAvatar);
    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  }
);

avatarRouter.delete(
  "/", 
  async (request: Request, response: Response) => {
    try {
      await AvatarService.deleteAllAvatars();
      return response.status(201)
    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  }
);
