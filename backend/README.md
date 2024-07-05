# Getting Started

## Prerequisites

Before starting the project, ensure you have the following installed on your machine:

- Node.js
- PostgreSQL

### Setup

#### 1. Clone the Repository

```sh
git clone https://github.com/yogyy/SERU-test
```

#### 2. Install Dependencies

```sh
cd backend
pnpm install
```

#### 3. Create .env File

Copy the sample .env file and update it with your database connection details:

```sh
cp .env.sample .env
```

#### 4. Run Migration

```sh
pnpm migrate
```

#### 5. Generate Database Types

Run the following command to generate TypeScript types for your database:

```sh
pnpm db:type
```

## Routes

for a detail routes, check postman collection
