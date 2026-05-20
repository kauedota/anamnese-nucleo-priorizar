function separarTexto(texto = "") {
  if (!texto.includes("—")) {
    return {
      titulo: texto,
      ajuda: "",
    };
  }

  const partes = texto.split("—");

  return {
    titulo: partes[0].trim(),
    ajuda: partes.slice(1).join("—").trim(),
  };
}

function TextoComAjuda({ texto, required = false }) {
  const { titulo, ajuda } = separarTexto(texto);

  return (
    <span className="campo-titulo">
      <strong>
        {titulo} {required && <b>*</b>}
      </strong>

      {ajuda && <small className="campo-ajuda">- {ajuda}</small>}
    </span>
  );
}

function OpcaoComAjuda({ option }) {
  const { titulo, ajuda } = separarTexto(option);

  return (
    <span className="opcao-texto">
      <strong>{titulo}</strong>
      {ajuda && <small>- {ajuda}</small>}
    </span>
  );
}

function InputField({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  options = [],
  required = false,
}) {
  if (type === "textarea") {
    return (
      <label className="campo">
        <TextoComAjuda texto={label} required={required} />

        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      </label>
    );
  }

  if (type === "select") {
    return (
      <label className="campo">
        <TextoComAjuda texto={label} required={required} />

        <select value={value} onChange={(e) => onChange(e.target.value)}>
          <option value="">Selecione...</option>

          {options.map((option) => {
            const { titulo } = separarTexto(option);

            return (
              <option key={option} value={option}>
                {titulo}
              </option>
            );
          })}
        </select>

        {options.some((option) => option.includes("—")) && (
          <div className="legenda-opcoes">
            {options
              .filter((option) => option.includes("—"))
              .map((option) => {
                const { titulo, ajuda } = separarTexto(option);

                return (
                  <p key={option}>
                    <strong>{titulo}:</strong> {ajuda}
                  </p>
                );
              })}
          </div>
        )}
      </label>
    );
  }

  if (type === "radio") {
    return (
      <div className="campo">
        <TextoComAjuda texto={label} required={required} />

        <div className="opcoes">
          {options.map((option) => (
            <label className="opcao" key={option}>
              <input
                type="radio"
                name={label}
                checked={value === option}
                onChange={() => onChange(option)}
              />

              <OpcaoComAjuda option={option} />
            </label>
          ))}
        </div>
      </div>
    );
  }

  if (type === "checkbox") {
    const valores = Array.isArray(value) ? value : [];

    function alternarOpcao(option) {
      if (valores.includes(option)) {
        onChange(valores.filter((item) => item !== option));
      } else {
        onChange([...valores, option]);
      }
    }

    return (
      <div className="campo campo-cheio">
        <TextoComAjuda texto={label} required={required} />

        <div className="opcoes">
          {options.map((option) => (
            <label className="opcao" key={option}>
              <input
                type="checkbox"
                checked={valores.includes(option)}
                onChange={() => alternarOpcao(option)}
              />

              <OpcaoComAjuda option={option} />
            </label>
          ))}
        </div>
      </div>
    );
  }

  if (type === "scale") {
    const respostas = value || {};

    function alterarEscala(item, nota) {
      onChange({
        ...respostas,
        [item]: nota,
      });
    }

    return (
      <div className="campo campo-cheio">
        <TextoComAjuda texto={label} required={required} />

        <div className="escala-lista">
          {options.map((item) => (
            <div className="escala-item" key={item}>
              <p>{item}</p>

              <div className="escala-opcoes">
                {[0, 1, 2, 3, 4].map((nota) => (
                  <button
                    type="button"
                    key={nota}
                    className={respostas[item] === nota ? "escala ativa" : "escala"}
                    onClick={() => alterarEscala(item, nota)}
                  >
                    {nota}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <small className="escala-legenda">0 = Nunca | 4 = Sempre</small>
      </div>
    );
  }

  return (
    <label className="campo">
      <TextoComAjuda texto={label} required={required} />

      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </label>
  );
}

export default InputField;