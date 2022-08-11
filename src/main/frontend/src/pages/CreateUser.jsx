import React from 'react';
import UserForm from '../components/UserForm';
import Header from "../components/Header";
import LinkButton from "../components/LinkButton";


function CreateUser() {
  return (
    <div className='container'>
      <Header />
      <div className='create-user'>
      <h1>User Form: </h1>
      <h2>Please fill out this form to create a new user</h2>
      <UserForm />
      <LinkButton to={`/users`} text={'Back'}/>
      </div>
    </div>
  )
}

export default CreateUser
