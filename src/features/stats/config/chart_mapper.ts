/**
 * Chart mapper - transforms chart API response to UI format
 * Reusable for all chart endpoints (subscriptions, orders, students)
 */

import type { ChartApiResponse, ChartUI, ChartPoint } from '../model/chart.types';

const MAX_WEEKS = 4;
const DAYS_PER_WEEK = 7;
const WEEK_LABEL_OFFSET = 3; // Display label at day 4 of each week (middle)

/**
 * Creates weekly labels for daily data points
 * Shows "Semaine X" in the middle of each week (day 4), max 4 weeks
 * @param points - Array of daily data points
 * @returns Array of labels with week names at middle of each week
 */
export const createWeeklyLabels = (points: ChartPoint[]): string[] => {
  return points.map((_, index) => {
    const weekNumber = Math.floor(index / DAYS_PER_WEEK) + 1;
    const dayInWeek = index % DAYS_PER_WEEK;
    
    // Show label at middle of week, max 4 weeks
    if (dayInWeek === WEEK_LABEL_OFFSET && weekNumber <= MAX_WEEKS) {
      return `Semaine ${weekNumber}`;
    }
    return '';
  });
};

/**
 * Maps chart API response to UI format with weekly labels
 * @param response - API response from chart endpoints
 * @returns ChartUI with week labels in middle of each week
 */
export const mapChartResponseToUI = (response: ChartApiResponse): ChartUI => {
  return {
    labels: createWeeklyLabels(response.points),
    data: response.points.map((point) => point.count),
    total: response.total,
  };
};
