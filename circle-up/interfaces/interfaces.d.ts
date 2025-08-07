interface Event {
    id: string;
    title: string;
    date: string;
    host: string;
    location: string;
    poster_path?: string; //if null, ai generated image
}

export default Event