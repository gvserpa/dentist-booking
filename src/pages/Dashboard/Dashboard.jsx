import { memo, useState, useEffect } from "react";
import "./index.css";
import {
  collection,
  addDoc,
  query,
  getDocs,
  orderBy,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db, auth } from "../../services/api";

const Dashboard = () => {
  const [service, setService] = useState("");
  const [date, setDate] = useState("");
  const [appointment, setAppointment] = useState(null);
  const [time, setTime] = useState("");
  const [appointments, setAppointments] = useState([]);

  const allTimes = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
  ];
  const [availableTimes, setAvailableTimes] = useState(allTimes);

  // Busca todos os appointments de todos os usuários
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

  // Atualiza horários disponíveis com base na data e em todos os appointments
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
  }, [date, appointments]);

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
      setAppointment({ date, service, time });
      // Recarrega todos appointments para atualizar horários disponíveis
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
            <p>Select a date:</p>
            <input
              value={date}
              type="date"
              id="appointment-date"
              name="appointment-date"
              onChange={(e) => setDate(e.target.value)}
              required
            />
            <p>Service:</p>
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
            <p>Available times:</p>
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
