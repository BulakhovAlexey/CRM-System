import { DB } from "~/lib/appwrite";
import { DB_ID, COLLECTION_GROUPS } from "~/DbConstants";
import { useMutation, useQuery } from "@tanstack/vue-query";
import type { IGroup } from "~/types/types";


export function useGroupList() {

  const getGroupsList = function() {
    return useQuery({
      queryKey: ['groups_list'],
      queryFn: () => DB.listDocuments(DB_ID, COLLECTION_GROUPS),
    })
  }

  return {
    getGroupsList,
  }
}