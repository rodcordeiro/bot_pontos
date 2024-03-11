import pino from "pino";

const Logger = pino({
  transport: {
    targets:
      process.env.NODE_ENV === "dev"
        ? [
            {
              level: "info",
              target: "pino-pretty",
              options: { colorize: true },
            },
            {
              level: "trace",
              target: "pino/file",
              options: { destination: "./pino-logger.log" },
            },
          ]
        : [
            {
              level: "trace",
              target: "pino/file",
              options: { destination: "./pino-logger.log" },
            },
          ],
  },
  name: "bot",
});

export { Logger };
