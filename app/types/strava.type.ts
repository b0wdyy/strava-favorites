import { Athlete } from "~/types/athlete.type"

export type StravaData = {
  token_type: string
  expires_at: number
  expires_in: number
  refresh_token: string
  access_token: string
  athlete: Athlete
}
