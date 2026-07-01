import type { MusicPick } from "@/lib/types";

// TODO: replace with Paolo's real picks. `personalNote` is the highest-leverage
// field for making the generated blurb sound authentic — fill it in where you can.
export const musicPicks: MusicPick[] = [
  {
    id: "pick-1",
    title: "Song Title One",
    artist: "Artist One",
    album: "Album One",
    year: 2020,
    tags: ["placeholder"],
    personalNote: "TODO: why does this one matter to you?",
  },
  {
    id: "pick-2",
    title: "Song Title Two",
    artist: "Artist Two",
    album: "Album Two",
    year: 2021,
    tags: ["placeholder"],
    personalNote: "TODO: why does this one matter to you?",
  },
  {
    id: "pick-3",
    title: "Song Title Three",
    artist: "Artist Three",
    album: "Album Three",
    year: 2022,
    tags: ["placeholder"],
    personalNote: "TODO: why does this one matter to you?",
  },
];
