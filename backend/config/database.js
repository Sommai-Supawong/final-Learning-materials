import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

// Check if SSL is required (Cloud URL like Neon/Render/Supabase, or explicitly set via DB_SSL)
const isSslRequired = process.env.DB_SSL !== undefined
  ? process.env.DB_SSL === "true"
  : Boolean(
      process.env.DATABASE_URL &&
        !process.env.DATABASE_URL.includes("localhost") &&
        !process.env.DATABASE_URL.includes("127.0.0.1") &&
        !process.env.DATABASE_URL.includes("postgres-db")
    );

const dialectOptions = {
  ...(isSslRequired
    ? {
        ssl: {
          require: true,
          rejectUnauthorized: false, // Essential for Neon/Render/Supabase SSL connections
        },
      }
    : {}),
  keepAlive: true,
};

// Connection pool configuration optimized for Neon Serverless & Cloud Postgres
// - acquire: 60s to accommodate Neon serverless wake-up (Scale to Zero)
// - idle: 10s to release idle connections before Neon terminates them
// - evict: 5s to prune closed sockets
const poolConfig = {
  max: 10,
  min: 0,
  acquire: 60000,
  idle: 10000,
  evict: 5000,
};

// Initialize Sequelize with DATABASE_URL or separate DB environment variables
const sequelize = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: "postgres",
      logging: false,
      dialectOptions,
      pool: poolConfig,
    })
  : new Sequelize(
      process.env.DB_NAME || "product_db",
      process.env.DB_USER || "dev_user",
      process.env.DB_PASSWORD || "dev_password",
      {
        host: process.env.DB_HOST || "localhost",
        port: Number(process.env.DB_PORT) || 5432,
        dialect: "postgres",
        logging: false,
        dialectOptions,
        pool: poolConfig,
      },
    );

// Connection with automatic retry logic to gracefully handle Neon wake-ups and container startup races
const connectDB = async (retries = 5, delayMs = 3000) => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(`[Database] Attempting connection (${attempt}/${retries})...`);
      await sequelize.authenticate();
      console.log(" Connected to PostgreSQL successfully!");
      await sequelize.sync({
        alter: process.env.NODE_ENV === "development",
      });
      console.log(" Database Tables Synchronized!");
      return;
    } catch (error) {
      const errDetail =
        error.original?.message ||
        error.parent?.message ||
        error.parent?.code ||
        error.message ||
        error.name ||
        "Unknown Error";

      console.error(`❌ [Database] Connection attempt ${attempt} failed: ${errDetail} (${error.name || "Error"})`);

      if (error.name === "SequelizeConnectionRefusedError" || errDetail.includes("ECONNREFUSED")) {
        const targetHost = sequelize.config?.host || "localhost";
        const targetPort = sequelize.config?.port || 5432;
        console.log(`💡 [Hint] ไม่สามารถเชื่อมต่อไปยัง PostgreSQL ที่ ${targetHost}:${targetPort}`);
        console.log(`   - หากรันฐานข้อมูลผ่าน Docker ให้พิมพ์: docker compose up postgres-db -d`);
        console.log(`   - หรือตรวจสอบว่า PostgreSQL บนเครื่องเปิดใช้งานอยู่และพอร์ตใน .env ตรงกันหรือไม่`);
      }

      if (attempt === retries) {
        console.error("❌ [Database] Max connection retries reached. Exiting...");
        process.exit(1);
      }
      console.log(` Waiting ${delayMs / 1000}s before retrying (waiting for database/Neon wake-up)...`);
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }
};

export { sequelize, connectDB };
