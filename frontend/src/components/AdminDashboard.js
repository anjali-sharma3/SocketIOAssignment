// import React, { useEffect, useState } from 'react';
// import Swal from 'sweetalert2';
// import './AdminDashboard.css';

// function AdminDashboard() {
//   const [users, setUsers] = useState([]);
//   const [showCreateModal, setShowCreateModal] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [selectedUser, setSelectedUser] = useState(null);

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     const response = await fetch('http://localhost:5000/api/admin/active');
//     const data = await response.json();
//     setUsers(data);
//   };

//   const handleDelete = async (id) => {
//     const result = await Swal.fire({
//       title: 'Are you sure?',
//       text: 'You won’t be able to revert this!',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonText: 'Yes, delete it!',
//     });

//     if (result.isConfirmed) {
//       await fetch(`http://localhost:5000/api/admin/delete/${id}`, { method: 'DELETE' });
//       fetchUsers();
//       Swal.fire('Deleted!', 'User has been deleted.', 'success');
//     }
//   };

//   const handleEdit = (user) => {
//     setSelectedUser(user);
//     setShowEditModal(true);
//   };

//   const handleUpdate = async () => {
//     await fetch(`http://localhost:5000/api/admin/update/${selectedUser._id}`, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(selectedUser),
//     });
//     setShowEditModal(false);
//     fetchUsers();
//     Swal.fire('Updated!', 'User has been updated.', 'success');
//   };

//   const handleCreateUser = async (newUser) => {
//     await fetch('http://localhost:5000/api/admin/create', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(newUser),
//     });
//     setShowCreateModal(false);
//     fetchUsers();
//   };

//   return (
//     <div className="admin-dashboard">
//       <button className='primary-button' onClick={() => setShowCreateModal(true)}>Create User</button>

//       <table>
//         <thead>
//           <tr>
//             <th>First Name</th>
//             <th>Last Name</th>
//             <th>Email</th>
//             <th>Score</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map(user => (
//             <tr key={user._id}>
//               <td>{user.firstName}</td>
//               <td>{user.lastName}</td>
//               <td>{user.email}</td>
//               <td>{user.bananaClicks || 0}</td>
//               <td>
//                 <button className='tertiary-button' onClick={() => handleEdit(user)}>Edit</button>
//                 <button className='secondary-button' onClick={() => handleDelete(user._id)}>Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {showCreateModal && (
//         <CreateUserModal onCreate={handleCreateUser} onClose={() => setShowCreateModal(false)} />
//       )}
//       {showEditModal && selectedUser && (
//         <EditUserModal user={selectedUser} onUpdate={handleUpdate} onClose={() => setShowEditModal(false)} />
//       )}
//     </div>
//   );
// }

// function CreateUserModal({ onCreate, onClose }) {
//   const [newUser, setNewUser] = useState({ firstName: '', lastName: '', email: '', password: '', score: 0, role: 'player' });

//   return (
//     <div className="modal">
//       <h2>Create User</h2>
//       <input type="text" placeholder="First Name" onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })} />
//       <input type="text" placeholder="Last Name" onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })} />
//       <input type="email" placeholder="Email" onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
//       <input type="password" placeholder="Password" onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} />
//       <input type="number" placeholder="Score" value={newUser.score} onChange={(e) => setNewUser({ ...newUser, score: Number(e.target.value) })} />
//       <button className='tertiary-button' onClick={() => onCreate(newUser)}>Create</button>
//       <button className='tertiary-button-gray' onClick={onClose}>Cancel</button>
//     </div>
//   );
// }

// function EditUserModal({ user, onUpdate, onClose }) {
//   const [updatedUser, setUpdatedUser] = useState(user);

//   useEffect(() => {
//     setUpdatedUser(user);
//   }, [user]);

