export type DashboardStoreType = {
    showLogo: boolean,
    setShowLogo: (b: boolean) => void,

    showBackButton: boolean,
    setShowBackButton: (b: boolean) => void,

    showNavigation: boolean,
    setShowNavigation: (b: boolean) => void,

    showProfileDropdown: boolean,
    setShowProfileDropdown: (b: boolean) => void,

    headerTitle: string,
    setHeaderTitle: (title: string) => void,

    headerDescription: string,
    setHeaderDescription: (description: string) => void,

    showHeader: boolean
    setShowHeader: (b: boolean) => void
}