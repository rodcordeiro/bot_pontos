module.exports = {
  apps: [
    {
      name: 'bot_whats',
      script: 'npm run start:prod',
      // cron_restart: '0 7 * * *',
      stop_exit_codes: [0],
      exp_backoff_restart_delay: 100,
    },
  ],
};
