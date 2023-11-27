import {create} from 'zustand'
import {UserStoreType} from "@/utils/types/UserStoreType";

export const useUserStore = create<UserStoreType>((set) => ({
    verificationToken: '',
    setVerificationToken: (verificationToken) => set((state) => ({...state, verificationToken})),

    accessKey: '',
    setAccessKey: (accessKey) => set((state) => ({...state, accessKey})),
}))

