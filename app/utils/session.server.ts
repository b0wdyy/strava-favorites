import { createCookieSessionStorage } from "@remix-run/node"
import { SessionData, SessionFlashData } from "~/types/session.type"

export const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData, SessionFlashData>({
    cookie: {
      name: "__session",
      httpOnly: process.env.NODE_ENV === "production",
      maxAge: 60,
      path: "/",
      sameSite: "lax",
      secrets: [process.env.SESSION_SECRET],
      secure: true,
    },
  })
