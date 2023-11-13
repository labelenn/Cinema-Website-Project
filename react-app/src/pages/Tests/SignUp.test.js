import { render, screen, fireEvent } from "@testing-library/react";
import SignUp from "../SignUp";
import { BrowserRouter } from "react-router-dom";

// Global data for tests.
let container;

// Initialize data for testing.

beforeEach(() => {
    const utils = render(
    <BrowserRouter>
      <SignUp/>
    </BrowserRouter>
    );
    container = utils.container;
  });
  
// Test to see if Sign Up page renders.
test("Render Sign Up Page", () => {
  expect(container).toBeInTheDocument();
});

// Test to see if Sign Up input fields are rendering correctly
// and getting the right values.
test("Sign up inputs", () => {
  const firstname = screen.getByLabelText("First Name");
  const lastname = screen.getByLabelText("Last Name");
  const email = screen.getByLabelText("Email");
  const password = screen.getByLabelText("Password");

  // Simulate input
  fireEvent.change(firstname, { target: { value: "Test" } });
  fireEvent.change(lastname, { target: { value: "User" } });
  fireEvent.change(email, { target: { value: "test@gmail.com "} });
  fireEvent.change(password, { target: { value: "Aa12345!" } });

  // Check if input is correct
  expect(firstname.value).toBe("Test");
  expect(lastname.value).toBe("User");
  expect(email.value).toBe("test@gmail.com");
  expect(password.value).toBe("Aa12345!");
});

// Test to see if Sign Up button is functional
// and if it is able to detect that the field has no inputs.
test("Sign up button with no fields", () => {
  const submit = screen.getByDisplayValue("Sign Up");
  fireEvent.click(submit);

  expect(screen.getByText("Please fill out all fields.", { exact: false})).toBeInTheDocument();
});

// Test to see if invalid password format detection is working.
test("Sign up button with invalid password format", () => {
  const firstname = screen.getByLabelText("First Name");
  const lastname = screen.getByLabelText("Last Name");
  const email = screen.getByLabelText("Email");
  const password = screen.getByLabelText("Password");

  // Simulate input
  fireEvent.change(firstname, { target: { value: "Test" } });
  fireEvent.change(lastname, { target: { value: "User" } });
  fireEvent.change(email, { target: { value: "test@gmail.com "} });
  fireEvent.change(password, { target: { value: "a" } });

  // Check if input is correct
  expect(firstname.value).toBe("Test");
  expect(lastname.value).toBe("User");
  expect(email.value).toBe("test@gmail.com");
  expect(password.value).toBe("a");

  const submit = screen.getByDisplayValue("Sign Up");
  fireEvent.click(submit);

  expect(screen.getByText("Password must be at least 8 characters long.", { exact: false})).toBeInTheDocument();
  expect(screen.getByText("Password must contain at least one uppercase letter.", { exact: false})).toBeInTheDocument();
  expect(screen.getByText("Password must contain at least one digit.", { exact: false})).toBeInTheDocument();
  expect(screen.getByText("Password must contain at least one special character (!@#$%^&*).", { exact: false})).toBeInTheDocument();
});