declare global {
  namespace NodeJS {
    interface ProcessEnv {
      STRAVA_ACCESS_TOKEN: string
      STRAVA_CLIENT_ID: string
      STRAVA_CLIENT_SECRET: string
      STRAVA_REDIRECT_URI: string
      SESSION_SECRET: string
    }
  }
}

export {}
