using KazNTU.API.Models;
using Microsoft.Restier.Providers.EntityFramework;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace KazNTU.API.Controllers
{
    public class Api : EntityFrameworkApi<ApplicationDbContext>
    {
        public Api(IServiceProvider serviceProvider) : base(serviceProvider)
        {
        }

        protected void OnUpdatingUsers(User user)
        {
            try
            {
                user.Image = this.SaveImage(user.Image);
            }
            catch (Exception)
            {
            }
        }


        private string SaveImage(string image) {
            var parts = image.Split(',');
            image = parts[1];
                var bytes = Convert.FromBase64String(image);
            var fileName = "/" + Guid.NewGuid().ToString() + ".jpeg";
            using (var imageFile = new FileStream(HttpContext.Current.ApplicationInstance.Server.MapPath("~/Content/Images") + fileName, FileMode.Create))
            {
                imageFile.Write(bytes, 0, bytes.Length);
                imageFile.Flush();
            }
            return fileName;
        }

        protected void OnInsertingUsers(User user)
        {
            try
            {
                user.Image = this.SaveImage(user.Image);
            } catch(Exception)
            {
            }
            
        }
    }
}