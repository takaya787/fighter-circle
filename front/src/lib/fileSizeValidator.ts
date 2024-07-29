export class FileSizeValidator {
    private maxSize: number;

    constructor(maxSize: number) {
        this.maxSize = maxSize;
    }

    public isTooLarge(file: File): boolean {
        return file.size >= this.maxSize;
    }
}
