import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import Navbar from './Navbar';

const Statistics = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { token } = useContext(AuthContext);

  useEffect(() => {
    fetchStatistics();
  }, [token]);

  const fetchStatistics = async () => {
    try {
      setLoading(true);
      
      const response = await axios.get('http://localhost:5000/api/statistics', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      setStats(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch statistics');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="container mx-auto px-4 py-8 text-center">
          Loading statistics...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Wedding Statistics</h1>
        
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-2">Total Guests</h2>
              <p className="text-4xl font-bold text-blue-600">{stats.total}</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-2">Bride's Side</h2>
              <p className="text-4xl font-bold text-pink-600">{stats.bride}</p>
              <p className="text-sm text-gray-500 mt-2">
                {stats.total > 0 ? ((stats.bride / stats.total) * 100).toFixed(1) : 0}% of total
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-2">Groom's Side</h2>
              <p className="text-4xl font-bold text-indigo-600">{stats.groom}</p>
              <p className="text-sm text-gray-500 mt-2">
                {stats.total > 0 ? ((stats.groom / stats.total) * 100).toFixed(1) : 0}% of total
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-2">Invited</h2>
              <p className="text-4xl font-bold text-green-600">{stats.invited}</p>
              <p className="text-sm text-gray-500 mt-2">
                {stats.total > 0 ? ((stats.invited / stats.total) * 100).toFixed(1) : 0}% of total
              </p>
            </div>
            
            {/* New card for Total Attending People */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-2">Total Attending</h2>
              <div className="flex items-end gap-2">
                <p className="text-4xl font-bold text-purple-600">{stats.totalAttendingCount || 0}</p>
                <p className="text-lg text-gray-500 mb-1">people</p>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                From {stats.attending} guest groups
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 col-span-1 md:col-span-2 lg:col-span-3">
              <h2 className="text-lg font-semibold mb-4">Relation Breakdown</h2>
              <div className="space-y-4">
                {stats.relationBreakdown.map((item) => (
                  <div key={item.relation}>
                    <div className="flex justify-between mb-1">
                      <span className="capitalize">{item.relation}</span>
                      <span>{item.count} ({((item.count / stats.total) * 100).toFixed(1)}%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className={`h-2.5 rounded-full ${
                          item.relation === 'family' ? 'bg-blue-600' :
                          item.relation === 'friend' ? 'bg-green-600' :
                          item.relation === 'relative' ? 'bg-yellow-600' : 'bg-purple-600'
                        }`}
                        style={{ width: `${(item.count / stats.total) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 col-span-1 md:col-span-2 lg:col-span-4">
              <h2 className="text-lg font-semibold mb-4">Invitation & Attendance Status</h2>
              <div className="flex flex-col space-y-6">
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Invited</span>
                    <span>{stats.invited} of {stats.total}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="h-2.5 rounded-full bg-green-600"
                      style={{ width: `${(stats.invited / stats.total) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Attending Invitations</span>
                    <span>{stats.attending} of {stats.invited || 1}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="h-2.5 rounded-full bg-blue-600"
                      style={{ width: `${(stats.attending / (stats.invited || 1)) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Total People Attending</span>
                    <span>{stats.totalAttendingCount || 0} people</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="h-2.5 rounded-full bg-purple-600"
                      style={{ width: `${stats.attending > 0 ? 100 : 0}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Average of {stats.attending > 0 ? (stats.totalAttendingCount / stats.attending).toFixed(1) : 0} people per attending group
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Statistics;