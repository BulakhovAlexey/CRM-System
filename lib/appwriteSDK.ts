
import sdk from 'node-appwrite'
import { PROJECT_NAME_ID, API } from '~/DbConstants';
import type { EnumRole } from '~/types/types';

const client = new sdk.Client();

const users = new sdk.Users(client);

client
  .setEndpoint('https://cloud.appwrite.io/v1') 
  .setProject(PROJECT_NAME_ID) 
  .setKey(API)


export const getUsers = async () => {
  try {
    const response = await users.list();
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const setRoleToUser = async (id:string, role: EnumRole[]) => {
  try {
    const response = await users.updateLabels(id, role)
    return response
  } catch (error) {
    console.error(error);
  }
}