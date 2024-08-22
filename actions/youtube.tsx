"use server";

import moment from "moment";
import { getYouTubeAnalytics } from "@/lib/youtube";

// Last 30 days tools

// Get last 30 days views
export const getLastMonthViews = async () => {
  console.log("getLastMonthViews");

  const today = new Date();
  const endDate = moment(today).format("YYYY-MM-DD");
  const startDate = moment(today).subtract(30, "days").format("YYYY-MM-DD");

  try {
    const youtubeAnalitycs = await getYouTubeAnalytics();
    const {
      data: { rows },
    } = await youtubeAnalitycs.reports.query({
      ids: "channel==MINE",
      startDate: startDate,
      endDate: endDate,
      metrics: "views",
      dimensions: "day",
    });

    const views = (rows ?? []).map(([date, views]) => ({
      date,
      views: parseInt(views, 10),
    }));

    const startOfPeriod = moment(today).subtract(30, "days").startOf("day");
    const totalDaysInPeriod = moment(today).diff(startOfPeriod, "days") + 1;

    let periodViews = [];

    for (let i = 0; i < totalDaysInPeriod; i++) {
      const date = moment(startOfPeriod).add(i, "days").format("YYYY-MM-DD");
      const view = views.find((view) => view.date === date);
      if (view) {
        periodViews.push(view);
      } else {
        periodViews.push({ date, views: 0 });
      }
    }

    return periodViews;
  } catch (error) {
    console.error("Error in getLastMonthViews:", error);
    return [];
  }
};

// Get last 30 days likes
export const getLastMonthLikes = async () => {
  const today = new Date();
  const endDate = moment(today).format("YYYY-MM-DD");
  const startDate = moment(today).subtract(30, "days").format("YYYY-MM-DD");

  try {
    const youtubeAnalitycs = await getYouTubeAnalytics();
    const {
      data: { rows },
    } = await youtubeAnalitycs.reports.query({
      ids: "channel==MINE",
      startDate: startDate,
      endDate: endDate,
      metrics: "likes",
      dimensions: "day",
    });

    const likes = (rows ?? []).map(([date, likes]) => ({
      date,
      likes: parseInt(likes, 10),
    }));

    const startOfPeriod = moment(today).subtract(30, "days").startOf("day");
    const totalDaysInPeriod = moment(today).diff(startOfPeriod, "days") + 1;

    let periodLikes = [];

    for (let i = 0; i < totalDaysInPeriod; i++) {
      const date = moment(startOfPeriod).add(i, "days").format("YYYY-MM-DD");
      const like = likes.find((like) => like.date === date);
      if (like) {
        periodLikes.push(like);
      } else {
        periodLikes.push({ date, likes: 0 });
      }
    }

    return periodLikes;
  } catch (error) {
    console.error("Error in getLastMonthLikes:", error);
    return [];
  }
};

// Get last 30 days comments
export const getLastMonthComments = async () => {
  const today = new Date();
  const endDate = moment(today).format("YYYY-MM-DD");
  const startDate = moment(today).subtract(30, "days").format("YYYY-MM-DD");

  try {
    const youtubeAnalitycs = await getYouTubeAnalytics();
    const {
      data: { rows },
    } = await youtubeAnalitycs.reports.query({
      ids: "channel==MINE",
      startDate: startDate,
      endDate: endDate,
      metrics: "comments",
      dimensions: "day",
    });

    const comments = (rows ?? []).map(([date, comments]) => ({
      date,
      comments: parseInt(comments, 10),
    }));

    const startOfPeriod = moment(today).subtract(30, "days").startOf("day");
    const totalDaysInPeriod = moment(today).diff(startOfPeriod, "days") + 1;

    let periodComments = [];

    for (let i = 0; i < totalDaysInPeriod; i++) {
      const date = moment(startOfPeriod).add(i, "days").format("YYYY-MM-DD");
      const comment = comments.find((comment) => comment.date === date);
      if (comment) {
        periodComments.push(comment);
      } else {
        periodComments.push({ date, comments: 0 });
      }
    }

    return periodComments;
  } catch (error) {
    console.error("Error in getLastMonthComments:", error);
    return [];
  }
};

