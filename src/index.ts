import { config } from "dotenv";
config();
import { client } from "./core/client";

import "./events";

client.initialize();
