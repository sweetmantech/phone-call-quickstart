# Twilio Phone Call Starter

A simple Node.js template for making outbound phone calls using Twilio.

## Setup

1. Install dependencies:

```bash
pnpm install
```

2. Configure environment variables:

   - Copy `.env.example` to `.env`
   - Fill in your Twilio credentials:
     - `TWILIO_ACCOUNT_SID`: Your Twilio Account SID
     - `TWILIO_AUTH_TOKEN`: Your Twilio Auth Token
     - `TWILIO_PHONE_NUMBER`: Your Twilio phone number

3. Update the recipient's phone number in `index.js`

## Usage

Run the script:

```bash
pnpm start
```

## Notes

- The default TwiML URL (`http://demo.twilio.com/docs/voice.xml`) will play a sample message
- Replace it with your own TwiML URL for custom voice messages
- Make sure to use a verified phone number for testing if you're using a trial account
