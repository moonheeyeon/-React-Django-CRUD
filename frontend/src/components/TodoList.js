import React , { useEffect , useState , forwardRef, useRef, useImperativeHandle } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import DeleteIcon from '@material-ui/icons/DeleteOutline';

import axios from 'axios';
import { Divider, Typography } from '@material-ui/core';

import TodoListItem from './TodoListItem';

const useStyles = makeStyles(theme => ({

    listWrapper : {
        width : '800px',
        margin : 'auto',
    }
}));

function TodoList(props , ref) {
    const classes = useStyles();
    const [todoItems , setTodoItems] = useState([]);

    const get = async () => {
        let result = await axios({
            url :'http://localhost:8000/api/todo/',
            methods : 'get'
        });
        setTodoItems(result.data);
    }

    useImperativeHandle(ref , ()=>({
        reload(){
            get();
        }
    }));

    return (
        <div className={ classes.listWrapper }>
            <Divider/>
            {
                todoItems.map((item , idx)=>{
                    return <TodoListItem key={idx} data={item} handleEvent={ get } />
                })
            }
        </div>
    );
}

export default forwardRef(TodoList);