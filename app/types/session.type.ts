import { StravaData } from "~/types/strava.type"

export type SessionData = {
  strava_data: StravaData
}

export type SessionFlashData = {
  error: string
}
