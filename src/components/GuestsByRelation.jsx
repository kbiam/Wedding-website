import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import Navbar from './Navbar';

const GuestsByRelation = ({ relation }) => {
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { token } = useContext(AuthContext);
  const [sideFilter, setSideFilter] = useState('');

  useEffect(() => {
    fetchGuests();
  }, [token, relation, sideFilter]);

  const fetchGuests = async () => {
    try {
      setLoading(true);
      
      let url = `http://localhost:5000/api/guests?relation=${relation}`;
      
      if (sideFilter) {
        url += `&side=${sideFilter}`;
      }
      
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      setGuests(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch guests');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInvite = async (id, currentStatus) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/guests/${id}/invite`,
        { is_invited: !currentStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      setGuests(guests.map(guest => 
        guest.id === id ? { ...guest, is_invited: !guest.is_invited } : guest
      ));
    } catch (err) {
      setError('Failed to update invitation status');
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this guest?')) {
      return;
    }
    
    try {
      await axios.delete(`http://localhost:5000/api/guests/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      setGuests(guests.filter(guest => guest.id !== id));
    } catch (err) {
      setError('Failed to delete guest');
      console.error(err);
    }
  };

  const relationTitle = {
    family: 'Family Members',
    friend: 'Friends',
    relative: 'Relatives',
    other: 'Other Guests'
  };

  return (
    <div className="min-h-screen bg-gray-100">
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">{relationTitle[relation] || 'Guests'}</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <div className="bg-white p-6 rounded shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Guest List</h2>
            
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Filter by Side</label>
              <select
                value={sideFilter}
                onChange={(e) => setSideFilter(e.target.value)}
                className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">All</option>
                <option value="bride">Bride</option>
                <option value="groom">Groom</option>
              </select>
            </div>
          </div>
          
          {loading ? (
            <div className="text-center py-4">Loading...</div>
          ) : guests.length === 0 ? (
            <div className="text-center py-4 text-gray-500">No {relation} guests found</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">Name</th>
                    <th className="py-3 px-6 text-left">Phone</th>
                    <th className="py-3 px-6 text-center">Side</th>
                    <th className="py-3 px-6 text-center">Invited</th>
                    <th className="py-3 px-6 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm">
                  {guests.map((guest) => (
                    <tr key={guest.id} className="border-b border-gray-200 hover:bg-gray-100">
                      <td className="py-3 px-6 text-left whitespace-nowrap">
                        {guest.name}
                      </td>
                      <td className="py-3 px-6 text-left">
                        {guest.phone}
                      </td>
                      <td className="py-3 px-6 text-center capitalize">
                        {guest.side}
                      </td>
                      <td className="py-3 px-6 text-center">
                        <span className={`py-1 px-3 rounded-full text-xs ${
                          guest.is_invited ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                        }`}>
                          {guest.is_invited ? 'Yes' : 'No'}
                        </span>
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div className="flex item-center justify-center space-x-2">
                          <button
                            onClick={() => handleInvite(guest.id, guest.is_invited)}
                            className={`transform hover:scale-110 ${
                              guest.is_invited
                                ? 'bg-yellow-500 hover:bg-yellow-600'
                                : 'bg-green-500 hover:bg-green-600'
                            } text-white py-1 px-2 rounded text-xs`}
                          >
                            {guest.is_invited ? 'Uninvite' : 'Invite'}
                          </button>
                          <button
                            onClick={() => handleDelete(guest.id)}
                            className="transform hover:scale-110 bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded text-xs"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GuestsByRelation;