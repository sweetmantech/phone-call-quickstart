// src/app.ts

import "dotenv/config";
import express, { Response } from "express";
import ExpressWs from "express-ws";
import VoiceResponse from "twilio/lib/twiml/VoiceResponse";
import { ElevenLabsClient } from "elevenlabs";
import { type WebSocket } from "ws";
import { Readable } from "stream";

const app = ExpressWs(express()).app;
const PORT: number = parseInt(process.env.PORT || "5000");

const elevenlabs = new ElevenLabsClient();
const voiceId = "21m00Tcm4TlvDq8ikWAM";
const outputFormat = "ulaw_8000";
const text =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.";

function startApp() {
  app.post("/call/incoming", (_, res: Response) => {
    const twiml = new VoiceResponse();

    twiml.connect().stream({
      url: `wss://${process.env.SERVER_DOMAIN}/call/connection`,
    });

    res.writeHead(200, { "Content-Type": "text/xml" });
    res.end(twiml.toString());
  });

  app.ws("/call/connection", (ws: WebSocket) => {
    ws.on("message", async (data: string) => {
      const message: {
        event: string;
        start?: { streamSid: string; callSid: string };
      } = JSON.parse(data);

      if (message.event === "start" && message.start) {
        const streamSid = message.start.streamSid;
        const response = await elevenlabs.textToSpeech.convert(voiceId, {
          model_id: "eleven_flash_v2_5",
          output_format: outputFormat,
          text,
        });

        const readableStream = Readable.from(response);
        const audioArrayBuffer = await streamToArrayBuffer(readableStream);

        ws.send(
          JSON.stringify({
            streamSid,
            event: "media",
            media: {
              payload: Buffer.from(audioArrayBuffer as any).toString("base64"),
            },
          })
        );
      }
    });

    ws.on("error", console.error);
  });

  app.listen(PORT, () => {
    console.log(`Local: http://localhost:${PORT}`);
    console.log(`Remote: https://${process.env.SERVER_DOMAIN}`);
  });
}

function streamToArrayBuffer(readableStream: Readable) {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];

    readableStream.on("data", (chunk) => {
      chunks.push(chunk);
    });

    readableStream.on("end", () => {
      resolve(Buffer.concat(chunks).buffer);
    });

    readableStream.on("error", reject);
  });
}

startApp();
