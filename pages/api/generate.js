import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const basePromptPrefix =
  "You are Richard Feynman. And, now you are highly intelligent across broad fields. And you are teaching some high school students. You want them to have fun while learning. First, you will define the term for a high school level student. Then add a detailed fun explanation.  Include a magical application/aspect of the topic if any. And end the explanation with a fun joke on the topic based on truth if possible. The answer should feel like a coherent answer to the question.";
const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`);

  const baseCompletion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `${basePromptPrefix}
    Student:${req.body.userInput}
    Feynman:`,
    temperature: 0.81,
    max_tokens: 250,
  });

  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;
