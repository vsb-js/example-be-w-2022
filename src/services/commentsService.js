import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

export default {
  getAll: async (postId, author, text) => {
    try {
      return await db.Comment.findMany({
        where: {
          postId: parseInt(postId),
          author: {
            contains: author ?? "",
          },
          text: {
            contains: text ?? "",
          },
        },
      });
    } catch {}
    return [];
  },

  get: async (commentId) => {
    try {
      return await db.Comment.findUnique({
        where: {
          id: parseInt(commentId),
        },
      });
    } catch {}
    return null;
  },
  create: async (postId, newObject) => {
    try {
      newObject.postId = parseInt(postId)
      newObject.date = new Date(newObject.date * 1000)
      return await db.Comment.create({
        data: newObject,
      });
    } catch {
      console.error("[error] Create action failed");
    }
    return null;
  },
  update: async (commentId, updatedObject) => {
    try {
      updatedObject.postId = parseInt(postId);
      updatedObject.date = new Date(updatedObject.date * 1000);
      await db.Comment.update({
        data: updatedObject,
        where: {
          id: parseInt(commentId)
        },
      });
      return true;
    } catch {
      console.error("[error] Update action failed");
    }
    return false;
  },
  delete: async (commentId) => {
    await db.Comment.delete({
      where: {
        id: parseInt(commentId)
      },
    });
    return true;
  },
};
