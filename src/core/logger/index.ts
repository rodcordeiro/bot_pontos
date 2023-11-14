import pino from "pino";

const Logger = pino({
  transport: {
    targets: [
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
    ],
  },
  name: "bot",
});

export { Logger };
