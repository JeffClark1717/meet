import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NumberOfEvents from "../components/NumberOfEvents";

describe("<NumberOfEvents /> component", () => {
  test("renders number of events text input", () => {
    render(<NumberOfEvents currentNOE={32} setCurrentNOE={jest.fn()} />);
    const numberTextBox = screen.queryByRole("textbox");
    expect(numberTextBox).toBeInTheDocument();
    expect(numberTextBox).toHaveClass("number-of-events-input");
  });

  test("default number is 32", async () => {
    render(<NumberOfEvents currentNOE={32} setCurrentNOE={jest.fn()} />);
    const numberTextBox = screen.queryByRole("textbox");
    expect(numberTextBox).toHaveValue("32");
  });

  test("number of events text box value changes when the user types in it", async () => {
    const handleEventNumberChange = jest.fn();
    render(
      <NumberOfEvents currentNOE={32} setCurrentNOE={handleEventNumberChange} />
    );

    const user = userEvent.setup();
    const numberTextBox = screen.queryByRole("textbox");
    await user.type(numberTextBox, "123");

    expect(handleEventNumberChange).toHaveBeenCalled();
  });
});
