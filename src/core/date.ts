/**
 * 日本時間の暦の日付を YYYY-MM-DD で返す。
 * 日本時間には夏時間がないので、9 時間進めた UTC の日付と同じになる。ロケールの書式には頼らない
 */
export const toJstDateString = (date: Date) =>
  new Date(date.getTime() + 9 * 60 * 60 * 1000).toISOString().slice(0, 10)
