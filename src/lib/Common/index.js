export function rnd_num(min, max) {
    min = parseInt(min, 10);
    max = parseInt(max, 10);
    if (!(max > min)) return;
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

export default {
    rnd_num
}