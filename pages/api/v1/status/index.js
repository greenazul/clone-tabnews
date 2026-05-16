import database from "infra/database.js";

async function status(request, response) {
  try {
    const updatedAt = new Date().toISOString();
    const databaseName = process.env.POSTGRES_DB;
    var resultVersion = await database.query("SELECT version(); ");
    var resultMaxConn = await database.query("SHOW max_connections ");
    var resultOpenedConn = await database.query({
      text: "SELECT count(*) as opened_connections FROM pg_stat_activity WHERE datname = $1 ;",
      values: [databaseName],
    });
    response.status(200).json({
      updated_at: updatedAt,
      dependencies: {
        database: {
          name: databaseName,
          version: resultVersion.rows[0].version,
          max_connections: parseInt(resultMaxConn.rows[0].max_connections),
          opened_connections: parseInt(
            resultOpenedConn.rows[0].opened_connections,
          ),
        },
      },
    });
  } catch (error) {
    console.log("<0>ERROR status/index", error);
  }
}

export default status;
