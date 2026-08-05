const { getStore } = require("@netlify/blobs");

exports.handler = async (event) => {
  const store = getStore({
    name: "rugby-carnet",
    siteID: process.env.BLOBS_SITE_ID,
    token: process.env.NETLIFY_API_TOKEN
  });

  const key = event.queryStringParameters && event.queryStringParameters.key;

  const cors = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,DELETE,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: cors, body: "" };
  }

  try {
    if (event.httpMethod === "GET") {
      if (!key) return { statusCode: 400, headers: cors, body: "Missing key" };
      const value = await store.get(key);
      if (value === null) return { statusCode: 404, headers: cors, body: "Not found" };
      return {
        statusCode: 200,
        headers: { ...cors, "Content-Type": "application/json" },
        body: JSON.stringify({ key, value })
      };
    }

    if (event.httpMethod === "POST") {
      const { key: k, value } = JSON.parse(event.body || "{}");
      if (!k) return { statusCode: 400, headers: cors, body: "Missing key" };
      await store.set(k, value);
      return { statusCode: 200, headers: cors, body: "OK" };
    }

    if (event.httpMethod === "DELETE") {
      if (!key) return { statusCode: 400, headers: cors, body: "Missing key" };
      await store.delete(key);
      return { statusCode: 200, headers: cors, body: "OK" };
    }

    return { statusCode: 405, headers: cors, body: "Method not allowed" };
  } catch (err) {
    return { statusCode: 500, headers: cors, body: String(err) };
  }
};
