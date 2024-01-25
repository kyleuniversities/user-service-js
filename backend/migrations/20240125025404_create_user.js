/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('user', (table) => {
    table.uuid('id').primary();
    table.string('username', 255).notNullable().unique();
    table.string('email', 255).notNullable().unique();
    table.string('password', 255).notNullable();
    table.string('picture', 255);
    table.string('thumbnail', 255);
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('user');
};
