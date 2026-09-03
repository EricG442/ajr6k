const READER_ID_KEY = "astro6k_reader_id";

export function getReaderId(): string {
    let readerId = localStorage.getItem(READER_ID_KEY);

    if(!readerId) {
        readerId = crypto.randomUUID();
        localStorage.setItem(READER_ID_KEY, readerId);
    }

    return readerId;
}