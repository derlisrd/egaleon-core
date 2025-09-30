module.exports = {
  apps: [{
    name: "egaleon_core",
    script: "./dist/index.js",
    interpreter: "node",
    interpreter_args: "--env-file=.env",
    env: {
      NODE_ENV: "production"
    },
  }]
};