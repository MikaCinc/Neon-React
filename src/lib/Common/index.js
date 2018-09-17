export function rnd_num(min, max) {
    if (!(max > min)) return null;
    return Math.floor(Math.random() * (max - min) + min + 1)
}

export default {
    rnd_num
}