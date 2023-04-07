import React, { useState } from 'react';
import './Firstfc.css'


function Firstfc(){
      const [toDo, setToDo] = useState([
        {'id': 1, 'title':'Task 1', 'status': false},
        {'id': 2, 'title': 'Task 2', 'status':false}
      ]) ;

      //Team state
      const [newTask,setNewTask] = useState('');
      const [updateData, setUpdateData] = useState('');

      //Add Task
      const addTask = ()=>{
        //
        if(newTask){
          let num=toDo.length + 1;
          let newEntry = {id: num, title: newTask, status: false}
          setToDo([...toDo, newEntry])
          setNewTask('');
        }
      }
      
      const deleteTask = (id)=>{
        
          let newTasks = toDo.filter(task => task.id !== id)
          setToDo(newTasks);
          
      }
      const markDone = (id)=>{
        //
        let newTask = toDo.map(task => { if( task.id === id){
          return ({...task, status: !task.status})
        }
      return task;
    })
    setToDo(newTask);
}
      const cancelUpdate = (e)=>{
        //
        setUpdateData('');
      }
      const changeTask = (e)=>{
        //
        let newEntry = {
          id: updateData.id,
          title: e.target.value,
          status: updateData.status ? true : false
        }
        setUpdateData(newEntry);
      }
      const updateTask = (e)=>{
        //
        let  filterRecords = [...toDo].filter(task => task.id !== updateData.id);
        let updateObject = [...filterRecords, updateData];
        setToDo(updateObject); 
        setUpdateData('') ;   
      }

    return(
    <div className='container App'>
        <h2><b>TO DO LIST</b></h2>
        <br></br>
        {/*update task*/}
        {updateData && updateData ? (
          <div className='row'>
          <div className='col'>
            <input 
            value={ updateData && updateData.title }
            onChange ={(e) => changeTask(e)}
            className='form-control form-control-lg' placeholder='Update here....'/>
            <div className='col-auto'>
              <button 
              onClick={updateTask}
              className='btn btn-md btn-success mr-20'>Update
              </button>
              <button
              onClick={cancelUpdate}
              className='btn btn-md btn-warning'>Cancle
              </button>
          </div>
          </div>
        </div>

        ) : (
          <>
        {/*Add task*/}
        <div className='row'>
          <div className='col'>
            <input 
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="form-control form-control-lg" placeholder='Add Task here...'/>
            </div>
            <div className='col-auto'>
              <button
              onClick={addTask} 
              className='btn btn-md btn-success'>Add Task</button>
          </div>
      </div>
      </>
      )}
       
       


       {/* display */}

        {toDo && toDo.length ? '' : 'No Task...'}

        {toDo && toDo
        .sort((a,b) => a.id > b.id ? 1 : -1)
            .map((task, index) => {

            return(
                <React.Fragment key={task.id}>
                  <div className='col taskBg'>
                        <div className={task.status ? 'done' : '' }>
                        <span className ="taskNumber">{index + 1}</span>
                        <span className ="taskText">{task.title}</span>
                        </div>
                        <div className='iconsWrap'>
                          <span title="completed / Not Complete"
                          onClick={(e) => markDone(task.id)}>
                          <i className="fa fa-check-circle" aria-hidden="true"></i>
                          </span>

                          {task.status ? null : (

                          <span title="Edit"
                          onClick={() => setUpdateData({
                            id: task.id,
                            title: task.title,
                            status: task.status ? true : false

                          })}>
                          <i className="fa fa-pencil" aria-hidden="true"></i>
                          </span>
                          )}
                          <span title="Delete" onClick={() => deleteTask(task.id)}>
                          <i className="fa fa-trash" aria-hidden="true" ></i>
                          </span>
                        </div>

                  </div>
              
                </React.Fragment>
            )
            })
            }

    </div>
    );
}

export default Firstfc;