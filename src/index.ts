import dotenv from "dotenv";
import twilio from "twilio";
import VoiceResponse = require("twilio/lib/twiml/VoiceResponse");

dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

if (!accountSid || !authToken) {
  throw new Error("Missing required environment variables");
}

const client = twilio(accountSid, authToken);

const twiml = new VoiceResponse();
twiml.say(
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo."
);
const twimlString = twiml.toString();

async function makeOutboundCall(): Promise<void> {
  try {
    const call = await client.calls.create({
      twiml: twimlString,
      to: process.env.TWILIO_TO_PHONE_NUMBER as string,
      from: process.env.TWILIO_PHONE_NUMBER as string,
    });

    console.log("Call successfully placed!");
    console.log("Call SID:", call.sid);
  } catch (error) {
    console.error("Error making the call:", error);
  }
}

// Make the call
makeOutboundCall();
