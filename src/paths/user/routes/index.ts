import { Application } from "express"
import user from "./user"

export default function Router(app, route = "/user") {
    app.use(route + "/user", user)
}
