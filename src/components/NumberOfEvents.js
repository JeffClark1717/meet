const NumberOfEvents = ({ currentNOE, setCurrentNOE }) => {
  const handleInputChanged = (event) => {
    const value = event.target.value;
    setCurrentNOE(value);
  };

  return (
    <div id="number-of-events" data-testid="number-of-events">
      <label htmlFor="number-of-events-input">Number of Events: </label>
      <input
        type="text"
        data-testid="number-of-events-input"
        id="number-of-events-input"
        className="number-of-events-input"
        value={currentNOE}
        placeholder="Enter a number"
        onChange={handleInputChanged}
      />
    </div>
  );
};

export default NumberOfEvents;
