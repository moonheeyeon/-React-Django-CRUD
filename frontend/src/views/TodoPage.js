import React , { useEffect , useState , forwardRef, useRef, useImperativeHandle } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import TodoInput from '../components/TodoInput';
import TodoList from '../components/TodoList';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
    title : {
        marginTop : theme.spacing(3),
        textAlign : 'center'
    }
}));

export default function TodoPage(props) {
    const classes = useStyles();
    const [context , setContext] = useState('');

    const todoListRef = useRef();

    useEffect(()=>{ 
        todoListRef.current.reload();
    } , []);

    return (
        <React.Fragment>
            <CssBaseline/>
            <Typography variant="h3" component="h3" className={classes.title}>
                <b>메모장</b>
            </Typography>   
            <TodoInput handleInsert={ ()=>{ todoListRef.current.reload(); } }/>
            <TodoList ref={todoListRef}/>
        </React.Fragment>
    );
}

