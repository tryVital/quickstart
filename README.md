# Vital quickstart

To get started with Vital quickstart, start with reading our [Docs](https://docs.tryvital.io/welcome/quickstart)


### Step 1 - Obtain and set Credentials

The first step is to obtain your credentials from the Vital Dashboard. 

Once you have done this

```
# out VITAL_CLIENT_ID and VITAL_SECRET in .env
cp .env.example .env

# Fill all the env variables in the .env file
VITAL_API_KEY=..
VITAL_ENV=sandbox
VITAL_REGION=us
```


### Step 2a - Run using Docker 

```
# Run fixenv.sh this copies the environment variables into the correct locations
./fixenv.sh

# Run Docker 
docker compose up --build
```

### Step 2b - Run manually


```
# Run fixenv.sh
./fixenv.sh

cd backend/python

# Note: must use python 3
# For virtualenv users:
# virtualenv venv
# source venv/bin/activate
cd backend/python && poetry shell && poetry install

# Start the backend app
cd ../../ && ./run_backend.sh
```

To run the frontend

```
# Install dependencies
cd quickstart/frontend
npm install

# Start the frontend app
npm run dev

# Go to http://localhost:3000
```

### Step 3

Head to localhost:3001 and begin interacting with the frontend 
Head to localhost:8000 to begin interacting with the backend. 
