import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Task {
    id: number;
    content: string;
}

function Task() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [showf,setShowf] = useState(false);
    const [content, setContent] = useState<string>(''); 
    const [Id, setId] = useState<number>(0); 
    useEffect(() => {
        // Fetch tasks from API
        axios.get<Task[]>('http://localhost:3000/todos')
            .then(response => {
                console.log(response.data);
                setTasks(response.data);
            })
            .catch(error => {
                console.error('Error fetching tasks:', error);
            });
    }, []);
    const handleDelete = (id: number) => {
        axios.delete('http://localhost:3000/todos', {data: {id: id}})
            .then(response => {
                console.log('Task deleted successfully');
                setTasks(response.data);
            })
            .catch(error => {
                console.error('Error deleting task:', error);
            });
    };
    const handleEdit = (id: number,content: String) => {
        console.log(id+" "+content);
        axios.patch('http://localhost:3000/todos', {id: id,content:content})
            .then(response => {
                console.log('Task deleted successfully');
                setTasks(response.data);
            })
            .catch(error => {
                console.error('Error updating task:', error);
            });
    };


    return (
        <div>
            <h2 className='font-bold text-center'>You have {tasks.length} Tasks</h2>

            {showf && <form className='text-center my-8 '>
              <input type='text' className='border-2 p-1' placeholder='edit task' value={content} onChange={(e)=>{setContent(e.target.value)}}></input>
              <button className='border-2 p-1' onClick={()=>{handleEdit(Id,content)}}>Submit</button>
            </form>}
            <ol className='text-center list-decimal'>
                {tasks.map(task => (
                    <li className='my-4' key={task.id}> {task.content} 
                    <button className='bg-black px-2 text-white mx-4 rounded-3xl' onClick={()=>{handleDelete(task.id)}}>delete</button>
                    <button className='bg-black px-2 text-white mx-4 rounded-3xl' onClick={()=>{setId(task.id);setContent(task.content);setShowf(true);}}>edit</button>
                    </li>
                    
                ))}
            </ol>
        </div>
    );
};

export default Task;
