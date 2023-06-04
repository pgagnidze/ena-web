import { NextApiRequest, NextApiResponse } from "next";

const whitelist = [
  "http://127.0.0.1:3000",
  "http://localhost:3000",
  "https://ena-lang.org",
  "https://ena--lang-org.translate.goog",
];

export const allowCors =
  (fn: Function) => async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.headers.origin && whitelist.includes(req.headers.origin)) {
      res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
    }
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,OPTIONS,PATCH,DELETE,POST,PUT"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",

      "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
    );
    if (req.method === "OPTIONS") {
      res.status(200).end();
      return;
    }
    return await fn(req, res);
  };
