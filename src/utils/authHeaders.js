export const createAuthHeader = (accessToken) => ({
  Authorization: `Bearer ${accessToken}`,
})