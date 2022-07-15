import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

const main = async () => {
  // Insert new posts
  await db.Post.create({
    data: {
      title: "My first blog post",
      author: "john.doe@example.com",
      date: new Date(),
      text: `Content of my first blog post. This should be a really long sentence with many words. Another really long sentence with many words but this one seems to be shorter. 
This should be a really long sentence with many words. Another really long sentence with many words but this one seems to be shorter.`,
      comments: {
        // Insert new comments
        create: [
          {
            author: "john.doe@example.com",
            date: new Date(),
            text: "This is my first comment under my first blog post.",
          },
          {
            author: "john.doe@example.com",
            date: new Date(),
            text: "This is my second comment under my first blog post.",
          },
        ],
      },
    },
  });
  await db.Post.create({
    data: {
      title: "My second blog post",
      author: "john.doe@example.com",
      date: new Date(),
      text: `Content of my second blog post. This should be a really long sentence with many words. Another really long sentence with many words but this one seems to be shorter. 
This should be a really long sentence with many words. Another really long sentence with many words but this one seems to be shorter.`,
      comments: {
        // Insert new comments
        create: [
          {
            author: "john.doe@example.com",
            date: new Date(),
            text: "This is my first comment under my second blog post.",
          },
          {
            author: "john.doe@example.com",
            date: new Date(),
            text: "This is my second comment under my second blog post.",
          },
        ],
      },
    },
  });

  await db.Post.create({
    data: {
      title: "My third blog post",
      author: "ellen@example.com",
      date: new Date(),
      text: `Content of my third blog post. This should be a really long sentence with many words. Another really long sentence with many words but this one seems to be shorter. 
This should be a really long sentence with many words. Another really long sentence with many words but this one seems to be shorter.`,
      comments: {
        // Insert new comments
        create: [
          {
            author: "john.doe@example.com",
            date: new Date(),
            text: "This is my first comment under someone's blog post.",
          },
          {
            author: "ellen@example.com",
            date: new Date(),
            text: "This is reply to comment under my blog post.",
          },
          {
            author: "john.doe@example.com",
            date: new Date(),
            text: "This is another comment with many emojis 🌚 🌕 🌖 🌗 🌘 🌑 🌒 🌓 🌔 🌙 🌎 🌍 🌏 🪐 💫 ⭐️ 🌟.",
          },
        ],
      },
    },
  });
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
