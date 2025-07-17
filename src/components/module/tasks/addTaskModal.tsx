import { Button } from "@/components/ui/button"
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
import { Textarea } from "@/components/ui/textarea"
import { useForm } from "react-hook-form"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"

export function AddTaskModal() {
    const form = useForm()
    const onSubmit = (data) => {
        console.log(data)
    }
    return (
        <Dialog>
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
                                render={({field}) => (
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
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea {...field} />
                                        </FormControl>

                                    </FormItem>
                                )}
                            />

                        <DialogFooter className="mt-5">
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit">Save changes</Button>
                        </DialogFooter>
                        </form>




                    </Form>





                </DialogContent>
            </form>
        </Dialog>
    )
}
