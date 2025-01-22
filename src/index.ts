import dotenv from "dotenv";
import twilio from "twilio";

dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

if (!accountSid || !authToken) {
  throw new Error("Missing required environment variables");
}

const client = twilio(accountSid, authToken);

async function makeOutboundCall(): Promise<void> {
  try {
    const call = await client.calls.create({
      url: "http://demo.twilio.com/docs/voice.xml", // Replace with your TwiML URL
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
