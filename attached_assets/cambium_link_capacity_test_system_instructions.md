# 🧭 GVEC Link Capacity Web Application — Replit Build Instructions

## 🔰 Overview

This project transforms two SNMPv2-based Python scripts (`450v_link_capacity.py` and `450m_link_capacity.py`) into a containerized web application deployed on `isp-pybox` (Ubuntu 24.04.2 LTS, IP: `192.168.67.150`). The application performs link capacity testing for Cambium Networks PMP 450v and 450m access points (APs) and subscriber modules (SMs), integrating with:

- **cnMaestro** for live data (`https://cnmaestro.gvec.net/api/v2/`).
- **PostgreSQL** (host-installed at `localhost:5432`) for test results.
- **InfluxDB** (host-installed at `localhost:8086`) for time-series metrics.
- **NGINX** (host-installed at `localhost:80`) for reverse proxy under `/linktest/`.

These instructions provide a comprehensive guide for building on Replit and deploying to `isp-pybox`, aligning with existing applications (`cnmaestro-cleanup`, `cambium-monitor`). Emphasis is placed on autonomous code quality tools and a robust document management system. **Read, follow, and validate** before starting.

---

## 🧱 Phase 0: Production Server Baseline

### 🔌 Server Specifications

| Field          | Value                                               |
| -------------- | --------------------------------------------------- |
| Hostname       | `isp-pybox`                                         |
| OS             | Ubuntu 24.04.2 LTS (Kernel: 6.8.0-60-generic)       |
| RAM            | 15 GiB                                              |
| CPU            | 8-core Intel Xeon Gold 6326 @ 2.90GHz               |
| Host IP        | `192.168.67.150`                                    |
| Docker Network | `10.250.251.0/24` (bridge, gateway: `10.250.251.1`) |
| NGINX          | Host-installed (`/etc/nginx/`)                      |
| PostgreSQL     | Host-installed (`/var/lib/postgresql/`)             |
| InfluxDB       | Host-installed (`/var/lib/influxdb/`)               |
| Docker         | v27.5.1                                             |
| Portainer      | Docker container (port 9000)                        |
| AppArmor       | Enforced                                            |

### ⚙️ Key System Paths

| Component       | Path                                                                     |
| --------------- | ------------------------------------------------------------------------ |
| NGINX Config    | `/etc/nginx/sites-available/reverse-proxy` → `/etc/nginx/sites-enabled/` |
| Docker Config   | `/etc/docker/daemon.json`                                                |
| InfluxDB Config | `/etc/influxdb/influxdb.conf`                                            |
| PostgreSQL Data | `/var/lib/postgresql/`                                                   |
| NGINX Logs      | `/var/log/nginx/`                                                        |
| Docker Logs     | `/var/log/docker.log`                                                    |
| InfluxDB Logs   | `/var/log/influxdb/`                                                     |
| PostgreSQL Logs | `/var/log/postgresql/`                                                   |

### 🔒 Port Status

| Port | Status    | Service                    |
| ---- | --------- | -------------------------- |
| 80   | Occupied  | NGINX (host)               |
| 5432 | Occupied  | PostgreSQL (host)          |
| 8086 | Occupied  | InfluxDB (host)            |
| 5000 | Occupied  | cambium-monitor (Docker)   |
| 5010 | Occupied  | cnmaestro-cleanup (Docker) |
| 9000 | Occupied  | Portainer (Docker)         |
| 5020 | Available | linktest (Docker)          |

---

## 📦 Phase 1: Replit Input Files

Provided in Replit root:

- ✅ `450v_link_capacity.py` — SNMP tests for 450v APs
- ✅ `450m_link_capacity.py` — SNMP tests for 450m APs
- ✅ `.mib` files — SNMP MIBs
- ✅ `gvec.svg`, `gvec_logo_dark.svg` — Logos (place in `/app/public/assets/`)
- ✅ `devbox-server-config-output.txt` — Server fingerprint
- ✅ Markdown docs — System overview, testing, SNMP behavior

**Note:** Do not modify logos. Place in `/app/public/assets/`.

---

## 🌐 Application Architecture

### 💡 Core Behaviors

