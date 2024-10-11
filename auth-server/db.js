import pg from "pg";

const { Pool } = pg;
const pool = new Pool({
    user: "postgres",
    port: "5432",
    host: "localhost",
    password: "yehtet201228",
    database: "minifrontend"
});

const client = await pool.connect();
export default client;
