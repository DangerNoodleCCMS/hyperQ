import React, { useState, useEffect } from 'react';

const List = (props) => {


  


  return (
    <ul>

      {props.list.items.map(elem => (
          <div style={ {border: "1px solid black", padding: "20px"} }>
            <li>Title: {elem.title}</li>
            <li>Year: {elem.year}</li>
            <li>Type: {elem.type}</li>
            <li>Length: {elem.length}mins</li>
            <li>Genre: {Object.keys(elem.genres).map(e => <span>{e}</span>)}</li>
            <button id="edit-btn" onClick={(e) => props.edit({listId: props.list.id, mediaId: elem.SQLId})}>
              <i class="fas fa-edit"></i>
            </button> 
            <button id="del-btn" onClick={(e) => props.edit(props.list.id)}><i class="fas fa-trash-alt"></i></button>
          </div>
        ))}

    </ul>
  )
}

export default List;