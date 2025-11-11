import { useEffect, useState } from "react";

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
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-10">
            <h1 className="text-3xl font-bold mb-8 text-blue-600">Lista de Personas</h1>

            {/* Filtros */}
            <div className="mb-6 w-full max-w-4xl flex flex-wrap gap-4">
                <input
                    type="text"
                    placeholder="Filtrar por nombre"
                    value={nombreFiltro}
                    onChange={(e) => setNombreFiltro(e.target.value)}
                    className="flex-1 p-2 border rounded"
                />
                <input
                    type="text"
                    placeholder="Filtrar por apellido"
                    value={apellidoFiltro}
                    onChange={(e) => setApellidoFiltro(e.target.value)}
                    className="flex-1 p-2 border rounded"
                />
                <input
                    type="number"
                    placeholder="Filtrar por edad"
                    value={edadFiltro}
                    onChange={(e) => setEdadFiltro(e.target.value)}
                    className="flex-1 p-2 border rounded"
                />
                <input
                    type="email"
                    placeholder="Filtrar por mail"
                    value={mailFiltro}
                    onChange={(e) => setMailFiltro(e.target.value)}
                    className="flex-1 p-2 border rounded"
                />
                <button
                    onClick={obtenerPersonas}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 rounded"
                >
                    Buscar
                </button>
            </div>

            {/* Tabla */}
            <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl">
                <table className="min-w-full table-auto">
                    <thead className="bg-blue-600 text-black">
                        <tr>
                            <th className="py-3 px-4">ID</th>
                            <th className="py-3 px-4">Nombre</th>
                            <th className="py-3 px-4">Apellido</th>
                            <th className="py-3 px-4">Email</th>
                            <th className="py-3 px-4">Edad</th>
                        </tr>
                    </thead>
                    <tbody>
                        {personas.map((p) => (
                            <tr key={p.id} className="border-b hover:bg-gray-100">
                                <td className="py-3 px-4">{p.id}</td>
                                <td className="py-3 px-4">{p.nombre}</td>
                                <td className="py-3 px-4">{p.apellido}</td>
                                <td className="py-3 px-4">{p.email}</td>
                                <td className="py-3 px-4">{p.edad}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
