import create from 'zustand';

interface AuthStore {
    formData: { email: string; password: string };
    hasError: boolean | null;
    error: string | null;
    firstTimeLogin: boolean | null;
    setFormData: (data: { email: string; password: string }) => void;
    setHasError: (hasError: boolean) => void;
    setError: (error: string) => void;
    setFirstTimeLogin: (firstTimeLogin: boolean) => void;
}

const useAuthStore = create<AuthStore>((set) => ({
    formData: {email: '', password: ''},
    hasError: false,
    error: null,
    firstTimeLogin: null,
    setFormData: (data) => set((state) => ({formData: data})),
    setHasError: (hasError) => set((state) => ({hasError})),
    setError: (error) => set((state) => ({error})),
    setFirstTimeLogin: (firstTimeLogin) => set((state) => ({firstTimeLogin})),
}));

export default useAuthStore;
