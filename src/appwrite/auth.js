import conf from '../conf/conf';
import { Account, Client, ID } from "appwrite";


export class AuthService{
    Client = new Client();
    account;

    constructer() {
        this.Client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.Client);
    }

async createAcount ({email, password, name}) {
    try{
        const userAccount = await this.account.create(ID.unique(), email, password, name);
        if ( userAccount) {
            return this.login({email, password});
        } else{
            return userAccount;
        }

    }catch(error) {
        throw error;
    }
}

async login({email, password}) {
    try {
       return await this.account.createEmailSession(email, password);
    } catch (error) {
        throw error;
        
    }
}

async getCurrentUser(){
    try {
        return await this.account.get();
    } catch (error) {
console.log("Appwrite service :: getCurrentUser :: error", error);    
    }
    return null;
}

async logout() {
    try {
        await this.account.deletedSessions();
    } catch (error) {
        console.log("Appwrite service :: logout :: error", error);    
    }
}

}

const authService = new AuthService();

    export default authService
