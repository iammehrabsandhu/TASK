import React from 'react';
import Task from './components/Task';
import { useState } from 'react';
import axios from 'axios';

function App() {
  const [content, setContent] = useState<string>(''); 
  const [showf,setShowf] = useState(true);
  async function handleSubmit(){
    console.log(content);
    await axios.post('http://localhost:3000/todos',{content:content});
  }
    return (
        <div><div className='bg-gray-300'>
            <h1 className='text-center pt-10 mb-10 text-3xl'>To Do List</h1>
           {showf && <form className='text-center my-8 '>
              <input type='text' className='border-2 p-1' placeholder='your new task' value={content} onChange={(e)=>{setContent(e.target.value)}}></input>
              <button className='border-2 p-1' onClick={()=>{handleSubmit()}}>Submit</button>
            </form>}
            <hr className='my-9'/>
            </div>
            <Task />
        </div>
    );
};

export default App;
