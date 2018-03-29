using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace KazNTU.API.Models
{
    public class User
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string MiddleName { get; set; }
        public int Gender { get; set; }
        public string Image { get; set; }

        [ForeignKey("Position")]
        public Guid PositionId { get; set; }
        [ForeignKey("Department")]
        public Guid DepartmentId { get; set; }

        public Position Position { get; set; }
        public Department Department { get; set; }
    }
}