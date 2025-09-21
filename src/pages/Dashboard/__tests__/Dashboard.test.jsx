import { render, screen } from "@testing-library/react";
import Dashboard from "../Dashboard";

vi.mock("../../../services/api", () => ({
  auth: {
    currentUser: { email: "test@example.com", uid: "123" },
  },
  db: {},
}));

test("renders Dashboard component with welcome text", () => {
  render(<Dashboard />);
  const welcomeText = screen.getByText(/Welcome, test@example.com/i);
  expect(welcomeText).toBeInTheDocument();
});
