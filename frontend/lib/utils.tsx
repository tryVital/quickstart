import { Workout } from "../models";
import _ from "lodash";
import moment from "moment";

export const roundNum = (num:any) => Math.round((num + Number.EPSILON) * 100) / 100;

export const getDiffInMinutes = (workouts: Workout[]) => {
  return Math.round(
    _.sumBy(workouts, (x) => {
      const diff = moment(x.time_end).diff(moment(x.time_start));
      return moment.duration(diff).asMinutes();
    })
  );
};

export const getDiffInMins = (start:any, end:any) => {
  const diff = moment(end).diff(moment(start));
  return Math.round(moment.duration(diff).asMinutes());
};

export const parseHrZoneData = (workouts: Workout[]) => [
  {
    name: "Zone 1",
    value: Math.round(_.sumBy(workouts, (x) => x.hr_zones[0]) / 60),
  },
  {
    name: "Zone 2",
    value: Math.round(_.sumBy(workouts, (x) => x.hr_zones[1]) / 60),
  },
  {
    name: "Zone 3",
    value: Math.round(_.sumBy(workouts, (x) => x.hr_zones[2]) / 60),
  },
  {
    name: "Zone 4",
    value: Math.round(_.sumBy(workouts, (x) => x.hr_zones[3]) / 60),
  },
  {
    name: "Zone 5",
    value: Math.round(_.sumBy(workouts, (x) => x.hr_zones[4]) / 60),
  },
];

export const parseSecs = (num:any) => {
  if (!num) return { hours: 0, mins: 0 };
  const time = num / 3600;
  const mins = time - Math.floor(time);
  return {
    hours: Math.floor(time),
    minutes: Math.round(mins * 60),
  };
};

export const parseMins = (num:any) => {
  if (!num) return { hours: 0, mins: 0 };
  const time = num / 60;
  const mins = time - Math.floor(time);
  return {
    hours: Math.floor(time) ? Math.floor(time) : 0,
    minutes: Math.round(mins * 60) ? Math.round(mins * 60) : 0,
  };
};
