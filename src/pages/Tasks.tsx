import { AddTaskModal } from "@/components/module/tasks/addTaskModal"
import TaskCard from "@/components/module/tasks/TaskCard"
import { selectFilter, selectTask } from "@/redux/features/tasks/taskSlice"
import { useAppSelector } from "@/redux/hooks/hooks"


export const Tasks = () => {
    const tasks = useAppSelector(selectTask)
    const filter = useAppSelector(selectFilter)
    console.log(tasks, filter)
    return (
        <div className="mx-auto max-w-7xl px-5 mt-20">
            <div className="flex justify-between">
                <h1>  tasks  </h1>
            <AddTaskModal />
            </div>

            <div className="space-y-5 mt-5">
                {tasks?.map(task => <TaskCard task={task} key={task.id} />)}
            </div>
        </div>
    )
}
