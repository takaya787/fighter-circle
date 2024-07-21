import axios from 'axios';
export const getFetcher = async (path: string, token: string) => {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}${path}`;
    if (!token) {
        console.warn('Token is empty!');

        return;
    }

    try {
        const res = await axios.get(url, {
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        return res.data;
    } catch (err) {
        console.error(err);
    }
};
