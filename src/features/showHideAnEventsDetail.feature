Feature: SHOW/HIDE EVENT DETAILS
    Scenario: An event element is collapsed by default.
        Given the user has opened the app
        When the list of upcoming events is displayed
        Then each event element should be collapsed, showing only basic event information

    Scenario: User can expand an event to see details.
        Given the user has opened the app and the list of upcoming events is displayed
        When the user clicks on an event element
        Then the event element should expand, showing additional details about the event

    Scenario: User can collapse an event to hide details.
        Given the user has opened the app and clicked on the first event show details button
        When the user clicks on the hide details button
        Then the event element should collapse, hiding the additional details about the event