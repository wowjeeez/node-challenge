# Notes
- I almost re-implemented the entire API in Nest.js, but decided otherwise, due to the challenge explicitly being related to express.js, and even with the express platform, it's only remotely related to express.
- I removed the security middleware and replaced it with a more general purpose xss sanitizer middleware
- I implemented 2 more routes alongside the required one, one to create users and to add transactions
- In the user domain I got rid of the public fields logic and just fetched the fields that are public 
- CORS is implemented with configurable origins (`allowedOrigins` config property)
# Design choices
- I stuck with query parameter design and the expenses are filterable by amount, date, status, merchant name and currency and sortable by amount, date, status and merchant name
- The endpoint supports paging and if omitted, the following default settings are used: 10 entries/page, and keeping track of the page id is the user's responsibility (to allow more flexible frontend design and to decrease complexity)
- Page size is capped at 50 entries (configurable under the `pageSizeCap` config property)
- In the expenses domain, not every query factory is unit tested because I felt that endpoint tests would better suit this pipeline
- 

# todo: 
- Add CI