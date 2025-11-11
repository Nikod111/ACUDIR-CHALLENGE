import { useParams } from "react-router-dom";
import { useState } from "react";

export default function EditarPersona() {


    const { id, nombre, apellido, email, edad } = useParams();
    // {id}

    const [form, setForm] = useState({
        id,
        nombre,
        apellido,
        email,
        edad
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
            id: form.id,
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
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(persona)
            });

            if (response.ok) {
                alert("✅ Persona modificada con exito!");
            } else {
                alert("❌ Error al modificar persona");
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
                <h2 className="text-2xl font-bold text-center mb-6">Editar Persona</h2>

                <input
                    type="hidden"
                    id="id"
                    name="id"
                    value={form.id}
                />

                <div>
                    <label htmlFor="nombre" className="block text-sm font-medium mb-1">
                        Nombre
                    </label>
                </div>
                <div>
                    <input
                        id="nombre"
                        name="nombre"
                        className="block w-full p-2 border rounded"
                        value={form.nombre}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="apellido" className="block text-sm font-medium mb-1">
                        Apellido
                    </label>
                </div>
                <div>
                    <input
                        id="apellido"
                        name="apellido"
                        className="block w-full p-2 border rounded"
                        value={form.apellido}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                        Email
                    </label>
                </div>
                <div>
                    <input
                        id="email"
                        name="email"
                        className="block w-full p-2 border rounded"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="edad" className="block text-sm font-medium mb-1">
                        Edad
                    </label>
                </div>
                <div>
                    <input
                        id="edad"
                        name="edad"
                        type="number"
                        className="block w-full p-2 border rounded mb-3"
                        value={form.edad}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded"
                >
                    Guardar
                </button>
            </form>
        </div>


    );
}
