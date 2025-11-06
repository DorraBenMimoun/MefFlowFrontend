const tokens = {
  pill: "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs",
};

function Badge({ color = "blue", children }) {
  const map = {
    blue: "bg-sky-50 text-sky-800 border-sky-200",
    orange: "bg-orange-50 text-orange-700 border-orange-200",
    gray: "bg-slate-50 text-slate-700 border-slate-200",
    green: "bg-emerald-50 text-emerald-700 border-emerald-200",
    red: "bg-rose-50 text-rose-700 border-rose-200",
  };
  return <span className={`${tokens.pill} border ${map[color]}`}>{children}</span>;
}
export default Badge;