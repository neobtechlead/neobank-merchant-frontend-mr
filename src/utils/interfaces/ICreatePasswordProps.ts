export interface ICreatePasswordProps {
    handleSubmit: (password: string, confirmPassword: string) => void;
    handleError: (error: string) => void;
    buttonText?: string;
}