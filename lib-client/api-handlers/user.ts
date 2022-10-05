import { UserModel } from "../../types"
import { Routes } from "../constants"
import { excludeAndReturnReFetchCb, useFetch } from "../fetcher"

const useCreateUser = () => {
    const res = useFetch<UserModel>(Routes.API.USERS, {
        method: "PUT"
    })

    const createUser = excludeAndReturnReFetchCb(res)
    return { ...res, createUser }
}

export {
    useCreateUser
}