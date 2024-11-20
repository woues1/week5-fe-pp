import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddJobPage = () => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("Full-Time");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [salary, setSalary] = useState(4500);
  const [companyName, setCompanyName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");

  const navigate = useNavigate();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleCompanyNameChange = (e) => {
    setCompanyName(e.target.value);
  };

  const handleContactEmailChange = (e) => {
    setContactEmail(e.target.value);
  };

  const handleSalaryChange = (e) => {
    setSalary(Number(e.target.value));
  };

  const handleContactPhoneChange = (e) => {
    setContactPhone(e.target.value);
  };

  const submitForm = (e) => {
    e.preventDefault();
    if (!title || !type || !location || !description || !companyName || !contactEmail || !contactPhone) {
      alert("Please fill in all fields!");
      return;
    }

    const newJob = {
      title,
      type,
      location,
      description,
      company: {
        name: companyName,
        contactEmail: contactEmail,
        contactPhone: contactPhone,
      },
      salary,
    };

    addJob(newJob);
  };

  const addJob = async (newJob) => {
    try {
      const res = await fetch("/api/jobs", {
        method: "POST",
        body: JSON.stringify(newJob),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        navigate("/");
        console.log("Job added successfully");
      } else {
        console.error("Failed to add job");
      }
    } catch (error) {
      console.error("Failed to add job", error);
    }
  };

  return (
    <div className="create">
      <h2>Add a New Job</h2>
      <form onSubmit={submitForm}>
        <label htmlFor="title">Job title:</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={handleTitleChange}
        />
        <label htmlFor="type">Job type:</label>
        <select
          id="type"
          value={type}
          onChange={handleTypeChange}
        >
          <option value="" disabled>
            Select job type
          </option>
          <option value="Full-Time">Full-Time</option>
          <option value="Part-Time">Part-Time</option>
          <option value="Internship">Internship</option>
        </select>
        <label htmlFor="description">Job Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={handleDescriptionChange}
        ></textarea>
        <label htmlFor="companyName">Company Name:</label>
        <input
          id="companyName"
          type="text"
          value={companyName}
          onChange={handleCompanyNameChange}
        />
        <label htmlFor="contactEmail">Contact Email:</label>
        <input
          id="contactEmail"
          type="email"
          value={contactEmail}
          onChange={handleContactEmailChange}
        />
        <label htmlFor="contactPhone">Contact Phone:</label>
        <input
          id="contactPhone"
          type="tel"
          value={contactPhone}
          onChange={handleContactPhoneChange}
        />
        <label htmlFor="location">Location:</label>
        <input
          id="location"
          type="text"
          value={location}
          onChange={handleLocationChange}
        />
        <label htmlFor="salary">Salary:</label>
        <input
          id="salary"
          type="number"
          value={salary}
          onChange={handleSalaryChange}
        />
        <button type="submit">Add Job</button>
      </form>
    </div>
  );
};

export default AddJobPage;
