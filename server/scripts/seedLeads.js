import { supabase } from "../config/db.js";

const sampleLeads = [
  {
    name: "Amit Patil",
    email: "amit.patil@example.com",
    phone: "9876543210",
    company_name: "Bright Solutions",
    status: "New",
    notes: "Requested a callback for CRM software."
  },
  {
    name: "Sneha Kulkarni",
    email: "sneha.kulkarni@example.com",
    phone: "9876501234",
    company_name: "Pixel Works",
    status: "Contacted",
    notes: "Discussed website redesign requirements."
  },
  {
    name: "Rahul Mehta",
    email: "rahul.mehta@example.com",
    phone: "9988776655",
    company_name: "Mehta Traders",
    status: "Qualified",
    notes: "Budget and timeline confirmed."
  },
  {
    name: "Priya Sharma",
    email: "priya.sharma@example.com",
    phone: "9123456780",
    company_name: "GreenTech Labs",
    status: "Converted",
    notes: "Converted after product demo."
  },
  {
    name: "Karan Shah",
    email: "karan.shah@example.com",
    phone: "9090909090",
    company_name: "Urban Retail",
    status: "Lost",
    notes: "Chose another vendor."
  }
];

const { error } = await supabase.from("leads").upsert(sampleLeads, {
  onConflict: "email"
});

if (error) {
  console.error("Failed to seed leads:");
  console.error(error.message);
  process.exit(1);
}

console.log("Sample leads added successfully.");
