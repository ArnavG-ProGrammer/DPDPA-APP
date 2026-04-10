export default function Loading() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            width: 40,
            height: 40,
            border: "3px solid rgba(245,158,11,0.2)",
            borderTopColor: "#F59E0B",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
            margin: "0 auto 16px",
          }}
        />
        <div
          style={{
            fontFamily: "var(--font-ibm), sans-serif",
            fontSize: 12,
            color: "#4B5563",
            letterSpacing: "0.15em",
          }}
        >
          LOADING
        </div>
      </div>
    </div>
  );
}
