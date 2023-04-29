import { Application } from "express"
import user from "./user"
import auth from "./auth"

export default function Router(app, route = "/user") {
    app.use(route + "/user", user)
    app.use(route + "/auth", auth)
}
