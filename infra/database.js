import { Client } from "pg";

async function query(queryObj) {
  let client;

  try {
    client = await getNewClient();
    const result = await client.query(queryObj);
    return result;
  } catch (error) {
    console.log("<0>ERROR /database query fn ", error);
  } finally {
    await client.end();
  }
}

async function getNewClient() {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    ssl: getSSLValues(),
  });
  await client.connect();
  return client;
}

export default {
  query,
  getNewClient,
};

function getSSLValues() {
  return process.env.NODE_ENV === "production" ? true : false;
}
