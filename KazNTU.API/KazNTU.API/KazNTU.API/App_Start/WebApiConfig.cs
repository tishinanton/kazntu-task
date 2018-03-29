using KazNTU.API.Controllers;
using KazNTU.API.Models;
using Microsoft.Restier.Providers.EntityFramework;
using Microsoft.Restier.Publishers.OData;
using Microsoft.Restier.Publishers.OData.Batch;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.OData.Extensions;

namespace KazNTU.API
{
    public static class WebApiConfig
    {

        public async static void Register(HttpConfiguration config)
        {

            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            //config.EnableEnumPrefixFree(enumPrefixFree: true);
            config.Filter().Expand().Select().OrderBy().MaxTop(null).Count();
            await config.MapRestierRoute<Api>(
                "DbContext",
                "odata",
                new RestierBatchHandler(GlobalConfiguration.DefaultServer));
        }
    }
}
