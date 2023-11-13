import { render, screen, fireEvent } from "@testing-library/react";
import Reviews from "../ReviewsPages/Reviews";
import EditReview from "../ReviewsPages/EditReview";
import DeleteReview from "../ReviewsPages/DeleteReview"
import { BrowserRouter } from "react-router-dom";

let container;

// Test to see if Reviews page renders.
test("Render Reviews Page", () => {
    const utils = render(
        <BrowserRouter>
          <Reviews/>
        </BrowserRouter>
        );
        container = utils.container;

    expect(container).toBeInTheDocument();
  });

// Test to see if EditReview page renders.
test("Render Edit Review Page", () => {
  const utils = render(
      <BrowserRouter>
        <EditReview/>
      </BrowserRouter>
      );
      container = utils.container;

  expect(container).toBeInTheDocument();
});

// Test to see if DeleteReview page renders.
test("Render Delete Review Page", () => {
  const utils = render(
      <BrowserRouter>
        <DeleteReview/>
      </BrowserRouter>
      );
      container = utils.container;

  expect(container).toBeInTheDocument();
});

// Test to see if Reviews page has the right text output
test("Reviews display", () => {
  const utils = render(
    <BrowserRouter>
      <Reviews/>
    </BrowserRouter>
    );
    container = utils.container;

  expect(container).toBeInTheDocument();

  const movie = screen.getByRole("button", { name: "Oppenheimer" });
  fireEvent.click(movie);
  
  expect(screen.getByText("Select a movie to add or see the reviews", { exact: false })).toBeInTheDocument();
  expect(screen.getByText("Movie Reviews for Oppenheimer", { exact: false })).toBeInTheDocument();
});

// Test to see if Reviews page is displaying prompts correctly
test("Reviews input fields", () => {
  const utils = render(
    <BrowserRouter>
      <Reviews/>
    </BrowserRouter>
    );
    container = utils.container;

  expect(container).toBeInTheDocument();

  const movie = screen.getByRole("button", { name: "Oppenheimer" });
  fireEvent.click(movie);

  expect(screen.getByText("Select a movie to add or see the reviews", { exact: false })).toBeInTheDocument();
  expect(screen.getByText("Movie Reviews for Oppenheimer", { exact: false })).toBeInTheDocument();
  expect(screen.getByText("Sign in to your account to add a review or edit your previous one.", { exact: false })).toBeInTheDocument();
});

// Test to see if Edit Review page input fields are rendering correctly
test("Edit Reviews input fields", () => {
  const utils = render(
    <BrowserRouter>
      <EditReview/>
    </BrowserRouter>
    );
    container = utils.container;

  expect(container).toBeInTheDocument();

  const stars = screen.getByLabelText("Stars");
  const review = screen.getByLabelText("Review");

  // Simulate input
  fireEvent.change(stars, { target: { value: "5" } });
  fireEvent.change(review, { target: { value: "This is a test review." } });

  // Check if input is correct
  expect(stars.value).toBe("5");
  expect(review.value).toBe("This is a test review.");
  expect(screen.getByDisplayValue("Submit", { exact: false })).toBeInTheDocument();
  expect(screen.getByDisplayValue("Cancel", { exact: false })).toBeInTheDocument();
});

// Test to see input fields detect invalid inputs
test("Edit Review input fields validation", () => {
  const utils = render(
    <BrowserRouter>
      <EditReview/>
    </BrowserRouter>
    );
    container = utils.container;

  expect(container).toBeInTheDocument();

  const stars = screen.getByLabelText("Stars");
  const review = screen.getByLabelText("Review");

  // Simulate input
  fireEvent.change(stars, { target: { value: "6" } });
  fireEvent.change(review, { target: { value: "This is a test review with more than 600 characters." +
  "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" +
  "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" +
  "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" +
  "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" +
  "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" +
  "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" +
  "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" +
  "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" +
  "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" } });

  // Check if input is correct
  expect(stars.value).toBe("6");
  expect(review.value).toBe("This is a test review with more than 600 characters." +
  "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" +
  "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" +
  "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" +
  "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" +
  "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" +
  "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" +
  "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" +
  "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" +
  "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
  
  expect(screen.getByDisplayValue("Submit", { exact: false })).toBeInTheDocument();
  expect(screen.getByDisplayValue("Cancel", { exact: false })).toBeInTheDocument();

  // Simulate submit
  const submit = screen.getByDisplayValue("Submit");
  fireEvent.click(submit);
  
  expect(screen.getByDisplayValue("Submit", { exact: false })).toBeInTheDocument();
  expect(screen.getByText("Please enter a star rating between 1 and 5 only.", { exact: false })).toBeInTheDocument();
  expect(screen.getByText("Review cannot exceed 600 characters.", { exact: false })).toBeInTheDocument();
});

// Test to see if Delete Reviews page is rendering correctly
test("Delete Review Display", () => {
  const utils = render(
    <BrowserRouter>
      <DeleteReview/>
    </BrowserRouter>
    );
    container = utils.container;

  expect(container).toBeInTheDocument();

  expect(screen.getByText("Are you sure you want to delete this review?", { exact: false })).toBeInTheDocument();
  expect(screen.getByText("This will be permanently deleted.", { exact: false })).toBeInTheDocument();
  expect(screen.getByDisplayValue("Yes", { exact: false })).toBeInTheDocument();
  expect(screen.getByDisplayValue("No", { exact: false })).toBeInTheDocument();
});