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
    const name = request.file.originalname
    try {
      const newAvatar = await AvatarService.createAvatar(name);
      return response.status(201).json(newAvatar);
    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  }
);
