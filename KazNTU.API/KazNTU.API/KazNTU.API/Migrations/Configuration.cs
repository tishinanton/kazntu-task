namespace KazNTU.API.Migrations
{
    using KazNTU.API.Models;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<KazNTU.API.Models.ApplicationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(ApplicationDbContext context)
        {
            if (!context.Positions.Any())
            {
                context.Positions.Add(new Position()
                {
                    Title = "First position"
                });
                context.Positions.Add(new Position()
                {
                    Title = "Second position"
                });
                context.SaveChanges();
            }

            if (!context.Departments.Any())
            {
                context.Departments.Add(new Department()
                {
                    Title = "First department"
                });
                context.Departments.Add(new Department()
                {
                    Title = "Second department"
                });
                context.SaveChanges();
            }
        }
    }
}
