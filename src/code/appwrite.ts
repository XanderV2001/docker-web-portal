import { Account, Client } from 'appwrite';
import { useRouter } from 'vue-router';

let appwriteClient : Client | null  = null;

export function useAppwrite(): Client {
    return appwriteClient ?? new Client().setEndpoint('https://appwrite.xandervos.dev/v1').setProject('634f385243492f68b242');
}

export async function isLoggedIn(): Promise<boolean> {
    const account = new Account(useAppwrite());

    try {
        await account.get();
        return true;
    } catch {
        return false;
    }
}