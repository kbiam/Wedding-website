import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import Navbar from './Navbar';
import { api } from '@/utils/api';
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
      
      const response = await api.get('/statistics', {
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
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <Navbar />
        <div className="container mx-auto px-4 py-12 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600 font-medium">Loading statistics...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <Navbar />
        <div className="container mx-auto px-4 py-12">
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow">
            <div className="flex items-center">
              <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <p className="font-medium">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-2 text-center text-gray-800">Wedding Statistics</h1>
        <p className="text-center text-gray-600 mb-12">Overview of your wedding guest information</p>
        
        {stats && (
          <div className="space-y-8">
            {/* Primary Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6 transform transition-transform hover:scale-105 border-t-4 border-blue-500">
                <h2 className="text-lg font-semibold mb-2 text-gray-700">Total Guests</h2>
                <p className="text-4xl font-bold text-blue-600">{stats.total}</p>
                <p className="text-sm text-gray-500 mt-2">Guest groups</p>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-6 transform transition-transform hover:scale-105 border-t-4 border-pink-500">
                <h2 className="text-lg font-semibold mb-2 text-gray-700">Bride's Side</h2>
                <p className="text-4xl font-bold text-pink-600">{stats.bride}</p>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
                  <div 
                    className="h-1.5 rounded-full bg-pink-500" 
                    style={{ width: `${stats.total > 0 ? (stats.bride / stats.total) * 100 : 0}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  {stats.total > 0 ? ((stats.bride / stats.total) * 100).toFixed(1) : 0}% of total
                </p>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-6 transform transition-transform hover:scale-105 border-t-4 border-indigo-500">
                <h2 className="text-lg font-semibold mb-2 text-gray-700">Groom's Side</h2>
                <p className="text-4xl font-bold text-indigo-600">{stats.groom}</p>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
                  <div 
                    className="h-1.5 rounded-full bg-indigo-500" 
                    style={{ width: `${stats.total > 0 ? (stats.groom / stats.total) * 100 : 0}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  {stats.total > 0 ? ((stats.groom / stats.total) * 100).toFixed(1) : 0}% of total
                </p>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-6 transform transition-transform hover:scale-105 border-t-4 border-green-500">
                <h2 className="text-lg font-semibold mb-2 text-gray-700">Invited</h2>
                <p className="text-4xl font-bold text-green-600">{stats.invited}</p>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
                  <div 
                    className="h-1.5 rounded-full bg-green-500" 
                    style={{ width: `${stats.total > 0 ? (stats.invited / stats.total) * 100 : 0}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  {stats.total > 0 ? ((stats.invited / stats.total) * 100).toFixed(1) : 0}% of total
                </p>
              </div>
            </div>
            
            {/* Attendance Stats */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-6 text-gray-800 border-b pb-2">Attendance Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="font-medium text-gray-700">Invited Groups</span>
                      <span className="font-bold text-gray-800">{stats.invited} of {stats.total}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                      <div
                        className="h-2.5 rounded-full bg-green-600 transition-all duration-500"
                        style={{ width: `${(stats.invited / stats.total) * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 text-right">
                      {((stats.invited / stats.total) * 100).toFixed(1)}%
                    </p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="font-medium text-gray-700">Attending Groups</span>
                      <span className="font-bold text-gray-800">{stats.attending} of {stats.invited || 1}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                      <div
                        className="h-2.5 rounded-full bg-blue-600 transition-all duration-500"
                        style={{ width: `${(stats.attending / (stats.invited || 1)) * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 text-right">
                      {((stats.attending / (stats.invited || 1)) * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="text-center">
                    <h3 className="font-medium text-gray-700 mb-2">Total People Attending</h3>
                    <div className="flex items-center justify-center">
                      <p className="text-5xl font-bold text-purple-600">{stats.totalAttendingCount || 0}</p>
                      <p className="ml-2 text-lg text-gray-600">people</p>
                    </div>
                    <div className="mt-4 text-sm text-gray-500">
                      From {stats.attending} attending groups
                    </div>
                    <div className="mt-4 p-2 bg-purple-100 rounded-lg inline-block">
                      <span className="font-medium text-purple-800">
                        {stats.attending > 0 ? (stats.totalAttendingCount / stats.attending).toFixed(1) : 0} people
                      </span> 
                      <span className="text-purple-600"> per group</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Relation Breakdown */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-6 text-gray-800 border-b pb-2">Relation Breakdown</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-6">
                  {stats.relationBreakdown.map((item) => (
                    <div key={item.relation} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between mb-2">
                        <span className="capitalize font-medium text-gray-700">{item.relation}</span>
                        <span className="font-semibold">{item.count}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div
                          className={`h-3 rounded-full ${
                            item.relation === 'family' ? 'bg-blue-600' :
                            item.relation === 'friend' ? 'bg-green-600' :
                            item.relation === 'relative' ? 'bg-yellow-600' : 'bg-purple-600'
                          } transition-all duration-500`}
                          style={{ width: `${(item.count / stats.total) * 100}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1 text-right">
                        {((item.count / stats.total) * 100).toFixed(1)}%
                      </p>
                    </div>
                  ))}
                </div>
                
                <div className="bg-gray-50 rounded-lg p-6 flex items-center justify-center">
                  <div className="text-center">
                    <div className="mb-4">Distribution by relation</div>
                    <div className="grid grid-cols-2 gap-4">
                      {stats.relationBreakdown.map((item) => (
                        <div key={`chart-${item.relation}`} className="flex flex-col items-center bg-white p-2 rounded shadow">
                          <div className={`w-12 h-12 rounded-full mb-2 flex items-center justify-center text-white ${
                            item.relation === 'family' ? 'bg-blue-600' :
                            item.relation === 'friend' ? 'bg-green-600' :
                            item.relation === 'relative' ? 'bg-yellow-600' : 'bg-purple-600'
                          }`}>
                            {item.count}
                          </div>
                          <div className="capitalize text-sm font-medium">{item.relation}</div>
                        </div>
                      ))}
                    </div>
                  </div>
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