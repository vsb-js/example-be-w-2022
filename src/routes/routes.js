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
  let comments = await commentsService.getAll(
    req.params.postId,
    req.query.author,
    req.query.text,
  );
  res.status(200).json({
    ...res.body,
    count: comments.length,
    comments: comments,
  });
});
// Create post comment
router.post("/v1/posts/:postId/comments", async (req, res) => {
  let result = await commentsService.create(req.params.postId, req.body);
  if (!result) {
    res.status(400).json({
      ...res.body,
      error: "Bad request",
      message: "Invalid input. Please check the schema of provided object.",
    });
    return;
  }
  res.setHeader(
    "Location",
    `/v1/posts/${req.params.postId}/comments/${result.id}`,
  );
  res.status(201).json(res.body);
});
// Get post comment
router.get("/v1/posts/:postId/comments/:commentId", async (req, res) => {
  const comment = await commentsService.get(req.params.commentId);
  if (comment == null || comment.postId.toString() !== req.params.postId) {
    res.status(404).json({
      ...res.body,
      error: "Not Found",
      message: "Comment with this id was not found.",
    });
    return;
  }
  res.status(200).json({
    ...res.body,
    data: comment,
  });
});
// Modify post comment
router.put("/v1/posts/:postId/comments/:commentId", async (req, res) => {
  req.body.postId = req.params.postId;
  let result = await commentsService.update(req.params.postId, req.params.commentId, req.body);
  if (!result) {
    res.status(400).json({
      ...res.body,
      error: "Bad request",
      message: "Invalid input. Please check the schema of provided object.",
    });
    return;
  }
  res.status(200).json(res.body);
});
// Delete post comment
router.delete("/v1/posts/:postId/comments/:commentId", async (req, res) => {
  let result = await commentsService.delete(req.params.commentId);
  if (!result) {
    res.status(404).json({
      ...res.body,
      error: "Not Found",
      message: "Comment with this id was not found.",
    });
    return;
  }
  res.status(200).json(req.body);
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
  let result = await postsService.create(req.body);
  if (!result) {
    res.status(400).json({
      ...res.body,
      error: "Bad request",
      message: "Invalid input. Please check the schema of provided object.",
    });
    return;
  }
  res.setHeader("Location", `/v1/posts/${result.id}`);
  res.status(201).json(res.body);
});
// Get post
router.get("/v1/posts/:postId", async (req, res) => {
  const post = await postsService.get(req.params.postId);
  if (post == null) {
    res.status(404).json({
      ...res.body,
      error: "Not Found",
      message: "Post with this id was not found.",
    });
    return;
  }
  res.status(200).json({
    ...res.body,
    data: post,
  });
});
// Modify post
router.put("/v1/posts/:postId", async (req, res) => {
  let result = await postsService.create(req.body);
  if (!result) {
    res.status(400).json({
      ...res.body,
      error: "Bad request",
      message: "Invalid input. Please check the schema of provided object.",
    });
    return;
  }
  res.status(200).json(res.body);
});
// Delete post
router.delete("/v1/posts/:postId", async (req, res) => {
  let result = await postsService.delete(req.params.postId);
  if (!result) {
    res.status(404).json({
      ...res.body,
      error: "Not Found",
      message: "Post with this id was not found.",
    });
    return;
  }
  res.status(200).json(req.body);
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
