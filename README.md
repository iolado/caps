# Skill Tree Builder

## Overview

Skill Tree Builder is a full-stack web app that helps users plan and track learning goals using a visual skill tree. Users can create custom trees, add skills as nodes, define prerequisites, and track progress as they unlock new skills.

The idea is inspired by RPG-style progression systems, but applied to real-life learning goals like web development, data science, or fitness.

## Elevator Pitch

Skill Tree Builder makes learning more structured and motivating by turning goals into visual progression maps. Instead of keeping scattered notes or checklists, users can build a skill tree, connect related skills, and unlock new ones as they make progress.

## Users

This app is designed for:

- Students
- Career switchers
- Self-learners
- Hobbyists who want a more visual way to track progress

## MVP Features

### 1. User Authentication

Users can:

- Sign up
- Log in
- Log out
- View only their own trees and progress

### 2. Create and Manage Skill Trees

Users can:

- Create a new skill tree
- Edit a tree
- Delete a tree

Example:

- Frontend Developer Path
- Data Science Roadmap
- Fitness Goals Tree

### 3. Create and Manage Skills

Users can:

- Add skills as nodes inside a tree
- Edit skill details
- Delete skills

Each skill can include:

- Title
- Description
- Difficulty

### 4. Define Prerequisites

Users can connect skills so that one skill depends on another.

Example:

- HTML before CSS
- CSS before React

This is the main standout feature because it shows relationship-based logic.

### 5. Track Progress

Users can mark each skill as:

- Locked
- In Progress
- Completed

When prerequisites are completed, the next skill becomes available.

### 6. Visual Skill Tree

Users can see their skill tree as a visual map with connected nodes.

The interface will highlight:

- Locked skills
- Available skills
- In-progress skills
- Completed skills

## Stretch Goals

- Share skill trees with other users
- Copy another user's tree
- Recommend the next skill to learn
- Add XP, badges, or levels
- Show tree completion percentages

## Project Management

The team will use:

- Git and GitHub for version control
- GitHub Projects for task tracking
- Pull requests for code review

### High-Level Tickets

- Set up repo and project structure
- Build authentication
- Design database schema
- Create CRUD routes for trees
- Create CRUD routes for skills
- Build prerequisite logic
- Build progress tracking
- Build dashboard and tree views
- Add styling and polish
- Test and debug

### Ticket Assignment

Tickets will be divided by feature area. One teammate can focus more on backend work while another focuses on frontend work, and both teammates will review each other's pull requests.

## Database Schema

### `users`

- `id` SERIAL PRIMARY KEY
- `name` VARCHAR(100) NOT NULL
- `email` VARCHAR(255) UNIQUE NOT NULL
- `password_hash` TEXT NOT NULL
- `created_at` TIMESTAMP DEFAULT NOW()

### `skill_trees`

- `id` SERIAL PRIMARY KEY
- `user_id` INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE
- `title` VARCHAR(150) NOT NULL
- `description` TEXT
- `is_public` BOOLEAN DEFAULT FALSE
- `created_at` TIMESTAMP DEFAULT NOW()

### `skills`

- `id` SERIAL PRIMARY KEY
- `tree_id` INTEGER NOT NULL REFERENCES skill_trees(id) ON DELETE CASCADE
- `title` VARCHAR(150) NOT NULL
- `description` TEXT
- `difficulty` VARCHAR(50)
- `position_x` INTEGER
- `position_y` INTEGER
- `created_at` TIMESTAMP DEFAULT NOW()

### `skill_prerequisites`

- `id` SERIAL PRIMARY KEY
- `skill_id` INTEGER NOT NULL REFERENCES skills(id) ON DELETE CASCADE
- `prerequisite_skill_id` INTEGER NOT NULL REFERENCES skills(id) ON DELETE CASCADE

### `user_skill_progress`

- `id` SERIAL PRIMARY KEY
- `user_id` INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE
- `skill_id` INTEGER NOT NULL REFERENCES skills(id) ON DELETE CASCADE
- `status` VARCHAR(20) NOT NULL
- `completed_at` TIMESTAMP

### Relationships

- A user has many skill trees
- A skill tree has many skills
- A skill can have many prerequisite skills
- A user tracks progress on each skill

## API Endpoints

### Auth

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

### Trees

- `GET /api/trees`
- `POST /api/trees`
- `GET /api/trees/:treeId`
- `PATCH /api/trees/:treeId`
- `DELETE /api/trees/:treeId`

### Skills

- `GET /api/trees/:treeId/skills`
- `POST /api/trees/:treeId/skills`
- `PATCH /api/skills/:skillId`
- `DELETE /api/skills/:skillId`

### Prerequisites

- `GET /api/skills/:skillId/prerequisites`
- `POST /api/skills/:skillId/prerequisites`
- `DELETE /api/skills/:skillId/prerequisites/:prereqId`

### Progress

- `GET /api/trees/:treeId/progress`
- `PATCH /api/skills/:skillId/progress`
- `GET /api/dashboard`

## Frontend Pages and Routes

- `/` Landing page
- `/register` Sign up page
- `/login` Login page
- `/dashboard` User dashboard
- `/trees/new` Create tree page
- `/trees/:treeId` Tree detail page

## Forms

### Register Form

- Name
- Email
- Password

### Login Form

- Email
- Password

### New Tree Form

- Title
- Description

### Skill Form

- Title
- Description
- Difficulty

## Wireframe Notes

- Dashboard shows all user trees
- Tree page shows a visual map of nodes and connections
- Colors will show skill status
- Users can click a node to update progress or edit details

## User Stories

### Authentication

As a user, I want to sign up and log in so that I can save my own skill trees.

### Tree Creation

As a user, I want to create a skill tree so that I can organize a learning goal into steps.

### Skill Management

As a user, I want to add, edit, and delete skills so that I can customize my tree.

### Prerequisites

As a user, I want to define which skills come first so that my tree follows a real learning order.

### Progress Tracking

As a user, I want to mark skills as in progress or completed so that I can track what I have learned.

### Visual Tree

As a user, I want to see my skills on a visual map so that I can understand my progress at a glance.
