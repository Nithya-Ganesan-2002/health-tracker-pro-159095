const logsService = require('../services/logs');

class FoodsController {
  // PUBLIC_INTERFACE
  create(req, res) {
    /** Create a food log entry. */
    try {
      const created = logsService.addFood(req.user.id, req.body || {});
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
    /** List food logs with optional from/to date filters (YYYY-MM-DD). */
    try {
      const { from, to } = req.query || {};
      const items = logsService.listFoods(req.user.id, { from, to });
      return res.status(200).json(items);
    } catch (err) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  // PUBLIC_INTERFACE
  getById(req, res) {
    /** Get food log by id. */
    try {
      const item = logsService.getFood(req.user.id, req.params.id);
      if (!item) return res.status(404).json({ message: 'Not found' });
      return res.status(200).json(item);
    } catch (err) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  // PUBLIC_INTERFACE
  update(req, res) {
    /** Update food log by id. */
    try {
      const updated = logsService.updateFood(req.user.id, req.params.id, req.body || {});
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
    /** Delete food log by id. */
    try {
      const ok = logsService.deleteFood(req.user.id, req.params.id);
      if (!ok) return res.status(404).json({ message: 'Not found' });
      return res.status(204).send();
    } catch (err) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}

module.exports = new FoodsController();
