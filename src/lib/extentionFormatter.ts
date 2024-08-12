export const convertKeyExtention = (key: string, format?: 'mp4' | 'mov' | 'mpeg'): string => {
    const targetFormat = format ? `.${format}` : '.mp4';

    return key.replace(/\.[^/.]+$/, targetFormat);
};

export const removeKeyExtention = (key: string): string => {
    return key.replace(/\.[^/.]+$/, '');
};
