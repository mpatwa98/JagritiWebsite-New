import React, { useEffect, useState } from "react";
import "./EventsPage.css"
import { useFirebase } from "../../context/Firebase";
import Events from "../../components/Events/Events";
import {motion} from "framer-motion";
import Button from "../../components/UI/button/Button";


const EventsPage = () => {
  const firebase = useFirebase();
  // const [eventData, seteventData] = useState([]);
  const [eventType,setEventType] = useState("events")
  


  const fetchEventData = (name) => {
    const Data =  firebase.getAllDocuments(name);
    
  };

  useEffect(() => {
    Promise.all([fetchEventData("events"),fetchEventData("pre-event"),fetchEventData("guest-talk")]);
    
    
  }, []);




  return (
    
  <>

    <motion.div className=" flex justify-around md:w-[70%] mx-auto mt-[44px] md:flex-row flex-col items-center md:gap-0 gap-3">
      <div>
      <Button text="Pre-Events" outline={eventType!=="pre-event"} onPress={()=>setEventType("pre-event")} ></Button>
      </div>
     <div>
     <Button text="Events" outline={eventType!=="events"} onPress={()=>setEventType("events")} ></Button>
     </div>
     <div>
     <Button text="Guest talks" outline={eventType!=="guest-talk"} onPress={()=>setEventType("guest-talk")} ></Button>
     </div>
      
    
    
    
    </motion.div>


 <div  className="md:grid md:grid-cols-2 z-50 md:mx-[195px] md:gap-y-[60px] mt-9 md:grid-flow-row flex flex-col gap-12 mb-9 ">
      
      {
        
        (eventType === "pre-Event")?
        
        (firebase.PreEventData.map((data) => (
        <div >
       <Events data={data} key={data.id}></Events>
      </div>

      ))) : ((eventType === "events")? (firebase.eventData.map((data) => (
        <div >
       <Events data={data} key={data.id}></Events>
      </div>

      ))): (firebase.GuestTalkData.map((data) => (
        <div >
       <Events data={data} key={data.id}></Events>
      </div>

      ))))
      
      
      
      
      }








    </div>
  </>
   
  
    
  );
};

export default EventsPage;
