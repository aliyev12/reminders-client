import type { ReactNode } from "react";

export interface IMode {
  id: number;
  mode: string;
  address: string;
}

export type TModeField = keyof IMode;

export interface IReminderMode {
  mode: string;
  address: string;
}

export interface ICreateReminder {
  title: string;
  date: string;
  reminders: number[];
  alerts: number[];
  is_recurring: boolean;
  description: string;
}

export interface IAugmentedReminder {
  title: string;
  date: string;
  reminders: { mode: string; address: string }[];
  alerts: number[];
  is_recurring: boolean;
  description: string;
}

export type TCreateReminderField = keyof ICreateReminder;

export interface IDialog {
  isOpen: boolean;
  onClose: (e: React.MouseEvent<HTMLDialogElement>) => void;
  children: ReactNode;
}

export interface IAlert {
  id: number;
  name: string;
  ms: number;
}

export type TAlertField = keyof IAlert;
