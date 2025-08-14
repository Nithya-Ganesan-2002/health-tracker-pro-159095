const analyticsService = require('../services/analytics');

class AnalyticsController {
  // PUBLIC_INTERFACE
  daily(req, res) {
    /** Get daily summary for a given date (YYYY-MM-DD). */
    try {
      const { date } = req.query || {};
      const summary = analyticsService.dailySummary(req.user.id, date);
      return res.status(200).json(summary);
    } catch (err) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  // PUBLIC_INTERFACE
  weekly(req, res) {
    /** Get weekly summary anchored on a given date (YYYY-MM-DD). */
    try {
      const { date } = req.query || {};
      const summary = analyticsService.weeklySummary(req.user.id, date);
      return res.status(200).json(summary);
    } catch (err) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  // PUBLIC_INTERFACE
  progress(req, res) {
    /** Get a progress time-series between from/to dates (YYYY-MM-DD). */
    try {
      const { from, to } = req.query || {};
      const series = analyticsService.progress(req.user.id, from, to);
      return res.status(200).json(series);
    } catch (err) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}

module.exports = new AnalyticsController();
