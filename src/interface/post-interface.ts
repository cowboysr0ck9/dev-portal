// Create Posts Schema

export interface IPost {
    user: string;

    text: string;
    name: string;
    avatar: string;
    likes: [
        {
            _id?: string;
            user: string;
        }
    ];
    comments: [
        {
            _id?: string;
            user: string;
            text: string;
            name: string;
            avatar: string;
            date: Date;
        }
    ];
    date: Date;
}
