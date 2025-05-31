import cron from "node-cron"
import { PingMonitors } from "./ping"

cron.schedule("*/5 * * * *", async () => {
  console.log("Running scheduled ping job...")
  await PingMonitors()
})
