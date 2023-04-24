import '../CSS/AppBW.css';
import {useState, useEffect} from "react";
import Axios from "axios";
import TextareaAutosize from 'react-textarea-autosize';


function ReplyRequest(){
    

    // const [listOfReplies, setListOfReplies] = useState([]);
    const [reply, setReply] = useState("");

    // useEffect(() => {
    //     Axios.get("/getReply").then((response) => {
    //       setListOfReplies(response.data);
    //     })
    //   }, [])
    
      const createReply = () => {
        Axios.post("/createReply",{
          reply,
        }).then((response) => {
          alert("wade goda bosa!");
        })
      }
  

    return(
        <div>
            <div className='headding'>
                Reply
            </div>

            {/* <div className='usersDisplay'>
                    {listOfReplies.map((user) => {
                    return(
                        <div>
                        <h1>Reply: {user.reply}</h1>
                        
                        </div>
                    )
                    })}
            </div> */}

            <div className="requestM">
                Wtite your reply:

                

                <div>
                    <TextareaAutosize
                        className="replytxt"
                        minRows={3}
                        maxRows={6}
                        placeholder="Enter your reply here"
                        style={{ width: "90%" }}
                        onChange={(event) =>{
                            setReply(event.target.value);
                        }}
                        />

                    {/* <input type="text" placeholder="Name...." onChange={(event) => {
                            setReply(event.target.value);
                            }}></input> */}
                    
                </div>
                
                
                <button className='Srepbtn' onClick={createReply}>Send Reply</button>
                {/* {JSON.stringify(data)} */}
            </div>
        </div>
    )
}

export default ReplyRequest;