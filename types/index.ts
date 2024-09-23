export type SizeVariants = "2xl" | "xl" | "lg" | "base" | "sm" | "xs";
export type fontWeightVariants = "bold" | "semibold" | "medium" | "normal";
export type ButtonVariant = 'secondary' | 'primary';


export interface User {
  id: string;
  firstName: string;
  lastName: string;
  time: string;
  activity: string;
}