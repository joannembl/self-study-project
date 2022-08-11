import React, { useParams } from 'react-router';
import EditForm from '../components/EditForm';
import LinkButton from '../components/LinkButton';
import Header from "../components/Header";
import Footer from "../components/Footer";


function EditUser() {
  const {id} = useParams();

  return (
    <div className='container'>
      <Header />
      <div className="edit-user">
        <h3>Edit User Form</h3>
        <EditForm userId={id} />
        <LinkButton to={`/users/${id}`} text={'Back'}/>
      </div>
      <Footer />
    </div>
  )
}

export default EditUser
