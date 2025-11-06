function Section({ title, right, children, className = "" }) {
  return (
    <section className={`space-y-4 ${className} mt-8`}>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">{title}</h2>
        {right}
      </div>
      <div>{children}</div>
    </section>
  );
}

export default Section;