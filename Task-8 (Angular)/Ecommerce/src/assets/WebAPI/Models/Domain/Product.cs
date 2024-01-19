using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI.Models.Domain
{
    public class Product
    {
        public int Id { get; set; }
        [Required]
        public string? ProductName { get; set; }
        public string? Price { get; set; }
        public string? Category { get; set; }
        public string? color { get; set; }
        public string? Description { get; set; }
        public string? ProductImage { get; set; }
       

        [NotMapped]
        public IFormFile? ImageFile{ get; set; }
    }
}
