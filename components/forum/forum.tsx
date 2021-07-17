import {getForumData} from "./mock_api";
import React, { useState, useRef, useEffect } from "react";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {
  makeStyles,
  IconButton,
  Button,
  TextField,
  TextFieldClassKey,CssBaseline, AppBar, Toolbar 
} from "@material-ui/core";
import { getUser } from '../../lib/auth';


var current_data = [];
var static_msg="";

const get_color:any = {"dhruv@123":"primary","aneree@123":"secondary","sprinklr@123":"inherit","sarav@123":"action","phani@123":"disabled"};


export  default function Forum(props) {
  // console.log(static_msg);
  const [data, setData] = useState([]);
  useEffect(()=>{
    // console.log("here");
    if(localStorage.getItem("data")) setData(JSON.parse(localStorage.getItem("data")));
    else{
      getForumData().then(data => {
        setData(data);
        localStorage.setItem("data",JSON.stringify(data));
      });
    }
  },[current_data]);

  const [current_msg,setMsg] = useState(static_msg);
  const [user, setUser] = useState(null);

  getUser().then(user => {
    setUser(user);
  })

  const styles = makeStyles((theme) => ({
    // frame:{
    //   height:"100%",
    //   border:"solid",
    //   borderRadius:"10px",
    //   borderColor:"#2b5496 !important;",
    //   // position:"relative",
    // },
    heading: {
      position: "sticky",
      top: '0',
      display:"grid",
      "z-index": "50",
      gridTemplateColumns:"auto",
      justifyContent:"space-around",
      fontSize: "1.5rem",
      // fontFamily: "Papyrus, Sans Serif",
      backgroundColor:"rgba(63,81,181, 0.8) !important;",
      height: '2.4rem',
      color:"white",
      padding:"2px",
      'border-top-right-radius': '8px',
      'border-top-left-radius': '8px',
    },
    root: {
      position: "sticky",
      // position:"absolute",
      // bottom: '15px',
      bottom: '0px',
      display:"grid",
      // "z-index": "50",
      gridTemplateColumns:"1fr",
      justifyContent:"space-around",
      marginTop:"3px",
      backgroundColor:"white",
      // height: '100%',
      overflow: "auto",
      
    },
    comment_box:{
      // position: "sticky",
      // top: '0',
      // margin:"5px",
      width:"90%",
      margin:"auto",
      marginTop: "10px",
    },
    button:{
      // margin:"5px",
      // // position:"absolute",
      // right:"-150px",
      // maxHeight:"20px",
      maxWidth:"fit-content",
      margin: "auto",
      marginTop: "5px",
    },

    discussion:{
      // borderRadius:"5px",
      // border:"solid",
      // borderWidth:"2px",
      // display:"grid",
      // gridTemplateColumns:"1fr",
      display:"flex",
      "flex-direction": "column-reverse",
      width:"90%",
      marginLeft:"5%",
      marginTop:"5px",
      // overflowY:"scroll",
      // maxHeight:"90%"
      // position:"absolute"
    },
    container:{
      // borderRadius:"5px",
      border:"solid",
      borderWidth:".2px",
      padding:"4px",
      // backgroundColor:"rgba(153, 217, 238, 0.194)",
      margin:"5px",
      borderRadius:"10px",
      // display:"flex",
      // gridTemplateColumns:"auto auto",
      // justifyContent:"space-around",
      // gridColumnGap:"0px"

    },
    user:{
      // borderWidth:"0.001px !important",
      // borderBottom:"solid",
      display:"flex",
      width:"fit-content",
      // fontFamily: "Sans Serif",
      fontSize : "18px",
      fontWeight: "bold",
    },
    main: {
      height: '98%',
      overflowY:"auto",
      // display:"flex",
      // "flex-direction": "column-reverse",
      // display:"flex",
      // "flex-direction": "column-reverse",
      // display:"grid",
      // display:"flex",
      // flexDirection:"column",
      // justifyContent:"space-between"
    }

  }));
  const classes = styles();
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setMsg(event.target.value);
    static_msg=event.target.value;
  }
  function Addcomment(){
      // console.log(current_msg);
      if(current_msg!="") {
        setData([{user: user, msg: current_msg},...data]);
        localStorage.setItem("data",JSON.stringify([{user: user, msg: current_msg},...data]));
        setMsg("");
        static_msg="";
      }
  }

  return <>
  <div className={classes.main}>
      {/* <div className={classes.heading} >
          Discussion Forum
      </div> */}
      <div className={classes.discussion}>
      {data.map((user_data,index) => (
            <div className={classes.container} key={index}>
              <div className={classes.user}>
              <AccountCircleIcon color={get_color[(user_data.user)]}/>
                {user_data.user}
              </div>
              <div>
                {user_data.msg}
              </div>
            </div>
      ))}
      </div>
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={(event)=>{event.preventDefault();Addcomment();}}
      >    
        <TextField
          className={classes.comment_box}
          // label="Add a comment"
          id="outlined-size-normal"
          variant="outlined"
          style={{ width: "90%" }}
          placeholder="Add a comment"
          value={current_msg}
          onChange={handleChange}
        />
        <Button
            className={classes.button}
            variant="contained"
            color="primary"
            size="small"
            // size={props.buttonSize}
            onClick={Addcomment}
        >
          Comment
        </Button>
      </form>
      </div>
        </>;
}
