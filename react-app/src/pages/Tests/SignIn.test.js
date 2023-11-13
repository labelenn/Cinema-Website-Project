import { render, screen, fireEvent } from "@testing-library/react";
import SignIn from "../SignIn";
import { BrowserRouter } from "react-router-dom";

// Global data for tests.
let container;

// Initialize data for testing.

beforeEach(() => {
    const utils = render(
    <BrowserRouter>
      <SignIn/>
    </BrowserRouter>
    );
    container = utils.container;
  });
  
// Test to see if Sign In page renders.
test("Render Sign In Page", () => {
  expect(container).toBeInTheDocument();
});

// Test to see if Sign In input fields are rendering correctly
// and getting the right values.
test("Sign in inputs", () => {
  const email = screen.getByLabelText("Email");
  const password = screen.getByLabelText("Password");

  // Simulate input
  fireEvent.change(email, { target: { value: "test@gmail.com "} });
  fireEvent.change(password, { target: { value: "Aa12345!" } });

  // Check if input is correct
  expect(email.value).toBe("test@gmail.com");
  expect(password.value).toBe("Aa12345!");
});

// Test to see if Sign In button is functional
// and if it is able to detect that the field has no inputs
// and hence, the email and password is invalid.
test("Sign in button with no fields", () => {
  const submit = screen.getByDisplayValue("Sign In");
  fireEvent.click(submit);

  expect(screen.getByText("Email and / or password invalid, please try again.", { exact: false})).toBeInTheDocument();
});