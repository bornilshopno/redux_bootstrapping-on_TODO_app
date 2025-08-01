import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { addTask } from "@/redux/features/tasks/taskSlice"
import { selectUsers } from "@/redux/features/users/userSlice"
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks"
import type { Itask } from "@/types"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useState } from "react"

import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"

export function AddTaskModal() {
    const form = useForm();
    const dispatch = useAppDispatch();
    const users=useAppSelector(selectUsers);
    const [open,setIsOpen]= useState(false)
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        console.log(data, 'from onSubmit');
        dispatch(addTask(data as Itask))
        setIsOpen(false);
        form.reset()
    }
    return (
        <Dialog open={open} onOpenChange={setIsOpen}>
            <form>
                <DialogTrigger asChild>
                    <Button variant='default' className="bg-green-500">Add Task</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add Task</DialogTitle>
                        <DialogDescription className="sr-only">
                            {/* "sr-only" makes it out of screen and for screen read only */}
                            Fill Up this form to Add Task
                        </DialogDescription>
                    </DialogHeader>
                    {/* forms */}


                    <Form{...form} >

                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>

                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea {...field} />
                                        </FormControl>

                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="assignedUser"
                                render={({ field }) => (
                                    <FormItem >
                                        <FormLabel>Assigned User</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value} >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select User" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent className="w-full" >
                                                {/* <SelectItem value="Low">Low</SelectItem>
                                                <SelectItem value="Medium">Medium</SelectItem>
                                                <SelectItem value="High">High</SelectItem> */}

                                                {users?.map((user)=>
                                                <SelectItem key={user.id} value={user.id}>{user.name}</SelectItem>)}
                                            </SelectContent>
                                        </Select>


                                    </FormItem>
                                )}
                            />


                            <FormField
                                control={form.control}
                                name="priority"
                                render={({ field }) => (
                                    <FormItem >
                                        <FormLabel>Priority</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value} >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select tasks's priority" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent className="w-full" >
                                                <SelectItem value="Low">Low</SelectItem>
                                                <SelectItem value="Medium">Medium</SelectItem>
                                                <SelectItem value="High">High</SelectItem>
                                            </SelectContent>
                                        </Select>


                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="dueDate"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Due Date</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            " pl-3 text-left font-normal",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value ? (
                                                            format(field.value, "PPP")
                                                        ) : (
                                                            <span>Pick a date</span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    // disabled={(date) =>
                                                    //     date > new Date() || date < new Date("1900-01-01")
                                                    // }
                                                    captionLayout="dropdown"
                                                />
                                            </PopoverContent>
                                        </Popover>

                                    </FormItem>
                                )}
                            />

                            <DialogFooter className="mt-5">
                                <DialogClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                </DialogClose>
                                <Button type="submit">Save Task</Button>
                            </DialogFooter>
                        </form>




                    </Form>





                </DialogContent>
            </form>
        </Dialog>
    )
}
