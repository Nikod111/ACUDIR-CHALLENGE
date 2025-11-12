using Acudir.Api.Domain.Models;
using Acudir.Api.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Acudir.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PersonaController : ControllerBase
    {
        private readonly PersonaService _service;

        public PersonaController(PersonaService service)
        {
            _service = service;
        }

        [HttpGet("GetAll")]
        public IActionResult GetAll([FromQuery] Dictionary<string, string> filters)
        {
            var result = _service.GetAll(filters);
            return Ok(result);
        }

        [HttpPost]
        public IActionResult Add([FromBody] Persona persona)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            _service.Add(persona);
            return Ok();
        }

        [HttpPut]
        public IActionResult Update([FromBody] Persona persona)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            _service.Update(persona);
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            _service.Delete(id);
            return Ok();
        }

    }

}
