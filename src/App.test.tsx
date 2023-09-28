import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders App component with Table", () => {
  render(<App />);
  const appElement = screen.getByText("Tech Assessment");
  expect(appElement).toBeInTheDocument();
});

test("renders header with 'Tech Assessment'", () => {
  render(<App />);
  const headerElement = screen.getByText("Tech Assessment");
  expect(headerElement).toBeInTheDocument();
});
