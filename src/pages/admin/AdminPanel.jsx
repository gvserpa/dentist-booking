import { useState, useEffect, memo } from "react";
import {
  collection,
  getDocs,
  orderBy,
  query,
  doc,
  getDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db, auth } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import "./index.css";

const AdminPanel = () => {
  const [appointments, setAppointments] = useState([]);
  const [usersMap, setUsersMap] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdminAndFetch = async () => {
      if (!auth.currentUser) {
        navigate("/login");
        return;
      }

      const userRef = doc(db, "users", auth.currentUser.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists() || userSnap.data().role !== "admin") {
        navigate("/dashboard");
        return;
      }

      try {
        // Pega todos os appointments
        const q = query(collection(db, "appointments"), orderBy("date", "asc"));
        const querySnapshot = await getDocs(q);
        const allAppointments = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAppointments(allAppointments);

        // Pega todos os usuários para criar um map { uid: name }
        const usersSnapshot = await getDocs(collection(db, "users"));
        const usersMapTemp = {};
        usersSnapshot.docs.forEach((doc) => {
          usersMapTemp[doc.id] = doc.data().name;
        });
        setUsersMap(usersMapTemp);
      } catch (error) {
        console.error("Erro ao buscar appointments ou usuários:", error);
      }
    };

    checkAdminAndFetch();
  }, [navigate]);

  const appointmentsByDay = appointments.reduce((acc, appt) => {
    const day = format(new Date(appt.date), "EEEE");
    if (!acc[day]) acc[day] = [];
    acc[day].push(appt);

    // Ordena por hora
    acc[day].sort((a, b) => {
      const [hourA, minA] = a.time.split(":").map(Number);
      const [hourB, minB] = b.time.split(":").map(Number);
      return hourA - hourB || minA - minB;
    });

    return acc;
  }, {});

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "appointments", id));
      setAppointments((prev) => prev.filter((appt) => appt.id !== id));
      console.log("Appointment deletado com sucesso");
    } catch (error) {
      console.error("Erro ao deletar appointment:", error);
    }
  };

  const handleMarkDone = async (appt) => {
    try {
      const apptRef = doc(db, "appointments", appt.id);
      await updateDoc(apptRef, { status: "finished" });
      setAppointments((prev) =>
        prev.map((a) => (a.id === appt.id ? { ...a, status: "finished" } : a))
      );
      console.log("Appointment marcado como finished");
    } catch (error) {
      console.error("Erro ao atualizar status do appointment:", error);
    }
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Panel - All Appointments</h2>

      {Object.keys(appointmentsByDay).length === 0 ? (
        <p>No appointments booked yet.</p>
      ) : (
        Object.keys(appointmentsByDay).map((day) => (
          <div key={day} className="day-section">
            <h3>{day}</h3>
            <hr />
            <div className="day-appointments">
              {appointmentsByDay[day].map((appt) => (
                <div
                  key={appt.id}
                  className={`appointment-card ${appt.status || ""} ${
                    appt.status === "finished" ? "finished" : ""
                  }`}
                >
                  <p>
                    <strong>
                      Client:
                      <br />
                    </strong>
                    {usersMap[appt.userId] || "Unknown"}
                  </p>
                  <p>
                    <strong>
                      Date:
                      <br />
                    </strong>{" "}
                    {appt.date}
                  </p>
                  <p>
                    <strong>
                      Time:
                      <br />
                    </strong>{" "}
                    {appt.time}
                  </p>
                  <p>
                    <strong>
                      Service:
                      <br />
                    </strong>{" "}
                    {appt.service}
                  </p>
                  <p>
                    <strong>
                      Status:
                      <br />
                    </strong>{" "}
                    {appt.status || "pending"}
                  </p>
                  <div className="buttons">
                  <div className="delete">
                    <button onClick={() => handleDelete(appt.id)}>
                      DELETE
                    </button>
                  </div>
                  <div className="done">
                    {appt.status !== "finished" && (
                      <button onClick={() => handleMarkDone(appt)}>Done</button>
                    )}
                  </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default memo(AdminPanel);
