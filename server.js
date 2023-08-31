const mongoose = require("mongoose");
require("dotenv").config();
const cluster = require("cluster");
const numCPUs = require("os").cpus().length;
const process = require("process");
const PORT = process.env.PORT || 5000;

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) cluster.fork();

  cluster.on("exit", (worker, code, signal) =>
    console.log(`worker ${worker.process.pid} died`)
  );
} else {
  process.on("uncaughtException", (err) => {
    console.log("UNCAUGHT EXCEPTION ! Shutting Down....");
    console.log(err);
    process.exit(1);
  });

  const DB =
    process.env.NODE_ENV === "development"
      ? process.env.DATABASE_LOCAL
      : process.env.DATABASE_PRODUCTION;

  mongoose
    .connect(DB, {
      keepAlive: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log(`DB connected...`);
    })
    .catch((err) => {
      console.log(err);
    });

  require("./app").listen(PORT, (err) => {
    if (err) return console.log(err);
    else console.log(`Server Running => ${PORT}`);
  });

  process.on("unhandledRejection", (err) => {
    console.log("UNHANDLED REJECTION ! Shutting Down...");
    console.log(err);
    server.close(() => {
      process.exit(1);
    });
  });

  console.log(`Worker ${process.pid} started`);
}


