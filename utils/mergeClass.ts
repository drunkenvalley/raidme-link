export default function mergeClass(classNames: string[]): string {
    return classNames.reduce((prev, current) => prev.concat((current || '').split(' ')), []).filter(Boolean).join(' ')
}