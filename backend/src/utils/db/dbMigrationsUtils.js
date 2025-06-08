const logger = require('../../logger');
const { getRowCount, db_run, columnExists } = require('./dbUtils');

async function migrateDB() {
  await migrateToVersion025();
  logger.info('... DB Migration: Completed');
}

async function migrateToVersion025() {
  if ((await getRowCount('Role')) === 3) {
    logger.debug('.... DB Migration: v0.2.5 -> Role table update');
    await db_run("Update Role SET name = 'organiser' WHERE id = 2;");
    await db_run("Update Role SET name = 'user' WHERE id = 3;");
    await db_run("INSERT INTO Role (id, name) VALUES (4, 'guest'), (5, 'new'), (6, 'dummy')");
    await db_run('Update User SET role_id = 6 WHERE role_id = 3;');
    await db_run('Update User SET role_id = 3 WHERE role_id = 2;');
  }

  if (!await columnExists('User', 'activation_code')) {
    logger.debug('.... DB Migration: v0.2.5 -> User table update');
    await db_run('ALTER TABLE User ADD COLUMN activation_code TEXT;');
  }
}

module.exports = {
  migrateDB
};
