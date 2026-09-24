const jstDateFormatter = new Intl.DateTimeFormat('en-US', {
  timeZone: 'Asia/Tokyo',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
})

/** 日本時間の暦の日付を YYYY-MM-DD で返す */
export const toJstDateString = (date: Date) => {
  const parts = jstDateFormatter.formatToParts(date)
  const part = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value

  return `${part('year')}-${part('month')}-${part('day')}`
}
