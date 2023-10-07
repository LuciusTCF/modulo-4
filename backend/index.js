require("dotenv").config();
// console.log(process.env);
const Server = require("./models/server");

// const app = express();
const server = new Server();

server.listen();

// app.listen(3000);
