import { loadFeature, defineFeature } from "jest-cucumber";
import { render, screen, fireEvent, waitFor, within } from "@testing-library/react"; // Add 'within' import

// import components
import App from "../App";

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {
test('When user hasn\'t specified a number, 32 is the default number', ({ given, when,then }) => {
    given('the main page is open', () => {
        render(<App />);
    });
    when('the user doesn\'t specify the number of events visible', () => {

    });

    then('the default number should be 32', () => {
        const defaultNumber = screen.getByTestId('number-of-events-component').value;
        expect(Number(defaultNumber)).toBe(32);
    });
});

  test('User can change the number of events', ({ given, when, then }) => {
    let AppComponent;
    given('the main page is open', () => {
      AppComponent = render(<App />);
    });

    when('the user specifies the number of events visible', async() => {
      const input = screen.getByTestId('number-of-events-component');
      fireEvent.change(input, { target: { value: '10' } });
      await waitFor(() => {
        expect(input.value).toBe('10');
      });
    });

    then('the user should be able to see events equal to the given number at once', () => {
        const eventList = screen.getByTestId('event-list');
        const eventItems = within(eventList).queryAllByRole('listitem');
        expect(eventItems.length).toBe(10); // Replace 10 with the expected number of events based on your test data.
    
    });
  });
});