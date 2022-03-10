using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ApiDemoBackend.Data.Models
{
    public class ProductPostRequest
    {
        [Display(Name = "Product Name")]
        [Required(ErrorMessage = "The {0} field is required.")]
        [MinLength(3, ErrorMessage = "The {0} field must have at least 3 characters.")]
        [MaxLength(255, ErrorMessage = "The {0} field must have at most 255 characters.")]
        public string ProductName { get; set; }

        [Display(Name = "Brand")]
        [Required(ErrorMessage = "The {0} field is required.")]
        [Range(0, 999, ErrorMessage = "The {0} field value must be between {1} and {2}.")]
        [ValidBrand]
        public long BrandId { get; set; }

        [Display(Name = "Category")]
        [Required(ErrorMessage = "The {0} field is required.")]
        [Range(0, 999, ErrorMessage = "The {0} field value must be between {1} and {2}.")]
        [ValidCategory]
        public long CategoryId { get; set; }

        [Display(Name = "Price")]
        [Required(ErrorMessage = "The {0} field is required.")]
        [Range(0.0, 999999, ErrorMessage = "The {0} field value must be between {1} and {2}.")]
        public decimal ListPrice { get; set; }
    }
}
