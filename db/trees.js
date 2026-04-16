// This imports the database client from client.js.
import db from "./client.js";

// This function gets every tree from the skill_trees table.
export async function getTrees() {
  // This stores the SQL query in a variable.
  const SQL = "SELECT * FROM skill_trees ORDER BY id;";

  // This runs the SQL query.
  const { rows } = await db.query(SQL);

  // This returns all of the tree rows.
  return rows;
}

// This function gets one tree by id.
export async function getTreeById(id) {
  // This runs a SQL query that looks for one tree with the matching id.
  const {
    // This takes the first row from the rows array and names it tree.
    rows: [tree],
  } = await db.query("SELECT * FROM skill_trees WHERE id = $1;", [id]);

  // This returns the one tree that was found.
  return tree;
}

// This function creates one tree in the skill_trees table.
export async function createTree(userId, title, description, isPublic) {
  // This runs an INSERT query to add a new tree to the table.
  const {
    // This takes the first returned row and names it tree.
    rows: [tree],
  } = await db.query(
    // This SQL adds values into the user_id, title, description, and is_public columns.
    `INSERT INTO skill_trees (user_id, title, description, is_public)
     VALUES ($1, $2, $3, $4)
     RETURNING *;`,
    // These are the real values that replace $1, $2, $3, and $4.
    [userId, title, description, isPublic]
  );

  // This returns the new tree that was just created.
  return tree;
}

// This function creates the skill_trees table.
export async function createTreesTable() {
  // This runs a CREATE TABLE query in PostgreSQL.
  await db.query(`
    CREATE TABLE skill_trees (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL,
      title VARCHAR(150) NOT NULL,
      description TEXT,
      is_public BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `);
}
