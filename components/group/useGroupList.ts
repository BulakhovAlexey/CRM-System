import { DB } from "~/lib/appwrite";
import { DB_ID, COLLECTION_GROUPS } from "~/DbConstants";
import { useQuery } from "@tanstack/vue-query";


export function useGroupList() {

  const getGroupsList = function() {
    return useQuery({
      queryKey: ['groups_list'],
      queryFn: () => DB.listDocuments(DB_ID, COLLECTION_GROUPS),
    })
  }

  const getGroupInfo = function(id:string) {
    return useQuery({
      queryKey: ['group_info', id],
      queryFn: () => DB.getDocument(DB_ID, COLLECTION_GROUPS, id)
    })
  }

  return {
    getGroupsList,
    getGroupInfo
  }
}