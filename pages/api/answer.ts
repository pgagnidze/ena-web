import { OpenAIStream } from "@/utils";

export const config = {
  runtime: "edge",
};

const handler = async (req: Request): Promise<Response> => {
  try {
    const { newConvoArr, apiKey } = (await req.json()) as {
      newConvoArr: {
        role: string;
        content: string;
      }[];
      apiKey: string;
    };

    const stream = await OpenAIStream(newConvoArr, apiKey);

    return new Response(stream);
  } catch (error) {
    return new Response("answer handler returned an error: " + error, { status: 500 });
  }
};

export default handler;
