import { useEffect, useState } from "react";
import CitySearch from "./components/CitySearch";
import EventList from "./components/EventList";
import NumberOfEvents from "./components/NumberOfEvents";
import { extractLocations, getEvents } from "./api";

import "./App.css";

const App = () => {
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [currentNOE, setCurrentNOE] = useState(32);
    const [allLocations, setAllLocations] = useState([]);
    const [currentCity, setCurrentCity] = useState("See all cities");

    const handleCityChange = (city, numberOfEvents) => {
        setCurrentCity(city);
        const filteredEvents = events.filter((event) => event.location === city);
        let sliced = [];
        if (city === "See all cities") {
            sliced = events.slice(0, numberOfEvents);
        } else {
            sliced = filteredEvents.slice(0, numberOfEvents);
        }
        setFilteredEvents(sliced);
    };

    function onEventNumberChange(number) {
        setCurrentNOE(number);
        handleCityChange(currentCity, number);
    }

    useEffect(() => {
        async function fetchData() {
            const allEvents = await getEvents();
            setAllLocations(extractLocations(allEvents));
            setEvents(allEvents);
        }
        fetchData();
    }, []);

    return (
        <div className="App">
            <h1>Meet App</h1>
            <CitySearch
                allLocations={allLocations}
                setCurrentCity={handleCityChange}
            />
            <NumberOfEvents
                currentNOE={currentNOE}
                setCurrentNOE={onEventNumberChange}
            />
          <div className="events-container"></div>
            <EventList events={filteredEvents.length > 0 ? filteredEvents : events} />

        </div>
    );
};

export default App;
