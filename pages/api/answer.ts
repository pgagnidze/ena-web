import { OpenAIModel } from "@/types";
import { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";
import { allowCors } from "@/utils";

export const config = {
  runtime: "nodejs",
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
  const { newConvoArr, apiKey } = req.body as {
    newConvoArr: {
      role: "system" | "user" | "assistant";
      content: string;
    }[];
    apiKey: string;
  };
  const configuration = new Configuration({ apiKey });
  const openai = new OpenAIApi(configuration);
  let completion;
    completion = await openai.createChatCompletion({
      model: OpenAIModel.DAVINCI_TURBO,
      messages: newConvoArr,
      max_tokens: 512,
      temperature: 0,
    });
    res.status(200).send(completion.data.choices[0].message?.content)
  } catch (error: any) {
    if (error.response) {
      res.status(500).send("openai returned an error: " + error.response.data.error.message);
    } else {
      res.status(500).send("openai returned an error: " + error.message);
    }
  }
};

export default allowCors(handler);
