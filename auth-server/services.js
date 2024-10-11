import client from "./db.js";

export const getUsers = async () => {
    try {
        const { rows } = await client.query("SELECT * FROM users");
        return rows;
    } catch (err) {
        console.log(err);
    }
}

export const getUserByEmail = async (email) => {
    try {
        const { rows } = await client.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );
        return rows[0];
    } catch (err) {
        console.log(err);
    }
}

export const createUser = async ({ id, email }) => {
    try {
        const { rows } = await client.query(
            "INSERT INTO users (id, email) VALUES ($1, $2) RETURNING *",
            [id, email]
        );
        return rows[0];
    } catch (err) {
        console.log(err);
    }
}