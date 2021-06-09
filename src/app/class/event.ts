import { CalendarEvent,EventAction, EventColor } from "calendar-utils";

export class Event implements CalendarEvent{

  id?: string | number;
  start: Date;
  end?: Date;
  title: string;

}
