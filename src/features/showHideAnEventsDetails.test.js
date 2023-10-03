import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within, waitFor } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {

    test('An event element is collapsed by default.', ({  given, when, then }) => {
        let AppComponent;
        given('the user has opened the app', () => {
            AppComponent = render(<App />);
        });

        when('the list of upcoming events is displayed',
            async () => {
                const AppDOM = AppComponent.container.firstChild;
                const EventListDOM = AppDOM.querySelector('#event-list');
          
                await waitFor(() => {
                  const EventListItems = within(EventListDOM).queryAllByRole('listitem');
                  expect(EventListItems.length).toBe(32);
                });
        });

        then('each event element should be collapsed, showing only basic event information', () => {
            const eventList = AppComponent.container.querySelector('#event-list');
            const eventElements = within(eventList).queryAllByRole('listitem');
            eventElements.forEach((eventElement) => {
              const details = within(eventElement).queryByTestId('details-section');
              expect(details).not.toBeInTheDocument();
            });
        });
    });

    test('User can expand an event to see details.', ({ given, when, then  }) => {
        let AppComponent;
        given('the user has opened the app and the list of upcoming events is displayed',  async () => {
            AppComponent = render(<App />);
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');
      
            await waitFor(() => {
              const EventListItems = within(EventListDOM).queryAllByRole('listitem');
              expect(EventListItems.length).toBe(32);
            });
          });

        let expandedEventElement;
        when('the user clicks on an event element', async () => {
            const eventList = AppComponent.container.querySelector('#event-list');
            const eventElements = within(eventList).queryAllByRole('listitem');
            // Assuming the first event element is already expanded
            const expandButton = within(eventElements[0]).queryByTestId('expand-button');
            userEvent.click(expandButton);
            expandedEventElement = eventElements[0];      
        });

        then('the event element should expand, showing additional details about the event', () => {
            const details = within(expandedEventElement).queryByTestId('details-section');
            expect(details).toBeDefined();
          });
    });

    test('User can collapse an event to hide details.', ({ given, when, then }) => {
        let AppComponent;
        let expandedEventElement;
        given('the user has opened the app and clicked on the first event show details button', () => {
            AppComponent = render(<App />);
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');
            
            // Use then() to handle the asynchronous part
            return waitFor(() => {
              const EventListItems = within(EventListDOM).queryAllByRole('listitem');
              expect(EventListItems.length).toBe(32);
            }).then(() => {
              const eventList = AppComponent.container.querySelector('#event-list');
              const eventElements = within(eventList).queryAllByRole('listitem');
              // Assuming the first event element is already expanded
              const expandButton = within(eventElements[0]).queryByTestId('expand-button');
              userEvent.click(expandButton);
              expandedEventElement = eventElements[0];
            });
          });
        when('the user clicks on the hide details button', () => {
            if (!expandedEventElement) {
                throw new Error('Expanded event element is not defined');
              }
        
              const hideDetailsButton = within(expandedEventElement).queryByTestId('hide-details-button');
              userEvent.click(hideDetailsButton);
            });

        then('the event element should collapse, hiding the additional details about the event', () => {
            if (!expandedEventElement) {
                throw new Error('Expanded event element is not defined');
              }
        
              const details = within(expandedEventElement).queryByTestId('details-section');
              expect(details).not.toBeInTheDocument();
            });
        });
});