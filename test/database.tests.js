import { PrismaClient } from "@prisma/client";
import { expect } from "chai";

const db = new PrismaClient();

// Test database using chai package

describe("Database", () => {
  it("Connect to database", async () => {
    await db.$connect();
  });
});

describe("Database | Post", () => {
  let createdPostId;

  it("Get all posts", async () => {
    let result = await db.Post.findMany();
    expect(result).to.be.a("array");
    expect(result.length).greaterThan(0);
  });

  it("Create new post", async () => {
    let result = await db.Post.create({
      data: {
        title: "Title",
        author: "john.doe@example.com",
        date: new Date(),
        text: "Content of the post",
      },
    });
    expect(result).to.be.a("object");
    createdPostId = result.id;
  });

  it("Get created post", async () => {
    let result = await db.Post.findUnique({
      where: {
        id: createdPostId,
      },
    });
    expect(result).to.be.a("object");
  });

  it("Update created post", async () => {
    await db.Post.update({
      where: {
        id: createdPostId,
      },
      data: {
        title: "Updated title",
        author: "john.doe@example.com",
        date: new Date(),
        text: "Content of updated post",
      },
    });
  });

  it("Delete created post", async () => {
    await db.Post.delete({
      where: {
        id: createdPostId,
      },
    });
  });
});

describe("Database | Comment", () => {
  let createdPostId;
  let createdCommentId;

  // Add temporary post for testing purpose
  before(async () => {
    let result = await db.Post.create({
      data: {
        title: "Title",
        author: "john.doe@example.com",
        date: new Date(),
        text: "Content of the post",
      },
    });
    createdPostId = result.id;
  });

  it("Get all comments", async () => {
    let result = await db.Comment.findMany();
    expect(result).to.be.a("array");
    expect(result.length).greaterThan(0);
  });

  it("Create new comment", async () => {
    let result = await db.Comment.create({
      data: {
        author: "john.doe@example.com",
        date: new Date(),
        text: "Content of the comment",
        postId: createdPostId,
      },
    });
    expect(result).to.be.a("object");
    createdCommentId = result.id;
  });

  it("Get created comment", async () => {
    let result = await db.Comment.findUnique({
      where: {
        id: createdCommentId,
      },
    });
    expect(result).to.be.a("object");
  });

  it("Update created comment", async () => {
    await db.Comment.update({
      where: {
        id: createdCommentId,
      },
      data: {
        author: "john.doe@example.com",
        date: new Date(),
        text: "Updated content of the comment",
      },
    });
  });

  it("Delete created comment", async () => {
    await db.Comment.delete({
      where: {
        id: createdCommentId,
      },
    });
  });

  // Delete temporary created post
  after(async () => {
    await db.Post.delete({
      where: {
        id: createdPostId,
      },
    });
  });
});
