export function rnd_num(min, max) {
    min = parseInt(min, 10);
    max = parseInt(max, 10);
    if (!(max > min)) return;
    return Math.floor(Math.random() * (max - min + 1) ) + min;
};

export function rnd_color() {
    return "rgb(" + rnd_num(0, 255) + ", " + rnd_num(0, 255) + ", " + rnd_num(0, 255) + ")";
};

export default {
    rnd_num,
    rnd_color
};