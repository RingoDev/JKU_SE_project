let wsURL = 'ws://backend.ringodev.com:3000'

if (process.env.NODE_ENV === 'development') wsURL = "ws://localhost:3001"

export const WS_URL = wsURL

