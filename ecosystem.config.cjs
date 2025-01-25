module.exports = {
  apps: [
    {
      name: "recoup-phone-call",
      script: "pnpm",
      args: "dev",
      cron_restart: "0 */12 * * *",
      watch: false,
      autorestart: true,
      env: {
        PATH: "/root/.nvm/versions/node/v20/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",
        NODE_ENV: "production",
      },
    },
  ],
};