| Component     | Behavior                                                                                |
| ------------- | --------------------------------------------------------------------------------------- |
| **450v**      | Tests one SM per AP; multiple APs can test in parallel.                                 |
| **450m**      | Tests SMs individually or in "flood mode" (simultaneous).                               |
| **cnMaestro** | Live GET requests (`https://cnmaestro.gvec.net/api/v2/`), paginated (100 entries/call). |
| **SSL**       | Ignore cnMaestro SSL errors.                                                            |
| **SNMP**      | Disabled on Replit; enabled on `isp-pybox`.                                             |

### 🎯 MVP Goals

1. 🎛 React UI matching GVEC.org (white, deep blue, orange)
2. ⚙️ Real-time test scheduler
3. 📡 Live cnMaestro data
4. 📘 PostgreSQL results storage
5. 📈 InfluxDB time-series metrics
6. 🔁 Retry/concurrency logic
7. 📑 450m flood/serial toggles
8. 🔍 SNMP error checking
9. 🧠 AI trend detection
10. 🐳 Single-container deployment
11. 📝 Autonomous code quality and documentation

---

## 🧰 Phase 2: Build Instructions

### 🧑‍💻 Application Structure

A single container (`linktest`) combines frontend (React) and backend (FastAPI), served under `/linktest/`.

**Directory Structure:**

```
app/
├── public/
│   ├── assets/
│   │   ├── gvec.svg
│   │   ├── gvec_logo_dark.svg
├── src/
│   ├── components/
│   │   ├── Dashboard.tsx
│   │   ├── Scheduler.tsx
│   │   ├── History.tsx
│   │   ├── Settings.tsx
│   ├── App.tsx
│   ├── index.tsx
├── backend/
│   ├── ml/
│   │   ├── model_trainer.py
│   │   ├── predictor.py
│   │   ├── preprocess.py
│   │   ├── models/
│   │   ├── pipeline.json
│   ├── main.py
│   ├── routes/
│   │   ├── tests.py
│   │   ├── ml.py
│   ├── services/
│   │   ├── snmp_service.py
│   │   ├── cnmaestro_service.py
├── docs/
│   ├── STACK.md
│   ├── API_REFERENCE.md
│   ├── ROUTES.md
│   ├── ML_MODELS.md
│   ├── INVENTORY.md
├── package.json
├── requirements.txt
├── tsconfig.json
├── .eslintrc.json
├── .prettierrc
├── .pylintrc
├── .github/workflows/ci.yml
├── Dockerfile
├── docker-compose.yml
```

### 🧑‍💻 Frontend (React + TypeScript + TailwindCSS)

- **Framework:** React with TypeScript
- **Styling:** TailwindCSS (`https://cdn.tailwindcss.com`)
- **Base Path:** `/linktest/` (set in `react-router-dom`)
- **Views:**
  - `/linktest/dashboard`: AP/SM status, InfluxDB graphs
  - `/linktest/scheduler`: Configure tests
  - `/linktest/history`: PostgreSQL results
  - `/linktest/settings`: SNMP, thresholds, AI toggle
- **Dependencies:**
  - `react@^18.2.0`
  - `react-dom@^18.2.0`
  - `react-router-dom@^6.16.0`
  - `axios@^1.6.0`
  - `chart.js@^4.4.0`

