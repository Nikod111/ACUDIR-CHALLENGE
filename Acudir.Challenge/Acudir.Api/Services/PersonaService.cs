using Acudir.Api.Domain.Models;
using Acudir.Infrastructure.Interfaces;

namespace Acudir.Api.Services
{
    public class PersonaService
    {
        private readonly IPersonaRepository _repository;

        public PersonaService(IPersonaRepository repository)
        {
            _repository = repository;
        }

        public IEnumerable<Persona> GetAll(Dictionary<string, string> filters) => _repository.GetAll(filters);
        public void Add(Persona persona) => _repository.Add(persona);
        public void Update(Persona persona) => _repository.Update(persona);
        public void Delete(int id) => _repository.Delete(id);
    }

}
