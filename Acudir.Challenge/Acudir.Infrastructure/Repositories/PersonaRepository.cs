using Acudir.Api.Domain.Models;
using Acudir.Infrastructure.Interfaces;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using System.Xml;

namespace Acudir.Infrastructure.Repositories
{
    public class PersonaRepository : IPersonaRepository
    {
        private static readonly string _filePath = @"C:\Temp\Test.json";

        // Los filtros ignoran mayusculas en el key y el value
        public IEnumerable<Persona> GetAll(Dictionary<string, string> filters)
        {
            var personas = JsonConvert.DeserializeObject<List<Persona>>(File.ReadAllText(_filePath)) ?? new List<Persona>();

            var resultado = personas;

            foreach (var filter in filters)
            {
                var propertyName = filter.Key;
                var filterValue = filter.Value;

                var property = typeof(Persona).GetProperty(propertyName,
                    BindingFlags.IgnoreCase | BindingFlags.Public | BindingFlags.Instance);

                if (property != null && property.PropertyType == typeof(string))
                {
                    resultado = resultado
                        .Where(p => {
                            var value = (string)property.GetValue(p);
                            return value != null && value.Contains(filterValue, StringComparison.OrdinalIgnoreCase);
                        })
                        .ToList();
                }
            }

            return resultado;
        }

        public void Add(Persona persona)
        {
            var personas = JsonConvert.DeserializeObject<List<Persona>>(File.ReadAllText(_filePath)) ?? new List<Persona>();
            persona.Id = personas.Any() ? personas.Max(p => p.Id) + 1 : 1;
            personas.Add(persona);
            File.WriteAllText(_filePath, JsonConvert.SerializeObject(personas));
        }

        public void Update(Persona persona)
        {
            var personas = JsonConvert.DeserializeObject<List<Persona>>(File.ReadAllText(_filePath)) ?? new List<Persona>();
            var index = personas.FindIndex(p => p.Id == persona.Id);
            if (index != -1)
            {
                personas[index] = persona;
                File.WriteAllText(_filePath, JsonConvert.SerializeObject(personas));
            }
        }
    }

}
