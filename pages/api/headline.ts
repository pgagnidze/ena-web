import { allowEdgeCors } from "@/utils";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  runtime: "edge",
};

const handler = async (
  req: NextRequest,
  headers: Headers
): Promise<Response> => {
  try {
    const { content } = (await req.json()) as {
      content: string;
    };

    const res = await fetch(
      "https://headline-generator-gh1hqu7nehb7.octoai.cloud/infer",
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          prompt: {
            text: content,
          },
        }),
      }
    );

    if (res.status !== 200) {
      throw new Error("octoai returned an error: " + (await res.text()));
    }

    return NextResponse.json(await res.json());
  } catch (error) {
    return NextResponse.json({
      status: 500,
      headers,
      error: "headline handler returned an error: " + error,
    });
  }
};

export default allowEdgeCors(handler);
