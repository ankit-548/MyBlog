// const conf = {
//     appwriteProjectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
//     appwriteEndpointId: import.meta.env.VITE_APPWRITE_ENDPOINT,
//     appwriteDbId: import.meta.env.VITE_DATABASE_ID,
//     appwriteCollectionId: import.meta.env.VITE_COLLECTION_ID,
//     appwriteBucketId: import.meta.env.VITE_BUCKET_ID
// }

// export default conf;
const conf = {
    appwriteEndpointId: String(import.meta.env.VITE_APPWRITE_ENDPOINT),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDbId: String(import.meta.env.VITE_DATABASE_ID),
    appwriteCollectionId: String(import.meta.env.VITE_COLLECTION_ID),
    appwriteBucketId: String(import.meta.env.VITE_BUCKET_ID),
}

export default conf