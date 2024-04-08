# EventHub

Steps to run the Project:

1. Clone the Repository EventHub.

2. Setting up the Database:
   1. Create a database in Postgres with the name event_hub
   2. Import the database dump from this Folder titled 'sqlfile.sql'
   3. To import it, open the Terminal, navigate to the File location, and run the following command:
   ```psql --username=<db_user_name> event_hub < sqlfile.sql```
  
3. Open the EventHub folder in an editor.

4. Setting up the Backend:
   1. Open a terminal, navigate to the Backend Folder
   2. Run `npm i` to install packages.
   3. Run `npm start`.
  
5. Setting up the Frontend:
   1. Open a terminal, navigate to the Fronted Folder
   2. Run `npm i` to install packages.
   3. Run 'npm start'.



