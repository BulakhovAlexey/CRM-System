import { DB } from "~/lib/appwrite";
import { useQuery } from "@tanstack/vue-query";
import { DB_ID, COLLECTION_TASKS } from "~/DbConstants";
import { taskColumns } from "~/seeders/tasks.columns";
import type { IColumnTask, ITask } from "~/types/types";
import { EnumColumnsCode } from "~/types/types";


export function useTasks() {

  const makeTaskFields = function (task: ITask) {
    return {
      $id: task.$id,
      $createdAt: task.$createdAt,
      task_name : task.task_name,
      description: task.description,
      start_date: task.start_date,
      end_date : task.end_date,
      groups: task.groups
    }
  }

  const isTodayOrTomorrow = function (date1: Date, date2: Date) {
    let dayStart = new Date(date2).setHours(0,0,0,0)
    let dayEnd = new Date(date2).setHours(23,59,59)
    return date1.getTime() > dayStart && date1.getTime() < dayEnd
  }
  
  const getBoard = useQuery({
    queryKey: ["get_Tasks"],
    queryFn: () => DB.listDocuments(DB_ID, COLLECTION_TASKS),
    select(data) {
      const currentDate = new Date();
      const tomorrowDate = new Date(currentDate);
      tomorrowDate.setDate(tomorrowDate.getDate() + 1);

      const newBoard: IColumnTask[] = taskColumns.map(column =>({
        ...column,
        items: [],
      }))

      const tasks = data.documents as unknown as ITask[]
      tasks.forEach(task => {
        let taskDate = new Date(task.end_date)
        if(taskDate < currentDate){
          const column = newBoard.find(col => col.id == EnumColumnsCode.overdue)
          if (column) {
            column.items.push(makeTaskFields(task))
          }
        } 
        else if (isTodayOrTomorrow(taskDate, currentDate)) {
          const column = newBoard.find(col => col.id == EnumColumnsCode.today)
          if (column) {
            column.items.push(makeTaskFields(task))
          }
        } 
        else if (isTodayOrTomorrow(new Date(task.end_date), tomorrowDate)) {
          const column = newBoard.find(col => col.id == EnumColumnsCode.tomorrow)
          if (column) {
            column.items.push(makeTaskFields(task))
          }
        } 
        else {
          const column = newBoard.find(col => col.id == EnumColumnsCode.nextWeek)
          if (column) {
            column.items.push(makeTaskFields(task))
          }
        }
      });
      console.log(newBoard);
      return newBoard
    },
  })

  return {
    getBoard
  }
}