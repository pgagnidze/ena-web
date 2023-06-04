import { NextRequest, NextResponse } from "next/server";
import { whitelist } from "./cors-whitelist";

type StaticOrigin = boolean | string | RegExp | Array<boolean | string | RegExp>;

type OriginFn = (
  origin: string | undefined,
  req: Request
) => StaticOrigin | Promise<StaticOrigin>;

interface CorsOptions {
  origin?: StaticOrigin | OriginFn
  methods?: string | string[]
  allowedHeaders?: string | string[]
  exposedHeaders?: string | string[]
  credentials?: boolean
  maxAge?: number
  preflightContinue?: boolean
  optionsSuccessStatus?: number
}

const defaultOptions: CorsOptions = {
  origin: whitelist,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204
};

import { NextApiRequest, NextApiResponse } from "next";

export const allowEdgeCors =
  (fn: Function) => async (req: NextRequest) => {
    const reqOrigin = req.headers.get("Origin") ?? undefined;
    const response = NextResponse.next();
    const { headers } = response;
    if (reqOrigin && whitelist.includes(reqOrigin)) {
      headers.set("Access-Control-Allow-Origin", reqOrigin);
    }
    headers.set("Access-Control-Allow-Credentials", "true");
    headers.set(
      "Access-Control-Allow-Methods",
      "GET,OPTIONS,PATCH,DELETE,POST,PUT"
    );
    headers.set(
      "Access-Control-Allow-Headers",

      "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
    );
    if (req.method === "OPTIONS") {
      return new Response(null);
    }
    return await fn(req, headers);
  };


function isOriginAllowed (origin: string, allowed: StaticOrigin): boolean {
  return Array.isArray(allowed)
    ? allowed.some((o) => isOriginAllowed(origin, o))
    : typeof allowed === "string"
      ? origin === allowed
      : allowed instanceof RegExp
        ? allowed.test(origin)
        : !!allowed;
}

function getOriginHeaders (reqOrigin: string | undefined, origin: StaticOrigin) {
  const headers = new Headers();

  if (origin === "*") {
    // Allow any origin
    headers.set("Access-Control-Allow-Origin", "*");
  } else if (typeof origin === "string") {
    // Fixed origin
    headers.set("Access-Control-Allow-Origin", origin);
    headers.append("Vary", "Origin");
  } else {
    const allowed = isOriginAllowed(reqOrigin ?? "", origin);

    if (allowed && typeof reqOrigin === "string") {
      headers.set("Access-Control-Allow-Origin", reqOrigin);
    }
    headers.append("Vary", "Origin");
  }

  return headers;
}

// originHeadersFromReq

async function originHeadersFromReq (
  req: Request,
  origin: StaticOrigin | OriginFn
) {
  const reqOrigin = req.headers.get("Origin") ?? undefined;
  const value =
    typeof origin === "function" ? await origin(reqOrigin, req) : origin;

  // if (!value) return;
  return getOriginHeaders(reqOrigin, value);
}

function getAllowedHeaders (req: Request, allowed?: string | string[]) {
  const headers = new Headers();

  if (typeof allowed === "undefined") {
    allowed = req.headers.get("Access-Control-Request-Headers") ?? undefined;
    headers.append("Vary", "Access-Control-Request-Headers");
  } else if (Array.isArray(allowed)) {
    // If the allowed headers is an array, turn it into a string
    allowed = allowed.join(",");
  }

  if (typeof allowed === "string") {
    headers.set("Access-Control-Allow-Headers", allowed);
  }

  return headers;
}

export function initCors (options?: CorsOptions) {
  return async (req: Request, res: Response) => await cors(req, res, options);
}

export async function cors (
  req: Request,
  res: Response,
  options?: CorsOptions
) {
  const opts = { ...defaultOptions, ...options };
  const { headers } = res;
  const originHeaders = await originHeadersFromReq(req, opts.origin ?? false);
  const mergeHeaders = (v: string, k: string) => {
    if (k === "Vary") headers.append(k, v);
    else headers.set(k, v);
  };

  // If there's no origin we won't touch the response
  if (originHeaders == null) return res;

  originHeaders.forEach(mergeHeaders);

  if (typeof opts.credentials !== "undefined") {
    headers.set("Access-Control-Allow-Credentials", "true");
  }

  const exposed = Array.isArray(opts.exposedHeaders)
    ? opts.exposedHeaders.join(",")
    : opts.exposedHeaders;

  if (typeof exposed !== "undefined") {
    headers.set("Access-Control-Expose-Headers", exposed);
  }

  // Handle the preflight request
  if (req.method === "OPTIONS") {
    if (typeof opts.methods !== "undefined") {
      const methods = Array.isArray(opts.methods)
        ? opts.methods.join(",")
        : opts.methods;

      headers.set("Access-Control-Allow-Methods", methods);
    }

    getAllowedHeaders(req, opts.allowedHeaders).forEach(mergeHeaders);

    if (typeof opts.maxAge === "number") {
      headers.set("Access-Control-Max-Age", String(opts.maxAge));
    }

    if (typeof opts.preflightContinue !== "undefined") {
      return res;
    }

    headers.set("Content-Length", "0");
    return new Response(null, { status: opts.optionsSuccessStatus, headers });
  }

  // If we got here, it's a normal request
  return res;
}
