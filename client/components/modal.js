import React, {useState, useEffect} from "react"
import './modal.css';

function Modal(props){
  const {mongoId, posterUrl} = props.movieObj; //whatever it gets called when passed
  const [movieDetail, setMovieDetail] = useState({});

  useEffect(()=>{
      console.log(mongoId);
     fetch(`/api/modal`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({mongoId}),
    })
      .then((response) => response.json())
      .then( data => {
        console.log(data);
        data.directors = data.directors.join(', ');
        data.stars = data.stars.join(', ');
        setMovieDetail(data);
      })
  }, [])
 
  return(
    <div className="modal-cont">
    <div className="modal-card">
     <div>
    <img className="modal-img" src={posterUrl} />
    </div>
    
    <div>
    <h4>Plot: {movieDetail.plot} </h4>
    <h4>Rating: {movieDetail.rating} </h4>
    <h4>Content rating: {movieDetail.contentRating} </h4>
    <h4>Awards: {movieDetail.awards} </h4>
    <h4>Directors: {movieDetail.directors} </h4>
    <h4>Leading actors: {movieDetail.stars} </h4>
    </div>

   

    <div className="close-btn" onClick={()=>props.modalClick()}><i class="fas fa-times"></i></div>
    </div>
    </div>
  )
}

export default Modal