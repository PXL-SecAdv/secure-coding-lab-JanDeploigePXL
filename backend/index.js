const pg = require('pg');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors')

const port=3000;

const pool = new pg.Pool({
    user: 'secadv',
    host: 'db',
    database: 'pxldb',
    password: 'ilovesecurity',
    port: 5432,
    connectionTimeoutMillis: 5000
})

console.log("Connecting...:")

app.use(cors({
    origin: 'http://localhost:8080'
}));
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get('/authenticate/:username/:password', async (request, response) => {
    const username = request.params.username;
    const password = request.params.password;

    const query = 'SELECT * FROM users WHERE user_name=$1 AND password=$2';
    const values = [username, password];

    pool.query(query, values, (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    });
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

