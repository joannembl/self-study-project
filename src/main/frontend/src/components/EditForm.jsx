import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';


function EditForm({userId}) {

  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [avatar, setAvatar] = useState('https://robohash.org/impeditofficiaporro.png?size=50x50&set=set1');
  const [jobTitle, setJobTitle] = useState('');
  const [location, setLocation] = useState('');
  const [profilePic, setProfilePic] = useState('http://dummyimage.com/100x100.png/cc0000/ffffff');

  const getUser = async (userId) => {
    const response = await fetch(`http://localhost:8000/api/users/${userId}`);

    const data = await response.json();
    const user = data;

    setFirstName(user.firstName);
    setLastName(user.lastName);
    setAvatar(user.avatar);
    setJobTitle(user.jobTitle);
    setLocation(user.location);
    setProfilePic(user.profilePic);
  }

  const updateUser = async (userId, updatedUser) => {
    if(window.confirm('Are you sure you want to update user?')){
      try {
        const response = await fetch(`http://localhost:8000/api/users/${userId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'SameSite': 'None'
          },
          body: JSON.stringify(updatedUser)
        });

        const data = await response.json();

        console.log('User Updated!', data);
      } catch(error) {
        console.log(error.message);
      }

      navigate(`/users/${userId}`);

    }


  }


  const handleSubmit = (event) => {
    event.preventDefault();

    const updatedUser = {
      firstName,
      lastName,
      avatar,
      jobTitle,
      location,
      profilePic,
    }

    updateUser(userId, updatedUser);

  }

  useEffect(() => {
    getUser(userId);
  },[userId]);

  return (
    <div className='edit-form'>
      <div className="container">

        <form className='form' onSubmit={handleSubmit}>
              <input type='text' placeholder='Enter First Name' value={firstName} onChange={(event) => setFirstName(event.target.value)} />
              <input type='text' placeholder='Enter Last Name' value={lastName} onChange={(event) => setLastName(event.target.value)} />
              <input type='text' placeholder='Enter Avatar URL' value={avatar} onChange={(event) => setAvatar(event.target.value)} />
              <input type='text' placeholder='Enter Job Title' value={jobTitle} onChange={(event) => setJobTitle(event.target.value)} />
              <input type='text' placeholder='Enter Location' value={location} onChange={(event) => setLocation(event.target.value)} />
              <button type='update'>Update User</button>
        </form>
      </div>
    </div>
  )
}

export default EditForm
