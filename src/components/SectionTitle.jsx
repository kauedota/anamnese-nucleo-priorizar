function SectionTitle({ icon: Icon, title, description }) {
  return (
    <div className="titulo-secao">
      <Icon />
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default SectionTitle;