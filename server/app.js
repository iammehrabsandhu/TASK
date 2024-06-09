"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const client = new pg_1.Client({
    connectionString: "postgresql://mehrab0880.be21:YAI3sN1xWabm@ep-muddy-feather-a18ovp9z.ap-southeast-1.aws.neon.tech/testdb?sslmode=require"
});
function connect() {
    return __awaiter(this, void 0, void 0, function* () {
        //  await client.end();
        yield client.connect();
        console.log("connected successfully");
    });
}
connect();
function createTodoTable() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield client.query(`
        CREATE TABLE todo (
            id SERIAL PRIMARY KEY,
            content VARCHAR(50) UNIQUE NOT NULL
        );
    `);
        console.log(result);
    });
}
//createTodoTable();
function insertRow(content) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Execute SQL query to insert a new row into the table
            console.log("inside insert");
            const query = `INSERT INTO todo (content) VALUES ($1)`;
            const values = [content];
            const result = yield client.query(query, values);
            console.log('New row inserted:', result.rowCount);
        }
        catch (error) {
            console.error('Error inserting row:', error);
        }
    });
}
function checkTodoTableExists() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("works");
            const result = yield client.query(`
            SELECT EXISTS (
                SELECT 1
                FROM information_schema.tables 
                WHERE table_name = 'todo'
            );
        `);
            const exists = result.rows[0].exists;
            console.log(`Todo table exists: ${exists}`);
            client.end();
        }
        catch (error) {
            console.error('Error checking todo table:', error);
        }
    });
}
//checkTodoTableExists();
insertRow("wtf").then(() => { console.log("insertedd"); client.end(); });
// Call the connect function to connect to the database
/*connect()
  .then(() => {
    // Call the insertRow function to insert a new row into the table
    console.log("inserting");
    insertRow('Sample content')
      .finally(() => {
        // Close the database connection after inserting the row
        console.log("closing");
        client.end();
      });
  })
  .catch((error) => {
    console.error('Error:', error);
  });*/
