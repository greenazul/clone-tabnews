test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  const responseBody = await response.json();
  console.log(responseBody);
  const parsedDate = new Date(responseBody.updated_at).toISOString();
  //connection
  expect(response.status).toBe(200);
  //updated_at
  expect(responseBody.updated_at).toEqual(parsedDate);
  //db_version
  expect(typeof responseBody.dependencies.database.version).toEqual("string");
  expect(responseBody.dependencies.database.version).toContain(
    "PostgreSQL 16.0",
  );
  //max connections
  expect(responseBody.dependencies.database.max_connections).toBeGreaterThan(0);
  //opened connections
  expect(responseBody.dependencies.database.opened_connections).toEqual(1);
});
