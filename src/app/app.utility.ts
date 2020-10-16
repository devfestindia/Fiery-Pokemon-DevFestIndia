export function hs(str: string) {
  const _arr: Array<string> = str.split('-');
  return _arr
    .map((a: string) => `${a.charAt(0).toUpperCase()}${a.slice(1, a.length)}`)
    .join(' ');
}
