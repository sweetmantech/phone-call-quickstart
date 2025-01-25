module.exports = {
  apps: [
    {
      name: "recoup-phone-call",
      script: "/root/.nvm/versions/node/v20.18.2/bin/pnpm",
      args: "dev",
      cron_restart: "0 */12 * * *",
      watch: false,
      autorestart: true,
      env: {
        PATH: "/root/.nvm/versions/node/v20.18.2/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",
        NODE_ENV: "production",
        NVM_DIR: "/root/.nvm",
      },
      interpreter: "/root/.nvm/versions/node/v20.18.2/bin/node",
    },
  ],
};
