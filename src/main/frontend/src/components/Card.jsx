import React from 'react';
import LinkButton from "./LinkButton";

function Card({item}) {

  return (

    <div className="card">
      <div className="card-Name">
        <h3>{item.firstName} {item.lastName}</h3>
      </div>
      <div className='profilePic'>
        <img src={item.profilePic} alt='profilePic' />
      </div>
      <div className="job_title">
        <p>{item.jobTitle}</p>
      </div>

      <div className="button">
        <LinkButton to={`/users/${item.id}`} text={'View'}/>
      </div>

    </div>
  )
}


export default Card
