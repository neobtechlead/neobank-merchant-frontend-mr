export type UserStoreType = {
    setVerificationToken: (token: string | null) => void,
    verificationToken: string | null,
    setAccessKey: (token: string | null) => void,
    accessKey: string | null,
}