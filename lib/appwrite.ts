import { PROJECT_NAME_ID } from '@/DbConstants'
import { Account, Client, Databases, Storage } from 'appwrite'

export const client = new Client()

client.setEndpoint('https://cloud.appwrite.io/v1').setProject(PROJECT_NAME_ID)

export const account = new Account(client)
export { ID } from 'appwrite'
export const DB = new Databases(client)
export const storage = new Storage(client)
