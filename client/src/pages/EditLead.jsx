import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getLead, updateLead } from "../api/leadApi.js";
import LeadForm from "../components/LeadForm.jsx";

export default function EditLead() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lead, setLead] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getLead(id)
      .then(setLead)
      .catch((err) => setError(err.response?.data?.message || "Unable to load lead"));
  }, [id]);

  async function handleSubmit(payload) {
    await updateLead(id, payload);
    navigate("/");
  }

  if (error) return <div className="alert">{error}</div>;
  if (!lead) return <div className="empty-state">Loading lead...</div>;

  return (
    <div className="form-page">
      <div className="page-heading">
        <div>
          <p>Existing Lead</p>
          <h1>Edit Lead</h1>
        </div>
      </div>
      <LeadForm initialValue={lead} submitLabel="Update Lead" onSubmit={handleSubmit} />
    </div>
  );
}
