import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export const allowedOrigins = [
  "http://127.0.0.1:3000",
  "http://localhost:3000",
  "https://ena-lang.org",
  "https://ena--lang-org.translate.goog",
  "https://ena--bj10rc0zz--pgagnidze-vercel-app.translate.goog",
];

const setHeaders = (
  origin: string | undefined,
  headersWrapper: { set: any }
) => {
  if (origin && allowedOrigins.includes(origin)) {
    headersWrapper.set("Access-Control-Allow-Origin", origin);
  }
  headersWrapper.set("Access-Control-Allow-Credentials", "true");
  headersWrapper.set(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  headersWrapper.set(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );
};

export const allowNodeJSCors =
  (fn: Function) => async (req: NextApiRequest, res: NextApiResponse) => {
    setHeaders(req.headers.origin, {
      set: (key: string, value: string) => res.setHeader(key, value),
    });
    if (req.method === "OPTIONS") {
      res.status(200).end();
      return;
    }
    return await fn(req, res);
  };

export const allowEdgeCors = (fn: Function) => async (req: NextRequest) => {
  const reqOrigin = req.headers.get("Origin") ?? undefined;
  const response = NextResponse.next();
  setHeaders(reqOrigin, {
    set: (key: string, value: string) => response.headers.set(key, value),
  });
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: response.headers });
  }
  return await fn(req, response.headers);
};
