export interface User {
  id: string;
  displayName: string;
  firstname: string;
  mail: string;
  photoUrl: string | null;
  coverUrl: string;
  surname: string;
}

export interface Fileprops {
  name: string;
  type: string;
  dataUrl: string;
}

export interface DummyPost {
  userId: string;
  caption: string;
}
