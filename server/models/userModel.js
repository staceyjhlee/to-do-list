const { Pool } = require("pg");
/**
 * REPLACE PG_URI WITH DB PROVIDED IN EMAIL. IMPORTANT FOR APPLICATION FUNCTIONALITY
 */
const PG_URI = "PG_URI_HERE";
const pool = new Pool({
  connectionString: PG_URI,
});

module.exports = {
  query: (text, params, callback) => {
    console.log("executed query", text);
    return pool.query(text, params, callback);
  },
};
