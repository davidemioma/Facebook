export interface User {
  id: string;
  displayName: string;
  firstname: string;
  mail: string;
  photoUrl: string | null;
  coverUrl: string;
  surname: string;
  isActive: boolean;
  hasNotification: boolean;
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

export interface PostProps {
  id: string;
  userId: string;
  caption: string;
  timestamp: {
    seconds: number;
    nanoseconds: number;
  };
}

export interface PostFiles {
  id: string;
  name: string;
  type: string;
  postContentUrl: string;
}

export interface Likeprops {
  id: string;
  firstname: string;
  surname: string;
  photoUrl: string;
}

export interface CommentProps {
  id: string;
  userId: string;
  comment: string;
  timestamp: {
    seconds: number;
    nanoseconds: number;
  };
}

export interface RequestProps {
  id: string;
  requestId: string;
  mail: string;
  timstamp: {
    seconds: number;
    nanoseconds: number;
  };
}

export interface FriendProps {
  id: string;
  userId: string;
  mail: string;
}

export interface NotificationProps {
  id: string;
  requestId: string;
  task: string;
  seen: boolean;
  timstamp: {
    seconds: number;
    nanoseconds: number;
  };
}

export interface ConversationProps {
  id: string;
  usersMatched: string[];
  timestamp: {
    seconds: number;
    nanoseconds: number;
  };
}

export interface MessageProps {
  id: string;
  senderId: string;
  message: string;
  hasSeen: string[];
  timestamp: {
    seconds: number;
    nanoseconds: number;
  };
}
