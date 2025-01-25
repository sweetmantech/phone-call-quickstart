module.exports = {
  apps: [
    {
      name: "recoup-phone-call",
      script: "pnpm",
      args: "start",
      cron_restart: "0 */12 * * *",
      watch: false,
      autorestart: true,
    },
  ],
};
