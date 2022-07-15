import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

export default {
  /**
   * Returns array of the posts
   *
   * @param {string} searchedTitle Searched phrase in title
   * @param {string} searchedAuthor Searched phrase in author name
   * @param {string} searchedText Searched phrase in text of the post
   * @return {Object[]} Array of the posts
   */
  getAll: async (searchedTitle, searchedAuthor, searchedText) => {
    return await db.Post.findMany({
      where: {
        title: {
          contains: searchedTitle ?? "",
        },
        author: {
          contains: searchedAuthor ?? "",
        },
        text: {
          contains: searchedText ?? "",
        },
      },
    });
  },

  /**
   * Returns post with certain id
   *
   * @param {number} postId Id of the post
   * @return {Object} Post with certain id or null on failure
   */
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

  /**
   * Inserts new post into database
   *
   * @param {Object} newPost New post object
   * @return {Object} Inserted object or null on failure
   */
  create: async (newPost) => {
    try {
      newPost.date = new Date(newPost.date * 1000);
      return await db.Post.create({
        data: newPost,
      });
    } catch {
      console.error("[error] Create action failed");
    }
    return null;
  },

  /**
   * Updates post in database
   *
   * @param {number} postId Id of the post
   * @param {Object} updatedPost Updated post object
   * @return {boolean} True on success or false on failure
   */
  update: async (postId, updatedPost) => {
    try {
      updatedPost.date = new Date(updatedPost.date * 1000)
      await db.Post.update({
        where: {
          id: parseInt(postId),
        },
        data: updatedPost,
      });
      return true;
    } catch {
      console.error("[error] Update action failed");
    }
    return false;
  },

  /**
   * Deletes post from database
   *
   * @param {number} postId Id of the post
   * @return {boolean} True on success or false on failure
   */
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
