import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

export default {
  /**
   * Returns array of comments under the post
   *
   * @param {number} postId Id of the post
   * @param {string} searchedAuthor Searched phrase in author name
   * @param {string} searchedText Searched phrase in text of comment
   * @return {Object[]} Array of comments under the post
   */
  getAll: async (postId, searchedAuthor, searchedText) => {
    try {
      return await db.Comment.findMany({
        where: {
          postId: parseInt(postId),
          author: {
            contains: searchedAuthor ?? "",
          },
          text: {
            contains: searchedText ?? "",
          },
        },
      });
    } catch {}
    return [];
  },

  /**
   * Returns comment with certain id
   *
   * @param {number} commentId Id of the comment
   * @return {Object} Comment with certain id or null on failure
   */
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

  /**
   * Inserts new comment into database
   *
   * @param {number} postId Id of the post
   * @param {Object} newComment New comment object
   * @return {Object} Inserted object or null on failure
   */
  create: async (postId, newComment) => {
    try {
      newComment.postId = parseInt(postId);
      newComment.date = new Date(newComment.date * 1000);
      return await db.Comment.create({
        data: newComment,
      });
    } catch {
      console.error("[error] Create action failed");
    }
    return null;
  },

  /**
   * Updates comment in database
   *
   * @param {number} postId Id of the post
   * @param {Object} commentId Id of the comment
   * @param {Object} updatedComment Updated comment object
   * @return {boolean} True on success or false on failure
   */
  update: async (postId, commentId, updatedComment) => {
    try {
      updatedComment.postId = parseInt(postId);
      updatedComment.date = new Date(updatedComment.date * 1000);

      await db.Comment.update({
        data: updatedComment,
        where: {
          id: parseInt(commentId),
        },
      });
      return true;
    } catch {
      console.error("[error] Update action failed");
    }
    return false;
  },

  /**
   * Deletes comment from database
   *
   * @param {Object} commentId Id of the comment
   * @return {boolean} True on success or false on failure
   */
  delete: async (commentId) => {
    try {
      await db.Comment.delete({
        where: {
          id: parseInt(commentId),
        },
      });
      return true;
    } catch {
      console.error("[error] Delete action failed");
    }
    return false;
  },
};
