// types/index.ts
export interface User {
    id: string;
    name: string;
    email: string;
}

export interface UseCase {
    title: string;
    description: string;
}

export interface BlogPost {
    title: string;
    date: string;
    icon: string;
    gradient: string;
}

export interface Testimonial {
    company: string;
    testimonial: string;
}

export interface AuthValues {
    email: string;
    password: string;
}