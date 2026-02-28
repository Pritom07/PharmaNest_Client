import { createEnv } from "@t3-oss/env-nextjs";
import * as z from "zod";

export const env = createEnv({
  server: {
    BACKEND_URL: z.url(),
    API_URL: z.url(),
  },
  runtimeEnv: {
    BACKEND_URL: process.env.BACKEND_URL,
    API_URL: process.env.API_URL,
  },
});
