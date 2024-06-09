import {Client} from "pg";
import { PrismaClient } from '@prisma/client'



const client =new Client({
   connectionString: "postgresql://mehrab0880.be21:YAI3sN1xWabm@ep-muddy-feather-a18ovp9z.ap-southeast-1.aws.neon.tech/testdb?sslmode=require"
})
async function connect(){
  //  await client.end();
   await client.connect();
   console.log("connected successfully");
}

connect();
async function createTodoTable() {
   
    const result = await client.query(`
        CREATE TABLE todo (
            id SERIAL PRIMARY KEY,
            content VARCHAR(50) UNIQUE NOT NULL
        );
    `)
    console.log(result);
}
//createTodoTable();
async function insertRow(content: string) {
    try {
      // Execute SQL query to insert a new row into the table
      console.log("inside insert");
      const query = `INSERT INTO todo (content) VALUES ($1)`;
      const values = [content];
      const result = await client.query(query, values);
  
      console.log('New row inserted:', result.rowCount);
    } catch (error) {
      console.error('Error inserting row:', error);
    }
  }
  async function checkTodoTableExists() {
    try {
        console.log("works");
        const result = await client.query(`
            SELECT EXISTS (
                SELECT 1
                FROM information_schema.tables 
                WHERE table_name = 'todo'
            );
        `);
        const exists = result.rows[0].exists;
        console.log(`Todo table exists: ${exists}`);
        client.end();
    } catch (error) {
        console.error('Error checking todo table:', error);
    }
}
//checkTodoTableExists();
insertRow("wtf").then(()=>{console.log("insertedd");client.end();});

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
  
