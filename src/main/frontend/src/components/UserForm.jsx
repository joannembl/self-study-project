import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

function UserForm() {

  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [avatar, setAvatar] = useState('https://robohash.org/impeditofficiaporro.png?size=50x50&set=set1');
  const [jobTitle, setJobTitle] = useState('');
  const [location, setLocation] = useState('');
  const [profilePic, setProfilePic] = useState('http://dummyimage.com/100x100.png/cc0000/ffffff');

  const createUser = async (newUser) => {

    if(window.confirm('Are you sure you want to create user?')){
      try {
        const response = await fetch('http://localhost:8000/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newUser)
        });

        const data = await response.json();

        console.log('User Created!', data);
      } catch(error) {
        console.log(error.message);
      }

      navigate('/users')
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const newUser = {
      firstName,
      lastName,
      avatar,
      jobTitle,
      location,
      profilePic,
    }
    createUser(newUser);

    setFirstName('');
    setLastName('');
    setAvatar('https://robohash.org/impeditofficiaporro.png?size=50x50&set=set1');
    setJobTitle('');
    setLocation('');
    setProfilePic('http://dummyimage.com/100x100.png/cc0000/ffffff')
  }

  return (
    <div className='user-form'>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <input type='text' placeholder='Enter First Name' value={firstName} onChange={(event) => setFirstName(event.target.value)} />
          <input type='text' placeholder='Enter Last Name' value={lastName} onChange={(event) => setLastName(event.target.value)} />
          <input type='text' placeholder='Enter Avatar URL' value={avatar} onChange={(event) => setAvatar(event.target.value)} />
          <input type='text' placeholder='Enter Job Title' value={jobTitle} onChange={(event) => setJobTitle(event.target.value)} />
          <input type='text' placeholder='Enter Location' value={location} onChange={(event) => setLocation(event.target.value)} />
          <button type='submit'>Create User</button>
        </form>
      </div>
    </div>
  )
}

export default UserForm
