import { Client, Databases, Storage } from "appwrite";

export const appwriteConfig = {
  url: "https://cloud.appwrite.io/v1",
  projectId: "657430f30a00d5116879",
  databaseId: "657fedb40e2b33416747",
  storageId: "657fed675455226d5d04",
  channelCollectionId: process.env.NEXT_APPWRITE_CHANNELS_COLLECTION_ID!,
  videoCollectionId: "657fee1500072255d76e",
  commentsCollectionId: process.env.NEXT_APPWRITE_COMMENTS_COLLECTION_ID!,
  likesCollectionId: process.env.NEXT_APPWRITE_LIKES_COLLECTION_ID!,
  subscribersCollectionId: process.env.NEXT_APPWRITE_SUBSCRBERS_COLLECTION_ID!,
};

export const client = new Client();

client.setEndpoint(appwriteConfig.url);
client.setProject(appwriteConfig.projectId);

export const databases = new Databases(client);
export const storage = new Storage(client);
