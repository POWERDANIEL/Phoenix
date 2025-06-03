
/**
 * Node modules
 */
/* global process */
import { Client, Account, Avatars, Databases } from 'appwrite';

/**
 * Initial appwrite client
 */
const client = new Client();

client
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
  .setEndpoint('https://cloud.appwrite.io/v1');

/**
 * Initial appwrite account
 */
const account = new Account(client);

/**
 * Initial appwrite avatars
 */
const avatars = new Avatars(client);

/**
 * Initial appwrite databases
 */
const databases = new Databases(client);

export { account, avatars, databases };
