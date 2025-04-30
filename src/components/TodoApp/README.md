# TodoApp with MySQL Database Integration

This component provides a family schedule management system with MySQL database integration.

## Features

- User authentication (login, role distinction, password change)
- Data persistence (activity storage and retrieval)
- UI enhancements (screen width increase, date display, week navigation)
- Activity logging and notifications (modification records, email notifications)
- Google Calendar integration

## Database Setup

1. Create the required tables in your MySQL database using the schema in `database/schema.sql`:

```sql
mysql -u your_username -p your_database < database/schema.sql
```

2. Set up environment variables for database connection:

Create a `.env.local` file in the root of your project with the following variables:

```
DB_HOST=your_mysql_host
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=your_database_name
```

## API Routes

The TodoApp uses the following API routes:

- `/api/todoapp/activities` - CRUD operations for activities
- `/api/todoapp/logs` - CRUD operations for activity logs
- `/api/todoapp/auth` - User authentication and password management
- `/api/todoapp/weeks` - Operations related to available weeks

## Integration with Next.js

To integrate the API routes with Next.js, you need to create the following files:

1. Create `src/app/api/todoapp/activities/route.js` and copy the content from `src/components/TodoApp/api/activities.js`
2. Create `src/app/api/todoapp/logs/route.js` and copy the content from `src/components/TodoApp/api/logs.js`
3. Create `src/app/api/todoapp/auth/route.js` and copy the content from `src/components/TodoApp/api/auth.js`
4. Create `src/app/api/todoapp/weeks/route.js` and copy the content from `src/components/TodoApp/api/weeks.js`

## Deployment

When deploying to Digital Ocean:

1. Install MySQL on your server or use a managed database service
2. Set up environment variables for database connection
3. Run the database schema script to create the required tables
4. Configure your Next.js application to use the correct API endpoints

## Security Considerations

- Use HTTPS for all API requests
- Store database credentials securely using environment variables
- Implement proper authentication and authorization for API routes
- Consider using a more secure password storage mechanism (e.g., bcrypt)
- Implement rate limiting for API routes to prevent abuse
