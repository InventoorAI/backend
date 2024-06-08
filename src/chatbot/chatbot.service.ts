import { Injectable } from '@nestjs/common';
import { ChatMistralAI } from "@langchain/mistralai";
import { PromptTemplate } from "@langchain/core/prompts";
import { JSONLoader } from "langchain/document_loaders/fs/json";
import { RunnableSequence } from "@langchain/core/runnables";
import { formatDocumentsAsString } from "langchain/util/document";
import { StringOutputParser } from "@langchain/core/output_parsers";

interface Message {
  role: string;
  content: string;
}

const TEMPLATE = `
Answer the user's questions based only on the following context.
If the answer is not in the context, reply politely that you do not have that information available.:
==============================
Context: {context}
==============================
Current conversation: {chat_history}

user: {question}
assistant:`;

@Injectable()
export class ChatbotService {
  constructor() { }

  private formatMessage(message: Message) {
    return `${message.role}: ${message.content}`;
  };

  async chat(messages: Message[], table: Blob) {
    try {
      const formattedPreviousMessages = messages.slice(0, -1).map(this.formatMessage);
      const currentMessageContent = messages[messages.length - 1].content;

      const loader = new JSONLoader(table, [
        "/name",
        "/quantity",
        "/description",
        "/width",
        "/height",
        "/depth",
        "/site"
      ]);
      const docs = await loader.load();
      const formattedDocs = formatDocumentsAsString(docs);
      const prompt = PromptTemplate.fromTemplate(TEMPLATE);

      const model = new ChatMistralAI({
        apiKey: process.env.MISTRAL_API_KEY,
        model: process.env.MISTRAL_MODEL,
        temperature: Number(process.env.MISTRAL_TEMPERATURE),
        streaming: Boolean(process.env.MISTRAL_STREAMING),
      });

      const parser = new StringOutputParser();

      const chain = RunnableSequence.from([
        {
          question: (input) => input.question,
          chat_history: (input) => input.chat_history,
          context: () => formattedDocs,
        },
        prompt,
        model,
        parser,
      ]);

      const output = await chain.invoke({
        chat_history: formattedPreviousMessages.join("\n"),
        question: currentMessageContent,
      });

      return output
    } catch (e) {
      console.log("error ==> ", e);
    }
  }
}

