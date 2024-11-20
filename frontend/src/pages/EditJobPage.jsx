import { useEffect, useReducer } from "react";
import { useParams, useNavigate } from "react-router-dom";

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'RESET_ERROR':
      return { ...state, error: '' };
    case 'SET_INITIAL_STATE':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

const initialState = {
  username: '',
  password: '',
  error: '',
  title: '',
  type: '',
  description: '',
  companyName: '',
  contactEmail: '',
  contactPhone: '',
  location: '',
  salary: '',
};


const EditJobPage = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { id } = useParams();
  const navigate = useNavigate();
  const apiUrl = "/api/jobs"

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`/api/jobs/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) {
          throw new Error("Failed to fetch job");
        }
        const data = await res.json();
        dispatch({
          type: 'SET_INITIAL_STATE',
          payload: {
            title: data.title,
            type: data.type,
            description: data.description,
            companyName: data.company.name,
            contactEmail: data.company.contactEmail,
            contactPhone: data.company.contactPhone,
            location: data.location,
            salary: data.salary,
          },
        });
      } catch (error) {
        console.log("Error fetching data", error);
      }
    };
    fetchJob();
  }, [id]);


  const submitForm = async (e) => {
    e.preventDefault();
    const job = {
      title: state.title,
      type: state.type,
      description: state.description,
      company: {
        name: state.companyName,
        contactPhone: state.contactPhone,
        contactEmail: state.contactEmail,
      },
      location: state.location,
      salary: state.salary,
    };
    const res = await fetch(`${apiUrl}/${id} `, {
      method: "PUT",
      body: JSON.stringify(job),
      headers: {
        "Content-Type": "application/json",
      },
    })
    const json = await res.json();
    if (!res.ok) {
      console.log(`Error: ${res.status}`);
    }
    if (res.ok) {
      console.log(json)
    }
  };

  const cancelEdit = () => {
    navigate(-1)
  };

  const handleInputChange = (field, value) => {
    dispatch({
      type: 'SET_FIELD',
      field,
      payload: value,
    });
  };

  return (
    <div className="create">
      <h2>Edit Job</h2>
      <form onSubmit={submitForm}>
        <label>Job title:</label>
        <input value={state.title} onChange={(e) => handleInputChange('title', e.target.value)} />
        <label>Job type:</label>
        <select value={state.type} onChange={(e) => handleInputChange('type', e.target.value)}>
          <option value="" disabled>
            Select job type
          </option>
          <option value="Full-Time">Full-Time</option>
          <option value="Part-Time">Part-Time</option>
          <option value="Remote">Remote</option>
          <option value="Internship">Internship</option>
        </select>

        <label>Job Description:</label>
        <textarea
          value={state.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
        ></textarea>
        <label>Company Name:</label>
        <input
          value={state.companyName}
          onChange={(e) => handleInputChange('companyName', e.target.value)}
        />
        <label>Contact Email:</label>
        <input
          value={state.contactEmail}
          onChange={(e) => handleInputChange('contactEmail', e.target.value)}
        />
        <label>Contact Phone:</label>
        <input
          value={state.contactPhone}
          onChange={(e) => handleInputChange('contactPhone', e.target.value)}
        />
        <label>Location:</label>
        <input value={state.location} onChange={(e) => handleInputChange('location', e.target.value)} />
        <label>Salary:</label>
        <input value={state.salary} onChange={(e) => handleInputChange('salary', e.target.value)} />
        <button type="submit">Update Job</button>
        <button type="button" onClick={cancelEdit}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditJobPage;
