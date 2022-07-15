export default {
  host: process.env.HOST ?? "0.0.0.0",
  port: process.env.PORT ?? 8080,
  headers: {
    // Custom headers which will be added to each response
    "x-frame-options": "SAMEORIGIN",
    "content-security-policy": "default-src 'none';",
  },
  cors : {
    // Allowed client URLs with protocol and port
    origin: [
      "http://localhost:3000",
      "https://localhost:3000"
    ],
    optionsSuccessStatus: 200,
  }
};
