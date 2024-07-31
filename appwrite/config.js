import {Client, Databases, Query} from 'appwrite';
import conf from '../conf'
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

    async createDoc({slug, title, content, featured_image, status, userId}) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDbId,
                conf.appwriteCollectionId,
                slug,
                {title, content, featured_image, status, userId}
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
            return await this.storage.listDocuments(
                conf.appwriteDbId,
                conf.appwriteCollectionId,
                [Query.equal('status', ['active'])]
            );
        } catch (error) {
            console.log("Appwrite service :: getListDoc :: errro", error);
            return false;
        }
    }

    async uploadFile(file, featured_image) {
        try {
            return await this.storage.createFIle(
                conf.appwriteBucketId,
                featured_image,
                document.getElementById('uploader').file[0]
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
    getFilePreview(fileId) {
        return this.storage.getFilePreview(
            conf.appwriteBucketId,
            fileId
        );
    }


}
 
const config = new Config();
export default config;