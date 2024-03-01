export interface ICreatePasswordProps {
    handleSubmit: (password: string) => void;
    handleError: (error: string) => void;
    buttonText?: string;
    loading?: boolean;
}