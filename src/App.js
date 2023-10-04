import { useEffect, useState } from 'react';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import { extractLocations, getEvents } from './api';

import './App.css';

const App = () => {
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");

  useEffect(() => {
    fetchData();
  }, [currentCity, currentNOE]); // Add currentNOE as a dependency

  const fetchData = async () => {
    const allEvents = await getEvents();
    const filteredEvents = currentCity === "See all cities"
      ? allEvents
      : allEvents.filter(event => event.location === currentCity);
    setEvents(filteredEvents.slice(0, currentNOE));
    setAllLocations(extractLocations(allEvents));
  };

  const handleInputChange = (event) => {
    const value = parseInt(event.target.value);
    setCurrentNOE(value);
    fetchData();
  };

  return (
    <div className="App">
      <CitySearch allLocations={allLocations} setCurrentCity={setCurrentCity} />
      <EventList events={events} numberOfEvents={currentNOE} />
      <NumberOfEvents
        id="number-of-events-component"
        numberOfEvents={currentNOE}
        onInputChange={handleInputChange}// Pass the callback function to the NumberOfEvents component
      />
    </div>
  );
}

export default App;