import { NextApiRequest, NextApiResponse } from "next";
import { v2 } from "@google-cloud/translate";
const { Translate } = v2;
import { allowCors } from "@/utils";

export const config = {
  runtime: "nodejs",
};

const translate = new Translate({
  key: process.env.GOOGLE_TRANSLATE_API_KEY,
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query, lang } = req.body as {
    query: string;
    lang: string;
  };

  const codeBlocks = query.split("```");
  const translatedBlocks = [];

  for (let i = 0; i < codeBlocks.length; i++) {
    if (i % 2 === 0) {
      const translation = await translate.translate(codeBlocks[i], {
        to: lang,
      });
      translatedBlocks.push(translation?.[0]);
    } else {
      translatedBlocks.push("```" + codeBlocks[i] + "```");
    }
  }

  res.status(200).send(translatedBlocks.join(""));
};

export default allowCors(handler);
