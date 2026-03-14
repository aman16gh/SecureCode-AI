function ScanButton({ onScan, loading }) {
  return (
    <button
      onClick={onScan}
      disabled={loading}
      className="btn btn-primary w-full mt-4"
    >
      {loading ? "Scanning…" : "Scan Code"}
    </button>
  )
}

export default ScanButton;