// A macOS style window. Use:  <Window title="Projects"> ...content... </Window>
export default function Window({ title, children, className = "" }) {
  return (
    <div className={"win " + className}>
      <div className="bar">
        <span className="lights"><i /><i /><i /></span>
        <span className="ttl">{title}</span>
      </div>
      <div className="body">{children}</div>
    </div>
  );
}
