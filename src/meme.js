import React from "react";
import "./App.css";

function Meme(props) {
 
  return (
   
      <div onClick={props.onclick}>
        <img key={props.meme.id} src={props.meme.url} alt={props.meme.name} />
      </div>
    
  );
}

export default Meme;
