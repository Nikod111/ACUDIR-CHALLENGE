import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Personas() {
    const [personas, setPersonas] = useState([]);

    // Estados para cada filtro
    const [nombreFiltro, setNombreFiltro] = useState("");
    const [apellidoFiltro, setApellidoFiltro] = useState("");
    const [edadFiltro, setEdadFiltro] = useState("");
    const [mailFiltro, setMailFiltro] = useState("");
    const [sexoFiltro, setSexoFiltro] = useState("");
    const [dniFiltro, setDniFiltro] = useState("");

    const obtenerPersonas = () => {
        // Construir query string dinámicamente
        const params = new URLSearchParams();
        if (nombreFiltro) params.append("nombre", nombreFiltro);
        if (apellidoFiltro) params.append("apellido", apellidoFiltro);
        if (edadFiltro) params.append("edad", edadFiltro);
        if (mailFiltro) params.append("email", mailFiltro);
        if (sexoFiltro) params.append("genero", sexoFiltro);
        if (dniFiltro) params.append("dni", dniFiltro);

        const url =
            params.toString().length > 0
                ? `https://localhost:7259/Persona/GetAll?${params.toString()}`
                : "https://localhost:7259/Persona/GetAll";

        fetch(url)
            .then((res) => res.json())
            .then((data) => setPersonas(data))
            .catch((err) => console.error("Error:", err));
    };

    useEffect(() => {
        obtenerPersonas();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("¿Seguro que deseas eliminar esta persona?")) return;

        try {
            const response = await fetch(`https://localhost:7259/Persona/${id}`, {
                method: "DELETE"
            });

            if (response.ok) {
                alert("✅ Persona eliminada");
                obtenerPersonas(); // recargar la lista
            } else {
                alert("❌ Error al eliminar persona");
            }
        } catch (err) {
            alert("⚠️ Error de conexión con la API");
            console.error(err);
        }
    };


    return (
        <div className="min-h-screen flex flex-col items-center p-10">
            <h1 className="text-3xl font-bold my-5">Listado de Personas</h1>

            {/* Filtros */}
            <div className="mb-6 w-full max-w-4xl flex flex-wrap gap-4">
                <input
                    type="text"
                    placeholder="Filtrar por nombre"
                    value={nombreFiltro}
                    onChange={(e) => setNombreFiltro(e.target.value)}
                    className="border rounded"
                />
                <input
                    type="text"
                    placeholder="Filtrar por apellido"
                    value={apellidoFiltro}
                    onChange={(e) => setApellidoFiltro(e.target.value)}
                    className="border rounded"
                />
                <input
                    type="email"
                    placeholder="Filtrar por mail"
                    value={mailFiltro}
                    onChange={(e) => setMailFiltro(e.target.value)}
                    className="border rounded"
                />
                <input
                    type="number"
                    placeholder="Filtrar por edad"
                    value={edadFiltro}
                    onChange={(e) => setEdadFiltro(e.target.value)}
                    className="border rounded"
                />

                <input
                    type="number"
                    placeholder="Filtrar por DNI"
                    value={dniFiltro}
                    onChange={(e) => setDniFiltro(e.target.value)}
                    className="border rounded"
                />

                <select
                    value={sexoFiltro}
                    onChange={(e) => setSexoFiltro(e.target.value)}
                    className=""
                >
                    <option value="">Genero</option>
                    <option value="M">M</option>
                    <option value="F">F</option>
                    <option value="X">X</option>
                </select>
                <button
                    onClick={obtenerPersonas}
                    className="btn btn-primary ms-auto d-block mx-3"
                >
                    Buscar
                    </button>
            </div>

            {/* Tabla */}
            <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl mt-3">
                <table className="min-w-full table-auto mt-3">
                    <thead className="text-black">
                        <tr>
                            <th className="hidden">ID</th>
                            <th className="">Nombre</th>
                            <th className="">Apellido</th>
                            <th className="">Email</th>
                            <th className="">Edad</th>
                            <th className="">DNI</th>
                            <th className="">Genero</th>
                        </tr>
                    </thead>
                    <tbody>
                        {personas.map((p) => (
                            <tr key={p.id} className="border-b hover:bg-gray-100">
                                <td className="py-3 px-4 hidden">{p.id}</td>
                                <td className="py-3 px-4">{p.nombre}</td>
                                <td className="py-3 px-4">{p.apellido}</td>
                                <td className="py-3 px-4">{p.email}</td>
                                <td className="py-3 px-4">{p.edad}</td>
                                <td className="py-3 px-4">{p.dni}</td>
                                <td className="py-3 px-4">{p.genero}</td>
                                <td className="py-3 px-4">
                                <Link
                                        to={`/EditarPersona/${p.id}/${p.nombre}/${p.apellido}/${p.email}/${p.edad}/${p.dni}/${p.genero}`}
                                        className="btn btn-success"
                                >
                                    Editar
                                </Link>
                                <button
                                    className="btn btn-danger mx-2"
                                    onClick={() => handleDelete(p.id)}
                                >
                                    Borrar
                                </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
