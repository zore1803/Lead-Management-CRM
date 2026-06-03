import { useNavigate } from "react-router-dom";
import { createLead } from "../api/leadApi.js";
import LeadForm from "../components/LeadForm.jsx";

export default function AddLead() {
  const navigate = useNavigate();

  async function handleSubmit(payload) {
    await createLead(payload);
    navigate("/");
  }

  return (
    <div className="form-page">
      <div className="page-heading">
        <div>
          <p>New Lead</p>
          <h1>Add Lead</h1>
        </div>
      </div>
      <LeadForm submitLabel="Create Lead" onSubmit={handleSubmit} />
    </div>
  );
}
