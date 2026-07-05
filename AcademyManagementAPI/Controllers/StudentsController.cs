using AcademyManagementAPI.Data;
using AcademyManagementAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AcademyManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentsController : ControllerBase
    {
        private readonly AppDbContext _context;
        public StudentsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAll() => Ok(_context.Students.ToList());

        [HttpPost]
        public IActionResult  AddStudent(Student student )
        {
            _context.Students.Add(student);
            _context.SaveChanges();
            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult UpdateStudent(int id ,Student updateStudent) 
           
        {
            var student = _context.Students.Find(id);

            if (student == null) return NotFound("Student not found.");

           
            student.Name = updateStudent.Name;
            student.Email = updateStudent.Email;
            student.Course = updateStudent.Course;
            student.Age = updateStudent.Age;
            student.AdmissionDate = updateStudent.AdmissionDate;
            student.MobileNumber = updateStudent.MobileNumber;
            student.Address = updateStudent.Address;

            _context.SaveChanges();

            return Ok(student);
        }
        [HttpDelete("{id}")]
        public IActionResult DeleteStudent(int id)
        {
            var student = _context.Students.Find(id);

            if (student == null) 
                return NotFound("Student not Found.");

            _context.Students.Remove(student);
            _context.SaveChanges();
            return Ok("Student Delete Successfully.");
        }
       
    }
}
