import axios from 'axios';

export class APIClient {
    private token: string;

    constructor(token: string) {
        this.token = token;
    }

    public async get<T>(path: string): Promise<T> {
        const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}${path}`;
        if (!this.token) {
            throw new Error('Token is not set');
        }

        try {
            const res = await axios.get(url, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${this.token}`,
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'https://master.dh57he0tjj5rg.amplifyapp.com',
                },
            });

            return res.data as T;
        } catch (err) {
            throw new Error('Token is not set');
        }
    }

    public async post<T>(path: string, body: any): Promise<T> {
        const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}${path}`;
        if (!this.token) {
            throw new Error('Token is not set');
        }

        try {
            const res = await axios.post(url, body, {
                headers: {
                    ContentType: 'application/json',
                    Authorization: `Bearer ${this.token}`,
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'https://master.dh57he0tjj5rg.amplifyapp.com',
                    // withCredentials: true,
                },
            });

            return res.data as T;
        } catch (err) {
            throw new Error('Token is not set');
        }
    }

    // web client用にproxyを用いてcorsの制限が掛からないようにさせる
    public async postWithCors<T>(path: string, body: any): Promise<T> {
        const url = `/api${path}`;
        if (!this.token) {
            throw new Error('Token is not set');
        }

        try {
            const res = await axios.post(url, body, {
                headers: {
                    ContentType: 'application/json',
                    Authorization: `Bearer ${this.token}`,
                    'Content-Type': 'application/json',
                },
            });

            return res.data as T;
        } catch (err) {
            console.error(err);
            throw new Error('API Error happend');
        }
    }

    public async put<T>(path: string, body: any): Promise<T> {
        const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}${path}`;
        if (!this.token) {
            throw new Error('Token is not set');
        }

        try {
            const res = await axios.put(url, body, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${this.token}`,
                    'Content-Type': 'application/json',
                },
            });

            return res.data as T;
        } catch (err) {
            throw new Error('Token is not set');
        }
    }
}
