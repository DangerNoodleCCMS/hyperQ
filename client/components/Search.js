import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Card from './Card';
import Options from './Options';
import React, { useState, useEffect, createContext, useContext } from 'react';
import DisplayMovieOption from "./DisplayMovieOption";

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
}]

const Search = () => {

  const [searchedMovie, setSearchedMovie] = useState('');
  const [matches, setMatches] = useState(fakeArr);

  const [choice, setChoice] = useState({
    id: "", 
    priority: ""
  })


 function saveCheckbox(id){
   alert(id)
   const p = choice.priority;
    setChoice({id:id, priority: p})
     
 }

 function savePrio(priority){
  const i=choice.id;
  setChoice({id: i, priority: priority})
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
      alert("Searching your movie")
    

    
  
    

    fetch(`/getList`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({keywords: searchedMovie}),
    })
      .then((response) => {
        
       setMatches(response)
    })
    }//end else 
  }


  function handleChoiceSubmit(e){
      e.preventDefault();
      if(!choice.id){
        alert("you must make a selection")
      } else{
        
        alert(choice.priority)

     fetch(`/media`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({mediaId: choice.id}),
      //send the image link as well
      
    })
      .then((response) => {
       
       //when backend sends back priority list object then update redux state here
  })

      }
      
    }

  const movieComponents = matches.map(movie => <DisplayMovieOption key={movie.id} movie={movie} saveCheckbox={saveCheckbox} savePrio={savePrio}/>)


    return (
  <div className = "searchPage">

    <input name='keywords' 
    type ='text' 
    value ={searchedMovie} 
    className = 'newMovie' 
    onChange ={handleChange} />

    <button className = 'searchButton'
    onClick={handleSubmit}>Search Button</button>

     <h2>Select your movie</h2>
     <button className="" onClick={handleChoiceSubmit}>Submit Choice </button>
     {movieComponents}
   
  </div>
    )
    }


export default Search;