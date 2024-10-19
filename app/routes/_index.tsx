import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node"
import { Form, json, redirect, useLoaderData } from "@remix-run/react"
import strava from "strava-v3"
import { destroySession, getSession } from "~/utils/session.server"

export const meta: MetaFunction = () => {
  return [
    { title: "Strava route to GPX" },
    {
      name: "description",
      content:
        "Saw an interesting route and want to export it to a gpx file? Look no further.",
    },
  ]
}

export async function action({ request }: ActionFunctionArgs) {
  const body = await request.formData()
  const stravaUrl = body.get("stravaUrl")
  console.log(stravaUrl)

  return null
}

export async function loader({ request }: LoaderFunctionArgs) {
  const cookie = request.headers.get("Cookie")
  const session = await getSession(cookie)

  if (!session.has("strava_data")) {
    return redirect("/login")
  }

  const stravaData = session.get("strava_data")

  if (!stravaData) {
    return redirect("/login", {
      headers: {
        "Set-Cookie": await destroySession(session),
      },
    })
  }

  const routes = await strava.athlete.listRoutes({
    id: stravaData.athlete.id,
    access_token: stravaData.access_token,
  })

  return json({
    routes,
  })
}

export default function Index() {
  const { routes } = useLoaderData<typeof loader>()
  return (
    <div className="grid h-screen w-screen place-items-center">
      {routes.length ? (
        routes.map((route: any) => (
          <div key={route.id}>
            <p>{route.name}</p>
          </div>
        ))
      ) : (
        <p
          className="text-center text-xl text-gray-500"
          aria-label="No routes found"
        >
          No routes found
        </p>
      )}
    </div>
  )
}
