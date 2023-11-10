import {create} from 'zustand'
import {DashboardStoreType} from '@/utils/types/DashboardStoreType'

export const useDashboardStore = create<DashboardStoreType>((set) => ({
    showLogo: true,
    setShowLogo: (showLogo) => set((state) => ({...state, showLogo})),

    showBackButton: false,
    setShowBackButton: (showBackButton) => set((state) => ({...state, showBackButton})),

    showNavigation: true,
    setShowNavigation: (showNavigation) => set((state) => ({...state, showNavigation})),

    showProfileDropdown: true,
    setShowProfileDropdown: (showProfileDropdown) => set((state) => ({...state, showProfileDropdown})),

    headerTitle: '',
    setHeaderTitle: (headerTitle) => set((state) => ({...state, headerTitle})),

    headerDescription: '',
    setHeaderDescription: (headerDescription) => set((state) => ({...state, headerDescription})),

    showHeader: true,
    setShowHeader: (showHeader) => set((state) => ({...state, showHeader})),
}))

