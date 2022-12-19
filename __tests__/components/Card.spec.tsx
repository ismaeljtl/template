import { cleanup, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Card from "../../components/Card";
import posts from "../../__mocks__/posts";

describe("Card Component", () => {
  beforeEach(() => {
    render(<Card item={posts[0]} />);
  });

  it("renders the heading of the card", () => {
    const heading = screen.getByRole("heading");
    expect(heading.textContent).toBe("title");
  });

  it("renders the body of the card", () => {
    const body = screen.getByText("body");
    expect(body).toBeInTheDocument();
  });

  it("renders the button of the card", () => {
    const link = screen.getByRole("link");
    expect(link).toBeInTheDocument();
  });
});
