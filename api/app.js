require("./models/db");
const http = require("http");
const handleRoutes = require("./routes");

const server = http.createServer((req, res) => {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  handleRoutes(req, res);
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
