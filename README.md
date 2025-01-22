# Twilio Phone Call Starter

A simple TypeScript template for making outbound phone calls using Twilio.

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
     - `TWILIO_TO_PHONE_NUMBER`: The recipient's phone number

## Usage

Run in development mode with auto-reload:

```bash
pnpm dev
```

Or build and run in production:

```bash
pnpm build
pnpm start
```

## Notes

- The default TwiML URL (`http://demo.twilio.com/docs/voice.xml`) will play a sample message
- Replace it with your own TwiML URL for custom voice messages
- Make sure to use a verified phone number for testing if you're using a trial account
