// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'mysql2',
    connection: {
      database: 'todo_app',
      user: 'root',
      password: "^T'^,%hSDV^t5M-+",
    },
    pool: {
      min: 2,
      max: 10,
    }
  },

  staging: {
    client: 'mysql2',
    connection: {
      database: 'todo_app',
      user: 'root',
      password: "^T'^,%hSDV^t5M-+",
    },
    pool: {
      min: 2,
      max: 10
    },
  },

  production: {
    client: 'mysql2',
    connection: {
      database: 'todo_app',
      user: 'root',
      password: "^T'^,%hSDV^t5M-+",
    },
    pool: {
      min: 2,
      max: 10
    },
  }

};
