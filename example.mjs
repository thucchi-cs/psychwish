import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: "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",
});

const response = openai.responses.create({
  model: "gpt-4o-mini",
  input: "write a haiku about ai",
  store: true,
});

response.then((result) => console.log(result.output_text));