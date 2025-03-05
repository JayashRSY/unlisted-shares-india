export interface ServerToClientEvents {
    message: (msg: string) => void;
}

export interface ClientToServerEvents {
    message: (msg: string) => void;
}
