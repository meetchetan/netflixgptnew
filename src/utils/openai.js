import OpenAI from "openai";
// import { OPENAI_KEY } from "./constants";

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_KEY,
  dangerouslyAllowBrowser: true, // defaults to process.env["OPENAI_API_KEY"]
});

export default openai;
