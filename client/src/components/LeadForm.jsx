import { useState } from "react";
import { Save } from "lucide-react";
import { LEAD_STATUSES } from "../utils/constants.js";

const emptyLead = {
  name: "",
  email: "",
  phone: "",
  companyName: "",
  status: "New",
  notes: ""
};

export default function LeadForm({ initialValue = emptyLead, onSubmit, submitLabel }) {
  const [form, setForm] = useState({ ...emptyLead, ...initialValue });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!form.name.trim()) return setError("Name is required");
    if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) return setError("Valid email is required");
    if (!form.phone.trim()) return setError("Phone is required");

    try {
      setSaving(true);
      await onSubmit(form);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to save lead");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form className="lead-form" onSubmit={handleSubmit}>
      {error && <div className="alert">{error}</div>}

      <div className="form-grid">
        <label>
          Name
          <input value={form.name} onChange={(event) => updateField("name", event.target.value)} />
        </label>
        <label>
          Email
          <input value={form.email} onChange={(event) => updateField("email", event.target.value)} />
        </label>
        <label>
          Phone
          <input value={form.phone} onChange={(event) => updateField("phone", event.target.value)} />
        </label>
        <label>
          Company
          <input value={form.companyName} onChange={(event) => updateField("companyName", event.target.value)} />
        </label>
        <label>
          Status
          <select value={form.status} onChange={(event) => updateField("status", event.target.value)}>
            {LEAD_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label>
        Notes
        <textarea value={form.notes} onChange={(event) => updateField("notes", event.target.value)} rows="5" />
      </label>

      <button className="button button-primary" disabled={saving}>
        <Save size={18} />
        {saving ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}
