import express from "express";
import db from "./db/client.js";
import { createUsersTable } from "./db/users.js";
import pg from "pg";

const PORT = 3001;

const app = express();

await db.connect();

await createUsersTable();

app.use(express.json());

app.get("/greet", helloWorld);


function helloWorld(req, res){
    try {
        const SQL = "SELECT message FROM greetings ORDER by id LIMIT 1;"
        // const result = await 
        res.status(200).json({greeting: "hello world"})
    } catch (error) {
        console.log("error")
    }
}



app.listen(PORT, () => {
    console.log("Listening on PORT 3001");
});