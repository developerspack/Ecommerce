import { ID } from "appwrite";

import { appwriteConfig, databases, storage } from "./config";

// ============================== UPLOAD FILE
export async function UploadFile(file: File) {
  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      file
    );

    return uploadedFile;
  } catch (error) {
    console.log(error);
  }
}

// ============================== GET FILE URL
export function GetFile(FileId: string) {
  try {
    const fileUrl = storage.getFileDownload(appwriteConfig.storageId, FileId);

    if (!fileUrl) throw Error;

    console.log(fileUrl);
    return fileUrl;
  } catch (error) {
    console.log(error);
  }
}

// ============================== DELETE FILE
export async function DeleteFile(FileId: string) {
  try {
    await storage.deleteFile(appwriteConfig.storageId, FileId);

    return { status: "ok" };
  } catch (error) {
    console.log(error);
  }
}

export async function UploadDoc(collection: string, values: object) {
  try {
    await databases.createDocument(
      appwriteConfig.databaseId,
      collection,
      ID.unique(),
      values
    );
    return { status: "ok" };
  } catch (error) {
    console.log(error);
  }
}
