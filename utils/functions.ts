import { db, storage } from "@/libs/firebase";
import { DummyPost, Fileprops } from "@/types";
import { auth } from "@/libs/firebase";
import { signOut } from "@firebase/auth";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

export const generateId = (id1: any, id2: any) => {
  return id1 > id2 ? id1 + id2 : id2 + id1;
};

export const numberFormatter = (num: number) => {
  let newNumber = "";

  if (num >= 1000000000) {
    newNumber = (num / 1000000000).toFixed(1) + "B";
  } else if (num >= 1000000) {
    newNumber = (num / 1000000).toFixed(1) + "M";
  } else if (num >= 1000) {
    newNumber = (num / 1000).toFixed(1) + "K";
  } else {
    newNumber = `${num}`;
  }

  return newNumber;
};

const readFileContents = async (file: any) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result);
    };

    reader.onerror = reject;

    reader.readAsDataURL(file);
  });
};

export const readAllFiles = async (files: any) => {
  const results = await Promise.all(
    files.map(async (file: any) => {
      const fileContents = await readFileContents(file);

      return {
        name: file.name,
        type: file.type,
        dataUrl: fileContents,
      };
    })
  );

  return results;
};

export const uploadPost = async (
  post: DummyPost,
  selectedFiles: Fileprops[]
) => {
  await addDoc(collection(db, "posts"), {
    ...post,
    timestamp: serverTimestamp(),
  }).then((docRef) => {
    if (selectedFiles.length > 0) {
      selectedFiles.map(async (file) => {
        const postRef = ref(storage, `posts/${docRef?.id}/files/${file.name}`);

        await uploadString(postRef, file.dataUrl, "data_url").then(
          async (snapshot) => {
            const downloadUrl = await getDownloadURL(postRef);

            await addDoc(collection(db, "posts", docRef?.id, "files"), {
              postContentUrl: downloadUrl,
              name: file.name,
              type: file.type,
            });
          }
        );
      });
    }
  });
};

export const uploadImage = (e: React.FormEvent, setSelectedFile: any) => {
  const reader = new FileReader();

  const file = (e.target as HTMLFormElement).files?.[0];

  reader.readAsDataURL(file);

  reader.onload = (readerEvent) => {
    setSelectedFile(readerEvent.target?.result);
  };
};

export const updateCoverUrl = async (userId: string, selectedFile: string) => {
  const imageRef = ref(storage, `posts/${userId}/cover`);

  await uploadString(imageRef, selectedFile, "data_url").then(
    async (snapshot) => {
      const downloadUrl = await getDownloadURL(imageRef);

      await updateDoc(doc(db, "users", userId), {
        coverUrl: downloadUrl,
      });
    }
  );
};

export const updatePhotoUrl = async (userId: string, selectedFile: string) => {
  const imageRef = ref(storage, `posts/${userId}/profile`);

  await uploadString(imageRef, selectedFile, "data_url").then(
    async (snapshot) => {
      const downloadUrl = await getDownloadURL(imageRef);

      await updateDoc(doc(db, "users", userId), {
        photoUrl: downloadUrl,
      });
    }
  );
};

export const signout = async (userId: string) => {
  await updateDoc(doc(db, "users", userId), {
    isActive: false,
  });

  signOut(auth);
};
