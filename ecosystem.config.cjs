module.exports = {
  apps: [
    {
      name: "recoup-phone-call",
      script: "/root/.local/share/pnpm/pnpm",
      args: "dev",
      cron_restart: "0 */12 * * *",
      watch: false,
      autorestart: true,
      env: {
        PATH: "/root/.nvm/versions/node/v20/bin:/root/.local/share/pnpm:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",
        NODE_ENV: "production",
        NVM_DIR: "/root/.nvm",
        PNPM_HOME: "/root/.local/share/pnpm",
      },
      interpreter: "/root/.nvm/versions/node/v20/bin/node",
    },
  ],
};
