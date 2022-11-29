const mongoose = require('mongoose');

const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;

MongoMemoryServer.create()
  .then((mongoServer) => mongoose.connect(mongoServer.getUri(), {
    useNewUrlParser: true,
    dbName: "tweets",
    useCreateIndex: true,
    useUnifiedTopology: true,
  }))
  .then(() =>
    console.info(`Connected to database...`)
  )
  .catch((error) => {
    console.error("An error occurred while trying to connect to database", error);
    process.exit(1);
  });

process.on("SIGINT", () => {
  mongoose
    .disconnect()
    .then(() => {
      console.info("Disconnected from mongodb");
      process.exit(0);
    })
    .catch((error) => {
      console.error("An error ocurred while trying to disconnect from mongoose", error);
      process.exit(1);
    });
});
