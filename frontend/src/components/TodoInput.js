import React , {useEffect , useState} from 'react'; 
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { Button } from '@material-ui/core';
import axios from 'axios';


const useStyles = makeStyles(theme => ({
    formInput: {
        padding: theme.spacing(1, 2),
        width : '800px',
        margin : '30px auto'
    },
    title : {
        marginTop : theme.spacing(3),
        textAlign : 'center'
    },
    input : {
        width : '100%'
    },
    verticalCenter : {
        alignSelf: 'center'
    },
}));

function TodoInput(props) {
    const classes = useStyles();
    const [context , setContext] = useState('');
    
    const add = async ()=>{
        if(context.trim() === ""){
            window.alert('내용이 비어있습니다.');
            return;
        }
        else if(context.trim().length > 100){
            window.alert('내용이 너무 깁니다.');
            return;
        }
        else{
            const response = await axios({
                url : 'http://localhost:8000/api/todo/',
                method : 'post',
                data : {
                    context : context.trim(),
                    updated_at : new Date()
                }
            });
            if(response.statusText === 'Created'){
                props.handleInsert();
                setContext("");
            }
            else{
                props.handleInsert();
            }
        }
    }    

    return (
        <Paper component="form" className={ classes.formInput }>
            <Grid container>
                <Grid item xs={11} className={ classes.verticalCenter }>
                    <InputBase
                        className={classes.input}
                        placeholder="메모를 입력해주세요."
                        inputProps={{ 'aria-label': '메모를 입력해주세요.' }}
                        value={ context }
                        onChange={ (e)=>{ setContext(e.target.value); } }
                    />
                </Grid>
                <Grid item xs={1} className={classes.verticalCenter}>
                    <Button variant="contained" color="warning" outline color="success" aria-label="directions" onClick={ add }>
                        추가
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    );
}

export default TodoInput;