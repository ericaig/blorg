import { Routes as ApiRoutes } from "../lib-server/constants"
export const Routes = {
    SITE: {
        HOME: '/',
        REGISTER: '/signup/',
        LOGIN: '/login/',
        _500: '/500/',
    },
    API: { ...ApiRoutes.API },
    STATIC: {
        AVATARS: '/uploads/avatars/',
        HEADERS: '/uploads/headers/',
    },
} as const;