import { render, screen, fireEvent } from "@testing-library/react";
import Profile from "../Profile";
import { BrowserRouter } from "react-router-dom";

// Global data for tests.
let container;

// Initialize data for testing.

beforeEach(() => {
    const utils = render(
    <BrowserRouter>
      <Profile/>
    </BrowserRouter>
    );
    container = utils.container;
  });
  
// Test to see if Profile page renders.
test("Render Profile Page", () => {
  expect(container).toBeInTheDocument();
});

// Test to see if Profile page has the right text output
test("Profile display", () => {
  expect(screen.getByText("Name", { exact: false })).toBeInTheDocument();
  expect(screen.getByText("Email", { exact: false })).toBeInTheDocument();
  expect(screen.getByText("Joined", { exact: false })).toBeInTheDocument();
});


// When edit is selected, test if the input fields are rendering correctly.
test("Profile edit input fields", () => {
  const edit = screen.getByDisplayValue("Edit Profile");
  fireEvent.click(edit);

  expect(screen.getByText("Edit Profile", { exact: false })).toBeInTheDocument();
  expect(screen.getByText("First Name", { exact: false })).toBeInTheDocument();
  expect(screen.getByText("Last Name", { exact: false })).toBeInTheDocument();
  expect(screen.getByText("Email", { exact: false })).toBeInTheDocument();
  expect(screen.getByText("Password", { exact: false })).toBeInTheDocument();

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

// When delete is selected, test if the prompts are rendering correctly.
test("Profile delete prompts", () => {
  const del = screen.getByDisplayValue("Delete Profile");
  fireEvent.click(del);

  expect(screen.getByText("Are you sure you want to delete your profile?", { exact: false })).toBeInTheDocument();
  expect(screen.getByText("All your information and reviews will be deleted permanently.", { exact: false })).toBeInTheDocument();
  expect(screen.getByText("Yes", { exact: false })).toBeInTheDocument();
  expect(screen.getByText("No", { exact: false })).toBeInTheDocument();
});

