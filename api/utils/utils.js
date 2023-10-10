function successResponse(res, data) {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(data);
}

function failedResponse(res, message) {
  res.writeHead(400, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: message }));
}

function getID(req) {
  const id = req.url.split("/")[3];
  return id;
}

async function getRequestData(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      try {
        const parsedData = JSON.parse(body);
        resolve(parsedData);
      } catch (error) {
        reject(new Error("Invalid JSON data"));
      }
    });
  });
}

module.exports = {
  successResponse,
  failedResponse,
  getID,
  getRequestData,
};
