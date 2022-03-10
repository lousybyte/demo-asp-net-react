using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using ApiDemoBackend.Data.Models;
using Microsoft.Extensions.DependencyInjection;

namespace ApiDemoBackend.Data
{
    [AttributeUsage(AttributeTargets.All, AllowMultiple = false)]
    public class ValidBrandAttribute : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext context)
        {
            ProductPostRequest product = (ProductPostRequest)context.ObjectInstance;

            var dataRepository = context.GetService<IDataRepository>();

            if (!dataRepository.IsBrandValidAsync(product.BrandId).Result)
            {
                return new ValidationResult("Invalid product brand.");
            }

            return ValidationResult.Success;
        }
    }
}
