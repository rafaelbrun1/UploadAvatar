import { db } from "../utils/db.server";

export type Avatar = {
  id: number;
  name: string;
  createdAt: Date;
};

export const createAvatar = async (AvatarName: string): Promise<Avatar> => {
  const name  = AvatarName;
  return db.avatar.create({
    data: {
      name,
    },
    select: {
      id: true,
      name: true,
      createdAt: true,
    },
  });
};
