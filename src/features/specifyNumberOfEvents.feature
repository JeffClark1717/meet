Feature: Specify number of events

Scenario: When user hasn't specified a number, 32 is the default number
    Given the main page is open
    When the user doesn't specify the number of events visible
    Then the default number should be 32

Scenario: User can change the number of events
    Given the main page is open
    When the user specifies the number of events visible
    Then the user should be able to see events equal to the given number at once