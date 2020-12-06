let wsURL = 'wss://backend.ringodev.com:3001'

if (process.env.NODE_ENV === 'development') wsURL = "ws://localhost:3001"

export const WS_URL = wsURL

