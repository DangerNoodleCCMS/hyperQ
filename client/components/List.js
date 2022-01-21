import React, { useState, useEffect } from 'react';
import Modal from './Modal';

const List = (props) => {

  const [priority, setPriority] = useState('');


  ////////////////////////////////////////////////////////////////////////
  const [openModal, setOpenModal] = useState(false);

  function modalClick(){
    setOpenModal(prev=> !prev);
    console.log(openModal);
  }
  //////////////////////////////////////////////////////////////////
  return (
    <ul>

      {props.list.items.map(elem => {
        
        if (props.filter !== ""){
          if (elem.genres[props.filter]){
            return (
              <div style={ {border: "1px solid white", padding: "20px"} }>
                <li>Title: {elem.title}</li>
                <li>Year: {elem.year}</li>
                <li>Type: {elem.type}</li>
                <li>Length: {elem.length}mins</li>
                <li>Genre: {Object.keys(elem.genres).map(e => <span>{e}</span>)}</li>
                {/* <input type='text' onChange={e => setPriority(e.target.value)}></input> */}
                <button id="edit-btn" onClick={(e) => props.edit({listId: props.list.id, SQLId: elem.SQLId})}>
                  <i class="fas fa-edit"></i>
                </button> 
                <button id="del-btn" onClick={(e) => props.delete({listId: props.list.id, SQLId: elem.SQLId})}><i class="fas fa-trash-alt"></i></button>
                <button onClick={modalClick} className="img-btn">Quick View</button>
                {openModal? <Modal movieObj={elem} modalClick={modalClick}/> : null} 
              </div>
            )
          }
        } else {
          return (
            <div style={ {border: "1px solid white", padding: "20px"} }>
              <li>Title: {elem.title}</li>
              <li>Year: {elem.year}</li>
              <li>Type: {elem.type}</li>
              <li>Length: {elem.length}mins</li>
              <li>Genre: {Object.keys(elem.genres).map(e => <span>{e}</span>)}</li>
              {/* <input type='text' onChange={e => setPriority(e.target.value)}></input> */}
              <button id="edit-btn" onClick={(e) => props.edit({listId: props.list.id, SQLId: elem.SQLId})}>
                <i class="fas fa-edit"></i>
              </button> 
              <button id="del-btn" onClick={(e) => props.delete({listId: props.list.id, SQLId: elem.SQLId})}><i class="fas fa-trash-alt"></i></button>
              <button onClick={modalClick} className="img-btn">Quick View</button>
              {openModal? <Modal movieObj={elem} modalClick={modalClick}/> : null} 
            </div>
          )
        }
      })}
    </ul>
  )
}

export default List;