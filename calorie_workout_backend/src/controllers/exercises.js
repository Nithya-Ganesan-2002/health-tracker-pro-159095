const logsService = require('../services/logs');

class ExercisesController {
  // PUBLIC_INTERFACE
  create(req, res) {
    /** Create an exercise log entry. */
    try {
      const created = logsService.addExercise(req.user.id, req.body || {});
      return res.status(201).json(created);
    } catch (err) {
      if (String(err.message || '').startsWith('ValidationError')) {
        return res.status(400).json({ message: err.message });
      }
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  // PUBLIC_INTERFACE
  list(req, res) {
    /** List exercise logs with optional from/to date filters (YYYY-MM-DD). */
    try {
      const { from, to } = req.query || {};
      const items = logsService.listExercises(req.user.id, { from, to });
      return res.status(200).json(items);
    } catch (err) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  // PUBLIC_INTERFACE
  getById(req, res) {
    /** Get exercise log by id. */
    try {
      const item = logsService.getExercise(req.user.id, req.params.id);
      if (!item) return res.status(404).json({ message: 'Not found' });
      return res.status(200).json(item);
    } catch (err) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  // PUBLIC_INTERFACE
  update(req, res) {
    /** Update exercise log by id. */
    try {
      const updated = logsService.updateExercise(req.user.id, req.params.id, req.body || {});
      if (!updated) return res.status(404).json({ message: 'Not found' });
      return res.status(200).json(updated);
    } catch (err) {
      if (String(err.message || '').startsWith('ValidationError')) {
        return res.status(400).json({ message: err.message });
      }
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  // PUBLIC_INTERFACE
  delete(req, res) {
    /** Delete exercise log by id. */
    try {
      const ok = logsService.deleteExercise(req.user.id, req.params.id);
      if (!ok) return res.status(404).json({ message: 'Not found' });
      return res.status(204).send();
    } catch (err) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}

module.exports = new ExercisesController();
