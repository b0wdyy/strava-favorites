import { LoaderFunctionArgs, redirect } from "@remix-run/node"
import strava from "strava-v3"
import { commitSession, getSession } from "~/utils/session.server"

export async function loader({ request }: LoaderFunctionArgs) {
  const cookie = request.headers.get("Cookie")
  const url = new URL(request.url)
  const code = url.searchParams.get("code")
  if (!code) {
    return redirect("/login")
  }
  const session = await getSession(cookie)
  const token = await strava.oauth.getToken(code)
  session.set("strava_data", token)
  return redirect("/", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  })
}

export default function Callback() {}
