const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api/youtube",
    createProxyMiddleware({
      target: "https://youtube.googleapis.com",
      changeOrigin: true,
      pathRewrite: (path) => {
        const newPath = path.replace(/^\/api\/youtube/, "/youtube/v3");
        const [base, qs = ""] = newPath.split("?");
        const params = new URLSearchParams(qs);
        const key = process.env.YOUTUBE_API_KEY;
        if (key) params.set("key", key);
        return `${base}?${params.toString()}`;
      },
      logLevel: "silent",
    })
  );
};
