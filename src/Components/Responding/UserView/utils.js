export function generateAnonymousUserId() {
  return (
    'anonymous' +
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  )
}
