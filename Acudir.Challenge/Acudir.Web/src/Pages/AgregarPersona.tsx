import { useState } from "react";
import { Link } from "react-router-dom";

export default function AgregarPersona() {
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    edad: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const persona = {
      id: 0,
      nombre: form.nombre,
      apellido: form.apellido,
      email: form.email,
      edad: Number(form.edad)
    };

    if (persona.edad < 18) {
        alert("⚠️ La persona debe ser mayor de 18 años");
        return;
      }

    // Validación de email
      if (!persona.email.includes("@") || !persona.email.includes(".")) {
          alert("⚠️ El email debe ser válido (debe contener '@' y '.')");
          return;
      }

    try {
      const response = await fetch("https://localhost:7259/Persona", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(persona)
      });

      if (response.ok) {
        alert("✅ Persona agregada!");
        setForm({ nombre: "", apellido: "", email: "", edad: "" });
      } else {
        alert("❌ Error al agregar persona");
      }

    } catch (err) {
      alert("⚠️ Error de conexión con la API");
      console.error(err);
    }
  };

  return (
      <div className="">
          <form
              className=" bg-white shadow-lg rounded-xl p-6"
              onSubmit={handleSubmit}
          >
              <h2 className="text-2xl font-bold text-center mb-6">Agregar Persona</h2>

                <label htmlFor="nombre" className="block text-sm font-medium mb-1">
                    Nombre
                </label>

                <input
                    id="nombre"
                    name="nombre"
                    className="block w-1/4 mx-auto p-2 border rounded"
                    value={form.nombre}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="apellido" className="block text-sm font-medium mb-1">
                    Apellido
                </label>

                <input
                    id="apellido"
                    name="apellido"
                    className="block w-1/4 mx-auto p-2 border rounded"
                    value={form.apellido}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email
                </label>

                <input
                    id="email"
                    name="email"
                    className="block w-1/4 mx-auto p-2 border rounded"
                    value={form.email}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="edad" className="block text-sm font-medium mb-1">
                    Edad
                </label>

                <input
                    id="edad"
                    name="edad"
                    type="number"
                    className="block w-1/4 mx-auto p-2 border rounded mb-3"
                    value={form.edad}
                    onChange={handleChange}
                    required
              />

              <Link
                  to="/"
                  className="btn btn-secondary font-bold py-2 px-4 rounded mx-3 mb-2"
              >
                  Volver
              </Link>

              <button
                  type="submit"
                  className="btn btn-primary py-2 mb-2"
              >
                  Guardar
              </button>
          </form>
      </div>


  );
}
