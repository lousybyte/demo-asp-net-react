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
    public class ValidCategoryAttribute : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext context)
        {
            ProductPostRequest product = (ProductPostRequest)context.ObjectInstance;

            var dataRepository = context.GetService<IDataRepository>();

            if (!dataRepository.IsCategoryValidAsync(product.CategoryId).Result)
            {
                return new ValidationResult("Invalid product category.");
            }

            return ValidationResult.Success;
        }
    }
}