**package.json (partial):**

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.16.0",
    "axios": "^1.6.0",
    "chart.js": "^4.4.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "typescript": "^5.2.2",
    "eslint": "^8.50.0",
    "eslint-plugin-react": "^7.33.2",
    "eslint-plugin-react-hooks": "^4.6.0",
    "prettier": "^3.0.3",
    "jest": "^29.7.0",
    "husky": "^9.0.0",
    "lint-staged": "^15.0.2",
    "ts-prune": "^0.10.3",
    "jscpd": "^3.5.10",
    "madge": "^6.1.0",
    "eslint-plugin-import": "^2.29.0"
  },
  "scripts": {
    "lint": "eslint src --ext .ts,.tsx --fix",
    "format": "prettier --write src/**/*.{ts,tsx}",
    "prune": "ts-prune",
    "jscpd": "jscpd src backend",
    "madge": "madge --circular src backend",
    "test": "jest --coverage",
    "prepare": "husky install"
  }
}
```

### ⚙️ Backend (Python FastAPI)

- **Framework:** FastAPI
- **API Prefix:** `/linktest/api/`
- **Dependencies:**
  - `fastapi==0.104.1`
  - `uvicorn==0.23.2`
  - `pysnmp==4.4.12`
  - `aiohttp==3.9.0`
  - `asyncpg==0.29.0`
  - `influxdb-client==1.40.0`
  - `pandas==2.1.3`
  - `scikit-learn==1.3.2`
  - `xgboost==2.0.2`
  - `joblib==1.3.2`

**requirements.txt (partial):**

```text
fastapi==0.104.1
uvicorn==0.23.2
pysnmp==4.4.12
aiohttp==3.9.0
asyncpg==0.29.0
influxdb-client==1.40.0
pandas==2.1.3
scikit-learn==1.3.2
xgboost==2.0.2
joblib==1.3.2
pylint==3.0.2
black==23.10.1
```

### 🛠️ Code Quality Tools

A suite of tools ensures code quality, with autonomous execution and auto-fixing via CI/CD. Tools are configured to run on every commit and in daily pipelines, fixing issues where possible.

| Tool                | Purpose                              | Auto-Fix | Configuration                | Command                        |
| ------------------- | ------------------------------------ | -------- | ---------------------------- | ------------------------------ |
| **ESLint**          | Linting for TypeScript/React         | Yes      | `.eslintrc.json`             | `eslint --fix`                 |
| **Prettier**        | Code formatting                      | Yes      | `.prettierrc`                | `prettier --write`             |
| **Pylint**          | Python linting                       | Partial  | `.pylintrc`                  | `pylint backend`               |
| **Black**           | Python code formatting               | Yes      | `.black`                     | `black backend`                |
| **ts-prune**        | Dead code detection                  | No       | `tsconfig.json`              | `ts-prune`                     |
| **jscpd**           | Duplicate code detection             | No       | `.jscpd.json`                | `jscpd src backend`            |
| **madge**           | Circular dependency detection        | No       | None                         | `madge --circular src backend` |
| **Jest**            | Frontend unit testing                | No       | `jest.config.js`             | `jest --coverage`              |
| **Pytest**          | Backend unit testing                 | No       | `pytest.ini`                 | `pytest --cov`                 |
| **apiDoc**          | API documentation generation         | Yes      | `apidoc.json`                | `apidoc -o docs/api`           |
| **typedoc**         | TypeScript documentation             | Yes      | `typedoc.json`               | `typedoc src --out docs/ts`    |
| **pydocstyle**      | Python docstring validation          | Partial  | `.pydocstyle`                | `pydocstyle backend`           |
| **route-validator** | API route validation (custom script) | Yes      | `scripts/validate_routes.py` | `python validate_routes.py`    |

**Configurations:**

- **.eslintrc.json**:

```json
{
  "env": { "browser": true, "es2021": true },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:import/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint", "react", "react-hooks", "import"],
  "rules": {
    "react/prop-types": "off",
    "import/order": [
      "error",
      { "groups": ["builtin", "external", "internal"] }
    ],
    "@typescript-eslint/no-unused-vars": "error"
  }
}
```

- **.prettierrc**:

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2
}
```

- **.pylintrc** (partial):

```ini
[FORMAT]
max-line-length=88
[MESSAGES CONTROL]
disable=missing-module-docstring
```

- **.jscpd.json**:

```json
{
  "threshold": 10,
  "reporters": ["html", "console"],
  "ignore": ["**/__tests__/**", "**/node_modules/**"]
}
```

- **scripts/validate_routes.py**:

```python
from fastapi import FastAPI
from fastapi.testclient import TestClient
app = FastAPI()
# Import routes
from backend.routes import tests, ml
app.include_router(tests.router, prefix="/linktest/api")
app.include_router(ml.router, prefix="/linktest/api")
client = TestClient(app)
def validate_routes():
    responses = [
        client.get("/linktest/api/healthz"),
        client.get("/linktest/api/history"),
        client.get("/linktest/api/ml/score"),
        client.get("/linktest/api/ml/forecast/00:04:56:11:22:33"),
        client.get("/linktest/api/ml/alert-drops")
    ]
    for resp in responses:
        if resp.status_code != 200:
            print(f"Route {resp.url} failed: {resp.status_code}")
            # Attempt to fix: Log and notify for manual correction
validate_routes()
```

**Autonomous Execution**:

- **Husky/Lint-Staged**: Pre-commit hooks run `eslint --fix`, `prettier --write`, `black`, and `validate_routes.py`.
- **CI/CD Pipeline**: Daily GitHub Actions workflow runs all tools, auto-fixes where possible, and logs issues to `/docs/QUALITY_ISSUES.md`.

**GitHub Actions Workflow (`.github/workflows/ci.yml`)**:

