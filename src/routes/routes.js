import express from "express";

import endpointsService from "../services/endpointsService.js";
import postsService from "../services/postsService.js";
import commentsService from "../services/commentsService.js";

const router = express.Router();

// Homepage with list of endpoints
router.get("/", async (req, res) => {
  res.status(200).json({
    ...res.body,
    // List of available endpoints - For development purposes
    endpoints: endpointsService.getAll(router),
  });
});

// Comment endpoints
// Get post comments
router.get("/v1/posts/:postId/comments", async (req, res) => {
  try {
    let comments = await commentsService.getAll(
      parseInt(req.params.postId),
      req.query.author,
      req.query.text,
    );
    res.status(200).json({
      ...res.body,
      count: comments.length,
      comments: comments,
    });
    return;
  } catch {}
  res.status(400).json({
    ...res.body,
    error: "Bad request",
    message: "Invalid input. Please check the schema of provided object.",
  });
});

// Create post comment
router.post("/v1/posts/:postId/comments", async (req, res) => {
  try {
    let result = await commentsService.create(
      parseInt(req.params.postId),
      req.body,
    );
    if (result) {
      res.status(201).json({
        ...res.body,
        data: result,
      });
      return;
    }
  } catch {}
  res.status(400).json({
    ...res.body,
    error: "Bad request",
    message: "Invalid input. Please check the schema of provided object.",
  });
});

// Get post comment
router.get("/v1/posts/:postId/comments/:commentId", async (req, res) => {
  try {
    const comment = await commentsService.get(parseInt(req.params.commentId));
    if (comment != null && comment.postId.toString() === req.params.postId) {
      res.status(200).json({
        ...res.body,
        data: comment,
      });
      return;
    }
  } catch {}
  res.status(400).json({
    ...res.body,
    error: "Bad request",
    message: "Invalid input. Please check the schema of provided object.",
  });
});

// Modify post comment
router.put("/v1/posts/:postId/comments/:commentId", async (req, res) => {
  try {
    let result = await commentsService.update(
      parseInt(req.params.postId),
      parseInt(req.params.commentId),
      req.body,
    );
    if (result) {
      res.status(200).json(res.body);
      return;
    }
  } catch {}
  res.status(400).json({
    ...res.body,
    error: "Bad request",
    message: "Invalid input. Please check the schema of provided object.",
  });
});

// Delete post comment
router.delete("/v1/posts/:postId/comments/:commentId", async (req, res) => {
  try {
    let result = await commentsService.delete(parseInt(req.params.commentId));
    if (!result) {
      res.status(404).json({
        ...res.body,
        error: "Not Found",
        message: "Comment with this id was not found.",
      });
      return;
    }
    res.status(200).json(req.body);
    return;
  } catch {}
  res.status(400).json({
    ...res.body,
    error: "Bad request",
    message: "Invalid input. Please check the schema of provided object.",
  });
});

// Post endpoints
// Get posts
router.get("/v1/posts", async (req, res) => {
  let posts = await postsService.getAll(
    req.query.title,
    req.query.author,
    req.query.text,
  );
  res.status(200).json({
    ...res.body,
    count: posts.length,
    posts: posts,
  });
});

// Create post
router.post("/v1/posts", async (req, res) => {
  try {
    let result = await postsService.create(req.body);
    if (result) {
      res.status(201).json({
        ...res.body,
        data: result,
      });
      return;
    }
  } catch {}
  res.status(400).json({
    ...res.body,
    error: "Bad request",
    message: "Invalid input. Please check the schema of provided object.",
  });
});

// Get post
router.get("/v1/posts/:postId", async (req, res) => {
  try {
    const post = await postsService.get(parseInt(req.params.postId));
    if (post) {
      res.status(200).json({
        ...res.body,
        data: post,
      });
      return;
    }
  } catch {}
  res.status(400).json({
    ...res.body,
    error: "Bad request",
    message: "Invalid input. Please check the schema of provided object.",
  });
});

// Modify post
router.put("/v1/posts/:postId", async (req, res) => {
  try {
    let result = await postsService.create(req.body);
    if (result) {
      res.status(200).json(res.body);
      return;
    }
  } catch {}
  res.status(400).json({
    ...res.body,
    error: "Bad request",
    message: "Invalid input. Please check the schema of provided object.",
  });
});

// Delete post
router.delete("/v1/posts/:postId", async (req, res) => {
  try {
    let result = await postsService.delete(parseInt(req.params.postId));
    if (!result) {
      res.status(404).json({
        ...res.body,
        error: "Not Found",
        message: "Post with this id was not found.",
      });
      return;
    }
    res.status(200).json(req.body);
    return;
  } catch {}
  res.status(400).json({
    ...res.body,
    error: "Bad request",
    message: "Invalid input. Please check the schema of provided object.",
  });
});

// Endpoint was not found
router.all("*", async (req, res) => {
  res.status(404).json({
    ...res.body,
    error: "Not Found",
    message: "This endpoint was not found.",
  });
});

export default router;
