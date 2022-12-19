import { cleanup, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Card from "../../components/Card";
import posts from "../../__mocks__/posts";

describe("CardGrid Component", () => {
  beforeEach(() => {
    render(<Card item={posts[0]} />);
  });

  it("renders the heading of the card", () => {
    const heading = screen.getByRole("heading");
    expect(heading.textContent).toBe("title");
  });
});
