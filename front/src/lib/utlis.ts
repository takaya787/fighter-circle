export const sleep = (time: number) => new Promise<void>((r) => setTimeout(r, time));

export const fetchCloudFrontUrl = (path: string) => {
    return `${process.env.CLOUD_FRONT_URL}/${path}`;
};
