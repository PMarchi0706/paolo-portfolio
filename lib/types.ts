export type NowPlayingResponse =
  | {
      isPlaying: true;
      track: string;
      artist: string;
      albumArt: string | null;
      url: string | null;
    }
  | {
      isPlaying: false;
      lastPlayed: {
        track: string;
        artist: string;
        albumArt: string | null;
        url: string | null;
      } | null;
    };

export type Project = {
  id: string;
  title: string;
  description: string;
  tech: string[];
  link?: string;
  linkLabel?: string;
};

export type SkillCategory = {
  category: string;
  skills: string[];
};

export type MusicPick = {
  id: string;
  title: string;
  artist: string;
  album?: string;
  year?: number;
  spotifyUrl?: string;
  coverArtUrl?: string;
  personalNote?: string;
  tags?: string[];
};

export type MusicBlurb = {
  id: string;
  blurb: string;
};
