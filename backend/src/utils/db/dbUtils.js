const sqlite3 = require('sqlite3').verbose();
const config = require('../../config');
const logger = require('../../logger');

let db = null;

// *** DB Initialization ************************************************************
async function initConnection() {
  logger.info(`... connecting to: ${config.dbPath}`);
  db = new sqlite3.Database(config.dbPath, (err) => {
    if (err) {
      logger.error("... Can't initialize the database: " + err.message);
      throw new Error(`Database connection failed: ${err.message}`);
    } else {
      logger.info('... connection to the database established successfully.');
    }
  });
}

// promisified Db functions for minizing callbacks
// Even though callbacks are currently support for backwards compatibility!
function db_run(statement, params = [], callback) {
  return execute_on_db('run', statement, params, callback);
}

function db_get(statement, params = [], callback) {
  return execute_on_db('get', statement, params, callback);
}

function db_all(statement, params = [], callback) {
  return execute_on_db('all', statement, params, callback);
}

function execute_on_db(method, statement, params, callback) {
  return new Promise((resolve) => {
    try {
      db[method](statement, params, function (err, rows) {
        if (typeof callback === 'function') return callback.call(this, err, rows);
        if (err) {
          logger.error(err);
          return resolve({ err: err });
        }
        resolve({
          row: rows,
          stmt: this.stmt,
          lastID: this.lastID,
          changes: this.changes
        });
      });
    } catch (err) {
      logger.error(err);
      resolve({ err: err });
    }
  });
}

function db_exec(command) {
  return new Promise((resolve, reject) => {
    db.exec(command, (err) => {
      if (err) {
        logger.error(err);
        reject(err);
      }
      resolve();
    });
  });
}

// *** Helper Function ********************************************************

async function createTable(query) {
  return new Promise(function (resolve, reject) {
    db.run(query, function (err) {
      if (err) {
        logger.error(`Can't create the Table because: ${err}`);
        reject(err);
      }
      resolve();
    });
  });
}

async function fillTable(table, structure, values) {
  if (typeof table !== 'string' || !Array.isArray(structure) || !Array.isArray(values)) {
    throw new Error(`Could not fill Table: ${table}`);
  }
  const result = await db_get(`SELECT * FROM ${table}`);
  if (result.err || !!result.row) return;

  structure = structure.join(', ');
  for (const elem of values) {
    db_run(`INSERT INTO ${table} (${structure}) VALUES (${elem.join(', ')})`);
  }
}

async function isTableEmpty(tablename) {
  const result = await db_get(`SELECT COUNT(*) as count FROM ${tablename}`);
  if (result.err) {
    logger.error(`isTableEmpty: Error checking table ${tablename}: ${result.err.message}`);
    return false;
  }
  return result.row.count === 0;
}

async function existTableEntry(tablename, checkColumn, checkValue) {
  const result = await db_get(`SELECT COUNT(*) as count FROM ${tablename} WHERE ${checkColumn} = ?`, [checkValue]);
  if (result.err) {
    logger.error(`existTableEntry: Error checking table ${tablename}: ${result.err.message}`);
    return false;
  }
  return result.row.count > 0;
}

async function getRowCount(tablename) {
  const result = await db_get(`SELECT COUNT(*) as count FROM ${tablename}`);
  if (result.err) {
    logger.error(`getRowCount: Error checking table ${tablename}: ${result.err.message}`);
    return 0;
  }
  return result.row.count;
}

async function columnExists(tableName, columnName) {
  try {
    const result = await db_all(`PRAGMA table_info(${tableName});`);
    if (result.err) {
      logger.error('columnExists: Error checking table info:', result.err.message);
    }
    const test = result.row.some((column) => column.name === columnName);
    return result.row.some((column) => column.name === columnName);
  } catch (error) {
    console.error(`Error checking if column ${columnName} exists in table ${tableName}:`, error);
    return false;
  }
}

module.exports = {
  db,
  initConnection,
  db_run,
  db_get,
  db_all,
  db_exec,
  createTable,
  fillTable,
  isTableEmpty,
  existTableEntry,
  getRowCount,
  columnExists
};
