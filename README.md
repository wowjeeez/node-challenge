# Notes, features
- I almost re-implemented the entire API in Nest.js, but decided otherwise due to the challenge explicitly being in express.js, and even with the express platform, it's only remotely related to express.
- Removed the security middleware and replaced it with a more general purpose xss sanitizer middleware
- Implemented 2 more routes alongside the required one, one to create users and to add transactions
- In the user domain I got rid of the public fields logic and just fetched the fields that are public 
- CORS is implemented with configurable origins (`allowedOrigins` config property)
- .env file is needed only because of Prisma, to be able to connect to the database while pulling/pushing database info
- Added JSON body parsing feature with 100kb body limit (configurable with the `bodyLimit` config property)
- Rewritten domain level routing logic to support more routes
- Moved user id validation into its own decorator, so any route that requires a valid user can just pass the `IsUserIdValid` decorator to its DTO and assume that each call contains a valid user (this does introduce some coupling but in my opinion it's worth the tradeoff)
# Design choices
- I stuck with query parameter design and the expenses are filterable by amount, date, status, merchant name and currency and sortable by amount, date, status and merchant name
- The endpoint supports paging and if omitted, the following default settings are used: 10 entries/page. Keeping track of the page id is the user's responsibility (to allow more flexible frontend design and to decrease complexity).
- Page size is capped at 50 entries (configurable under the `pageSizeCap` config property)
- In the expenses domain, not every query factory is unit tested because I felt that endpoint tests would better suit this pipeline

# Stats
- Total time spent working: ~ 5 hours
- Google searches: [REDACTED]
- Eslint errors: 0
- Coverage: quite good I'd say