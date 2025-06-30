import React, { useState, useEffect } from 'react';
import userService from '../services/userService';
import { useAuth } from '../context/AuthContext';

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { token } = useAuth(); // Token from AuthContext

  useEffect(() => {
    const fetchUsers = async () => {
      if (!token) {
        setError('Authentication token not found.');
        setLoading(false);
        return;
      }
      try {
        const data = await userService.getAllUsers(token);
        setUsers(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch users. You may not have permission.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [token]);

  if (loading) {
    return <div className="p-8 text-center">Loading users...</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">Error: { error }</div>;
  }

  return (
    <div className="container p-4 mx-auto sm:p-8">
      <h1 className="mb-6 text-3xl font-bold">Admin Dashboard - User Management</h1>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">Name</th>
              <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">Email</th>
              <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">Role</th>
              <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">Provider</th>
            </tr>
          </thead>
          <tbody>
            { users.map((user) => (
              <tr key={ user._id } className="hover:bg-gray-50">
                <td className="px-5 py-5 text-sm bg-transparent border-b border-gray-200">
                  <p className="text-gray-900 whitespace-no-wrap">{ user.name }</p>
                </td>
                <td className="px-5 py-5 text-sm bg-transparent border-b border-gray-200">
                  <p className="text-gray-900 whitespace-no-wrap">{ user.email }</p>
                </td>
                <td className="px-5 py-5 text-sm bg-transparent border-b border-gray-200">
                  <span className={ `relative inline-block px-3 py-1 font-semibold leading-tight ${user.role === 'admin' ? 'text-green-900' : 'text-gray-700'}` }>
                    <span aria-hidden className={ `absolute inset-0 ${user.role === 'admin' ? 'bg-green-200' : 'bg-gray-200'} rounded-full opacity-50` }></span>
                    <span className="relative">{ user.role }</span>
                  </span>
                </td>
                <td className="px-5 py-5 text-sm bg-transparent border-b border-gray-200">
                  <p className="text-gray-900 whitespace-no-wrap">{ user.provider }</p>
                </td>
              </tr>
            )) }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPage;