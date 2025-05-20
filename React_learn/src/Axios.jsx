import axios from "axios";
import { useEffect, useState } from "react";


const AxiosLearn = () => {
const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const response = await axios.get(
        "https://picsum.photos/v2/list?page=2&limit=10"
      );
      setData(response.data);
      
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }

  };
  
    useEffect(() => {
      getData()
    }, [])
    

  

  return (
    <div style={{ fontFamily: "sans-serif", padding: "2rem", background: "#f9f9f9", minHeight: "100vh" }}>
      <button
        onClick={getData}
        style={{
          padding: "0.5rem 1.5rem",
          fontSize: "1.1rem",
          borderRadius: "6px",
          border: "none",
          background: "#007bff",
          color: "#fff",
          cursor: "pointer",
          marginBottom: "2rem",
          boxShadow: "0 2px 8px rgba(0,0,0,0.07)"
        }}
      >
        Get Data
      </button>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "1.5rem"
      }}>
        {data.map((element, idx) => (
          <div
            key={element.id || idx}
            style={{
              background: "#fff",
              borderRadius: "10px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              padding: "1rem",
              textAlign: "center"
            }}
          >
            <img
              src={element.download_url}
              alt={element.author}
              style={{
                width: "100%",
                height: "180px",
                objectFit: "cover",
                borderRadius: "8px"
              }}
            />
            <div style={{ marginTop: "0.7rem", fontWeight: "bold" }}>{element.author}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AxiosLearn ;