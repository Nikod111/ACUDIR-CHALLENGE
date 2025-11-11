import React, { useState } from 'react';

const EditarPersona: React.FC = () => {
    const [nombre, setNombre] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNombre(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Nombre editado:', nombre);
        // Aquí podrías enviar los datos a una API o actualizar el estado global
    };

    return (
        <div className="flex justify-center mt-10">
            <form
                className=""
                onSubmit={handleSubmit}
            >
                <h2 className="text-2xl font-bold text-center mb-6">Editar Persona</h2>

                <div className="mb-4">
                    <label htmlFor="nombre" className="block text-sm font-medium mb-1">
                        Nombre
                    </label>
                </div>
                <div>
                    <input
                        id="nombre"
                        name="nombre"
                        className="block w-full p-2 border rounded"
                        value={nombre}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded"
                >
                    Guardar Cambios
                </button>
            </form>
        </div>
    );
};

export default EditarPersona;
