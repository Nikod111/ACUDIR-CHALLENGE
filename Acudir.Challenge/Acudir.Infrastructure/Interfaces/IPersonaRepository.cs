using Acudir.Api.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Acudir.Infrastructure.Interfaces
{
    public interface IPersonaRepository
    {
        IEnumerable<Persona> GetAll(Dictionary<string, string> filters);
        void Add(Persona persona);
        void Update(Persona persona);
    }
}
