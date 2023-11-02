## To-Do Application
Built with: Javascript, Next.js, Node/Express.js, Postgres, styled with MUI & Styled-components; For auth: cookies, bcrypt, authprovider

## Instructions

1. Run `npm install` to install all your dependencies locally
2. Add PG_URI to connect to database (important for app functionality)
  - Navigate to server > models > userModel.js 
  - Replace "PG_URI_HERE" with the PG_URI I have provided in the e-mail
  - All tables have already been created in this PG database
  - Let me know if you have any questions in regards to DB connection
2. Run `npm run dev` to spin up the client & server
3. Open [http://localhost:3000](http://localhost:3000) with your browser to be directed to sign-up/log-in page
4. Once user successfully signs-up & logs-in user will be re-directed to "Your Tasks" page 
  - User can add to-dos, edit/update to-dos, delete to-dos (authorized)
5. User can also view other's to-do lists (not authorized to edit other's to-dos)
  - User will only be authorized to view other's to-dos and completion status
6. Navigate through the left-side nav bar and select "Explore Page" to click through other's to-do lists or navigate back to "Youre Tasks" to edit your tasks
7. "Sign Out" 
