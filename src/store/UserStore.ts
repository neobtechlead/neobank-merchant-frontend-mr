import {create} from 'zustand'
import {UserType} from "@/utils/types/UserType";
import {UserStoreType} from "@/utils/types/UserStoreType";

export const useUserStore = create<UserStoreType>((set) => ({
    user: {
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        verificationToken: '',
        accessKey: '',
        authToken: '',
    },
    setUser: (user?: UserType) => set((state) => ({user: {...state.user, ...user}})),
}))

