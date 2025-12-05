import { Request } from "express";

declare module "express-serve-static-core" {
  interface Request {
    user?: {
      id?: string;
      email?: string;
    };
  }
}



// declare module "xss-clean" {
//   import { RequestHandler } from "express";
//   const xssClean: RequestHandler;
//   export default xssClean;
// }