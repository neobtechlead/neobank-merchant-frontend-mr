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

                headerDescription: '',
                setHeaderDescription: (headerDescription) => set((state) => ({...state, headerDescription})),

                showHeader: true,
                setShowHeader: (showHeader) => set((state) => ({...state, showHeader})),
            }),
            {name: 'dashboardLayout', skipHydration: true},
        ),
    ),
)

export {useDashboardStore};
