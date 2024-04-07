import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import pg from 'pg';

const app = express();
app.use(bodyParser.json());
app.use(cors());

const db = new pg.Client({
  user: 'postgres',
  host: 'localhost',
  database: 'event_hub',
  password: 'Akhilesh@27',
  port: 5432,
});

db.connect()
  .then(() => console.log('Connected to the database'))
  .catch(err => console.error('Error connecting to the database', err));

app.post('/register', async (req, res) => {
  const { name, email, password, userID } = req.body;
  try {
    console.log(name,email,password,userID);
    const query = 'INSERT INTO users (name, email, password, userID) VALUES ($1, $2, $3, $4)';
    await db.query(query, [name, email, password, userID]);
    res.sendStatus(201);
  } catch (error) {
    console.error('Error registering user:', error);
    res.sendStatus(500);
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
      const query = 'SELECT id, name FROM users WHERE email = $1 AND password = $2'; // Modify the query to include first_name
      const result = await db.query(query, [email, password]);
      if (result.rows.length === 1) {
          const { id, name } = result.rows[0]; // Retrieve the user ID and first name from the query result
          console.log("UserID:", id);
          console.log("Name:", name);
          res.status(200).json({ id, name }); // Return the user ID and first name in the response
      } else {
          res.sendStatus(401); // Unauthorized
      }
  } catch (error) {
      console.error('Error logging in user:', error);
      res.sendStatus(500);
  }
});


// Create Event
app.post('/create-event', async (req, res) => {
  const { name, owner_email, eventDate, eventTime, eventPeriod, min, max, current, location, additionaldetails } = req.body;
  try {
    const query = 'INSERT INTO events (name, owner_email, eventDate, eventTime, eventPeriod, min, max, current, location, additionaldetails) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)';
    await db.query(query, [name, owner_email, eventDate, eventTime, eventPeriod, min, max, current, location, additionaldetails]);
    res.sendStatus(201);
  } catch (error) {
    console.error('Error creating event:', error);
    res.sendStatus(500);
  }
});


// Add this endpoint to fetch events created by a specific user
app.get('/view-dashboard', async (req, res) => {
    const { email } = req.query;
    try {
      const query = 'SELECT * FROM events WHERE owner_email = $1';
      const result = await db.query(query, [email]);
      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Error fetching user events:', error);
      res.sendStatus(500);
    }
  });
// Route handler for deleting an event by ID
app.delete('/delete-event/:eventId', async (req, res) => {
    const eventId = req.params.eventId;
    try {
      // Run a DELETE query to remove the event from the database
      const query = 'DELETE FROM events WHERE id = $1';
      await db.query(query, [eventId]);
      res.sendStatus(204); // No content response
    } catch (error) {
      console.error('Error deleting event:', error);
      res.sendStatus(500); // Internal server error
    }
  });



// Fetch all events except those created by the logged-in user
app.get('/view-events', async (req, res) => {
  console.log("Fetching Events that can be joined");
  const owner_email = req.query.owner_email;
    // console.log("The request body is:", req);
    console.log("Email ID sending to Query:", owner_email);
    try {
      const query = `
      SELECT * 
      FROM events 
      WHERE id NOT IN (
          SELECT event_id 
          FROM participants 
          WHERE user_id = (SELECT id FROM users WHERE email = $1)
      )
      AND owner_email != $1
      ORDER BY eventdate, eventtime;
      
      `;
      const result = await db.query(query, [owner_email]);
      // console.log(result);
      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Error fetching events:', error);
      res.sendStatus(500);
    }
  });

  
// Join an event
app.post('/join-event', async (req, res) => {
    const { user_email, event_id } = req.body;
    try {
        // Increment the current value in the events table
        const incrementQuery = 'UPDATE events SET current = current + 1 WHERE id = $1';
        await db.query(incrementQuery, [event_id]);

        // Insert the participant entry into the participants table
        const participantQuery = 'SELECT id FROM users WHERE email = $1';
        const participantResult = await db.query(participantQuery, [user_email]);
        const user_id = participantResult.rows[0].id;
  
        const insertQuery = 'INSERT INTO participants (user_id, event_id) VALUES ($1, $2)';
        await db.query(insertQuery, [user_id, event_id]);
  
        res.sendStatus(201);
    } catch (error) {
        console.error('Error joining event:', error);
        res.sendStatus(500);
    }
});

// Leave an event
app.post('/leave-event', async (req, res) => {
    const { user_email, event_id } = req.body;
    try {
        // Decrement the current value in the events table
        const decrementQuery = 'UPDATE events SET current = current - 1 WHERE id = $1';
        await db.query(decrementQuery, [event_id]);

        // Delete the participant entry from the participants table
        const deleteQuery = 'DELETE FROM participants WHERE event_id = $2 and user_id = (SELECT id FROM users WHERE email = $1)';
        console.log("User Email:", user_email, ", Event ID:", event_id);
        await db.query(deleteQuery, [user_email, event_id]);

        res.sendStatus(200);
    } catch (error) {
        console.error('Error leaving event:', error);
        res.sendStatus(500);
    }
});



// Joined events
app.get('/joined-events', async (req, res) => {
  const { user_email } = req.query;
  try {
    // Retrieve user_id based on user_email
    console.log("Email:", user_email)
    const userQuery = 'SELECT id FROM users WHERE email = $1';
    const userResult = await db.query(userQuery, [user_email]);

    if (userResult.rows.length === 0) {
      throw new Error('User not found');
    }

    const user_id = userResult.rows[0].id;

    // Fetch events joined by the user using user_id
    const eventsQuery = `
      SELECT events.*
      FROM events
      JOIN participants ON events.id = participants.event_id
      WHERE participants.user_id = $1
    `;
    const eventsResult = await db.query(eventsQuery, [user_id]);

    res.status(200).json({ attendedEvents: eventsResult.rows });
  } catch (error) {
    console.error('Error fetching attended user events:', error);
    res.sendStatus(500);
  }
});



  
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

process.on('SIGINT', () => {
  console.log('Shutting down server');
  server.close(() => {
    console.log('Server closed');
    db.end(() => {
      console.log('Database connection closed');
      process.exit(0);
    });
  });
});
