import mongoose from "mongoose";
import dns from "dns";

// Use public DNS to resolve Atlas SRV records on Windows networks
try {
  dns.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1"]);
} catch (e) {
  console.warn("DNS server configuration skipped:", e.message);
}

export const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    console.warn("⚠️  MONGO_URI is not defined in .env! Please provide your MongoDB Atlas connection string.");
    return;
  }

  const tryConnect = async () => {
    try {
      const conn = await mongoose.connect(mongoUri, {
        serverSelectionTimeoutMS: 10000,
      });
      console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.error(`❌ MongoDB connection error: ${error.message}`);
      console.log("ℹ️  Retrying MongoDB connection in 10 seconds...");
      setTimeout(tryConnect, 10000);
    }
  };

  await tryConnect();
};

