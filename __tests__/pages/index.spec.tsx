import { cleanup, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "../../pages/index";

describe("404 Page Component", () => {
  beforeEach(() => {
    render(<Home />);
  });

  // it('renders the heading', () => {
  //   const heading = screen.getByRole('heading')
  //   expect(heading.textContent).toBe('404, Page not found')
  // })
});
