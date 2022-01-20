import React, {useState, useEffect} from "react"

function DisplayMovieOption(props){

  const [priority, setPriority] = useState("");
  const [checked, setChecked] = useState(false);
  const [img, setImg] = useState("");
  
  const {id, image, title} = props.movie;

  // useEffect( () => {
  //   console.log("PROPS IN DISPLAY:", props.movie)
  // }, [])

useEffect(()=>{
if(priority){
  console.log('ZZZZZ',priority, image)
  props.savePrio(priority, image);//access the fn passed from parent)
  // props.saveImg(image);
}

}, [priority])

  useEffect(()=>{
   if(checked){
    props.saveCheckbox(id) //this is coming from line 8
  }
  }, [checked])

  function handleCheckbox(e){
   
    setChecked(!checked); //??? should checkbx val be in state?
    //  alert(checked) 
  
  }

  function handlePriorityChange(e) {
    const { value } = e.target;
    
    // alert(value)
    
    setPriority(value);
  }

  //notify parent component that checkmark happened

  return(
    <div className="options-cont">
    <input className="inline" type="checkbox" checked={checked} onChange={handleCheckbox} />

    <div className="inline movie-snap">
    <h3>{title}</h3>
    <img className="options-img" src={image} />
   </div>

     <select
            className="priority-drop inline"
            name="priority"
            value={priority}
            onChange={handlePriorityChange}
          >
            <option value="">Priority </option>
            <option value="1">1 </option>
            <option value="2">2 </option>
            <option value="3">3</option>
          
          </select>


    </div>
  )
}

export default DisplayMovieOption