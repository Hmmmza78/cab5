import { Application } from "express"

import auth from "./auth"

export default function Router(app, route = "/rider") {
    app.use(route + "/auth", auth)
}
