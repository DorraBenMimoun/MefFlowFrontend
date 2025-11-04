function UsageChart({ points = [], className = "" }) {
  const max = Math.max(1, ...points);
  const bars = points.map((v, i) => {
    const h = Math.round((v / max) * 42) + 2;
    return (
      <rect
        key={i}
        x={i * 12 + 4}
        y={48 - h}
        width="8"
        height={h}
        rx="2"
        className="fill-sky-500/80"
      />
    );
  });
  return (
    <svg viewBox="0 0 140 50" className={`w-full ${className}`}>
      <rect x="0" y="0" width="140" height="50" rx="10" className="fill-sky-50" />
      {bars}
    </svg>
  );
}

export default UsageChart;