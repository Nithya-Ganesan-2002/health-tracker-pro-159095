const dayjs = require('dayjs');
const store = require('../data/store');

function sum(arr, field) {
  return arr.reduce((acc, x) => acc + (Number(x[field]) || 0), 0);
}

class AnalyticsService {
  // PUBLIC_INTERFACE
  dailySummary(userId, dateStr) {
    /** Compute daily calories in/out and net for a specific date. */
    const date = dayjs(dateStr || dayjs().format('YYYY-MM-DD'));
    const foods = (store.listFoods(userId) || []).filter((f) => dayjs(f.date).isSame(date, 'day'));
    const exercises = (store.listExercises(userId) || []).filter((e) => dayjs(e.date).isSame(date, 'day'));

    const caloriesIn = sum(foods, 'calories');
    const caloriesOut = sum(exercises, 'caloriesBurned');
    const net = caloriesIn - caloriesOut;

    return {
      date: date.format('YYYY-MM-DD'),
      caloriesIn,
      caloriesOut,
      net,
      foodsCount: foods.length,
      exercisesCount: exercises.length,
      goal: store.getGoal(userId) || null,
    };
  }

  // PUBLIC_INTERFACE
  weeklySummary(userId, anchorDateStr) {
    /** Compute weekly summary starting Monday to Sunday for a given date. */
    const anchor = dayjs(anchorDateStr || dayjs().format('YYYY-MM-DD'));
    const start = anchor.startOf('week').add(1, 'day'); // Make Monday the start (Dayjs week starts Sunday)
    const end = start.add(6, 'day');

    const foods = (store.listFoods(userId) || []).filter((f) => dayjs(f.date).isAfter(start.subtract(1, 'day')) && dayjs(f.date).isBefore(end.add(1, 'day')));
    const exercises = (store.listExercises(userId) || []).filter((e) => dayjs(e.date).isAfter(start.subtract(1, 'day')) && dayjs(e.date).isBefore(end.add(1, 'day')));

    const totalCaloriesIn = sum(foods, 'calories');
    const totalCaloriesOut = sum(exercises, 'caloriesBurned');
    const net = totalCaloriesIn - totalCaloriesOut;

    return {
      weekStart: start.format('YYYY-MM-DD'),
      weekEnd: end.format('YYYY-MM-DD'),
      totalCaloriesIn,
      totalCaloriesOut,
      net,
      daysTracked: new Set(foods.map((f) => dayjs(f.date).format('YYYY-MM-DD'))).size,
      workouts: exercises.length,
    };
  }

  // PUBLIC_INTERFACE
  progress(userId, fromStr, toStr) {
    /** Return time series of daily net calories between dates for progress visualization. */
    const from = dayjs(fromStr || dayjs().subtract(30, 'day').format('YYYY-MM-DD'));
    const to = dayjs(toStr || dayjs().format('YYYY-MM-DD'));
    const days = [];
    for (let d = from; d.isBefore(to.add(1, 'day')); d = d.add(1, 'day')) {
      const sumDay = this.dailySummary(userId, d.format('YYYY-MM-DD'));
      days.push({ date: sumDay.date, net: sumDay.net, in: sumDay.caloriesIn, out: sumDay.caloriesOut });
    }
    return {
      from: from.format('YYYY-MM-DD'),
      to: to.format('YYYY-MM-DD'),
      series: days,
    };
  }
}

module.exports = new AnalyticsService();
