import JobListing from "../components/JobListing";
import { useEffect, useState } from "react";

const Home = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    async function FetchJobs() {
      try{
        const response = await fetch("/api/jobs");
        const data = await response.json();
        setJobs(data)

      }
      catch(e){
        console.log(e)
      }
    }

    FetchJobs()
    }, []);

  return (
    <div className="home">
      <div className="job-list">
        {jobs.length === 0 && <p>No jobs found</p>}
        {jobs.length !== 0 &&
          jobs.map((job) => <JobListing key={job.id} {...job} />)}
      </div>
    </div>
  );
};

export default Home;
