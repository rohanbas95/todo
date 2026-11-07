// Reel topic roadmap (copied from ai-reel/index.html). Shown on the 🎬 Reels tab.
// category: { id, name, icon, series: [...] }
// series:   { t: title, p: priority (1 core, 2 important, 3 advanced), hook: bistro analogy, parts: [[title, real-world problem], ...] }
// Parts are in publishing order (each builds on the previous). Renaming a part resets its status.
const REEL_DATA = [
{ id: "devops", name: "DevOps", icon: "⚙️", series: [
  { t: "Linux for DevOps", p: 1, hook: "The bistro building itself: rooms, keys, staff rosters", parts: [
    ["Intro: what the OS actually does", "Why every server you deploy is really a Linux box"],
    ["Processes, PIDs and signals", "Why kill -9 is the last resort and what SIGTERM gives your app"],
    ["Users, groups and file permissions", "chmod 777 'fixed it' and opened a security hole"],
    ["systemd services", "Your app dies at 3 AM and nobody restarts it"],
    ["Cron and scheduled jobs", "Run the nightly cleanup without a human"],
    ["Disk, memory and CPU troubleshooting", "Server is slow: top, free, df, iostat in 60 seconds"],
    ["Logs with journalctl and /var/log", "Finding why the service crashed last night"],
    ["Shell scripting essentials", "Automating a 20-step manual deploy"]
  ]},
  { t: "Git & Branching", p: 1, hook: "The recipe book with every past version kept", parts: [
    ["Intro: how Git stores snapshots", "Two people edit the same file. Who wins?"],
    ["Branches, merge vs rebase", "Messy history vs clean history: what each actually does"],
    ["Merge conflicts", "Why conflicts happen and how to resolve them safely"],
    ["Branching strategies: GitFlow vs trunk-based", "Long-lived branches cause merge hell"],
    ["Undo: revert, reset, restore, reflog", "I force-pushed and lost commits. Can I get them back?"],
    ["git bisect", "Which of 200 commits broke production?"],
    ["Monorepo vs polyrepo", "50 services, one repo or fifty?"]
  ]},
  { t: "CI/CD", p: 1, hook: "Every dish tasted and plated by a fixed checklist before it leaves", parts: [
    ["Intro: what CI and CD mean", "'Works on my machine' and Friday-night manual deploys"],
    ["Pipeline stages: build, test, deploy", "Catching a broken build before it reaches users"],
    ["Artifacts and build caching", "A 40-minute pipeline cut to 5"],
    ["GitHub Actions deep dive", "Workflows, jobs, runners, matrix builds"],
    ["Jenkins and self-hosted runners", "When hosted CI is too slow or too restricted"],
    ["Environments and promotion (dev → staging → prod)", "Same artifact, different configs"],
    ["Secrets in pipelines", "An AWS key leaked in build logs"],
    ["Flaky tests and test parallelism", "A pipeline that randomly fails kills trust"],
    ["Supply-chain security in CI", "A compromised dependency ships to production"]
  ]},
  { t: "Deployment Strategies", p: 1, hook: "Changing the menu without closing the restaurant", parts: [
    ["Intro: why deploys cause outages", "A big-bang release takes the site down"],
    ["Rolling deployments", "Replace servers one at a time"],
    ["Blue-green deployments", "Instant switch and instant rollback"],
    ["Canary releases", "Ship to 1% of users first and watch metrics"],
    ["Feature flags", "Deploy code without releasing the feature"],
    ["Rollbacks done right", "A bad deploy: how fast can you go back?"],
    ["Shadow traffic and dark launches", "Test the new version with real traffic, invisibly"],
    ["Zero-downtime DB migrations (expand/contract)", "Renaming a column without breaking the running app"]
  ]},
  { t: "Docker & Containers", p: 1, hook: "A tiffin box: the dish packed with everything it needs", parts: [
    ["Intro: containers vs VMs", "It ran on my laptop but not on the server"],
    ["Images and layers", "Why changing one line rebuilds everything"],
    ["Writing a good Dockerfile", "A 2 GB image for a 10 MB app"],
    ["Multi-stage builds", "Ship the binary, not the compiler"],
    ["Volumes and persistent data", "The container restarted and the data vanished"],
    ["Docker networking", "How two containers find each other"],
    ["Docker Compose", "Running app + DB + cache locally with one command"],
    ["Under the hood: namespaces and cgroups", "What a container really is in the Linux kernel"],
    ["Image security and scanning", "Running as root with 300 CVEs"]
  ]},
  { t: "Kubernetes", p: 1, hook: "The head manager who seats, staffs and replaces waiters automatically", parts: [
    ["Intro: why Kubernetes exists", "Managing 500 containers by hand"],
    ["Architecture: control plane, etcd, scheduler, kubelet", "Who decides where a container runs?"],
    ["Pods", "The smallest deployable unit and why it isn't a container"],
    ["Deployments and ReplicaSets", "Always keep 3 copies running"],
    ["Services: ClusterIP, NodePort, LoadBalancer", "Pods keep changing IPs. How do you reach them?"],
    ["Ingress and Gateway API", "One entry point routing to many services"],
    ["ConfigMaps and Secrets", "Changing config without rebuilding the image"],
    ["Liveness, readiness and startup probes", "Traffic sent to a pod that isn't ready"],
    ["Requests, limits and QoS", "One pod eats all the node's memory"],
    ["Autoscaling: HPA, VPA, Cluster Autoscaler, Karpenter", "Traffic doubles at 9 PM"],
    ["StatefulSets", "Running databases that need stable identity"],
    ["Persistent Volumes and PVCs", "Storage that outlives a pod"],
    ["DaemonSets, Jobs and CronJobs", "One log agent per node; batch jobs"],
    ["Scheduling: taints, tolerations, affinity", "Keep GPU pods on GPU nodes"],
    ["RBAC and service accounts", "Who can delete production?"],
    ["Network Policies", "Any pod can talk to the database"],
    ["Pod Disruption Budgets and node draining", "An upgrade killed all replicas at once"],
    ["CRDs and Operators", "Teaching Kubernetes to manage Postgres"],
    ["Debugging: CrashLoopBackOff, OOMKilled, Pending", "The pod won't start. Now what?"]
  ]},
  { t: "Helm & Kustomize", p: 2, hook: "A menu template: same dish, different portion sizes per branch", parts: [
    ["Intro: why package Kubernetes YAML", "Copy-pasting 20 YAML files per environment"],
    ["Helm charts, values and templates", "One chart, many environments"],
    ["Releases, upgrades and rollbacks", "helm rollback after a bad release"],
    ["Kustomize overlays", "Patching YAML without templates"]
  ]},
  { t: "Infrastructure as Code (Terraform)", p: 1, hook: "A blueprint that builds the same bistro in any city", parts: [
    ["Intro: why IaC", "Someone clicked in the console and nobody knows what changed"],
    ["Terraform basics: providers, resources, plan, apply", "Preview before you change infrastructure"],
    ["State, remote backends and locking", "Two engineers apply at once and corrupt state"],
    ["Modules", "Reusing the same VPC setup across 10 projects"],
    ["Environments and workspaces", "dev, staging, prod without copy-paste"],
    ["Drift detection and terraform import", "Reality no longer matches the code"],
    ["Terraform vs CloudFormation vs CDK vs Pulumi", "Picking the right IaC tool"]
  ]},
  { t: "Configuration Management", p: 3, hook: "One instruction sheet given to every kitchen", parts: [
    ["Intro: mutable vs immutable infrastructure", "Snowflake servers nobody dares to touch"],
    ["Ansible: playbooks, inventory, idempotency", "Configure 100 servers the same way"],
    ["Ansible vs Chef vs Puppet", "Push vs pull configuration"]
  ]},
  { t: "GitOps", p: 2, hook: "The recipe book is the boss: the kitchen copies whatever it says", parts: [
    ["Intro: Git as the source of truth", "Who ran kubectl apply in prod?"],
    ["Push vs pull deployments", "Why the cluster should pull its own changes"],
    ["Argo CD", "Sync, health status and auto-heal"],
    ["Flux", "The GitOps toolkit approach"],
    ["App-of-apps and multi-cluster", "Managing 30 clusters from one repo"]
  ]},
  { t: "Secrets Management", p: 2, hook: "The locked spice safe only some staff can open", parts: [
    ["Intro: where secrets leak", "Passwords committed to Git"],
    ["HashiCorp Vault", "Central secret store with audit logs"],
    ["Dynamic secrets and rotation", "Credentials that expire on their own"],
    ["Sealed Secrets and External Secrets Operator", "Secrets in a GitOps world"]
  ]},
  { t: "DevSecOps", p: 2, hook: "Food-safety inspection built into every station", parts: [
    ["Intro: shift-left security", "Finding vulnerabilities after release is expensive"],
    ["SAST, DAST and dependency scanning", "Three different kinds of security tests"],
    ["SBOM and image signing (cosign)", "Proving what is inside your container"],
    ["Policy as code: OPA and Kyverno", "Block privileged pods automatically"],
    ["Least privilege everywhere", "A compromised CI token with admin rights"]
  ]},
  { t: "SRE & Incident Management", p: 1, hook: "The kitchen fire drill", parts: [
    ["Intro: what SRE is", "Dev wants speed, Ops wants stability"],
    ["Incident response and on-call", "The site is down. Who does what?"],
    ["Blameless postmortems", "Fix the system, not the person"],
    ["Runbooks and toil reduction", "The same manual fix every week"],
    ["Chaos engineering", "Breaking things on purpose before they break on their own"],
    ["Capacity planning", "Will we survive the festival sale?"]
  ]},
  { t: "Service Mesh", p: 3, hook: "A personal assistant beside every waiter handling all messages", parts: [
    ["Intro: why a service mesh", "Retry, timeout and TLS logic copied into every service"],
    ["Sidecar proxies (Envoy)", "How the mesh intercepts traffic"],
    ["mTLS between services", "Encrypting and authenticating service-to-service traffic"],
    ["Traffic splitting and retries at the mesh", "Canaries without changing app code"],
    ["Istio vs Linkerd vs ambient / eBPF meshes", "Sidecar cost and the sidecar-less future"]
  ]},
  { t: "Platform Engineering", p: 3, hook: "A self-service counter so cooks stop waiting on the manager", parts: [
    ["Intro: internal developer platforms", "Every team reinvents deployment"],
    ["Golden paths and templates", "New service to production in one day"],
    ["Backstage", "A service catalog for the whole company"]
  ]}
]},

{ id: "backend", name: "Backend", icon: "🧑‍🍳", series: [
  { t: "How a Backend Serves a Request", p: 1, hook: "From the order slip to the plate", parts: [
    ["Intro: client, server and request lifecycle", "What happens between the click and the response"],
    ["Web server vs application server", "Nginx in front of your app: why?"],
    ["Threads vs event loop", "Why Node handles 10k connections on one thread"],
    ["Middleware", "Auth, logging and parsing before your handler runs"],
    ["Statelessness", "Why servers shouldn't remember users in memory"]
  ]},
  { t: "REST API Design", p: 1, hook: "A clear menu that every customer reads the same way", parts: [
    ["Intro: what makes an API RESTful", "An API nobody can guess how to use"],
    ["HTTP methods and idempotency", "The user clicked Pay twice"],
    ["Status codes that mean something", "Returning 200 with an error inside"],
    ["Resource naming and URL design", "/getUserById vs /users/{id}"],
    ["Pagination: offset vs cursor", "Page 5000 takes 10 seconds"],
    ["Filtering, sorting and field selection", "Clients download 50 fields to use 3"],
    ["API versioning", "Changing the API without breaking old mobile apps"],
    ["Idempotency keys", "Retrying a payment safely"],
    ["Error format and validation", "Consistent errors clients can act on"]
  ]},
  { t: "GraphQL", p: 2, hook: "A custom thali: the customer picks exactly what goes on the plate", parts: [
    ["Intro: why GraphQL", "Over-fetching and five round trips per screen"],
    ["Schema, queries and resolvers", "How a query is executed"],
    ["The N+1 problem and DataLoader", "One query triggers 1,000 DB calls"],
    ["Mutations and subscriptions", "Writes and real-time updates"],
    ["Caching and security challenges", "Deeply nested queries that DoS your server"],
    ["Federation", "One graph across many teams"]
  ]},
  { t: "gRPC & Protocol Buffers", p: 2, hook: "Staff speaking a fast kitchen shorthand instead of full sentences", parts: [
    ["Intro: gRPC vs REST", "JSON is too slow for internal service calls"],
    ["Protobuf serialization", "Why binary beats JSON on size and speed"],
    ["Streaming: unary, server, client, bidirectional", "Streaming millions of events"],
    ["Schema evolution", "Adding fields without breaking old clients"]
  ]},
  { t: "Real-time Communication", p: 1, hook: "Customer keeps asking 'is my food ready?' vs a buzzer that rings", parts: [
    ["Intro: short polling", "Asking every second wastes everyone's time"],
    ["Long polling", "Hold the request until there's news"],
    ["Server-Sent Events", "One-way live updates (scores, AI token streaming)"],
    ["WebSockets", "Full-duplex chat connections"],
    ["Scaling WebSockets", "A million open connections across many servers"],
    ["Webhooks", "Let the payment provider call you back"]
  ]},
  { t: "Authentication", p: 1, hook: "The bouncer checking who you are at the door", parts: [
    ["Intro: authentication vs authorization", "Who are you vs what may you do"],
    ["Password hashing: salt, bcrypt, argon2", "A DB leak exposes every password"],
    ["Sessions and cookies", "Staying logged in across requests"],
    ["JWT explained", "Stateless tokens and what's inside them"],
    ["Access tokens vs refresh tokens", "Short-lived tokens without logging in every 15 min"],
    ["OAuth 2.0 flows", "'Login with Google' without giving away your password"],
    ["OpenID Connect", "OAuth for identity"],
    ["SSO and SAML", "One login for 50 company apps"],
    ["MFA and passkeys (WebAuthn)", "Stolen passwords become useless"],
    ["API keys and service-to-service auth", "Machines proving who they are"]
  ]},
  { t: "Authorization", p: 1, hook: "Which staff may enter the kitchen, the cash counter or the store room", parts: [
    ["Intro: permission models", "Every check is an if-statement scattered everywhere"],
    ["RBAC", "Roles: admin, editor, viewer"],
    ["ABAC and policy engines", "Allow only during office hours from India"],
    ["ReBAC and Google Zanzibar", "'Shared with me' permissions like Google Docs"],
    ["Multi-tenant data isolation", "Customer A sees Customer B's data"]
  ]},
  { t: "Web Security (OWASP)", p: 1, hook: "Tricks people use to sneak into the kitchen", parts: [
    ["Intro: OWASP Top 10", "The most common ways apps get hacked"],
    ["SQL injection", "' OR 1=1 -- dumps the user table"],
    ["XSS", "A comment that steals every visitor's session"],
    ["CSRF", "A hidden form that transfers your money"],
    ["CORS explained", "Why the browser blocked your API call"],
    ["SSRF", "Tricking the server into calling internal endpoints"],
    ["Broken access control and IDOR", "Change the ID in the URL, see someone else's order"],
    ["Security headers and input validation", "Cheap defenses most apps skip"]
  ]},
  { t: "Concurrency", p: 1, hook: "Two waiters grabbing the last dessert at the same time", parts: [
    ["Intro: processes vs threads", "Doing many things at once"],
    ["Race conditions", "Two requests both buy the last ticket"],
    ["Locks and mutexes", "Only one at a time"],
    ["Deadlocks", "Two waiters each holding what the other needs"],
    ["Optimistic vs pessimistic locking", "Version numbers vs SELECT FOR UPDATE"],
    ["Async/await and the event loop", "Non-blocking I/O explained"],
    ["Thread pools and worker pools", "Unlimited threads crash the server"],
    ["Actor model", "Share nothing, pass messages"]
  ]},
  { t: "Message Queues & Async Processing", p: 1, hook: "The order rail between the counter and the kitchen", parts: [
    ["Intro: why queues", "The signup API is slow because it sends email inline"],
    ["Producers, consumers and acknowledgements", "What happens if a worker crashes mid-job?"],
    ["Delivery guarantees: at-most, at-least, exactly-once", "Duplicate messages and lost messages"],
    ["Idempotent consumers", "Processing the same message twice safely"],
    ["Retries, backoff and dead-letter queues", "A poison message blocks the queue forever"],
    ["Queue vs pub/sub", "One worker vs every subscriber"],
    ["Message ordering", "Order cancelled arrives before order placed"],
    ["Backpressure", "Producers faster than consumers"],
    ["Kafka 1: topics, partitions and offsets", "A log, not a queue"],
    ["Kafka 2: consumer groups and rebalancing", "Scaling consumers horizontally"],
    ["Kafka 3: replication, ISR and durability", "A broker dies. Is data lost?"],
    ["Kafka 4: retention and log compaction", "Keeping the latest value per key"],
    ["RabbitMQ: exchanges and routing", "Direct, topic and fanout exchanges"],
    ["Kafka vs RabbitMQ vs SQS", "Choosing the right broker"]
  ]},
  { t: "Background Jobs & Workflows", p: 2, hook: "Prep work done after closing time", parts: [
    ["Intro: job queues (Celery, Sidekiq, BullMQ)", "Generating reports without blocking users"],
    ["Scheduled jobs at scale", "Cron runs twice when you have two servers"],
    ["Distributed schedulers", "Running one million scheduled reminders"],
    ["Durable workflows (Temporal)", "A 7-day onboarding flow that survives restarts"]
  ]},
  { t: "Microservices", p: 1, hook: "One giant kitchen vs separate stations: tandoor, pastry, drinks", parts: [
    ["Intro: monolith vs microservices", "Why splitting too early hurts"],
    ["Finding service boundaries (DDD)", "Where do you cut the monolith?"],
    ["Sync vs async communication", "A chain of 6 HTTP calls fails if one fails"],
    ["Service discovery", "How services find each other's address"],
    ["API Gateway and BFF", "One front door for mobile and web"],
    ["Data per service", "Shared DB vs database per service"],
    ["Saga pattern", "Transactions across services: book flight + hotel + cab"],
    ["Transactional outbox", "DB write succeeded but the event was never published"],
    ["CQRS", "Separate models for reads and writes"],
    ["Event sourcing", "Store every change, not just current state"],
    ["Strangler fig migration", "Replacing a monolith piece by piece"]
  ]},
  { t: "Backend Performance", p: 2, hook: "Finding which station slows the whole kitchen", parts: [
    ["Intro: measure before optimizing", "Guessing the bottleneck wastes weeks"],
    ["Connection pooling", "Opening a DB connection per request"],
    ["N+1 queries in ORMs", "One page, 500 queries"],
    ["Compression and payload size", "Gzip/Brotli and smaller JSON"],
    ["Memory leaks and garbage collection", "Memory grows until the pod is OOMKilled"],
    ["Profiling and flame graphs", "Finding the hot function"]
  ]},
  { t: "File Uploads & Media", p: 2, hook: "Customers dropping off huge catering orders", parts: [
    ["Intro: uploading through your server", "A 2 GB upload blocks your API"],
    ["Pre-signed URLs", "Upload straight to S3"],
    ["Chunked and resumable uploads", "The upload fails at 95%"],
    ["Media processing pipelines", "Thumbnails and video transcoding asynchronously"]
  ]},
  { t: "Backend Testing", p: 2, hook: "Tasting at every stage, not just the final dish", parts: [
    ["Intro: the testing pyramid", "Too many slow end-to-end tests"],
    ["Unit tests, mocks and stubs", "Testing without a real database"],
    ["Integration tests with Testcontainers", "Testing against real Postgres"],
    ["Contract testing (Pact)", "Service A changed and broke Service B"],
    ["Load testing (k6, JMeter)", "Will it survive 10x traffic?"]
  ]}
]},

{ id: "database", name: "Database", icon: "🗄️", series: [
  { t: "Database Fundamentals", p: 1, hook: "The bistro's store room and its ledger", parts: [
    ["Intro: why not just use files?", "Two writers corrupt a CSV file"],
    ["SQL vs NoSQL", "Choosing for the right reason"],
    ["ACID properties", "Money debited but never credited"],
    ["OLTP vs OLAP", "Analytics queries slowing down checkout"]
  ]},
  { t: "Indexing", p: 1, hook: "The index at the back of the recipe book", parts: [
    ["Intro: what an index is", "A query scanning 50 million rows"],
    ["B-tree indexes", "How the DB finds a row in 3 hops"],
    ["Hash indexes", "Exact lookups only"],
    ["Composite indexes and the leftmost prefix rule", "Index exists but isn't used"],
    ["Covering indexes", "Answering the query without touching the table"],
    ["Clustered vs non-clustered", "Where the actual row lives"],
    ["The cost of indexes", "Why 20 indexes make writes slow"],
    ["Partial, full-text and GIN indexes", "Searching text and JSON"]
  ]},
  { t: "Transactions & Isolation", p: 1, hook: "Two waiters editing the same table booking", parts: [
    ["Intro: what a transaction guarantees", "All or nothing"],
    ["Read anomalies: dirty, non-repeatable, phantom", "The report shows inconsistent totals"],
    ["Isolation levels", "Read committed vs repeatable read vs serializable"],
    ["MVCC", "How readers don't block writers"],
    ["Row locks, table locks and SELECT FOR UPDATE", "Booking the last seat safely"],
    ["Deadlocks in databases", "Transaction aborted: deadlock detected"],
    ["Distributed transactions and 2PC", "Committing across two databases"]
  ]},
  { t: "Query Optimization", p: 1, hook: "Planning the fastest route through the store room", parts: [
    ["Intro: reading EXPLAIN plans", "Why is this query slow?"],
    ["Join algorithms: nested loop, hash, merge", "How the DB joins two tables"],
    ["Slow query logs", "Finding the worst queries in production"],
    ["Common anti-patterns", "SELECT *, functions on indexed columns, OR chains"]
  ]},
  { t: "Schema Design", p: 1, hook: "Organizing shelves so nothing is stored twice", parts: [
    ["Intro: normalization (1NF to 3NF)", "Updating a customer's address in 40 rows"],
    ["Denormalization", "When duplication is worth it"],
    ["Primary keys: auto-increment vs UUID vs ULID", "Why random UUIDs hurt insert speed"],
    ["Relationships: 1:1, 1:N, M:N", "Modelling orders and items"],
    ["Soft deletes and audit columns", "'Undo delete' and who changed what"],
    ["Schema migrations", "Changing tables in a live system"]
  ]},
  { t: "Storage Engine Internals", p: 3, hook: "How the store room is physically arranged", parts: [
    ["Intro: pages and the buffer pool", "Why databases love RAM"],
    ["Write-ahead log (WAL)", "Surviving a crash mid-write"],
    ["B-tree vs LSM tree", "Read-optimized vs write-optimized engines"],
    ["Compaction", "Why LSM databases do background work"],
    ["Vacuum in Postgres", "Table bloat from dead rows"]
  ]},
  { t: "Replication", p: 1, hook: "Copies of the ledger kept at every branch", parts: [
    ["Intro: primary and replicas", "One DB can't handle all the reads"],
    ["Sync vs async replication", "Speed vs durability"],
    ["Replication lag and read-your-writes", "I updated my profile and it shows the old one"],
    ["Failover and leader election", "The primary dies at midnight"],
    ["Multi-leader replication", "Writes in two regions and conflicts"],
    ["Leaderless replication and quorums", "W + R > N explained"]
  ]},
  { t: "Sharding & Partitioning", p: 1, hook: "Splitting the ledger: A-M in one book, N-Z in another", parts: [
    ["Intro: when one database isn't enough", "A table with 5 billion rows"],
    ["Vertical vs horizontal partitioning", "Split columns or split rows"],
    ["Choosing a shard key", "A bad key puts everything on one shard"],
    ["Range vs hash sharding", "Trade-offs for range queries"],
    ["Hot shards and celebrity problems", "One user gets all the traffic"],
    ["Resharding", "Adding shards without downtime"],
    ["Cross-shard queries and joins", "Why some queries get very hard"]
  ]},
  { t: "NoSQL Database Types", p: 1, hook: "Different storage for different ingredients", parts: [
    ["Intro: the four NoSQL families", "Not all NoSQL is the same"],
    ["Key-value stores", "Sessions and carts"],
    ["Document databases", "Flexible product catalogs"],
    ["Wide-column stores", "Billions of time-ordered writes"],
    ["Graph databases", "Friends of friends recommendations"],
    ["Time-series databases", "Metrics and IoT data"],
    ["How to choose", "Matching access patterns to the database"]
  ]},
  { t: "Redis Deep Dive", p: 1, hook: "The chef's countertop: tiny but instant", parts: [
    ["Intro: why Redis is fast", "Single-threaded and still fast"],
    ["Data structures: strings, hashes, lists, sets, sorted sets", "Picking the right type"],
    ["Persistence: RDB vs AOF", "Redis restarted and data was gone"],
    ["Eviction policies", "Memory is full. What gets dropped?"],
    ["Pub/sub and Streams", "Lightweight messaging"],
    ["Distributed locks and Redlock", "Only one worker should run this job"],
    ["Rate limiting and leaderboards with Redis", "Classic Redis patterns"],
    ["Redis Cluster and Sentinel", "Scaling and high availability"]
  ]},
  { t: "PostgreSQL Deep Dive", p: 2, hook: "The all-rounder head chef", parts: [
    ["Intro: why Postgres is everywhere", "One DB for relational, JSON and search"],
    ["JSONB", "Semi-structured data in a relational DB"],
    ["Connection pooling with PgBouncer", "Too many connections error"],
    ["Table partitioning", "Dropping old data instantly"],
    ["Logical replication and extensions", "pg_stat_statements, PostGIS, pgvector"]
  ]},
  { t: "MongoDB", p: 2, hook: "Each order stored as one complete tray", parts: [
    ["Intro: documents and collections", "Schema-less, not schema-free"],
    ["Embedding vs referencing", "One big document or many small ones?"],
    ["Aggregation pipeline", "Group, filter and join in Mongo"],
    ["Replica sets and sharding", "Scaling MongoDB"]
  ]},
  { t: "Cassandra", p: 3, hook: "A ring of identical store rooms", parts: [
    ["Intro: the ring architecture", "No single master"],
    ["Partition keys and clustering keys", "Query-first data modelling"],
    ["Tunable consistency", "ONE, QUORUM, ALL"],
    ["The write path", "Commit log, memtable, SSTable"]
  ]},
  { t: "Data Warehousing & Pipelines", p: 2, hook: "The monthly accounts office, separate from the busy floor", parts: [
    ["Intro: OLTP vs OLAP", "Why analytics needs its own database"],
    ["Columnar storage", "Scanning one column of a billion rows"],
    ["Star schema: facts and dimensions", "Modelling for reports"],
    ["ETL vs ELT", "Transform before or after loading?"],
    ["Data lakes and lakehouses", "Parquet, Iceberg, Delta"],
    ["Change Data Capture (Debezium)", "Streaming DB changes to other systems"]
  ]},
  { t: "Search Engines", p: 2, hook: "A waiter who instantly finds every dish containing 'paneer'", parts: [
    ["Intro: why LIKE '%x%' doesn't scale", "Search takes 8 seconds"],
    ["Inverted index", "How search engines really work"],
    ["Analyzers and tokenization", "'Running' should match 'run'"],
    ["Relevance scoring (TF-IDF, BM25)", "Why this result ranks first"],
    ["Scaling Elasticsearch", "Shards, replicas and keeping it in sync with the DB"]
  ]},
  { t: "Vector Databases", p: 2, hook: "Finding dishes that taste similar, not just named similar", parts: [
    ["Intro: embeddings", "Search by meaning, not keywords"],
    ["Similarity metrics", "Cosine, dot product, Euclidean"],
    ["ANN indexes: HNSW and IVF", "Searching a billion vectors fast"],
    ["pgvector vs dedicated vector DBs", "Do you need a new database?"],
    ["Vector DBs in RAG", "Giving an LLM your company's documents"]
  ]},
  { t: "Connections, Backup & Recovery", p: 2, hook: "Insurance for the ledger", parts: [
    ["Intro: backups full vs incremental", "Someone ran DELETE without WHERE"],
    ["Point-in-time recovery", "Restore to 10:41:59"],
    ["RPO and RTO", "How much data and time can you lose?"],
    ["Disaster recovery drills", "A backup you never tested isn't a backup"]
  ]}
]},

{ id: "sysdesign", name: "System Design", icon: "🏗️", series: [
  { t: "System Design Fundamentals", p: 1, hook: "Growing from one stall to a restaurant chain", parts: [
    ["Intro: vertical vs horizontal scaling", "A bigger server or more servers?"],
    ["Latency vs throughput", "Fast for one vs fast for many"],
    ["Availability and the nines", "What 99.99% really allows"],
    ["Single points of failure", "One component takes down everything"],
    ["Stateless vs stateful services", "Why stateless scales easily"],
    ["Back-of-the-envelope estimation", "How much storage for 1 billion photos?"]
  ]},
  { t: "Load Balancing", p: 1, hook: "The host who decides which waiter takes each table", parts: [
    ["Intro: why load balancers (Episode 01)", "One server melts under traffic"],
    ["Algorithms: round robin, least connections, weighted, IP hash", "Not all servers are equal"],
    ["Health checks", "Sending traffic to a dead server"],
    ["L4 vs L7 load balancing", "Routing by IP vs routing by URL"],
    ["Sticky sessions", "The user's cart vanishes on the next request"],
    ["Global load balancing (GSLB)", "Users in India hitting servers in the US"],
    ["Making the load balancer highly available", "Who balances the load balancer?"]
  ]},
  { t: "Caching", p: 1, hook: "Keeping the popular dishes ready at the counter", parts: [
    ["Intro: why cache", "The same DB query a million times"],
    ["Where caches live: browser, CDN, app, DB", "Layers of caching"],
    ["Cache-aside (lazy loading)", "The most common pattern"],
    ["Write-through, write-back, write-around", "Keeping cache and DB in sync on writes"],
    ["Eviction: LRU, LFU, TTL", "The cache is full"],
    ["Cache invalidation", "Users see the old price"],
    ["Cache stampede / thundering herd", "A popular key expires and the DB dies"],
    ["Cache penetration and avalanche", "Requests for keys that don't exist"],
    ["Hot keys", "One key gets 50% of traffic"],
    ["Distributed caching", "Cache across many nodes"]
  ]},
  { t: "CDN", p: 1, hook: "Mini branch kitchens in every neighbourhood", parts: [
    ["Intro: what a CDN does", "Users far from your server wait seconds"],
    ["Pull vs push CDN", "Who fills the edge cache?"],
    ["Cache keys, TTLs and headers", "Why the CDN isn't caching anything"],
    ["Invalidation and versioned assets", "Deployed a fix but users see the old JS"],
    ["Edge computing", "Running code at the edge"]
  ]},
  { t: "CAP Theorem & Consistency", p: 1, hook: "Two branches with one shared reservation book and a broken phone line", parts: [
    ["Intro: the CAP theorem", "You can't have everything during a network partition"],
    ["CP vs AP systems", "Bank vs social media likes"],
    ["PACELC", "The trade-off even without partitions"],
    ["Strong vs eventual consistency", "Why your like count jumps around"],
    ["Consistency models: read-your-writes, monotonic, causal", "The levels in between"]
  ]},
  { t: "Rate Limiting", p: 1, hook: "Only so many orders per customer per minute", parts: [
    ["Intro: why rate limit", "One client floods your API"],
    ["Token bucket", "Allow bursts, limit average"],
    ["Leaky bucket", "Smooth output rate"],
    ["Fixed window vs sliding window", "The boundary burst problem"],
    ["Distributed rate limiting", "Limits across 50 servers"],
    ["Where to rate limit and returning 429", "Gateway vs app, and client behavior"]
  ]},
  { t: "Resilience Patterns", p: 1, hook: "When the tandoor breaks, the rest of the menu keeps going", parts: [
    ["Intro: failures cascade", "One slow service takes down everything"],
    ["Timeouts", "Waiting forever for a response"],
    ["Retries with exponential backoff and jitter", "Retry storms"],
    ["Circuit breaker", "Stop calling a service that's down"],
    ["Bulkhead", "Isolate failures to one pool"],
    ["Fallbacks and graceful degradation", "Show cached recommendations instead of an error"],
    ["Load shedding", "Drop some requests to save the rest"]
  ]},
  { t: "Consistent Hashing", p: 1, hook: "Assigning tables to waiters so adding one waiter barely reshuffles anyone", parts: [
    ["Intro: why hash % N breaks", "Adding one server remaps almost every key"],
    ["The hash ring", "Only a fraction of keys move"],
    ["Virtual nodes", "Even distribution across servers"]
  ]},
  { t: "Distributed Systems Concepts", p: 2, hook: "Branch managers agreeing on one decision without a head office", parts: [
    ["Intro: why distributed is hard", "The eight fallacies of distributed computing"],
    ["Consensus with Raft", "How nodes agree on a value"],
    ["Leader election", "Picking one boss among equals"],
    ["Split brain and fencing", "Two nodes both think they're leader"],
    ["Clocks: Lamport and vector clocks", "Which event happened first?"],
    ["Gossip protocols", "Spreading information like rumours"],
    ["Distributed locks", "Locking across machines safely"]
  ]},
  { t: "Unique ID Generation", p: 2, hook: "Order numbers that never clash across branches", parts: [
    ["Intro: why auto-increment fails at scale", "Two shards produce the same ID"],
    ["UUIDs", "Random and unique, but unordered"],
    ["Twitter Snowflake", "Time-sortable 64-bit IDs"],
    ["Ticket servers and ULID", "Alternatives and trade-offs"]
  ]},
  { t: "Event-Driven Architecture", p: 2, hook: "The kitchen bell everyone reacts to independently", parts: [
    ["Intro: events vs commands", "'Order placed' vs 'send email'"],
    ["Choreography vs orchestration", "Who coordinates the flow?"],
    ["Event schemas and versioning", "A new field breaks consumers"],
    ["Event replay", "Rebuilding state from history"]
  ]},
  { t: "Batch & Stream Processing", p: 2, hook: "Counting the day's sales at night vs a live tally", parts: [
    ["Intro: batch vs stream", "Results tomorrow vs results now"],
    ["MapReduce", "Splitting a huge job across machines"],
    ["Stream processing (Flink, Kafka Streams)", "Live fraud detection"],
    ["Windowing and late events", "Events arriving out of order"],
    ["Lambda vs Kappa architecture", "One pipeline or two?"]
  ]},
  { t: "Probabilistic & Spatial Data Structures", p: 3, hook: "Quick guesses that are almost always right", parts: [
    ["Intro: Bloom filters", "Is this username taken? Without a DB call"],
    ["Count-Min Sketch", "Top trending items in a stream"],
    ["HyperLogLog", "Counting unique visitors in 12 KB"],
    ["Geohash and quadtrees", "Find restaurants near me"]
  ]},
  { t: "High Availability & Multi-Region", p: 2, hook: "A backup branch ready if one city floods", parts: [
    ["Intro: active-passive vs active-active", "A whole region goes down"],
    ["Failover strategies", "Detecting failure and switching"],
    ["Multi-region data", "Writes in two regions"],
    ["Disaster recovery strategies", "Backup/restore, pilot light, warm standby, multi-site"]
  ]},
  { t: "Classic Design Problems", p: 1, hook: "Full case studies combining everything above", parts: [
    ["URL shortener", "Hashing, IDs, caching, redirects"],
    ["Rate limiter service", "Designing it end to end"],
    ["Food delivery app (Swiggy/Zomato)", "Orders, matching riders, live tracking"],
    ["Chat app (WhatsApp)", "Delivery receipts, online status, group chat"],
    ["News feed (Instagram)", "Fan-out on write vs fan-out on read"],
    ["Notification system", "Push, SMS, email at scale with retries"],
    ["Video streaming (YouTube/Netflix)", "Upload, transcoding, adaptive bitrate"],
    ["Ride sharing (Uber)", "Location updates and driver matching"],
    ["Ticket booking (BookMyShow)", "Seat locking and double booking"],
    ["File storage and sync (Google Drive)", "Chunking, dedup, sync conflicts"],
    ["Search autocomplete", "Tries and top-k suggestions"],
    ["Web crawler", "Politeness, dedup, frontier queue"],
    ["Payment system", "Idempotency, ledgers, reconciliation"],
    ["Distributed key-value store", "Partitioning, replication, quorum"],
    ["Leaderboard", "Real-time ranking for millions"],
    ["Collaborative editor (Google Docs)", "Operational transforms vs CRDTs"],
    ["Metrics and logging platform", "Ingesting millions of events per second"]
  ]}
]},

{ id: "frontend", name: "Frontend", icon: "🎨", series: [
  { t: "How Browsers Render", p: 1, hook: "Plating: from raw recipe to the dish in front of you", parts: [
    ["Intro: the critical rendering path", "HTML arrives. What happens before pixels appear?"],
    ["DOM and CSSOM", "Why CSS blocks rendering"],
    ["Layout, paint and composite", "Reflow vs repaint"],
    ["The browser event loop: tasks and microtasks", "Why your setTimeout runs late"],
    ["How the JS engine works (V8)", "Parsing, JIT and hidden classes"]
  ]},
  { t: "JavaScript Core Concepts", p: 1, hook: "The kitchen rules every cook must know", parts: [
    ["Intro: scope and hoisting", "Why var behaves strangely"],
    ["Closures", "Functions that remember"],
    ["this keyword", "Why this is undefined in a callback"],
    ["Prototypes and inheritance", "How JS objects share methods"],
    ["Promises and async/await", "Callback hell to clean code"],
    ["Event bubbling, capturing and delegation", "One listener for 1,000 items"],
    ["Debounce and throttle", "Search firing on every keystroke"]
  ]},
  { t: "Rendering Patterns", p: 1, hook: "Pre-cooked vs cooked to order vs assembled at the table", parts: [
    ["Intro: CSR (client-side rendering)", "A blank page until JS loads"],
    ["SSR (server-side rendering)", "Fast first paint and SEO"],
    ["SSG and ISR", "Pre-built pages that stay fresh"],
    ["Hydration", "The page looks ready but buttons don't work"],
    ["Streaming SSR", "Send the page in pieces"],
    ["React Server Components", "Zero JS for server-only parts"],
    ["Islands architecture", "Interactive bits in a static page"]
  ]},
  { t: "React Deep Dive", p: 1, hook: "The kitchen display that only redraws orders that changed", parts: [
    ["Intro: virtual DOM and reconciliation", "Why React doesn't redraw everything"],
    ["Keys in lists", "Wrong item gets deleted"],
    ["useState and re-renders", "Why did this component re-render?"],
    ["useEffect done right", "Infinite loops and stale closures"],
    ["Memoization: memo, useMemo, useCallback", "When it helps and when it hurts"],
    ["Context and prop drilling", "Passing props through 8 layers"],
    ["Concurrent rendering and Suspense", "Keeping the UI responsive during heavy updates"]
  ]},
  { t: "State Management", p: 2, hook: "Where the order status is written so every waiter sees it", parts: [
    ["Intro: local vs global state", "Not everything belongs in a global store"],
    ["Redux and Zustand", "A single source of truth"],
    ["Server state (React Query / SWR)", "Caching API data on the client"],
    ["URL as state", "Shareable filters and back button"]
  ]},
  { t: "Web Performance", p: 1, hook: "Getting the first dish out fast", parts: [
    ["Intro: Core Web Vitals (LCP, INP, CLS)", "Google ranks slow pages lower"],
    ["Code splitting and lazy loading", "A 5 MB bundle for the login page"],
    ["Tree shaking and bundle analysis", "Shipping code nobody uses"],
    ["Image optimization", "Hero images that take 4 seconds"],
    ["HTTP caching for frontend assets", "Users download the same files every visit"],
    ["Preload, prefetch, preconnect", "Starting work before it's needed"],
    ["List virtualization", "Rendering 10,000 rows freezes the page"]
  ]},
  { t: "Browser Storage", p: 2, hook: "Pockets, drawers and lockers for customer data", parts: [
    ["Intro: cookies vs localStorage vs sessionStorage", "Where should this data live?"],
    ["IndexedDB", "Storing large data offline"],
    ["Where to store auth tokens", "localStorage vs HttpOnly cookies"]
  ]},
  { t: "Frontend Security", p: 1, hook: "Making sure no one slips something into the dish at the table", parts: [
    ["Intro: XSS and Content Security Policy", "Injected script steals tokens"],
    ["CSRF and SameSite cookies", "Forged requests from other sites"],
    ["CORS from the frontend view", "Preflight requests explained"],
    ["Clickjacking and iframes", "Invisible buttons over your page"],
    ["Third-party scripts and supply chain", "A compromised analytics script"]
  ]},
  { t: "Build Tooling", p: 2, hook: "The prep station that turns raw ingredients into ready parts", parts: [
    ["Intro: why we need bundlers", "Browsers loading 800 files"],
    ["Webpack vs Vite vs esbuild", "Why Vite is so fast in dev"],
    ["Transpiling: Babel and TypeScript", "Modern code for old browsers"],
    ["ES modules vs CommonJS", "import vs require errors"],
    ["Source maps and HMR", "Debugging minified code; instant reload"]
  ]},
  { t: "CSS Architecture", p: 2, hook: "Arranging the plate", parts: [
    ["Intro: the box model", "Why width: 100% overflows"],
    ["Flexbox vs Grid", "Picking the right layout tool"],
    ["Specificity and the cascade", "Why your style isn't applied"],
    ["Responsive design", "One layout for phone, tablet and desktop"],
    ["CSS-in-JS vs Tailwind vs CSS Modules", "Scaling styles in big apps"]
  ]},
  { t: "Accessibility", p: 2, hook: "A bistro every customer can use, including those who can't see the menu", parts: [
    ["Intro: why a11y matters", "15% of users can't use your site"],
    ["Semantic HTML", "A div pretending to be a button"],
    ["ARIA roles and labels", "What screen readers announce"],
    ["Keyboard navigation and focus", "A modal you can't escape"]
  ]},
  { t: "PWAs & Offline", p: 2, hook: "Taking orders even when the line to the kitchen is down", parts: [
    ["Intro: service workers", "The app shows a dinosaur when offline"],
    ["Caching strategies (cache first, network first)", "Fresh vs fast"],
    ["Offline-first and background sync", "Queue actions until online"],
    ["Web push notifications", "Re-engaging users"]
  ]},
  { t: "Micro-frontends", p: 3, hook: "Separate teams running separate counters in one food court", parts: [
    ["Intro: why micro-frontends", "30 teams in one frontend repo"],
    ["Module Federation", "Loading another team's code at runtime"],
    ["Shared dependencies and design systems", "Three copies of React on one page"]
  ]},
  { t: "Frontend Testing", p: 2, hook: "Tasting the dish from the customer's side", parts: [
    ["Intro: what to test on the frontend", "Testing implementation details breaks on refactor"],
    ["Unit tests (Jest/Vitest)", "Testing logic"],
    ["Component tests (Testing Library)", "Test like a user"],
    ["E2E tests (Playwright)", "Full user flows in a real browser"],
    ["Visual regression testing", "A CSS change broke 40 pages"]
  ]},
  { t: "Frontend System Design", p: 1, hook: "Designing the dining room, not the kitchen", parts: [
    ["Intro: how frontend system design interviews work", "Requirements, components, data, API"],
    ["Design an autocomplete", "Debounce, caching, race conditions"],
    ["Design an infinite news feed", "Pagination, virtualization, optimistic updates"],
    ["Design a chat UI", "Real-time, offline, ordering"],
    ["Design an image carousel / gallery", "Lazy loading and accessibility"],
    ["Design a component library", "APIs, theming, versioning"]
  ]}
]},

{ id: "aws", name: "AWS", icon: "☁️", series: [
  { t: "AWS Foundations", p: 1, hook: "Renting kitchens around the world", parts: [
    ["Intro: regions, availability zones, edge locations", "Why your app should span AZs"],
    ["Shared responsibility model", "What AWS secures vs what you secure"],
    ["Well-Architected Framework", "The six pillars"],
    ["Pricing models and the free tier trap", "A surprise $3,000 bill"]
  ]},
  { t: "IAM", p: 1, hook: "Staff ID cards and which doors each card opens", parts: [
    ["Intro: users, groups and roles", "Sharing the root account"],
    ["Policies and evaluation logic", "Explicit deny always wins"],
    ["Roles, AssumeRole and STS", "Temporary credentials instead of access keys"],
    ["Resource-based policies", "Letting another account read your bucket"],
    ["Least privilege in practice", "s3:* on * is not fine"],
    ["Permission boundaries and SCPs", "Guardrails for the whole organization"],
    ["IAM Identity Center (SSO)", "One login for all AWS accounts"]
  ]},
  { t: "VPC Networking", p: 1, hook: "The bistro's floor plan: dining area, kitchen, back door", parts: [
    ["Intro: VPC and CIDR blocks", "Your own private network in the cloud"],
    ["Public vs private subnets", "Keep the database off the internet"],
    ["Route tables and Internet Gateway", "How traffic leaves the VPC"],
    ["NAT Gateway", "Private servers downloading updates (and the NAT bill)"],
    ["Security groups vs NACLs", "Stateful vs stateless firewalls"],
    ["VPC peering vs Transit Gateway", "Connecting 20 VPCs"],
    ["VPC endpoints and PrivateLink", "Reaching S3 without the internet"],
    ["VPC Flow Logs", "Who is talking to whom?"]
  ]},
  { t: "EC2 & Auto Scaling", p: 1, hook: "Hiring cooks by the hour", parts: [
    ["Intro: EC2 instances and types", "Which instance family for which job?"],
    ["AMIs and launch templates", "Identical servers every time"],
    ["EBS vs instance store", "Data lost when the instance stops"],
    ["Pricing: on-demand, reserved, spot, savings plans", "Cutting the compute bill by 70%"],
    ["Auto Scaling Groups", "Add servers when CPU is high"],
    ["Scaling policies: target tracking, step, scheduled, predictive", "Scale before the traffic hits"],
    ["User data and instance metadata (IMDSv2)", "Bootstrapping and the SSRF risk"]
  ]},
  { t: "Elastic Load Balancing", p: 1, hook: "AWS's version of the bistro host", parts: [
    ["Intro: ALB vs NLB vs GWLB", "Which load balancer do you need?"],
    ["Target groups and health checks", "Removing bad instances automatically"],
    ["ALB listener rules", "Path- and host-based routing"],
    ["Cross-zone load balancing and connection draining", "Uneven traffic across AZs"]
  ]},
  { t: "S3", p: 1, hook: "An infinite store room with a label on every box", parts: [
    ["Intro: buckets, objects and keys", "It's not a file system"],
    ["Storage classes and lifecycle rules", "Paying hot prices for cold data"],
    ["Versioning and replication", "Someone deleted the file"],
    ["Bucket policies and Block Public Access", "The classic leaky bucket"],
    ["Pre-signed URLs", "Temporary access to private files"],
    ["Static website hosting", "Hosting a React app on S3"],
    ["Event notifications", "Trigger Lambda when a file is uploaded"],
    ["Performance: multipart upload and prefixes", "Uploading a 50 GB file"]
  ]},
  { t: "Lambda", p: 1, hook: "A cook who appears only when an order comes in", parts: [
    ["Intro: what serverless means", "Paying for idle servers at 3 AM"],
    ["How Lambda executes: the execution environment", "What happens on each invoke"],
    ["Cold starts", "The first request takes 3 seconds"],
    ["Provisioned concurrency", "Keeping cooks warm for peak hours"],
    ["Reserved concurrency and throttling", "One function eats the account limit"],
    ["Invocation types: sync, async, stream/poll", "Who retries when it fails?"],
    ["Destinations and DLQs", "Not losing failed async events"],
    ["Lambda Layers", "Sharing libraries across 30 functions"],
    ["Lambda in a VPC", "Reaching RDS from Lambda"],
    ["SnapStart", "Java cold starts cut drastically"],
    ["Lambda@Edge vs CloudFront Functions", "Code at the edge"],
    ["Limits and when not to use Lambda", "15-minute timeout and long jobs"]
  ]},
  { t: "API Gateway", p: 1, hook: "The order counter in front of serverless cooks", parts: [
    ["Intro: REST vs HTTP vs WebSocket APIs", "Picking the right type"],
    ["Integrations: Lambda proxy, HTTP, AWS service", "Calling SQS directly without code"],
    ["Authorizers: Cognito, JWT, Lambda", "Securing the endpoint"],
    ["Throttling, usage plans and API keys", "Selling API access by tier"],
    ["Caching and stages", "Reducing backend calls"]
  ]},
  { t: "DynamoDB", p: 1, hook: "A giant key-indexed shelf that never slows down", parts: [
    ["Intro: what DynamoDB is", "Single-digit-ms at any scale"],
    ["Partition keys and sort keys", "Designing the primary key"],
    ["GSI vs LSI", "Querying by another attribute"],
    ["Capacity modes and hot partitions", "Throttled despite unused capacity"],
    ["Single-table design", "Modelling relations without joins"],
    ["DynamoDB Streams", "Reacting to every change"],
    ["Transactions and conditional writes", "Preventing double booking"],
    ["TTL, DAX and global tables", "Expiry, caching and multi-region"]
  ]},
  { t: "RDS & Aurora", p: 1, hook: "A managed ledger keeper", parts: [
    ["Intro: what RDS manages for you", "Patching and backups on autopilot"],
    ["Multi-AZ vs read replicas", "HA vs read scaling: not the same thing"],
    ["Aurora architecture", "Shared storage across 3 AZs"],
    ["Aurora Serverless v2", "A DB that scales with load"],
    ["RDS Proxy", "Lambda exhausting DB connections"],
    ["Backups, snapshots and PITR", "Restoring a managed database"]
  ]},
  { t: "AWS Messaging & Events", p: 1, hook: "Order rails, loudspeakers and live tickers", parts: [
    ["Intro: SQS standard queues", "Decoupling with a queue"],
    ["Visibility timeout", "A message processed twice"],
    ["SQS FIFO", "Ordering and exactly-once processing"],
    ["SNS and fan-out", "One event, many subscribers"],
    ["EventBridge", "Event routing with rules and schedules"],
    ["Kinesis Data Streams", "Real-time streams with shards"],
    ["SQS vs SNS vs EventBridge vs Kinesis vs MSK", "Choosing the right service"]
  ]},
  { t: "Step Functions", p: 2, hook: "A written recipe that tracks every step of a long dish", parts: [
    ["Intro: orchestrating Lambdas", "Lambdas calling Lambdas is a mess"],
    ["Standard vs Express workflows", "Long-running vs high-volume"],
    ["Error handling, retries and catch", "Built-in resilience"],
    ["Saga pattern with Step Functions", "Compensating failed steps"]
  ]},
  { t: "Containers on AWS", p: 2, hook: "Different ways to run tiffin boxes on AWS", parts: [
    ["Intro: ECR, ECS, EKS and Fargate", "Four services, which one?"],
    ["ECS tasks and services", "Running containers on ECS"],
    ["Fargate", "Containers without managing servers"],
    ["EKS", "Managed Kubernetes on AWS"],
    ["ECS vs EKS vs Lambda", "Decision guide"]
  ]},
  { t: "CloudFront", p: 1, hook: "AWS's neighbourhood branch kitchens", parts: [
    ["Intro: CloudFront distributions and origins", "Serving users globally"],
    ["Origin Access Control", "Private S3 behind CloudFront"],
    ["Cache behaviors and policies", "Different caching per path"],
    ["Signed URLs and cookies", "Paid video content"]
  ]},
  { t: "Route 53", p: 1, hook: "AWS's phone book with smart call routing", parts: [
    ["Intro: hosted zones and records", "Pointing a domain to AWS"],
    ["Alias vs CNAME", "Why the apex domain can't use CNAME"],
    ["Routing policies: latency, weighted, geo, failover", "Send users to the best region"],
    ["Health checks and DNS failover", "Automatic disaster recovery"]
  ]},
  { t: "AWS Security Services", p: 2, hook: "Locks, guards and CCTV for the cloud bistro", parts: [
    ["Intro: KMS and envelope encryption", "Encrypting data without managing keys"],
    ["Secrets Manager vs Parameter Store", "Where to put DB passwords"],
    ["WAF and Shield", "Blocking bots and DDoS"],
    ["GuardDuty, Security Hub, Inspector", "Detecting threats automatically"],
    ["Cognito", "User sign-up and login without building it"]
  ]},
  { t: "AWS Monitoring & Governance", p: 2, hook: "The manager's dashboard and the audit book", parts: [
    ["Intro: CloudWatch metrics and alarms", "Get alerted before users complain"],
    ["CloudWatch Logs and Logs Insights", "Querying logs"],
    ["X-Ray tracing", "Which service is slow?"],
    ["CloudTrail", "Who deleted the production table?"],
    ["AWS Config", "Is every bucket encrypted?"]
  ]},
  { t: "IaC on AWS", p: 2, hook: "Blueprints written in AWS's own language", parts: [
    ["Intro: CloudFormation stacks", "Templates and change sets"],
    ["AWS CDK", "Infrastructure in TypeScript or Python"],
    ["AWS SAM", "Serverless apps the easy way"]
  ]},
  { t: "AWS Architecture Patterns & Cost", p: 2, hook: "Floor plans that work, and keeping the bills low", parts: [
    ["Intro: the classic three-tier web app", "ALB + EC2/ECS + RDS"],
    ["Serverless reference architecture", "API Gateway + Lambda + DynamoDB"],
    ["Disaster recovery on AWS", "Backup/restore to multi-site"],
    ["Multi-account strategy (Organizations, Control Tower)", "One account for everything is risky"],
    ["Cost optimization", "Finding and killing waste"]
  ]}
]},

{ id: "observability", name: "Observability", icon: "🔭", series: [
  { t: "Observability Foundations", p: 1, hook: "Knowing what's going wrong in the kitchen without walking in", parts: [
    ["Intro: monitoring vs observability", "Dashboards are green but users are angry"],
    ["The three pillars: metrics, logs, traces", "Which one answers which question?"],
    ["Known unknowns vs unknown unknowns", "Debugging problems you never predicted"]
  ]},
  { t: "Metrics", p: 1, hook: "The tally board: orders per minute, wait times, burnt dishes", parts: [
    ["Intro: what a metric is", "Numbers over time"],
    ["Counter, gauge, histogram, summary", "Picking the right metric type"],
    ["Percentiles: why averages lie", "Average 100 ms, but p99 is 5 seconds"],
    ["The four golden signals", "Latency, traffic, errors, saturation"],
    ["RED and USE methods", "What to measure for services vs resources"],
    ["Cardinality", "One label that blew up the metrics bill"],
    ["Prometheus: pull model and scraping", "How Prometheus collects metrics"],
    ["PromQL basics", "rate(), sum by, histogram_quantile"],
    ["Grafana dashboards", "Dashboards people actually use"]
  ]},
  { t: "Logging", p: 1, hook: "The kitchen diary of everything that happened", parts: [
    ["Intro: why logs matter", "The crash left no trace"],
    ["Structured logging (JSON)", "grep doesn't scale"],
    ["Log levels", "DEBUG in production fills the disk"],
    ["Correlation and request IDs", "Following one request across 10 services"],
    ["Centralized logging: ELK/EFK and Loki", "Logs spread across 200 pods"],
    ["Retention, sampling and cost", "A $50k/month logging bill"]
  ]},
  { t: "Distributed Tracing", p: 1, hook: "Following one order slip through every station", parts: [
    ["Intro: traces and spans", "Which of 12 services made it slow?"],
    ["Context propagation (W3C traceparent)", "How the trace ID travels"],
    ["Sampling: head vs tail", "Can't store every trace"],
    ["Jaeger, Tempo and Zipkin", "Tracing backends"],
    ["Reading a trace waterfall", "Spotting the bottleneck"]
  ]},
  { t: "OpenTelemetry", p: 1, hook: "One standard order-slip format for every kitchen", parts: [
    ["Intro: what OpenTelemetry is", "Vendor lock-in on instrumentation"],
    ["SDKs and auto-instrumentation", "Traces without code changes"],
    ["The OTel Collector", "Receive, process, export pipelines"],
    ["Semantic conventions", "Consistent attribute names everywhere"]
  ]},
  { t: "Alerting", p: 1, hook: "The kitchen alarm that should ring only for real fires", parts: [
    ["Intro: what deserves an alert", "Paged at 3 AM for CPU at 81%"],
    ["Symptom vs cause alerting", "Alert on user pain, not internals"],
    ["Alert fatigue", "Too many alerts means none get read"],
    ["Routing and escalation (Alertmanager, PagerDuty)", "Right alert, right person"]
  ]},
  { t: "SLIs, SLOs & Error Budgets", p: 1, hook: "A promise: 99 of 100 dishes served within 15 minutes", parts: [
    ["Intro: SLI vs SLO vs SLA", "Promises vs measurements vs contracts"],
    ["Choosing good SLIs", "Measure what users feel"],
    ["Error budgets", "When to ship features vs fix reliability"],
    ["Burn-rate alerting", "Alert when the budget is burning fast"]
  ]},
  { t: "APM, Profiling & User Monitoring", p: 2, hook: "Watching from the customer's seat", parts: [
    ["Intro: APM tools (Datadog, New Relic)", "All-in-one visibility"],
    ["Continuous profiling", "Which function burns the CPU in prod?"],
    ["Real User Monitoring (RUM)", "How fast is it for real users?"],
    ["Synthetic monitoring", "Catching outages before users do"]
  ]},
  { t: "Kubernetes Observability", p: 2, hook: "Watching a kitchen whose cooks keep changing", parts: [
    ["Intro: what to monitor in Kubernetes", "Nodes, pods, control plane"],
    ["kube-state-metrics and node-exporter", "Cluster metrics sources"],
    ["Collecting container logs", "Logs from pods that no longer exist"],
    ["eBPF-based observability", "Visibility with no code changes"]
  ]},
  { t: "Debugging Production", p: 2, hook: "Detective work during the dinner rush", parts: [
    ["Intro: an incident triage workflow", "Where to start when everything is red"],
    ["Metrics to traces to logs (exemplars)", "Jumping from a spike to the exact request"],
    ["Latency spikes", "p99 doubled after the deploy"],
    ["Memory leaks", "Memory slowly climbs for days"]
  ]}
]},

{ id: "networking", name: "Networking", icon: "🌐", series: [
  { t: "Networking Fundamentals", p: 1, hook: "The roads, addresses and delivery boys of the internet", parts: [
    ["Intro: the OSI model", "Seven layers, explained once and for all"],
    ["The TCP/IP model", "What's actually used in practice"],
    ["IP addresses: IPv4 and IPv6", "We ran out of addresses"],
    ["Subnetting and CIDR", "What /24 means"],
    ["Public vs private IPs and NAT", "Your laptop has the same IP as millions of others"],
    ["Ports and sockets", "One server, many apps"],
    ["MAC addresses and ARP", "Finding the machine on the local network"]
  ]},
  { t: "What Happens When You Type a URL", p: 1, hook: "From the customer's order to the dish on the table", parts: [
    ["Intro: the full journey", "The classic interview question"],
    ["DNS lookup", "Turning a name into an IP"],
    ["TCP and TLS handshakes", "Setting up a secure connection"],
    ["HTTP request and response", "Through proxies and load balancers"],
    ["Rendering the page", "From bytes to pixels"]
  ]},
  { t: "DNS", p: 1, hook: "The phone book that maps names to addresses", parts: [
    ["Intro: what DNS does", "Nobody remembers IP addresses"],
    ["Recursive vs iterative resolution", "Root, TLD and authoritative servers"],
    ["Record types: A, AAAA, CNAME, MX, TXT, NS", "What each one is for"],
    ["TTL and caching", "Changed DNS but users still hit the old server"],
    ["DNS-based load balancing and GeoDNS", "Sending users to the nearest region"],
    ["DNS outages", "When DNS breaks, everything breaks"]
  ]},
  { t: "TCP & UDP", p: 1, hook: "Registered post with receipts vs flyers thrown over the wall", parts: [
    ["Intro: TCP vs UDP", "Reliable vs fast"],
    ["The three-way handshake and teardown", "SYN, SYN-ACK, ACK"],
    ["Reliability: ACKs and retransmission", "Packets get lost all the time"],
    ["Flow control and sliding windows", "A fast sender overwhelms a slow receiver"],
    ["Congestion control", "Why downloads start slow"],
    ["Head-of-line blocking", "One lost packet stalls everything"],
    ["TIME_WAIT and connection exhaustion", "Running out of ports"]
  ]},
  { t: "HTTP", p: 1, hook: "The language of ordering", parts: [
    ["Intro: HTTP requests and responses", "Methods, headers, body"],
    ["HTTP/1.1 and keep-alive", "A new connection for every image"],
    ["HTTP/2 multiplexing", "Many requests on one connection"],
    ["HTTP/3 and QUIC", "HTTP over UDP. Why?"],
    ["Caching headers: Cache-Control, ETag", "Not downloading what hasn't changed"],
    ["Cookies", "HTTP is stateless, so how do sites remember you?"]
  ]},
  { t: "TLS & HTTPS", p: 1, hook: "A sealed envelope only the right person can open", parts: [
    ["Intro: why HTTPS", "Anyone on the café Wi-Fi can read your traffic"],
    ["Symmetric vs asymmetric encryption", "Two kinds of locks"],
    ["Certificates and certificate authorities", "How do you know it's really your bank?"],
    ["The TLS handshake", "Agreeing on a key in public"],
    ["TLS termination", "Where to decrypt: LB or app?"],
    ["mTLS", "Both sides prove who they are"]
  ]},
  { t: "Proxies & Gateways", p: 1, hook: "Middlemen between customers and the kitchen", parts: [
    ["Intro: forward vs reverse proxy", "Hiding the client vs hiding the server"],
    ["Nginx as a reverse proxy", "TLS, caching and routing in one place"],
    ["Reverse proxy vs load balancer vs API gateway", "Overlapping tools, different jobs"]
  ]},
  { t: "Network Security", p: 2, hook: "Walls, guards and secret tunnels", parts: [
    ["Intro: firewalls", "Blocking unwanted traffic"],
    ["DDoS attacks and mitigation", "A million fake customers at the door"],
    ["VPNs", "A private tunnel over the public internet"],
    ["Bastion hosts", "One guarded door into the private network"],
    ["Zero trust networking", "Never trust, always verify"]
  ]},
  { t: "Container & Kubernetes Networking", p: 2, hook: "Internal phone lines between kitchen stations", parts: [
    ["Intro: Docker bridge networking", "How containers get IPs"],
    ["Kubernetes pod networking and CNI", "Every pod gets its own IP"],
    ["kube-proxy, iptables and IPVS", "How a Service IP really works"],
    ["CoreDNS in Kubernetes", "my-svc.my-ns.svc.cluster.local"],
    ["Ingress vs Gateway API", "Getting traffic into the cluster"]
  ]},
  { t: "Internet Routing & Performance", p: 3, hook: "How the city's roads decide the fastest path", parts: [
    ["Intro: latency, bandwidth and RTT", "A fat pipe can still be slow"],
    ["BGP basics", "How the internet's networks find each other"],
    ["Anycast", "One IP, many locations"],
    ["Connection reuse and pooling", "Handshakes are expensive"]
  ]},
  { t: "Network Troubleshooting", p: 2, hook: "Detective tools for when deliveries don't arrive", parts: [
    ["Intro: ping and traceroute", "Is it reachable? Where does it stop?"],
    ["dig and nslookup", "Is it DNS? (It's always DNS)"],
    ["curl -v", "Seeing the full HTTP conversation"],
    ["ss / netstat", "What's listening and who's connected"],
    ["tcpdump and Wireshark", "Reading the actual packets"]
  ]}
]},

{ id: "dsa", name: "Data Structures & Algorithms", icon: "🧮", series: [
  { t: "Complexity Analysis (Big-O)", p: 1, hook: "How serving time grows as the queue of customers grows", parts: [
    ["Intro: why Big-O matters", "Code that works for 100 users dies at 1 million"],
    ["O(1), O(log n), O(n), O(n log n), O(n²)", "Picturing each growth rate"],
    ["Space complexity", "Fast but runs out of memory"],
    ["Best, average and worst case", "Why quicksort is 'usually' fast"],
    ["Amortized analysis", "Why appending to a dynamic array is O(1)"],
    ["Recursion complexity and the Master theorem", "How fast is merge sort, really?"]
  ]},
  { t: "Arrays & Strings", p: 1, hook: "A row of numbered tables, each one easy to reach by number", parts: [
    ["Intro: how arrays live in memory", "Why index lookup is instant but insert is slow"],
    ["Dynamic arrays", "How a list grows when it's full"],
    ["Two pointers", "Pair with target sum in a sorted array"],
    ["Sliding window (fixed size)", "Max sum of k consecutive elements"],
    ["Sliding window (variable size)", "Longest substring without repeating characters"],
    ["Prefix sums", "Answering range-sum queries instantly"],
    ["Kadane's algorithm", "Maximum subarray sum"],
    ["Matrix traversal", "Spiral order, rotate image, set zeroes"],
    ["String manipulation patterns", "Anagrams, palindromes, string building cost"]
  ]},
  { t: "Hashing", p: 1, hook: "A coat check: hand over the token, get your coat instantly", parts: [
    ["Intro: hash maps and hash sets", "Turning an O(n²) search into O(n)"],
    ["Hash functions and collisions", "Two keys land in the same bucket"],
    ["Chaining vs open addressing", "How collisions get resolved"],
    ["Load factor and rehashing", "Why a hash map suddenly slows down"],
    ["Classic patterns: two sum, frequency counting, grouping", "Group anagrams together"],
    ["Hashing for subarray problems", "Count subarrays with sum k"]
  ]},
  { t: "Linked Lists", p: 1, hook: "A treasure hunt: each clue points to the next one", parts: [
    ["Intro: linked list vs array", "Fast inserts, slow lookups"],
    ["Reverse a linked list", "The most asked pointer question"],
    ["Fast and slow pointers", "Find the middle; detect a cycle"],
    ["Merge two sorted lists", "The building block of merge sort"],
    ["Doubly linked lists", "Moving both directions"],
    ["LRU cache (hash map + doubly linked list)", "Design an O(1) cache"]
  ]},
  { t: "Stacks & Queues", p: 1, hook: "A stack of plates vs a line at the counter", parts: [
    ["Intro: LIFO vs FIFO", "Undo button vs printer queue"],
    ["Stack problems: valid parentheses, min stack", "Matching brackets"],
    ["Monotonic stack", "Next greater element; daily temperatures"],
    ["Largest rectangle in histogram", "The classic monotonic stack problem"],
    ["Queues, circular queues and deques", "Efficient both-ends access"],
    ["Monotonic deque", "Sliding window maximum"]
  ]},
  { t: "Recursion & Backtracking", p: 1, hook: "Trying every seating plan and undoing the bad ones", parts: [
    ["Intro: how recursion works (the call stack)", "Stack overflow explained"],
    ["Base case and recursive case", "Writing recursion without fear"],
    ["Subsets", "Generate every combination"],
    ["Permutations", "Every possible order"],
    ["Combination sum", "Choices with reuse"],
    ["N-Queens", "Pruning invalid paths early"],
    ["Sudoku solver and word search", "Backtracking on a grid"]
  ]},
  { t: "Sorting", p: 1, hook: "Arranging order slips by table number", parts: [
    ["Intro: why sorting matters", "Sorted data makes everything else faster"],
    ["Bubble, selection and insertion sort", "The O(n²) family and when insertion sort wins"],
    ["Merge sort", "Divide and conquer, stable, O(n log n)"],
    ["Quick sort", "Pivots, partitioning and the bad case"],
    ["Heap sort", "Sorting with a heap"],
    ["Counting, radix and bucket sort", "Beating O(n log n)"],
    ["Stability and what languages actually use (Timsort)", "Why Python's sort is so fast"]
  ]},
  { t: "Binary Search", p: 1, hook: "Finding a page in the menu by opening it in the middle", parts: [
    ["Intro: binary search", "Find one item among a billion in 30 steps"],
    ["Lower bound and upper bound", "First and last occurrence"],
    ["Rotated sorted array", "Search when the array is rotated"],
    ["Binary search on the answer", "Koko eating bananas; ship packages in D days"],
    ["Peak element and search in 2D matrix", "Binary search beyond simple lists"],
    ["Median of two sorted arrays", "The hard one"]
  ]},
  { t: "Trees", p: 1, hook: "The restaurant chain's org chart", parts: [
    ["Intro: tree terminology", "Root, leaf, height, depth"],
    ["DFS traversals: preorder, inorder, postorder", "Three ways to walk a tree"],
    ["BFS / level order traversal", "Printing a tree level by level"],
    ["Height, depth and diameter", "Classic recursive tree problems"],
    ["Binary search trees", "Insert, search, delete, validate"],
    ["Lowest common ancestor", "Nearest shared boss of two employees"],
    ["Path sum and max path sum", "Passing values up and down"],
    ["Serialize and deserialize a tree", "Saving a tree to a string"],
    ["Balanced trees: AVL and red-black", "Why BSTs can degrade to a list"]
  ]},
  { t: "Heaps & Priority Queues", p: 1, hook: "The VIP line: the most urgent order is always served next", parts: [
    ["Intro: what a heap is", "Always get the min or max fast"],
    ["Heapify, push and pop", "How a heap stays ordered"],
    ["Top K elements", "Top 10 trending dishes"],
    ["Merge K sorted lists", "Combining many sorted streams"],
    ["Find median from a data stream", "Two heaps trick"],
    ["Scheduling problems", "Task scheduler; meeting rooms II"]
  ]},
  { t: "Tries", p: 2, hook: "A menu index letter by letter: P → Pa → Pan → Paneer", parts: [
    ["Intro: what a trie is", "Prefix search in autocomplete"],
    ["Insert, search and startsWith", "Implementing a trie"],
    ["Word search II", "Many words on a grid at once"],
    ["Autocomplete with top suggestions", "Ranking prefix matches"]
  ]},
  { t: "Graphs", p: 1, hook: "The delivery map: kitchens, homes and the roads between them", parts: [
    ["Intro: graphs and how to store them", "Adjacency list vs matrix"],
    ["BFS", "Shortest path in an unweighted graph"],
    ["DFS", "Exploring everything reachable"],
    ["Grid problems: number of islands, flood fill", "Graphs hidden in a 2D grid"],
    ["Cycle detection", "Directed vs undirected cycles"],
    ["Topological sort (Kahn's and DFS)", "Course schedule: which order to take classes"],
    ["Union-Find (Disjoint Set Union)", "Are these two connected? Number of provinces"],
    ["Dijkstra's algorithm", "Fastest delivery route with road times"],
    ["Bellman-Ford", "Negative edges and cheapest flights within K stops"],
    ["Floyd-Warshall", "Shortest path between every pair"],
    ["Minimum spanning tree: Kruskal and Prim", "Cheapest way to connect all branches"],
    ["Bipartite graphs", "Can we split into two teams?"],
    ["Strongly connected components and bridges", "Critical connections in a network"]
  ]},
  { t: "Greedy Algorithms", p: 1, hook: "Always grabbing the best-looking option right now", parts: [
    ["Intro: when greedy works (and when it fails)", "Coin change where greedy gives the wrong answer"],
    ["Activity selection / non-overlapping intervals", "Fit the most bookings"],
    ["Jump game", "Can you reach the end?"],
    ["Gas station", "Where to start the round trip"],
    ["Huffman coding", "Compressing data greedily"],
    ["Proving greedy correct", "The exchange argument"]
  ]},
  { t: "Intervals", p: 1, hook: "Table reservations that overlap", parts: [
    ["Intro: sorting intervals", "The first step to every interval problem"],
    ["Merge intervals", "Combine overlapping bookings"],
    ["Insert interval", "Add a booking to a sorted schedule"],
    ["Meeting rooms I and II", "How many tables do we need at peak?"],
    ["Sweep line technique", "Counting overlaps with events"]
  ]},
  { t: "Bit Manipulation", p: 2, hook: "Light switches for each table: on or off", parts: [
    ["Intro: binary and bitwise operators", "AND, OR, XOR, shifts"],
    ["XOR tricks", "Single number: find the one without a pair"],
    ["Counting bits and power of two", "n & (n - 1) explained"],
    ["Bitmasks for subsets", "Representing a set as an integer"]
  ]},
  { t: "Math & Number Theory", p: 3, hook: "The cashier's arithmetic shortcuts", parts: [
    ["Intro: GCD and LCM (Euclid)", "Splitting bills evenly"],
    ["Primes and the Sieve of Eratosthenes", "All primes up to a million fast"],
    ["Modular arithmetic", "Why answers are 'mod 1e9+7'"],
    ["Fast exponentiation", "Computing a^b in log time"],
    ["Combinatorics basics (nCr)", "Counting ways"]
  ]},
  { t: "String Algorithms", p: 3, hook: "Finding a phrase inside a giant recipe book", parts: [
    ["Intro: naive pattern matching", "Why searching text can be O(n·m)"],
    ["KMP algorithm", "Never re-check characters"],
    ["Rabin-Karp (rolling hash)", "Matching using hashes"],
    ["Z-algorithm", "Prefix matches everywhere"],
    ["Manacher's algorithm", "Longest palindrome in linear time"]
  ]},
  { t: "Advanced Data Structures", p: 3, hook: "Special tools for very busy kitchens", parts: [
    ["Intro: range query problems", "Sum of a range with constant updates"],
    ["Segment tree", "Range queries and point updates in log time"],
    ["Lazy propagation", "Range updates efficiently"],
    ["Fenwick tree (Binary Indexed Tree)", "Simpler prefix sums with updates"],
    ["Sparse table", "Range minimum queries in O(1)"],
    ["Skip lists", "How Redis sorted sets work"]
  ]},
  { t: "Problem-Solving Patterns & Interview Strategy", p: 1, hook: "Recognising the dish from its ingredients", parts: [
    ["Intro: how to approach any coding problem", "Clarify, brute force, optimize, code, test"],
    ["Recognising patterns from constraints", "n ≤ 20 means bitmask; n ≤ 10⁵ means n log n"],
    ["Brute force to optimal", "Walking the interviewer through improvements"],
    ["Edge cases and testing your code", "Empty input, duplicates, overflow"],
    ["The 15 patterns that cover most questions", "A map of everything in this series"]
  ]}
]},

{ id: "dp", name: "Dynamic Programming", icon: "🧩", series: [
  { t: "DP Foundations", p: 1, hook: "Writing down answers so you never cook the same sub-recipe twice", parts: [
    ["Intro: what dynamic programming is", "Fibonacci takes forever with plain recursion"],
    ["Overlapping subproblems and optimal substructure", "When can DP be used?"],
    ["Memoization (top-down)", "Cache the recursion"],
    ["Tabulation (bottom-up)", "Fill a table instead"],
    ["Defining state and transition", "The real skill in DP"],
    ["Space optimization", "From O(n) memory to O(1)"],
    ["Recursion → memo → table → optimized", "The 4-step recipe for any DP problem"]
  ]},
  { t: "1D DP", p: 1, hook: "Deciding table by table along a single row", parts: [
    ["Intro: climbing stairs", "How many ways to reach the top?"],
    ["House robber", "Pick or skip: can't rob neighbours"],
    ["Min cost climbing stairs", "Cheapest path"],
    ["Decode ways", "Counting interpretations of a digit string"],
    ["Word break", "Can this string be split into dictionary words?"],
    ["Jump game II", "Fewest jumps to the end"],
    ["Maximum product subarray", "Tracking both max and min"]
  ]},
  { t: "Grid DP (2D)", p: 1, hook: "A waiter crossing the floor, moving only right or down", parts: [
    ["Intro: unique paths", "Counting routes in a grid"],
    ["Unique paths with obstacles", "Blocked tables"],
    ["Minimum path sum", "Cheapest route through the grid"],
    ["Triangle and falling path sum", "Variable-width grids"],
    ["Maximal square", "Largest square of 1s"],
    ["Dungeon game", "Working backwards from the end"],
    ["Cherry pickup", "Two walkers at once (3D DP)"]
  ]},
  { t: "Knapsack Patterns", p: 1, hook: "Packing a delivery bag with a weight limit", parts: [
    ["Intro: 0/1 knapsack", "Take it or leave it, maximize value"],
    ["Subset sum", "Can we hit an exact total?"],
    ["Partition equal subset sum", "Split into two equal halves"],
    ["Target sum", "Assign + and - signs"],
    ["Unbounded knapsack", "Unlimited copies of each item"],
    ["Coin change (min coins)", "Fewest coins for an amount"],
    ["Coin change II (count ways)", "Combinations vs permutations trap"],
    ["Rod cutting", "Best way to cut and sell"]
  ]},
  { t: "Subsequence & String DP", p: 1, hook: "Comparing two order slips letter by letter", parts: [
    ["Intro: longest common subsequence", "What two strings share"],
    ["Edit distance", "Minimum edits to turn one word into another"],
    ["Longest increasing subsequence (O(n²))", "The classic DP"],
    ["LIS in O(n log n)", "Patience sorting with binary search"],
    ["Longest palindromic subsequence and substring", "Two different problems"],
    ["Distinct subsequences", "Counting matches"],
    ["Wildcard and regex matching", "Matching ? * and ."],
    ["Shortest common supersequence", "Building the answer from the table"]
  ]},
  { t: "Stock Buy & Sell (State Machine DP)", p: 1, hook: "A cashier tracking 'holding' vs 'not holding' states", parts: [
    ["Intro: best time to buy and sell (one transaction)", "Track the minimum so far"],
    ["Unlimited transactions", "Collect every upswing"],
    ["At most two transactions", "Adding a transaction counter"],
    ["At most K transactions", "Generalizing the state"],
    ["With cooldown", "A rest state after selling"],
    ["With transaction fee", "Same machine, one change"]
  ]},
  { t: "Interval / Partition DP", p: 2, hook: "Choosing where to make the cuts in a long order", parts: [
    ["Intro: matrix chain multiplication", "Order of operations changes the cost"],
    ["Burst balloons", "Think about the last balloon, not the first"],
    ["Palindrome partitioning II", "Fewest cuts into palindromes"],
    ["Minimum cost to cut a stick", "Interval DP on cut points"],
    ["Boolean parenthesization", "Ways to make an expression true"]
  ]},
  { t: "DP on Trees", p: 2, hook: "Each manager reports the best result of their whole team upward", parts: [
    ["Intro: post-order DP on trees", "Combining children's answers"],
    ["House robber III", "Rob or skip on a tree"],
    ["Binary tree maximum path sum", "Passing values up vs updating a global"],
    ["Tree diameter with DP", "Longest path anywhere"],
    ["Rerooting technique", "Answer for every node as root"]
  ]},
  { t: "DP on Graphs & DAGs", p: 3, hook: "Best route on a one-way delivery map", parts: [
    ["Intro: DP on a DAG", "Topological order makes DP work"],
    ["Longest path in a DAG", "Impossible in general graphs, easy in DAGs"],
    ["Counting paths", "Number of ways to reach a destination"],
    ["Bellman-Ford and Floyd-Warshall as DP", "Shortest paths are DP too"]
  ]},
  { t: "Bitmask DP", p: 3, hook: "Tracking which tables have already been served", parts: [
    ["Intro: subsets as integers", "When n ≤ 20"],
    ["Travelling salesman problem", "Visit every location once, shortest tour"],
    ["Assignment problem", "Match workers to tasks at minimum cost"],
    ["Partition into K equal subsets", "Subset states with memoization"]
  ]},
  { t: "Digit DP", p: 3, hook: "Counting bill numbers digit by digit", parts: [
    ["Intro: counting numbers with a property", "How many numbers ≤ N have no repeated digits?"],
    ["The 'tight' flag", "Staying below the limit"],
    ["Classic digit DP problems", "Count digit ones; numbers with given digit sum"]
  ]},
  { t: "DP Optimizations", p: 3, hook: "Making a slow kitchen procedure faster without changing the recipe", parts: [
    ["Intro: when O(n²) DP is too slow", "n = 10⁵ and the DP times out"],
    ["Monotonic queue optimization", "Sliding window max inside a DP"],
    ["Convex hull trick", "Lines and minimum queries"],
    ["Divide and conquer optimization", "Exploiting monotonic split points"],
    ["Knuth optimization", "Speeding up interval DP"]
  ]},
  { t: "DP in the Real World", p: 2, hook: "Where the bistro's software actually uses DP", parts: [
    ["Intro: DP is everywhere", "From Git to Google Maps"],
    ["git diff (LCS)", "How diff tools find changed lines"],
    ["Spell check and fuzzy search (edit distance)", "Did you mean 'paneer'?"],
    ["Text justification and line breaking", "How word processors wrap text"],
    ["Viterbi algorithm", "Speech recognition and autocorrect"],
    ["Resource allocation and scheduling", "Knapsack in cloud cost planning"]
  ]}
]}
];
