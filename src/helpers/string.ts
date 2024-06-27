export { };

declare global {
    interface String {
        trimChar(char?: string): string;
    }
}

String.prototype.trimChar = function (this: string, char: string = ' '): string {
    const regex = new RegExp(`^[${char}]+|[${char}]+$`, 'g');
    return this.replace(regex, '');
};
