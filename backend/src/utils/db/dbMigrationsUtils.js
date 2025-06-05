const logger = require('../../logger');
const { getRowCount, db_run } = require('./dbUtils');

async function migrateDB() {
  await migrateToVersion025();
  logger.info('... DB Migration: Completed');
}

async function migrateToVersion025() {
  if ((await getRowCount('Role')) !== 3) return;

  logger.debug('.... DB Migration: v0.2.5 started');

  await db_run("Update Role SET name = 'organiser' WHERE id = 2;");
  await db_run("Update Role SET name = 'user' WHERE id = 3;");
  await db_run("INSERT INTO Role (id, name) VALUES (4, 'guest'), (5, 'new'), (6, 'dummy')");
  await db_run('Update User SET role_id = 6 WHERE role_id = 3;');
  await db_run('Update User SET role_id = 3 WHERE role_id = 2;');
}

module.exports = {
  migrateDB
};
