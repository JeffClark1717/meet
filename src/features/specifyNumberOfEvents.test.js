import { loadFeature, defineFeature } from "jest-cucumber";
import { render, screen, waitFor, within } from "@testing-library/react"; // Add 'within' import
import userEvent from "@testing-library/user-event";

// import components
import App from "../App";

const feature = loadFeature("./src/features/specifyNumberOfEvents.feature");

defineFeature(feature, (test) => {
  test("When user hasn't specified a number, 32 is the default number", ({
    given,
    when,
    then,
  }) => {
    given("the main page is open", () => {
      render(<App />);
    });
    when("the user doesn't specify the number of events visible", () => {});

    then("the default number should be 32", () => {
      const defaultNumber = screen.getByTestId("number-of-events-input").value;
      expect(Number(defaultNumber)).toBe(32);
    });
  });

  test("User can change the number of events", ({ given, when, then }) => {
    given("the main page is open", () => {
      render(<App />);
    });

    when("the user specifies the number of events visible", async () => {
      const numberTextBox = screen.getByPlaceholderText("Enter a number");
      await userEvent.type(numberTextBox, "10");
    });

    then(
      "the user should be able to see events equal to the given number at once",
      async () => {
        await waitFor(() => {
          const eventListItems = screen.queryAllByRole("listitem");
          expect(eventListItems.length).toBe(10);
        });
      }
    );
  });
});
