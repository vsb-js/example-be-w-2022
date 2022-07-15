import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

export default {
  getAll: async (title, author, text) => {
    return await db.Post.findMany({
      where: {
        title: {
          contains: title ?? "",
        },
        author: {
          contains: author ?? "",
        },
        text: {
          contains: text ?? "",
        },
      },
    });
  },
  get: async (postId) => {
    try {
      return await db.Post.findUnique({
        where: {
          id: parseInt(postId),
        },
      });
    } catch {}
    return null;
  },
  create: async (newObject) => {
    try {
      newObject.date = new Date(newObject.date * 1000);
      return await db.Post.create({
        data: newObject,
      });
    } catch {
      console.error("[error] Create action failed");
    }
    return null;
  },
  update: async (postId, updatedObject) => {
    try {
      //updatedObject.date = new Date(updatedObject.date * 1000)
      await db.Post.update({
        where: {
          id: parseInt(postId),
        },
        data: updatedObject,
      });
      return true;
    } catch {
      console.error("[error] Update action failed");
    }
    return false;
  },
  delete: async (postId) => {
    try {
      await db.Post.delete({
        where: {
          id: parseInt(postId),
        },
      });
      return true;
    } catch {
      console.error("[error] Delete action failed");
    }
    return false;
  },
};
