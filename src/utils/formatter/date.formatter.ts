import { format } from "date-fns"
import { constantFormatDate } from "../constants/constants"

export const dateFormatter = (date: Date, formatForm: string = constantFormatDate): string => {
  return format(date, formatForm) as string;
}