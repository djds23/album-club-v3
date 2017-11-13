
export enum ErrorLevel {
  notice = 'notice',
  warn = 'warn'
}

export interface LabelConfiguration {
  message: string;
  level: ErrorLevel;
}