export interface NavbarData {
    id: number;
    title: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    topnav: {
        id: number;
        logoLink: {
            id: number;
            text: string;
            href: string;
            image: {
                id: number;
                url: string;
                alternativeText: string | null;
                name: string;
            };
        };
        link: {
            id: number;
            href: string;
            text: string;
            external: boolean;
        }[];
        cta: {
            id: number;
            href: string;
            text: string;
            external: boolean;
        };
    };
    meta: Record<string, any>;
}