import { Client } from 'appwrite';

let appwriteClient : Client | null  = null;

export function useAppwrite(): Client {
    return appwriteClient ?? new Client().setEndpoint('https://appwrite.xandervos.dev/v1').setProject('634f385243492f68b242');
}