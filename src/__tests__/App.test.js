import { render, within, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { getEvents } from "../api";
import App from "../App";

describe("<App /> component", () => {
  test("renders list of events", () => {
    render(<App />);
    expect(screen.getByTestId("event-list")).toBeInTheDocument();
  });

  test("render CitySearch", () => {
    render(<App />);
    expect(screen.getByTestId("city-search")).toBeInTheDocument();
  });

  test("render NumberOfEvents", () => {
    render(<App />);
    expect(screen.getByTestId("number-of-events")).toBeInTheDocument();
  });
});

describe("<App /> integration", () => {
  test("renders a list of events matching the city selected by the user", async () => {
    render(<App />);

    const citySearchInput = screen.getByPlaceholderText("Search for a city");
    await userEvent.type(citySearchInput, "Berlin");
    const berlinSuggestionItems = screen.getAllByText("Berlin, Germany");
    const berlinSuggestionItem = berlinSuggestionItems[0];
    await userEvent.click(berlinSuggestionItem);
    const eventList = screen.getByTestId("event-list");
    const eventItems = within(eventList).queryAllByRole("listitem");
    expect(eventList).toBeInTheDocument();
    expect(eventItems.length).toBeGreaterThan(0);
    expect(eventItems[0]).toHaveTextContent("Berlin, Germany");
  });
});