```yaml
name: CI
on:
  push:
    branches: [main]
  schedule:
    - cron: "0 0 * * *"
jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with: { node-version: "20" }
      - name: Setup Python
        uses: actions/setup-python@v4
        with: { python-version: "3.12" }
      - name: Install dependencies
        run: |
          npm install
          pip install -r requirements.txt
      - name: Lint and fix
        run: |
          npm run lint
          npm run format
          black backend
      - name: Check duplicates
        run: npm run jscpd
      - name: Check circular dependencies
        run: npm run madge
      - name: Check dead code
        run: npm run prune
      - name: Run tests
        run: |
          npm test
          pytest --cov=backend
      - name: Generate docs
        run: |
          apidoc -o docs/api
          typedoc src --out docs/ts
          python scripts/inventory.py
      - name: Log issues
        run: echo "Issues found: $(cat docs/QUALITY_ISSUES.md)" >> $GITHUB_STEP_SUMMARY
```

### 📝 Document Management System

A continuous inventory system generates and updates documentation in `/docs/`, integrated into CI/CD for daily updates.

- **Files Generated**:
  - `/docs/STACK.md`: Describes languages (TypeScript, Python), frameworks, dependencies.
  - `/docs/API_REFERENCE.md`: Auto-generated by `apiDoc` from FastAPI annotations.
  - `/docs/ROUTES.md`: Lists API and frontend routes, validated by `route-validator`.
  - `/docs/ML_MODELS.md`: Documents ML models, versions, and performance.
  - `/docs/INVENTORY.md`: Tracks stack components, versions, and status.

**Inventory Script (`scripts/inventory.py`)**:

````python
import json
import subprocess
from datetime import datetime
def inventory_stack():
    stack = {
        "timestamp": datetime.utcnow().isoformat(),
        "languages": {
            "TypeScript": "5.2.2",
            "Python": "3.12"
        },
        "frameworks": {
            "frontend": "React 18.2.0",
            "backend": "FastAPI 0.104.1"
        },
        "dependencies": {
            "frontend": json.load(open("package.json"))["dependencies"],
            "backend": subprocess.check_output("pip freeze", shell=True).decode()
        },
        "routes": {
            "frontend": ["/linktest/dashboard", "/linktest/scheduler", "/linktest/history", "/linktest/settings"],
            "api": ["/linktest/api/healthz", "/linktest/api/run-test", "/linktest/api/history", "/linktest/api/verify", "/linktest/api/ml/score", "/linktest/api/ml/forecast/{sm_mac}", "/linktest/api/ml/alert-drops"]
        },
        "status": subprocess.check_output("docker ps -f name=linktest", shell=True).decode()
    }
    with open("docs/INVENTORY.md", "w") as f:
        f.write(f"# Stack Inventory\n\n```json\n{json.dumps(stack, indent=2)}\n```")
inventory_stack()
````

**CI/CD Integration**:

- Runs daily via GitHub Actions.
- Updates `/docs/` files.
- Logs discrepancies to `/docs/QUALITY_ISSUES.md`.

---

## 🐳 Phase 3: Docker Setup

#### `docker-compose.yml`

```yaml
services:
  linktest:
    build: .
    container_name: linktest
    network_mode: bridge
    environment:
      - NODE_ENV=production
      - PORT=5020
      - DOCKER_CONTAINER=true
      - DATABASE_URL=postgresql://linktest_user:<password>@host.docker.internal:5432/linktest
      - INFLUXDB_URL=http://host.docker.internal:8086
      - INFLUXDB_TOKEN=<token>
      - INFLUXDB_ORG=gvec
      - INFLUXDB_BUCKET=linktest
      - CNMAESTRO_API_URL=https://cnmaestro.gvec.net/api/v2/
      - CNMAESTRO_CLIENT_ID=${CNMAESTRO_CLIENT_ID}
      - CNMAESTRO_CLIENT_SECRET=${CNMAESTRO_CLIENT_SECRET}
    extra_hosts:
      - 'host.docker.internal:host-gateway'
    ports:
      - '127.0.0.1:5020:5020'
    restart: unless-stopped
    logging:
      driver: 'json-file'
      options:
        max-size: '10m'
        max-file: '3'
    healthcheck:
      test:
        [
          'CMD',
          'wget',
          '--quiet',
          '--tries=1',
          '--spider',
          'http://localhost:5020/linktest/api/healthz',
        ]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
```

#### Dockerfile

