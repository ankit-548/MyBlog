import {Client, Account, ID} from 'appwrite';
import conf from '../conf/conf';

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteEndpointId)            
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            console.log(userAccount);
            if(userAccount) {
                // call another method to redirect user to 
                return this.login({email, password});
            } else {
               return userAccount; 
            }
        } catch (error) {
            console.log("AppWrite service :: createAccount :: error",error);
            throw error;
        }
    }

    async login({email, password}) {
        try {
            console.log(email, password);
           return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            console.log("AppWrite service :: login :: error",error);
            throw error;
        }
    }

    async getLoggedInUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("AppWrite service :: getLoggedInUser :: error",error);
            throw error;
        }
    }

    async logOut() {
        try {
            console.log('2')
            return await this.account.deleteSession('current');
        } catch (error) {
            console.log("AppWrite service :: logOut :: error",error);
            throw error;
        }
    }
    

}

const authService = new AuthService();
export default authService;
