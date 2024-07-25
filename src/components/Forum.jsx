import React from 'react'
import { useState } from 'react';

const Forum = ({onAdd}) => {

    const [classes, setClasses] = useState(0);
    const [date, setDate] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        let data = Object.fromEntries(formData)
        if(!data.date && !data.classes){
            return alert("Can't submit empty form!")
        }
        if(!data.date){
           data =  {...data, date: new Date().toLocaleString()}
        }
        onAdd(data);
    }

  return (
    <div>
        <form onSubmit={handleSubmit} >
            <label htmlFor="classes"> No.of Classes: </label>
            <input type="number" id='classes' name='classes' onChange={(e) => setClasses(parseFloat(e.target.value))} value={classes}/>
            {/* <button> <input type="date"/>Select Date</button> */}
            <input type="date" value={date} name='date' onChange={(e) => setDate(e.target.value)} />
            <button type='submit'> {date ? "Submit" : "Submit with Today's date"} </button>
        </form>
    </div>
    
  )
}

export default Forum
