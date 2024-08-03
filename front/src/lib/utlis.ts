export const sleep = (time: number) => new Promise<void>((r) => setTimeout(r, time));
