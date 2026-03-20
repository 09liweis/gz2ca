export const formatDate = (date: string) => {
  return new Date(date).toLocaleString('zh-CN', {
    timeZone: 'UTC',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}