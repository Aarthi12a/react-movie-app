const Spinner = () => {
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <div
        style={{
          width: "40px",
          height: "40px",
          border: "5px solid #ccc",
          borderTop: "5px solid #333",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
          margin: "auto"
        }}
      ></div>

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default Spinner;