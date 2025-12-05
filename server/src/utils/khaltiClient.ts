import axios from "axios";
import { config } from "../config/env";

export const khaltiClient = axios.create({
  baseURL: config.khaltiBaseUrl,
  headers: {
    Authorization: `Key ${config.khaltiSecret}`,
    "Content-Type": "application/json",
  },
  timeout: 10000,
});
