import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GooglePlacesExample = () => {
  const [placeNames, setPlaceNames] = useState([]);

  // const apiKey = 'YOUR_API_KEY';
  const apiKey = 'AIzaSyC5q8Jza-ZyHZEXeHQ_kQ9YqR5m8wVhRmA';
  const location = '37.7749,-122.4194'; // Example: '37.7749,-122.4194'
  // const location = 'LAT,LNG'; // Example: '37.7749,-122.4194'
  const radius = 1000; // Example: 1000 meters

  const apiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=${radius}&key=${apiKey}`;

  useEffect(() => {
    axios.get(apiUrl)
      .then(response => {
        if (response.status === 200) {
          const data = response.data;
          if (data.results && data.results.length > 0) {
            const names = data.results.map(result => result.name);
            setPlaceNames(names);
          } else {
            console.log('No results found');
          }
        } else {
          console.log('API request failed');
        }
      })
      .catch(error => {
        console.error('An error occurred:', error);
      });
  }, [apiUrl]);

  return (
    <div>
      <h1>Place Names</h1>
      <ul>
        {placeNames.map((name, index) => (
          <li key={index}>{name}</li>
        ))}
      </ul>
    </div>
  );
};

export default GooglePlacesExample;