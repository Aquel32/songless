export const ARTIST = [
    // "Ken Carson",
    // "Destroy Lonely",
    // "Playboi Carti",
    // "Lil Uzi Vert",
    // "Trippie Redd",
    "Bedoes 2115"
]

// export const timeStops = [0.5, 1, 3, 5, 10, 15];
export const timeStops = [1,2,3,4,5];
export const timeStopsDurations = timeStops.map((stop, index) => {
    const prev = timeStops[index - 1] || 0;
    return stop + prev;
});