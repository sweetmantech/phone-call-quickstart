require("dotenv").config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

async function makeOutboundCall() {
  try {
    const call = await client.calls.create({
      url: "http://demo.twilio.com/docs/voice.xml", // Replace with your TwiML URL
      to: process.env.TWILIO_TO_PHONE_NUMBER,
      from: process.env.TWILIO_PHONE_NUMBER,
    });

    console.log("Call successfully placed!");
    console.log("Call SID:", call.sid);
  } catch (error) {
    console.error("Error making the call:", error);
  }
}

// Make the call
makeOutboundCall();
