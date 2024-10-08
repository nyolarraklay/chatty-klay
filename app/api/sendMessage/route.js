import { OpenAIEdgeStream } from "openai-edge-stream";

export async function POST(req) {
  try {
    const { message } = await req.json();
    console.log("message", message);

    if (!message) {
      return new Response(JSON.stringify({ error: "Message is required" }), {
        status: 400,
      });
    }

    const stream = await new OpenAIEdgeStream(
      "https://api.openai.com/v1/chat/completions",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        method: "POST",
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content: message,
            },
          ],
          stream: true,
        }),
      },
    );

    return new Response(stream, {
      headers: { "Content-Type": "application/json" }, // Set appropriate content type
    });
  } catch (error) {
    console.error("An error occurred:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
