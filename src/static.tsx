export const ARTIST = [
    "Ken Carson",
    // "Destroy Lonely",
    // "Playboi Carti",
    // "Lil Uzi Vert",
    // "Trippie Redd",
]

export const timeStops = [0.5, 1, 3, 5, 10, 15];
export const timeStopsDurations = timeStops.map((stop, index) => {
    const prev = timeStops[index - 1] || 0;
    return stop + prev;
});