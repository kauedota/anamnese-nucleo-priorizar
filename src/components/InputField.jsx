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
        <span>
          {label} {required && <b>*</b>}
        </span>
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
        <span>
          {label} {required && <b>*</b>}
        </span>
        <select value={value} onChange={(e) => onChange(e.target.value)}>
          <option value="">Selecione...</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
    );
  }

  if (type === "radio") {
    return (
      <div className="campo">
        <span>
          {label} {required && <b>*</b>}
        </span>

        <div className="opcoes">
          {options.map((option) => (
            <label className="opcao" key={option}>
              <input
                type="radio"
                name={label}
                checked={value === option}
                onChange={() => onChange(option)}
              />
              {option}
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
        <span>
          {label} {required && <b>*</b>}
        </span>

        <div className="opcoes">
          {options.map((option) => (
            <label className="opcao" key={option}>
              <input
                type="checkbox"
                checked={valores.includes(option)}
                onChange={() => alternarOpcao(option)}
              />
              {option}
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
        <span>{label}</span>

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

        <small>0 = Nunca | 4 = Sempre</small>
      </div>
    );
  }

  return (
    <label className="campo">
      <span>
        {label} {required && <b>*</b>}
      </span>
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