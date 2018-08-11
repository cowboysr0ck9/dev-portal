// TypeScript Interface for Profile Model

export interface IProfile {
    user: string;
    handle: string;
    company: string;
    website: string;
    location: string;
    status: string;
    skills: string;
    bio: string;
    github: string;
    experience: [
        {
            id: any;
            title: string;
            company: string;
            location: string;
            from: Date;
            to: Date;
            current: boolean;
            description: string;
        }
    ];
    education: [
        {
            id: any;
            school: string;
            degree: string;
            studied: string;
            from: Date;
            to: Date;
            current: boolean;
            description: string;
        }
    ];
    social: {
        youtube: string;
        twitter: string;
        facebook: string;
        instagram: string;
        linkedin: string;
        dribbble: string;
        behance: string;
    };
    date: Date;
}
