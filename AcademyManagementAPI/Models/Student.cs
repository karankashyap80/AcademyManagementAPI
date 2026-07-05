using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AcademyManagementAPI.Models
{
    public class Student
    {

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
       
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Course { get; set; } = string.Empty;
        public int Age { get; set; }
        public DateTime AdmissionDate { get; set; }
        public string MobileNumber { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
    }
}
