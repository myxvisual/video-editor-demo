export function seconds2mmss(seconds: number) {
    const mm = Math.floor(seconds / 60);
    const ss = Math.floor(seconds % 60);
    return `${mm < 10 ? "0" + mm : mm}:${ss < 10 ? "0" + ss : ss}`
}
