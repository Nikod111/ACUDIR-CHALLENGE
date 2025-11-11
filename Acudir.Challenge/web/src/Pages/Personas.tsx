import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Personas() {
    const [personas, setPersonas] = useState([]);

    // Estados para cada filtro
    const [nombreFiltro, setNombreFiltro] = useState("");
    const [apellidoFiltro, setApellidoFiltro] = useState("");
    const [edadFiltro, setEdadFiltro] = useState("");
    const [mailFiltro, setMailFiltro] = useState("");

    const obtenerPersonas = () => {
        // Construir query string dinámicamente
        const params = new URLSearchParams();
        if (nombreFiltro) params.append("nombre", nombreFiltro);
        if (apellidoFiltro) params.append("apellido", apellidoFiltro);
        if (edadFiltro) params.append("edad", edadFiltro);
        if (mailFiltro) params.append("email", mailFiltro);

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
                    className="flex-1 p-2 border rounded mx-2"
                />
                <input
                    type="text"
                    placeholder="Filtrar por apellido"
                    value={apellidoFiltro}
                    onChange={(e) => setApellidoFiltro(e.target.value)}
                    className="flex-1 p-2 border rounded mx-2"
                />
                <input
                    type="number"
                    placeholder="Filtrar por edad"
                    value={edadFiltro}
                    onChange={(e) => setEdadFiltro(e.target.value)}
                    className="flex-1 p-2 border rounded mx-2"
                />
                <input
                    type="email"
                    placeholder="Filtrar por mail"
                    value={mailFiltro}
                    onChange={(e) => setMailFiltro(e.target.value)}
                    className="flex-1 p-2 border rounded mx-2"
                />
                <button
                    onClick={obtenerPersonas}
                    className="btn btn-primary"
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
                                <td className="py-3 px-4">
                                <Link
                                    to={`/EditarPersona/${p.id}/${p.nombre}/${p.apellido}/${p.email}/${p.edad}`}
                                        className="btn btn-success"
                                >
                                    Editar
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
