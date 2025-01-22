"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const twilio_1 = __importDefault(require("twilio"));
dotenv_1.default.config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
if (!accountSid || !authToken) {
    throw new Error("Missing required environment variables");
}
const client = (0, twilio_1.default)(accountSid, authToken);
async function makeOutboundCall() {
    try {
        const call = await client.calls.create({
            url: "http://demo.twilio.com/docs/voice.xml", // Replace with your TwiML URL
            to: process.env.TWILIO_TO_PHONE_NUMBER,
            from: process.env.TWILIO_PHONE_NUMBER,
        });
        console.log("Call successfully placed!");
        console.log("Call SID:", call.sid);
    }
    catch (error) {
        console.error("Error making the call:", error);
    }
}
// Make the call
makeOutboundCall();
