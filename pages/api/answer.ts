import { OpenAIModel } from "@/types";
import {
  createParser,
  ParsedEvent,
  ReconnectInterval,
} from "eventsource-parser";
import { cors } from "@/utils";
import { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

const handler = async (req: NextRequest): Promise<Response> => {
  try {
    const { newConvoArr, apiKey } = (await req.json()) as {
      newConvoArr: {
        role: string;
        content: string;
      }[];
      apiKey: string;
    };

    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      method: "POST",
      body: JSON.stringify({
        model: OpenAIModel.DAVINCI_TURBO,
        messages: newConvoArr,
        max_tokens: 512,
        temperature: 0,
        stream: true,
      }),
    });

    if (res.status !== 200) {
      throw new Error("openai returned an error: " + (await res.text()));
    }

    const stream = new ReadableStream({
      async start(controller) {
        const onParse = (event: ParsedEvent | ReconnectInterval) => {
          if (event.type === "event") {
            const data = event.data;

            if (data === "[DONE]") {
              controller.close();
              return;
            }

            try {
              const json = JSON.parse(data);
              const text = json.choices[0].delta.content;
              const queue = encoder.encode(text);
              controller.enqueue(queue);
            } catch (e) {
              controller.error(e);
            }
          }
        };

        const parser = createParser(onParse);

        for await (const chunk of res.body as any) {
          parser.feed(decoder.decode(chunk));
        }
      },
    });
    const successResponse = new Response(stream);
    await cors(req, successResponse);
    return successResponse;
  } catch (error) {
    const errorResponse = new Response("answer handler returned an error: " + error, {
      status: 500,
    });
    await cors(req, errorResponse);
    return errorResponse;
  }
};

export default handler;