```dockerfile
FROM python:3.12-slim
WORKDIR /app
RUN apt-get update && apt-get install -y nodejs npm wget
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY package.json .
RUN npm install
COPY . .
RUN npm run build
EXPOSE 5020
CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "5020"]
```

---

## 🌐 Phase 4: NGINX Reverse Proxy

Update `/etc/nginx/sites-available/reverse-proxy`:

```nginx
upstream linktest {
    server 127.0.0.1:5020;
}

server {
    listen 80;
    server_name isp-devbox.gvec.net;

    # ... existing directives ...

    rewrite ^/linktest$ /linktest/ permanent;

    location /linktest/api/ws {
        proxy_pass http://linktest/linktest/api/ws;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 86400s;
        proxy_send_timeout 86400s;
        proxy_connect_timeout 60s;
    }

    location ^~ /linktest/api/ {
        proxy_pass http://linktest/linktest/api/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 60s;
        proxy_send_timeout 60s;
    }

    location /linktest/ {
        proxy_pass http://linktest/linktest/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 60s;
        proxy_send_timeout 60s;
    }

    # ... existing error pages and logging ...
}
```

Reload:

```bash
sudo nginx -t && sudo systemctl reload nginx
```

---

## 📋 Phase 5: Database Setup

### 🧩 PostgreSQL Schema

- **Database:** `linktest`
- **User:** `linktest_user`
- **Host:** `host.docker.internal:5432`

#### Tables

1. **access_points**

```sql
CREATE TABLE access_points (
    id SERIAL PRIMARY KEY,
    ap_mac VARCHAR(32) UNIQUE NOT NULL,
    name VARCHAR(128),
    model VARCHAR(32) CHECK (model IN ('450v', '450m')),
    ip_address INET NOT NULL,
    tower_name VARCHAR(128),
    snmp_community VARCHAR(64),
    is_online BOOLEAN DEFAULT FALSE,
    last_seen TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

2. **subscriber_modules**

```sql
CREATE TABLE subscriber_modules (
    id SERIAL PRIMARY KEY,
    sm_mac VARCHAR(32) UNIQUE NOT NULL,
    ap_mac VARCHAR(32) REFERENCES access_points(ap_mac) ON DELETE CASCADE,
    luid SMALLINT,
    ip_address INET,
    is_online BOOLEAN DEFAULT FALSE,
    snmp_community VARCHAR(64),
    last_seen TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

3. **link_test_jobs**

```sql
CREATE TABLE link_test_jobs (
    id SERIAL PRIMARY KEY,
    ap_mac VARCHAR(32) REFERENCES access_points(ap_mac),
    sm_mac VARCHAR(32) REFERENCES subscriber_modules(sm_mac),
    job_type VARCHAR(32) CHECK (job_type IN ('individual', 'flood')),
    status VARCHAR(32) DEFAULT 'queued' CHECK (status IN ('queued', 'running', 'success', 'failed')),
    test_started TIMESTAMP,
    test_completed TIMESTAMP,
    retry_count INT DEFAULT 0 CHECK (retry_count >= 0),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

4. **settings**

```sql
CREATE TABLE settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL
);
INSERT INTO settings (key, value) VALUES
('snmp_timeout', '5'),
('snmp_retries', '2'),
('snmp_version', '2c');
```

#### Setup Script (`db/init.sql`)

```sql
CREATE DATABASE linktest;
CREATE USER linktest_user WITH PASSWORD '<secure_password>';
GRANT ALL PRIVILEGES ON DATABASE linktest TO linktest_user;
\connect linktest
-- Create tables above
GRANT ALL ON ALL TABLES IN SCHEMA public TO linktest_user;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO linktest_user;
```

Run:

```bash
sudo -u postgres psql < db/init.sql
```

### 📊 InfluxDB Schema

- **Bucket:** `linktest`
- **Org:** `gvec`
- **Host:** `host.docker.internal:8086`

#### Measurement: `link_test_results`

- **Tags:** `ap_mac`, `sm_mac`, `model`, `tower_name`
- **Fields:** `uplink_mbps`, `downlink_mbps`, `uplink_efficiency`, `downlink_efficiency`, `snr_ul`, `snr_dl`, `rssi_ul`, `rssi_dl`, `modulation_ul`, `modulation_dl`, `status_code`, `error_message`
- **Timestamp:** UTC

#### Setup

```bash
influx bucket create -n linktest -o gvec
```

#### Example Write (`influx/write_example.py`)

```python
from influxdb_client import InfluxDBClient, Point
from datetime import datetime

