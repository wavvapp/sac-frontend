import dayjs from "dayjs"

export const DateFormatter = (date: Date) => {
  return dayjs(date).format("h:mm")
}
