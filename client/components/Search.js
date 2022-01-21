import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Card from './Card';
import Options from './Options';
import React, { useState, useEffect, createContext, useContext } from 'react';
import DisplayMovieOption from "./DisplayMovieOption";
import './Search.css'; 
import { useSelector } from 'react-redux';

//temporary data for testing ...remove after connecting to backend
const fakeArr = [
{
"id": "tt1375666",
"resultType": "Title",
"image": "https://imdb-api.com/images/original/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_Ratio0.7273_AL_.jpg",
"title": "Inception",
"description": "(2010)"
},
{
"id": "tt7321322",
"resultType": "Title",
"image": "https://imdb-api.com/images/original/MV5BYWJmYWJmNWMtZTBmNy00M2MzLTg5ZWEtOGU5ZWRiYTE0ZjVmXkEyXkFqcGdeQXVyNzkyOTM2MjE@._V1_Ratio0.7273_AL_.jpg",
"title": "Inception",
"description": "(2014) (Short)"
},
{
"id": "tt1790736",
"resultType": "Title",
"image": "https://imdb-api.com/images/original/MV5BMjE0NGIwM2EtZjQxZi00ZTE5LWExN2MtNDBlMjY1ZmZkYjU3XkEyXkFqcGdeQXVyNjMwNzk3Mjk@._V1_Ratio0.7273_AL_.jpg",
"title": "Inception: Motion Comics",
"description": "(2010) (Video)"
}
]

const Search = () => {

  const mediaList = useSelector(state => state.user.mediaList);

  const [searchedMovie, setSearchedMovie] = useState('');
  const [matches, setMatches] = useState([]);

  const [choice, setChoice] = useState({
    id: "", 
    priority: "",
    img: ""
  })


 function saveCheckbox(id){
  //  alert(id)
   const p = choice.priority;
    setChoice({...choice, id:id})   
 }

  function savePrio(prior, image){
    const i=choice.id;
    console.log('AAAA', prior)
    setChoice({...choice, priority: prior, img: image})
   
  }

  function saveImg(img){
    setChoice({...choice, img: img})
  }

  function handleChange(e){
    const {name, value} = e.target;
    setSearchedMovie(value)
  }

  function handleSubmit(e){
    e.preventDefault();
    
    if (!searchedMovie) {
      alert("Please enter a movie to search");
    
    } else {
      console.log("Searching your movie");
      fetch(`/api/getList`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({keywords: searchedMovie}),
      })
        .then(data => data.json())
        .then(data => {
          console.log("imdb api results", data);
          if (data.length > 0 && data !== null){
            setMatches(data);
          }else setMatches([{id:0, title:'No result found', image:'NA'}]);
        });
    } 
  }

  function handleChoiceSubmit(e){

    console.log( "GETTING STUFF FROM STATE", 
          mediaList.priority1.items.length,
          mediaList.priority2.items.length,
          mediaList.priority3.items.length);

    


    console.log('choice', choice);

    let key = 'priority';
    const length = mediaList[key+choice.priority].items.length;
    // let length = 0;
    // if (choice.priority == 1) {
    //   length = mediaList.priority1.items.length;
    // }
    // else if (choice.priority == 2) {
    //   length = mediaList.priority2.items.length;
    // }
    // else if (choice.priority == 3) {
    //   length = mediaList.priority3.items.length;
    // }

    console.log("length", length);

    const obj = {
      imdbID: choice.id,
      image: choice.img,
      listId: mediaList[key+choice.priority].id,
      length: length}

    console.log("OBJECT", obj);

    e.preventDefault();
    if(!choice.id){
      alert("you must make a selection")
    } else {
      console.log("priority", choice.priority);

      fetch(`/api/media`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
      //send the image link as well
      
      })
      .then((data) => {
        data.json()
      })
      .then(data => console.log("555555", data))

  }
      
  }

  let movieComponents = matches.map(movie => <DisplayMovieOption key={movie.id} movie={movie} saveCheckbox={saveCheckbox} savePrio={savePrio}/>)



  return (
    <div className = "searchPage">
    <h1 className = "SearchMovies">Search for All Your favorite Movies and TV Shows</h1>
      <input className = "keywords" name='keywords' type ='text' value ={searchedMovie} className = 'newMovie' onChange ={handleChange} />
      <button className = 'searchButton' onClick={handleSubmit}>Search</button>
      <button className="submitChoice" onClick={handleChoiceSubmit}>Submit Choice </button>
      <h2 className ="movieComponents">
      {movieComponents}
     </h2>
    </div>
  )
}

export default Search;