//   return (
//     <div className="modal">
//       <h2>Edit User</h2>
//       <input type="text" value={updatedUser.firstName} onChange={(e) => setUpdatedUser({ ...updatedUser, firstName: e.target.value })} />
//       <input type="text" value={updatedUser.lastName} onChange={(e) => setUpdatedUser({ ...updatedUser, lastName: e.target.value })} />
//       <input type="email" value={updatedUser.email} onChange={(e) => setUpdatedUser({ ...updatedUser, email: e.target.value })} />
//       <input type="number" value={updatedUser.score} onChange={(e) => setUpdatedUser({ ...updatedUser, score: Number(e.target.value) })} />
//       <button className='tertiary-button' onClick={() => onUpdate(updatedUser)}>Update</button>
//       <button className='tertiary-button-gray' onClick={onClose}>Cancel</button>
//     </div>
//   );
// }

// export default AdminDashboard;












import React, { useEffect, useState } from 'react';
import {useNavigate} from "react-router-dom"
import Swal from 'sweetalert2';
import './AdminDashboard.css';

function AdminDashboard() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await fetch('http://localhost:5000/api/admin/active');
    const data = await response.json();
    setUsers(data);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You won’t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      await fetch(`http://localhost:5000/api/admin/delete/${id}`, { method: 'DELETE' });
      fetchUsers();
      Swal.fire('Deleted!', 'User has been deleted.', 'success');
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const handleUpdate = async () => {
    await fetch(`http://localhost:5000/api/admin/update/${selectedUser._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(selectedUser),
    });
    setShowEditModal(false);
    fetchUsers();
    Swal.fire('Updated!', 'User has been updated.', 'success');
  };

  const handleCreateUser = async (newUser) => {
    await fetch('http://localhost:5000/api/admin/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser),
    });
    setShowCreateModal(false);
    fetchUsers();
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="admin-dashboard">
      <button className='logout-button' onClick={handleLogout}>Logout</button>
      <button className='primary-button' onClick={() => setShowCreateModal(true)}>Create User</button>

      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Score</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.bananaClicks || 0}</td>
              <td>
                <button className='tertiary-button' onClick={() => handleEdit(user)}>Edit</button>
                <button className='secondary-button' onClick={() => handleDelete(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showCreateModal && (
        <CreateUserModal onCreate={handleCreateUser} onClose={() => setShowCreateModal(false)} />
      )}
      {showEditModal && selectedUser && (
        <EditUserModal user={selectedUser} onUpdate={handleUpdate} onClose={() => setShowEditModal(false)} />
      )}
    </div>
  );
}

function CreateUserModal({ onCreate, onClose }) {
  const [newUser, setNewUser] = useState({ firstName: '', lastName: '', email: '', password: '', score: 0, role: 'player' });

  return (
    <div className="modal">
      <h2>Create User</h2>
      <input type="text" placeholder="First Name" onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })} />
      <input type="text" placeholder="Last Name" onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })} />
      <input type="email" placeholder="Email" onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
      <input type="password" placeholder="Password" onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} />
      <input type="number" placeholder="Score" value={newUser.score} onChange={(e) => setNewUser({ ...newUser, score: Number(e.target.value) })} />
      <button className='tertiary-button' onClick={() => onCreate(newUser)}>Create</button>
      <button className='tertiary-button-gray' onClick={onClose}>Cancel</button>
    </div>
  );
}

function EditUserModal({ user, onUpdate, onClose }) {
  const [updatedUser, setUpdatedUser] = useState(user);

  useEffect(() => {
    setUpdatedUser(user);
  }, [user]);

  return (
    <div className="modal">
      <h2>Edit User</h2>
      <input type="text" value={updatedUser.firstName} onChange={(e) => setUpdatedUser({ ...updatedUser, firstName: e.target.value })} />
      <input type="text" value={updatedUser.lastName} onChange={(e) => setUpdatedUser({ ...updatedUser, lastName: e.target.value })} />
      <input type="email" value={updatedUser.email} onChange={(e) => setUpdatedUser({ ...updatedUser, email: e.target.value })} />
      <input type="number" value={updatedUser.score} onChange={(e) => setUpdatedUser({ ...updatedUser, score: Number(e.target.value) })} />
      <button className='tertiary-button' onClick={() => onUpdate(updatedUser)}>Update</button>
      <button className='tertiary-button-gray' onClick={onClose}>Cancel</button>
    </div>
  );
}

export default AdminDashboard;



