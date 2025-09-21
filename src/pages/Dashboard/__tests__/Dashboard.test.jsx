// src/pages/Dashboard/__tests__/Dashboard.test.jsx
import { render, screen, fireEvent } from "@testing-library/react";
import Dashboard from "../../Dashboard/Dashboard";
import { vi } from "vitest";

// Mock completo do Firebase
vi.mock("../../../services/api", () => {
  const appointmentsData = [
    { id: "1", date: "2025-09-22", time: "10:00", service: "cleaning", userId: "123" },
    { id: "2", date: "2025-09-22", time: "11:00", service: "whitening", userId: "123" },
  ];

  return {
    auth: { currentUser: { email: "test@example.com", uid: "123" } },
    db: {},
    collection: vi.fn(() => "appointmentsCollection"),
    query: vi.fn(() => "appointmentsQuery"),
    getDocs: vi.fn(async () => ({
      docs: appointmentsData.map((appt) => ({
        id: appt.id,
        data: () => ({
          date: appt.date,
          time: appt.time,
          service: appt.service,
          userId: appt.userId,
        }),
      })),
    })),
    addDoc: vi.fn(async (collectionRef, newAppt) => {
      const newId = (appointmentsData.length + 1).toString();
      const created = { id: newId, ...newAppt };
      appointmentsData.push(created);
      return { id: newId };
    }),
    deleteDoc: vi.fn(async (docRef) => {
      const index = appointmentsData.findIndex((a) => a.id === docRef.id);
      if (index !== -1) appointmentsData.splice(index, 1);
    }),
    doc: vi.fn((db, collectionName, id) => ({ collectionName, id })),
  };
});

describe("Dashboard Component Tests", () => {
  it("renders Dashboard component with welcome text and appointments", async () => {
    render(<Dashboard />);
    expect(await screen.findByText(/Welcome, test@example.com/i)).toBeInTheDocument();
    expect(await screen.findByText(/In-coming appointments/i)).toBeInTheDocument();
  });

  it("books a new appointment", async () => {
    render(<Dashboard />);

    const dateInput = screen.getByLabelText(/Select a date:/i);
    const serviceSelect = screen.getByLabelText(/Service:/i);
    const timeSelect = screen.getByLabelText(/Available times:/i);
    const bookButton = screen.getByRole("button", { name: /BookNOW/i });

    fireEvent.change(dateInput, { target: { value: "2025-09-22" } });
    fireEvent.change(serviceSelect, { target: { value: "implant" } });
    fireEvent.change(timeSelect, { target: { value: "08:00" } });
    fireEvent.click(bookButton);

    const newAppointment = await screen.findByText(/implant/i);
    expect(newAppointment).toBeInTheDocument();
  });
});
