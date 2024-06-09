import { Injectable } from '@nestjs/common';
import { ChatMistralAI } from "@langchain/mistralai";
import { PromptTemplate } from "@langchain/core/prompts";
import { JSONLoader } from "langchain/document_loaders/fs/json";
import { RunnableSequence } from "@langchain/core/runnables";
import { formatDocumentsAsString } from "langchain/util/document";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { Item } from 'src/items/schemas/item.schema';
import { Document } from "langchain/document";

export interface Message {
  role: string;
  content: string;
}


const TEMPLATE = `
Answer the user's questions based only on the following context.
If the answer is not in the context, reply politely that you do not have that information available.Only provide details once the user asks for them.:
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

  async chat(messages: Message[], table: Item[]) {
    try {
      const formattedPreviousMessages = messages.slice(0, -1).map(this.formatMessage);
      const currentMessageContent = messages[messages.length - 1].content;
      const formattedDocs = JSON.stringify(table, null);
      const prompt = PromptTemplate.fromTemplate(TEMPLATE);

      const model = new ChatMistralAI({
        apiKey: "PdqHnloyBQVxi2vAR6eN2c4bOjQjnKLp",
        model: "mistral-small",
        temperature: 0,
        streaming: false,
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

      console.log(output)

      return output;
    } catch (e) {
      console.log("error ==> ", e);
    }
  }

  async handlePostRequest(messages: Message[]) {

    const latestMessage = messages[messages.length - 1].content

    try {
      const response = await fetch('http://192.168.145.49:8000/parse', { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ "prompt": latestMessage }) })
      const data = await response.json()

      console.log(data)
      if (data.valid) {
        //send to   
        return ({
          "message": "On it!"
        })
      }
    }
    catch (e) {
      console.log(e)
    }
    finally {
      const table = [{ name: "Box 1", quantity: 12, site: "Site A" }, { name: "Box 2", quantity: 110, site: "Site B" }]
      //@ts-ignore
      const response = await this.chat(messages, table);

      return ({
        "message": response
      })
    }

  }

}

