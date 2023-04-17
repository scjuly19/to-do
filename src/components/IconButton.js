import React from 'react'

export default function Icon(props) {
  const{icon,onClick}=props;
  const handleClick=(e)=>{
    e.preventDefault();
    props.onClick && props.onClick()
  }
  return (
   <button className='avatar-btn' onClick={handleClick}>
    <img src={icon}/>
   </button>
  )
}
