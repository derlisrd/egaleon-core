module.exports = {
  apps: [{
    name: "egaleon_core",
    script: "./dist/index.js",
    interpreter: "node",
    node_args: [
      "-r", "tsconfig-paths/register",
      "--env-file=.env" 
    ],
    env: {
      NODE_ENV: "production"
    },
  }]
};