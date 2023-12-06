import {create} from 'zustand';
import {devtools, persist} from 'zustand/middleware';
import {DashboardStoreType} from '@/utils/types/DashboardStoreType';

const useDashboardStore = create<DashboardStoreType>()(
    devtools(
        persist(
            (set) => ({
                showLogo: true,
                setShowLogo: (showLogo) => set((state) => ({showLogo})),

                showBackButton: false,
                setShowBackButton: (showBackButton) => set((state) => ({...state, showBackButton})),

                showNavigation: true,
                setShowNavigation: (showNavigation) => set((state) => ({...state, showNavigation})),

                showProfileDropdown: true,
                setShowProfileDropdown: (showProfileDropdown) => set((state) => ({...state, showProfileDropdown})),

                headerTitle: '',
                setHeaderTitle: (headerTitle) => set((state) => ({...state, headerTitle})),

                navTitle: '',
                setNavTitle: (navTitle) => set((state) => ({...state, navTitle})),

                headerDescription: '',
                setHeaderDescription: (headerDescription) => set((state) => ({...state, headerDescription})),

                showHeader: true,
                setShowHeader: (showHeader) => set((state) => ({...state, showHeader})),

                showBody: true,
                setShowBody: (showBody) => set((state) => ({...state, showBody})),

                showSupportButton: false,
                setShowSupportButton: (showSupportButton) => set((state) => ({...state, showSupportButton})),

                showSupportContent: false,
                setShowSupportContent: (showSupportContent) => set((state) => ({...state, showSupportContent})),

                showProfile: false,
                setShowProfile: (showProfile) => set((state) => ({...state, showProfile})),

                showSettings: false,
                setShowSettings: (showSettings) => set((state) => ({...state, showSettings})),
            }),
            {name: 'dashboardLayout'},
        ),
    ),
)

export {useDashboardStore};