// Get last 30 days subscribers
export const getLastMonthSubscribers = async () => {
  const today = new Date();
  const endDate = moment(today).format("YYYY-MM-DD");
  const startDate = moment(today).subtract(30, "days").format("YYYY-MM-DD");

  try {
    const youtubeAnalitycs = await getYouTubeAnalytics();
    const {
      data: { rows },
    } = await youtubeAnalitycs.reports.query({
      ids: "channel==MINE",
      startDate: startDate,
      endDate: endDate,
      metrics: "subscribersGained",
      dimensions: "day",
    });

    const subscribers = (rows ?? []).map(([date, subscribers]) => ({
      date,
      subscribers: parseInt(subscribers, 10),
    }));

    const startOfPeriod = moment(today).subtract(30, "days").startOf("day");
    const totalDaysInPeriod = moment(today).diff(startOfPeriod, "days") + 1;

    let periodSubscribers = [];

    for (let i = 0; i < totalDaysInPeriod; i++) {
      const date = moment(startOfPeriod).add(i, "days").format("YYYY-MM-DD");
      const subscriber = subscribers.find(
        (subscriber) => subscriber.date === date
      );
      if (subscriber) {
        periodSubscribers.push(subscriber);
      } else {
        periodSubscribers.push({ date, subscribers: 0 });
      }
    }

    return periodSubscribers;
  } catch (error) {
    console.error("Error in getLastMonthSubscribers:", error);
    return [];
  }
};

// All time tools

// Get all time views
export const getAllTimeViews = async () => {
  try {
    const youtubeAnalitycs = await getYouTubeAnalytics();

    const today = new Date();
    const endDate = moment(today).format("YYYY-MM-DD");

    const {
      data: { rows },
    } = await youtubeAnalitycs.reports.query({
      ids: "channel==MINE",
      metrics: "views",
      startDate: "2005-01-01",
      endDate: endDate,
    });

    const views = (rows ?? []).map(([views]) => parseInt(views, 10));

    return views[0] ?? 0;
  } catch (error) {
    console.error("Error in getAllTimeViews:", error);
    return 0;
  }
};

// Get all time likes
export const getAllTimeLikes = async () => {
  try {
    const youtubeAnalitycs = await getYouTubeAnalytics();

    const today = new Date();
    const endDate = moment(today).format("YYYY-MM-DD");

    const {
      data: { rows },
    } = await youtubeAnalitycs.reports.query({
      ids: "channel==MINE",
      metrics: "likes",
      startDate: "2005-01-01",
      endDate: endDate,
    });

    const likes = (rows ?? []).map(([likes]) => parseInt(likes, 10));

    return likes[0] ?? 0;
  } catch (error) {
    console.error("Error in getAllTimeLikes:", error);
    return 0;
  }
};

// Get all time comments
export const getAllTimeComments = async () => {
  try {
    const youtubeAnalitycs = await getYouTubeAnalytics();

    const today = new Date();
    const endDate = moment(today).format("YYYY-MM-DD");

    const {
      data: { rows },
    } = await youtubeAnalitycs.reports.query({
      ids: "channel==MINE",
      metrics: "comments",
      startDate: "2005-01-01",
      endDate: endDate,
    });

    const comments = (rows ?? []).map(([comments]) => parseInt(comments, 10));

    return comments[0] ?? 0;
  } catch (error) {
    console.error("Error in getAllTimeComments:", error);
    return 0;
  }
};

// Get all time subscribers
export const getAllTimeSubscribers = async () => {
  try {
    const youtubeAnalitycs = await getYouTubeAnalytics();

    const today = new Date();
    const endDate = moment(today).format("YYYY-MM-DD");

    const {
      data: { rows },
    } = await youtubeAnalitycs.reports.query({
      ids: "channel==MINE",
      metrics: "subscribersGained",
      startDate: "2005-01-01",
      endDate: endDate,
    });

    const subscribers = (rows ?? []).map(([subscribers]) =>
      parseInt(subscribers, 10)
    );

    return subscribers[0] ?? 0;
  } catch (error) {
    console.error("Error in getAllTimeSubscribers:", error);
    return 0;
  }
};
