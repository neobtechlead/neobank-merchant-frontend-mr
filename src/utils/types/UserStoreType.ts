import {UserType} from "@/utils/types/UserType";

export type UserStoreType = {
    user: UserType,
    setUser: (user?: UserType) => void,
}