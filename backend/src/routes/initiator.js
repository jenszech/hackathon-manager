const express = require('express');
const { db_get, db_run } = require('../utils/db/dbUtils');
const logger = require('../logger');

const { authenticateToken } = require('../middlewares/authMiddleware');
const router = express.Router();
const { ErrorMsg } = require('../constants');

const createInitiator = (dbRow) => {
  return {
    id: dbRow?.id ?? null,
    project_id: dbRow?.project_id ?? null,
    user_id: dbRow?.user_id ?? null
  };
};

// *** POST /api/Initiator *********************************************************
router.post('/', async (req, res) => {
  const { project_id, user_id } = req.body;
  logger.debug(`API: POST /api/initiator -> Project ID: ${project_id}, User ID: ${user_id}`);

  if (!project_id || !user_id) {
    return res.status(400).send(ErrorMsg.VALIDATION.MISSING_FIELDS);
  }
  let result = await db_get('SELECT * FROM Initiator WHERE project_id = ? AND user_id = ?', [project_id, user_id]);
  if (result.err) return res.status(500).send(ErrorMsg.SERVER.ERROR);
  if (result.row) return res.status(409).send(ErrorMsg.VALIDATION.CONFLICT);

  result = await db_run('INSERT INTO Initiator (project_id, user_id) VALUES (?, ?)', [project_id, user_id]);
  const initiator_id = result.lastID;
  if (result.err || result.changes === 0) {
    return res.status(500).send(`Server error`);
  }

  res.status(201).json({
    id: initiator_id,
    project_id,
    user_id
  });
});

// *** PUT /api/Initiator/:project_id/user/:user_id ************************
router.put('/:id', authenticateToken, async (req, res) => {
  const { project_id, user_id } = req.body;
  const { id } = req.params;
  logger.debug(`API: PUT /api/initiator/${id} -> Project ID: ${project_id}, User ID: ${user_id}`);

  if (!project_id || !user_id) {
    return res.status(400).send(ErrorMsg.VALIDATION.MISSING_FIELDS);
  }

  //Load existing data
  result = await db_get(`SELECT * FROM Initiator WHERE Initiator.id = ?`, [id]);
  if (result.err) return res.status(500).send(ErrorMsg.SERVER.ERROR);
  if (!result.row) return res.status(404).send(ErrorMsg.NOT_FOUND.NO_INITIATOR);

  let initiator = createInitiator(result.row);

  initiator.project_id = project_id;
  initiator.user_id = user_id;

  // Update Participation
  result = await db_run('UPDATE Initiator SET project_id=?, user_id=? WHERE id = ?', [initiator.project_id, initiator.user_id, req.params.id]);
  if (result.err) {
    return res.status(500).send(ErrorMsg.SERVER.ERROR);
  }

  res.status(200).json(initiator);
});

// *** GET /api/Initiator *********************************************************
router.get('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  logger.debug(`API: GET  /api/initiator/${id}`);

  const result = await db_get(`SELECT * FROM Initiator WHERE Initiator.id = ?`, [id]);
  if (result.err) return res.status(500).send(ErrorMsg.SERVER.ERROR);
  if (!result.row) return res.status(404).send(ErrorMsg.NOT_FOUND.NO_INITIATOR);
  const initiator = createInitiator(result.row);
  res.json(initiator);
});

// *** DELETE /api/Initiator *********************************************************
router.delete('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  logger.debug(`API: DEL  /api/initiator/${id}`);

  result = await db_run('DELETE FROM Initiator WHERE id = ?', [id]);
  if (result.err) {
    return res.status(500).send(ErrorMsg.SERVER.ERROR);
  }
  if (result.changes === 0) {
    return res.status(404).send(ErrorMsg.NOT_FOUND.NO_INITIATOR);
  }
  res.status(200).send('Initiator deleted successfully');
});

module.exports = router;
