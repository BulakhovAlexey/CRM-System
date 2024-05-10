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
      groups: task.groups,
      executor: task.executor,
      owner: task.owner
    }
  }

  const isToday = function (date1: Date, date2: Date) {
    let dayStart = new Date(date2).setHours(0,0,0,0)
    let dayEnd = new Date(date2).setHours(23,59,59)
    return date1.getTime() > dayStart && date1.getTime() < dayEnd
  }

  const isThisWeek = function(date1: Date, date2: Date) {
    // Получаем дату завтрашнего дня
    const tomorrow = new Date(date2);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Получаем первый день текущей недели, который не раньше завтрашнего дня
    let firstDayOfWeek = new Date(tomorrow);
    firstDayOfWeek.setDate(tomorrow.getDate() - tomorrow.getDay() + (tomorrow.getDay() === 0 ? -6 : 1));

    // Получаем последний день текущей недели
    const lastDayOfWeek = new Date(firstDayOfWeek);
    lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 6);

    // Проверяем, входит ли date1 в диапазон текущей недели
    return date1 >= firstDayOfWeek && date1 <= lastDayOfWeek;
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
        else if (isToday(taskDate, currentDate)) {
          const column = newBoard.find(col => col.id == EnumColumnsCode.today)
          if (column) {
            column.items.push(makeTaskFields(task))
          }
        } 
        // на этой неделе
        else if (isThisWeek(taskDate, currentDate)) { //условие
          const column = newBoard.find(col => col.id == EnumColumnsCode.this_week)
          if (column) {
            column.items.push(makeTaskFields(task))
          }
        } 
        else {
          // на следующей неделе
          const column = newBoard.find(col => col.id == EnumColumnsCode.next_week)
          if (column) {
            column.items.push(makeTaskFields(task))
          }
        }
      });
      return newBoard
    },
  })

  return {
    getBoard
  }
}