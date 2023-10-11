const employeeCtrl = require("./controllers/employeesCtrl");
const usersCtrl = require("./controllers/usersCtrl");

const EMPLOYEE_ID_REGEX = /\/api\/employees\/[0-9]+/;

function handleRoutes(req, res) {
  if (req.url === "/api/employees" && req.method === "GET") {
    employeeCtrl.getEmployees(req, res);
  } else if (req.url.match(EMPLOYEE_ID_REGEX) && req.method === "GET") {
    employeeCtrl.getEmployeeById(req, res);
  } else if (req.url === "/api/employees" && req.method === "POST") {
    employeeCtrl.createEmployee(req, res);
  } else if (req.url.match(EMPLOYEE_ID_REGEX) && req.method === "PUT") {
    employeeCtrl.updateEmployee(req, res);
  } else if (req.url.match(EMPLOYEE_ID_REGEX) && req.method === "DELETE") {
    employeeCtrl.deleteEmployee(req, res);
  } else if (req.url === "/api/login" && req.method === "POST") {
    usersCtrl.login(req, res);
  } else {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Invalid request" }));
  }
}

module.exports = handleRoutes;
