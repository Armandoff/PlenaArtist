export enum AuthProvider {
    Email,
    Facebook,
    Google
}

export interface User {
    name?: string;
    email: string;
    password: string;
}

export interface AuthOptions {
    isSignIn: boolean;
    provider: AuthProvider;
    user: User;
}
