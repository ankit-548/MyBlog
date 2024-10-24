import {Client, Databases, Storage, Query, ID} from 'appwrite';
import conf from '../conf/conf'
export class Config {
    client = new Client();
    databases;
    storage;
    constructor() {
        this.client
                   .setEndpoint(conf.appwriteEndpointId)
                   .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    async createDoc({ title, slug, content, featured_image, status, user_id}) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDbId,
                conf.appwriteCollectionId,
                slug,
                {title, content, featured_image, status, user_id}
            );
        } catch (error) {
            console.log("Appwrite service :: createDoc :: error", error);
            return error;
        }
    }

    async updateDoc({slug, title, content, featured_image, status, userId}) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDbId,
                conf.appwriteCollectionId,
                slug,
                {title, content, featured_image, status, userId}
            );
        } catch (error) {
            console.log("Appwrite service :: updateDoc :: error", error);
            return error;
        }
    }

    async deleteDoc(slug) {
        try {
            return await this.databases.deleteDocument(
                conf.appwriteDbId,
                conf.appwriteCollectionId,
                slug
            );
        } catch (error) {
            console.log("Appwrite service :: deleteDoc :: error", error);
            return error;
        }
    }

    async getDoc(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDbId,
                conf.appwriteCollectionId,
                slug
            );
        } catch (error) {
            console.log("Appwrite service :: getDoc :: error", error);
            return error;
        }
    }

    async getListDoc() {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDbId,
                conf.appwriteCollectionId,
                [Query.equal('status', ['active'])]
            );
        } catch (error) {
            console.log("Appwrite service :: getListDoc :: errro", error);
            return false;
        }
    }

    async uploadFile(file) {
        try {
            return await this.storage.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            );
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error", error);
        }
    }

    async deleteFile(featured_image) {
        try {
            return await this.storage.deleteFile(
                conf.appwriteBucketId,
                featured_image
            );
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error", error);
            return false;
        }
    }

    // For this api we don't need async as it's response is too fast
    getFilePreview(featured_image) {
        return this.storage.getFilePreview(
            conf.appwriteBucketId,
            featured_image
        );
    }


}
 
const config = new Config();
export default config;