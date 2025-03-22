export type Alarm = {
  title: string;
  contents: string;
  createdAt: string;
};

export type ResponseAlarm = {
  contents: Array<Alarm>;
};
