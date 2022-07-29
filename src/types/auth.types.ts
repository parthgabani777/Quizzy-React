export type LoginCredentialsType = {
    email: string;
    password: string;
};

export type SignupCredentialsType = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword?: string;
};
