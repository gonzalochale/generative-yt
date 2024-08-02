"use server";

import moment from "moment";
import { getYouTubeAnalytics } from "@/lib/youtube";

export const getViews = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const today = new Date();
  const currentDay = moment(today).format("YYYY-MM-DD");
  const lastMonth = moment(today).subtract(1, "month").format("YYYY-MM-DD");

  const youtubeAnalitycs = await getYouTubeAnalytics();

  const {
    data: { rows },
  } = await youtubeAnalitycs.reports.query({
    ids: "channel==MINE",
    startDate: lastMonth,
    endDate: currentDay,
    metrics: "views",
    dimensions: "day",
  });

  const views = (rows ?? []).map(([date, views]) => ({
    date,
    views: parseInt(views, 10),
  }));

  const now = moment();
  const startOfLastMonth = moment().subtract(1, "months").startOf("month");

  const totalDaysInLastMonth =
    moment(startOfLastMonth).endOf("month").diff(startOfLastMonth, "days") + 1;

  let lastMonthViews = [];

  for (let i = 0; i < totalDaysInLastMonth; i++) {
    const date = moment(startOfLastMonth).add(i, "days").format("YYYY-MM-DD");
    const view = views.find((view) => view.date === date);
    if (view) {
      lastMonthViews.push(view);
    } else {
      lastMonthViews.push({ date, views: 0 });
    }
  }

  return lastMonthViews;
};
