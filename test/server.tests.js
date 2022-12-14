import supertest from "supertest";
import app from "../src/server.js";
import { expect } from "chai";

// Test server REST API using supertest package

describe("REST API | Main page", () => {
  it("GET /", (done) => {
    supertest(app)
      .get("/")
      .set("Accept", "application/json")
      .expect(200)
      .expect((res) => {
        expect(res.body).to.be.an("object");
      })
      .end(done);
  });
});

describe("REST API | Posts", () => {
  let createdPostId = "{postId}";

  it("GET /v1/posts - Get all posts", (done) => {
    supertest(app)
      .get("/v1/posts")
      .set("Accept", "application/json")
      .expect(200)
      .expect((res) => {
        expect(res.body.posts).to.be.an("array");
        expect(res.body.posts.length).greaterThan(0);
        expect(res.body.posts.length).equal(res.body.count);
      })
      .end(done);
  });

  it("GET /v1/posts - Get all posts of author 'john.doe@example.com' with 'post' in title and 'content' in text", (done) => {
    supertest(app)
      .get("/v1/posts?author=john.doe@example.com&title=post&text=content")
      .set("Accept", "application/json")
      .expect(200)
      .expect((res) => {
        expect(res.body.posts).to.be.an("array");
        expect(res.body.posts.length).greaterThan(0);
        expect(res.body.posts.length).equal(res.body.count);
      })
      .end(done);
  });

  it("POST /v1/posts - Create new post", (done) => {
    supertest(app)
      .post("/v1/posts")
      .send({
        title: "Test post",
        date: parseInt((new Date().getTime() / 1000).toFixed(0)),
        author: "unknown@example.com",
        text: "Text of the post",
      })
      .set("Accept", "application/json")
      .expect(201)
      .expect((res) => {
        expect(res.body).to.be.an("object");
        expect(res.body.data).to.be.an("object");
        createdPostId = res.body.data.id;
      })
      .end(done);
  });

  it(`GET /v1/posts/{postId} - Get created post`, (done) => {
    supertest(app)
      .get(`/v1/posts/${createdPostId}`)
      .set("Accept", "application/json")
      .expect(200)
      .expect((res) => {
        expect(res.body).to.be.an("object");
        expect(res.body.data).to.be.an("object");
        expect(res.body.data.title).equal("Test post");
        expect(res.body.data.author).equal("unknown@example.com");
        expect(res.body.data.text).equal("Text of the post");
      })
      .end(done);
  });

  it(`PUT /v1/posts/{postId} - Update created post`, (done) => {
    supertest(app)
      .put(`/v1/posts/${createdPostId}`)
      .send({
        title: "Updated test post",
        date: parseInt((new Date().getTime() / 1000).toFixed(0)),
        author: "unknown@example.com",
        text: "Text of the updated post",
      })
      .set("Accept", "application/json")
      .expect(200)
      .end(done);
  });

  it(`DELETE /v1/posts/{postId} - Delete created post`, (done) => {
    supertest(app)
      .delete(`/v1/posts/${createdPostId}`)
      .set("Accept", "application/json")
      .expect(200)
      .end(done);
  });
  it(`DELETE /v1/posts/{postId} - Delete already deleted post`, (done) => {
    supertest(app)
      .delete(`/v1/posts/${createdPostId}`)
      .set("Accept", "application/json")
      .expect(404)
      .end(done);
  });
});

describe("REST API | Comments", () => {
  let createdPostId = "{postId}";
  let createdCommentId = "{commentId}";

  // Add temporary post for testing purpose
  before(() => {
    supertest(app)
      .post("/v1/posts")
      .send({
        title: "Test post",
        date: parseInt((new Date().getTime() / 1000).toFixed(0)),
        author: "unknown@example.com",
        text: "Text of the post",
      })
      .set("Accept", "application/json")
      .then((res) => {
        createdPostId = res.body.data.id;
      });
  });

  it("GET /v1/posts/{postId}/comments - Get all comments of post", (done) => {
    supertest(app)
      .get(`/v1/posts/${createdPostId}/comments`)
      .set("Accept", "application/json")
      .expect(200)
      .expect((res) => {
        expect(res.body.comments).to.be.an("array");
        expect(res.body.comments.length).equal(0);
        expect(res.body.comments.length).equal(res.body.count);
      })
      .end(done);
  });

  it("POST /v1/posts/{postId}/comments - Create new comment", (done) => {
    supertest(app)
      .post(`/v1/posts/${createdPostId}/comments`)
      .send({
        date: parseInt((new Date().getTime() / 1000).toFixed(0)),
        author: "author@example.com",
        text: "Text of the comment",
      })
      .set("Accept", "application/json")
      .expect(201)
      .expect((res) => {
        expect(res.body.data).to.be.an("object");
        createdCommentId = res.body.data.id;
      })
      .end(done);
  });

  it("GET /v1/posts/{postId}/comments - Get all comments of post of author 'author@example.com' with 'comment' word in the text", (done) => {
    supertest(app)
      .get(
        `/v1/posts/${createdPostId}/comments?author=author@example.com&text=comment`,
      )
      .set("Accept", "application/json")
      .expect(200)
      .expect((res) => {
        expect(res.body.comments).to.be.an("array");
        expect(res.body.comments.length).greaterThan(0);
        expect(res.body.comments.length).equal(res.body.count);
      })
      .end(done);
  });

  it(`GET /v1/posts/{postId}/comments/{commentId} - Get created comment`, (done) => {
    supertest(app)
      .get(`/v1/posts/${createdPostId}/comments/${createdCommentId}`)
      .set("Accept", "application/json")
      .expect(200)
      .expect((res) => {
        expect(res.body).to.be.an("object");
        expect(res.body.data).to.be.an("object");
        expect(res.body.data.author).equal("author@example.com");
        expect(res.body.data.text).equal("Text of the comment");
      })
      .end(done);
  });

  it(`PUT /v1/posts/{postId}/comments/{commentId} - Update created comment`, (done) => {
    supertest(app)
      .put(`/v1/posts/${createdPostId}/comments/${createdCommentId}`)
      .send({
        date: parseInt((new Date().getTime() / 1000).toFixed(0)),
        author: "author@example.com",
        text: "Text of the comment",
      })
      .set("Accept", "application/json")
      .expect(200)
      .end(done);
  });

  it(`DELETE /v1/posts/{postId}/comments/{commentId} - Delete created comment`, (done) => {
    supertest(app)
      .delete(`/v1/posts/${createdPostId}/comments/${createdCommentId}`)
      .set("Accept", "application/json")
      .expect(200)
      .end(done);
  });

  it(`DELETE /v1/posts/{postId}/comments/{commentId} - Delete already deleted comment`, (done) => {
    supertest(app)
      .delete(`/v1/posts/${createdPostId}/comments/${createdCommentId}`)
      .set("Accept", "application/json")
      .expect(404)
      .end(done);
  });

  // Delete temporary created post
  after(() => {
    supertest(app)
      .delete(`/v1/posts/${createdPostId}`)
      .set("Accept", "application/json");
  });
});
