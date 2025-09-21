import { memo, useState, useEffect, useMemo } from "react";
import "./index.css";
import {
  collection,
  addDoc,
  query,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db, auth } from "../../services/api";

const Dashboard = () => {
  const [service, setService] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [appointments, setAppointments] = useState([]);

  const allTimes = useMemo(
    () => [
      "08:00",
      "09:00",
      "10:00",
      "11:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
    ],
    []
  );

  const [availableTimes, setAvailableTimes] = useState(allTimes);

  useEffect(() => {
    const fetchAllAppointments = async () => {
      try {
        const q = query(collection(db, "appointments"));
        const querySnapshot = await getDocs(q);
        const allAppointments = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAppointments(allAppointments);
      } catch (error) {
        console.error("Erro ao buscar appointments: ", error);
      }
    };

    fetchAllAppointments();
  }, []);

  useEffect(() => {
    if (!date) {
      setAvailableTimes(allTimes);
      setTime("");
      return;
    }

    const bookedTimes = appointments
      .filter((appt) => appt.date === date)
      .map((appt) => appt.time);

    const freeTimes = allTimes.filter((t) => !bookedTimes.includes(t));
    setAvailableTimes(freeTimes);

    if (!freeTimes.includes(time)) {
      setTime("");
    }
  }, [date, appointments, allTimes, time]);

  const createAppointment = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "appointments"), {
        userId: auth.currentUser.uid,
        date: date,
        service: service,
        time: time,
      });

      console.log("Appointment criado com ID: ", docRef.id);

      const q = query(collection(db, "appointments"));
      const querySnapshot = await getDocs(q);
      const allAppointments = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAppointments(allAppointments);
    } catch (e) {
      console.error("Erro ao criar appointment: ", e);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "appointments", id));
      console.log("Appointment deletado com sucesso");
      // Recarrega todos appointments após deletar
      const q = query(collection(db, "appointments"));
      const querySnapshot = await getDocs(q);
      const allAppointments = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAppointments(allAppointments);
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <div className="Dashboard">
      <div className="title">
        <h2>
          Welcome, {auth.currentUser ? auth.currentUser.email : "Carregando..."}
        </h2>
      </div>
      <div className="card">
        <div className="new-appointment">
          <h2>Book an appointment</h2>
          <form onSubmit={createAppointment}>
            <label htmlFor="appointment-date">Select a date:</label>
            <input
              value={date}
              type="date"
              id="appointment-date"
              name="appointment-date"
              onChange={(e) => setDate(e.target.value)}
              required
            />

            <label htmlFor="services">Service:</label>
            <select
              value={service}
              id="services"
              name="services"
              onChange={(e) => setService(e.target.value)}
              required
            >
              <option value="">-- Choose a service --</option>
              <option value="whitening">whitening</option>
              <option value="cleaning">general cleaning</option>
              <option value="implant">implant</option>
            </select>

            <label htmlFor="time">Available times:</label>
            <select
              value={time}
              id="time"
              name="time"
              onChange={(e) => setTime(e.target.value)}
              required
            >
              <option value="">-- Choose a time --</option>
              {availableTimes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>

            <button>BookNOW</button>
          </form>
        </div>

        <div className="in-coming-appointments">
          <h2>In-coming appointments</h2>
          {appointments.length > 0 ? (
            appointments
              .filter((appt) => appt.userId === auth.currentUser.uid)
              .map((appt) => (
                <div key={appt.id} className="appointment-card">
                  <p>
                    <strong>
                      Date: <br />
                    </strong>{" "}
                    {appt.date}
                  </p>
                  <p>
                    <strong>Service:</strong> {appt.service}
                  </p>
                  <p>
                    <strong>
                      Time:
                      <br />
                    </strong>{" "}
                    {appt.time}
                  </p>
                  <button onClick={() => handleDelete(appt.id)}>DELETE</button>
                </div>
              ))
          ) : (
            <p>No appointments booked yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(Dashboard);
