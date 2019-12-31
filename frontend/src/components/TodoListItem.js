import React , { useEffect , useState , forwardRef, useRef, useImperativeHandle } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import DeleteIcon from '@material-ui/icons/DeleteOutline';
import CreateIcon from '@material-ui/icons/Create';
import { Divider, Typography } from '@material-ui/core';

import axios from 'axios';
import Moment from 'react-moment';

const useStyles = makeStyles(theme => ({
    listItemWrapper : {
        padding : theme.spacing(1,2),
        margin : theme.spacing(2,0)
    },
    iconButton: {
        padding: 10,
    },
    chkIconButton : {
        padding: 10,
        marginLeft : 30
    },
    verticalCenter : {
        alignSelf: 'center'
    },
    divider: {
        height: 28,
        margin: 4,
        verticalAlign:'middle',
        display:'inline-block',
    },
    time : {
        fontSize : '.6em',
        color : '#716d6d'
    }
}));

function CheckBoxButtonIcon(props){
    if(props.isActive){ return(<CheckBoxOutlinedIcon/>); }
    else{ return(<CheckBoxOutlineBlankIcon/>); }
}

export default function TodoListItem(props) {
    const classes = useStyles();

    const remove = async () => {
        // handleEvent
        if(window.confirm('삭제하시겠습니까?')){
            const res = await axios({
                url : "http://localhost:8000/api/todo/" + props.data.id,
                method : 'delete'
            });
            props.handleEvent();
        }
    }

    const changeState = async () => {
        const res = await axios({
            url : "http://localhost:8000/api/todo/" + props.data.id + "/",
            method : 'put',
            data : {
                context : props.data.context,
                is_closed : !props.data.is_closed,
                updated_at : new Date()
            }
        });
        props.handleEvent();
    }

    return (
        <Paper className={ classes.listItemWrapper}>
            <Grid container>
                <Grid item xs={10} className={ classes.verticalCenter }>
                    <Typography >
                        {props.data.context}
                    </Typography>
                    <Typography color="disabled" className={ classes.time }>
                        <Moment interval={10} date={props.data.updated_at} fromNow></Moment>
                    </Typography>
                </Grid>
                <Grid item xs={2} className={classes.verticalCenter}>
                    <IconButton color={ props.data.is_closed ? "default" : "secondary" } className={classes.chkIconButton} aria-label="directions" onClick={ changeState }>
                        <CreateIcon />
                    </IconButton>
                    <Divider className={ classes.divider } orientation="vertical"/>
                    <IconButton color="secondary" className={classes.iconButton} aria-label="directions" onClick={remove}>
                        <DeleteIcon/>
                    </IconButton>
                </Grid>
            </Grid>
        </Paper>
    );
}

