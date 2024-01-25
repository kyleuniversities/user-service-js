require('dotenv').config();
module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      host: '127.0.0.1',
      user: process.env['DATABASE_USERNAME'],
      password: process.env['DATABASE_PASSWORD'],
      database: 'user_service_development',
    },
    migrations: {
      tableName: 'knexMigrations',
    },
  },
};
