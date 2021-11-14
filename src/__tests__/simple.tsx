import React from "react";
import { render, screen } from "@testing-library/react";
import { Author } from "components/TweetList";

test("Author name at format correct", () => {
  const name = "abc";
  const at = "at";
  render(<Author name={name} at={at} />);
  expect(screen.getByText(name + " " + at)).toBeInTheDocument();
});
