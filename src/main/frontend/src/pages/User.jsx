import React, {useState, useEffect}  from 'react';
import { useParams } from 'react-router-dom';

import UserDescriptionCard from '../components/UserDescriptionCard';
import Loader from '../components/Loader';
import Header from "../components/Header";
import Footer from "../components/Footer";

function User() {

  const {id} = useParams();

  const [ user, setUser ] = useState();

  const getUser = async (userId) => {
    const response = await fetch(`http://localhost:8000/api/users/${userId}`);

    const data = await response.json();

    console.log(data);

    setUser(data);
  }

  useEffect(() => {
    getUser(id);
  },[id]);



  return (
    <div className='container'>
      <Header />
      <div className='user'>
        <h1>User Details:</h1>
          {user ? <UserDescriptionCard item={user} /> : <Loader />}
      </div>
      <Footer />
    </div>
  )
}

export default User
