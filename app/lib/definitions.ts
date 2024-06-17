// Este archivo contiene las definiciones de los tipos de datos del sistema
export type Achievement = {
  id: string;
  name: string;
  description?: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  image_url?: string;
  admin?: string;
};

export type UserAchievements = {
  user_id: string;
  achievement_id: string;
};

export type Chords = {
  id: string;
  tone: string;
  semitone: string;
  image_url: string;
}

export type ChordsForm = {
  tone: string;
  semitone: string;
}

export type Lessons = {
  id: string;
  name: string;
}

export type Tabs = {
  id: string;
  name: string;
  artist: string;
  user_id: string;
  capo: number | null;
  date: string;
  published: boolean;
  content: string;
}

export type TabsTable = {
  id: string;
  name: string;
  artist: string;
  date: string;
  favorites_count: number;
};

export type MyTabsTable = {
  id: string;
  name: string;
  artist: string;
  user_id: string;
  date: string;
  favorites_count: number;
  published: boolean;
  finished: boolean;
};