import { Router } from "express";

const AppRouter = Router();

interface IRouter {
    path: string;
    router: Router;
}

const routers: IRouter[] = []

routers.forEach((route) => {
    AppRouter.use(route.path, route.router)
})

export default AppRouter;