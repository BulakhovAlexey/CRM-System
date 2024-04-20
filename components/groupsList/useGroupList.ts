import { DB } from "~/lib/appwrite";
import { DB_ID, COLLECTION_GROUPS } from "~/DbConstants";
import { useQuery } from "@tanstack/vue-query";
import { format } from "@formkit/tempo"


export function getGroupList() {
  return useQuery({
    queryKey: ['groups list'],
    queryFn: () => DB.listDocuments(DB_ID, COLLECTION_GROUPS),
    // select(data) {
    //   return data?.documents.map(el => {
    //     if(el.$createdAt) {
    //       el.$createdAt = format(el.$createdAt, { date: "long", time: "short" })
    //     }
    //   })
    // },
  })

}