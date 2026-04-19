import { useEffect, useState } from "react";
import API from "../services/api";
import { useParams } from "react-router-dom";

export default function AdminStudentDetail() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await API.get(`/admin/students/${id}`);
    setData(res.data);
  };

  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h2 className="text-xl font-bold">{data.student.name}</h2>

      <p>Email: {data.student.email}</p>
      <p>Phone: {data.student.phone}</p>

      <h3 className="mt-4 font-semibold">Study Logs</h3>
      {data.logs.map((l) => (
        <p key={l._id}>
          {l.subject} - {l.duration} hrs
        </p>
      ))}
    </div>
  );
}