require("./models/db");
const http = require("http");
const handleRoutes = require("./routes");

const server = http.createServer((req, res) => {
  handleRoutes(req, res);
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
