import OpenAI from "openai";
import { OpenAIEdgeStream } from "openai-edge-stream";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || "" });

export const runtime = "edge";

export async function POST() {
  try {
    // const { messages } = await req.json();
    // console.log("Received messages:", messages);
    const tools = [
      {
        type: "function",
        function: {
          name: "get_delivery_date",
          description:
            "Get the delivery date for a customer's order. Call this whenever you need to know the delivery date, for example when a customer asks 'Where is my package'",
          parameters: {
            type: "object",
            properties: {
              order_id: {
                type: "string",
                description: "The customer's order ID.",
              },
            },
            required: ["order_id"],
            additionalProperties: false,
          },
        },
      },
    ];

    const messages = [
      {
        role: "system",
        content:
          "You are a helpful customer support assistant. Use the supplied tools to assist the user.",
      },
      {
        role: "user",
        content: "Hi, can you tell me the delivery date for my order?",
      },
    ];

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: messages,
      tools: tools,
    });

    const stream = await OpenAIEdgeStream(response);

    return new Response(stream, {
      headers: { "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Error in POST handler:", error);
    return new Response("Error occurred", { status: 500 });
  }
}
