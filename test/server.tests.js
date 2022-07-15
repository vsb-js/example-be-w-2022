import supertest from "supertest";
import app from "../src/server.js";

// Test main page
describe("REST API Main page", () => {
    it("GET /", (done) => {
        supertest(app)
            .get("/")
            .set("Accept", "application/json")
            .expect(200)
            .end(done);
    });
});

describe("REST API Posts", () => {
  var createdPostUrl = "/v1/posts/{postId}";

  it("GET /v1/posts - Get all posts", (done) => {
    supertest(app)
      .get("/v1/posts")
      .set("Accept", "application/json")
      .expect(200)
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
        if (!Object.keys(res.headers).includes("location")) {
          throw new Error("Missing Location header");
        }
        createdPostUrl = res.headers["location"];
      })
      .end(done);
  });

  it(`GET /v1/posts/{postId} - Get created post`, (done) => {
    supertest(app)
      .get(createdPostUrl)
      .set("Accept", "application/json")
      .expect(200)
      .end(done);
  });

  it(`PUT /v1/posts/{postId} - Update created post`, (done) => {
    supertest(app)
      .put(createdPostUrl)
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
      .delete(createdPostUrl)
      .set("Accept", "application/json")
      .expect(200)
      .end(done);
  });
});

describe("REST API Comments", () => {
  var createdPostUrl = "/v1/posts/{postId}";
  var createdCommnentUrl = "/v1/posts/{postId}/comment/{commentId}";

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
        if (Object.keys(res.headers).includes("location")) {
          createdPostUrl = res.headers["location"];
        }
      });
  });


  it("GET /v1/posts/{postId}/comments - Get all comments of post", (done) => {
    supertest(app)
      .get(`${createdPostUrl}/comments`)
      .set("Accept", "application/json")
      .expect(200)
      .end(done);
  });

  it("POST /v1/posts/{postId}/comments - Create new comment", (done) => {
    supertest(app)
      .post(`${createdPostUrl}/comments`)
      .send({
        date: parseInt((new Date().getTime() / 1000).toFixed(0)),
        author: "author@example.com",
        text: "Text of the comment",
      })
      .set("Accept", "application/json")
      .expect(201)
      .expect((res) => {
        if (!Object.keys(res.headers).includes("location")) {
          throw new Error("Missing Location header");
        }
        createdCommnentUrl = res.headers["location"];
      })
      .end(done);
  });

  it(`GET /v1/posts/{postId}/comments/{commentId} - Get created comment`, (done) => {
    supertest(app)
      .get(createdCommnentUrl)
      .set("Accept", "application/json")
      .expect(200)
      .end(done);
  });

  it(`PUT /v1/posts/{postId}/comments/{commentId} - Update created comment`, (done) => {
    supertest(app)
      .put(createdCommnentUrl)
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
      .delete(createdCommnentUrl)
      .set("Accept", "application/json")
      .expect(200)
      .end(done);
  });

  // Delete temporary created post
  after(() => {
    supertest(app).delete(createdPostUrl).set("Accept", "application/json");
  });
});
