

// src/database/db.ts

import { Pool } from "pg";

// Create a new connection pool to the PostgreSQL database
// Pool manages multiple client connections efficiently
export const pool = new Pool({

});

// Optional: You can listen for errors on the pool like this
pool.on("error", (err:Error) => {
  console.error("Unexpected error on idle PostgreSQL client", err);
  process.exit(-1);  // Optional: exit process on DB errors
});
