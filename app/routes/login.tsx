import { Form, redirect } from "@remix-run/react"
import { StravaButton } from "~/components/buttons/strava-button"

export async function action() {
  return redirect(
    `https://www.strava.com/oauth/authorize?client_id=${process.env.STRAVA_CLIENT_ID}&response_type=code&redirect_uri=${process.env.STRAVA_REDIRECT_URI}&scope=read_all,activity:read_all`,
  )
}

export default function Login() {
  return (
    <Form method="POST" className="grid h-screen w-screen place-items-center">
      <StravaButton type="submit" />
    </Form>
  )
}