client = InfluxDBClient(url="http://host.docker.internal:8086", token="<token>", org="gvec")
write_api = client.write_api()

point = Point("link_test_results") \
    .tag("ap_mac", "00:04:56:AA:BB:CC") \
    .tag("sm_mac", "00:04:56:11:22:33") \
    .tag("model", "450v") \
    .tag("tower_name", "WestHill-AP1") \
    .field("uplink_mbps", 63.4) \
    .field("downlink_mbps", 128.2) \
    .field("snr_dl", 26.1) \
    .time(datetime.utcnow())

write_api.write(bucket="linktest", record=point)
client.close()
```

---

## 🧠 Phase 6: Machine Learning Integration

### Goals

- **Anomaly Detection:** Identify capacity/SNR drops
- **Forecasting:** Predict performance
- **Alerts:** Notify degradation
- **Capacity Planning:** Suggest upgrades
- **Health Scoring:** 0–100 per link

### Setup

- **Training:** On `isp-pybox` host
- **Inference:** In `linktest` container
- **Data:** InfluxDB (14-day window)

#### Query

```sql
SELECT mean("uplink_mbps"), mean("downlink_mbps"), mean("snr_dl")
FROM "link_test_results"
WHERE time > now() - 14d
GROUP BY time(15m), "ap_mac", "sm_mac"
```

#### Features

| Feature           | Source              |
| ----------------- | ------------------- |
| `mean_downlink`   | InfluxDB            |
| `mean_uplink`     | InfluxDB            |
| `snr_avg`         | InfluxDB            |
| `link_age_days`   | PostgreSQL          |
| `test_frequency`  | PostgreSQL          |
| `last_error_code` | InfluxDB/PostgreSQL |
| `hardware_model`  | PostgreSQL          |

#### Models

- `IsolationForest`: Anomalies
- `RandomForestRegressor`: Forecasting
- `KMeans`: Clustering
- `XGBoostClassifier`: Failure prediction

#### ML Directory

```
app/backend/ml/
├── model_trainer.py
├── predictor.py
├── preprocess.py
├── models/
│   ├── health_v1.pkl
│   ├── forecast_v1.pkl
├── pipeline.json
```

#### Retraining

Cron:

```bash
@daily /usr/bin/python3 /app/backend/ml/model_trainer.py --save /app/backend/ml/models/ --version v1
```

#### UI Enhancements

- **Forecast Chart:** 3-day prediction
- **Health Dial:** Red (<40), Yellow (40–80), Green (80+)
- **Anomaly Feed:** List drops
- **Cluster Map:** Group APs

---

## 🚀 Phase 7: Deployment

1. **Build on Replit:**
   - Test locally (SNMP disabled)
   - Export ZIP
2. **Transfer:**
   ```bash
   scp project.zip tvernor@192.168.67.150:/home/tvernor/
   ```
3. **Setup:**
   ```bash
   unzip project.zip -d /opt/linktest
   cd /opt/linktest
   docker-compose build
   docker-compose up -d
   ```
4. **NGINX:**
   - Update `/etc/nginx/sites-available/reverse-proxy`
   - Reload: `sudo systemctl reload nginx`
5. **Databases:**
   - Run `db/init.sql`
   - Setup InfluxDB bucket
6. **Verify:**
   - Access `http://isp-devbox.gvec.net/linktest/`
   - Check logs: `/var/log/nginx/`, `/var/log/docker.log`

### Checklist

| Deliverable          | Status |
| -------------------- | ------ |
| Single-container app | ✅     |
| PostgreSQL schema    | ✅     |
| InfluxDB measurement | ✅     |
| docker-compose.yml   | ✅     |
| NGINX config         | ✅     |
| SNMP modularization  | ✅     |
| ML integration       | ✅     |
| Code quality tools   | ✅     |
| Documentation system | ✅     |
| Deployment script    | ✅     |

---

## 📝 Notes

- **Code Quality**: Tools run autonomously via CI/CD, auto-fixing linting and formatting issues.
- **Documentation**: Daily updates ensure accurate stack, API, and route inventory.
- **SNMP**: Test on `isp-pybox` only.
- **cnMaestro**: Handle rate limits.
- **Monitoring**: Use Portainer and NGINX logs.
- **Backup**: Schedule database backups.
