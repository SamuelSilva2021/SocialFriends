
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            if(!userManager.Users.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser{DisplayName = "Bob", UserName="bob", Email="bob@test.com"},
                    new AppUser{DisplayName = "Tom", UserName="tom", Email="tom@test.com"},
                    new AppUser{DisplayName = "Jane", UserName="jane", Email="jane@test.com"},
                    new AppUser{DisplayName = "Muca", UserName="samuel", Email="samuel@test.com"},
                };
                foreach(var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }
            }

            if (context.Activities.Any()) return;

            var activities = new List<Activity>
            {
                new Activity
                {
                    Title = "Atividade 1",
                    Date = DateTime.UtcNow.AddMonths(-2),
                    Description = "Atividade de 2 meses atrás",
                    Category = "Bebidas",
                    City = "Guarapari",
                    Venue = "Pub"
                },
                new Activity
                {
                    Title = "Atividade 2",
                    Date = DateTime.UtcNow.AddMonths(-1),
                    Description = "Atividade de 1 meses atrás",
                    Category = "Cultura",
                    City = "Paris",
                    Venue = "Louvre"
                },
                new Activity
                {
                    Title = "Atividade 3",
                    Date = DateTime.UtcNow.AddMonths(1),
                    Description = "Atividade do mes seguinte",
                    Category = "Cultura",
                    City = "Londres",
                    Venue = "Natural History Moseum"
                },
                new Activity
                {
                    Title = "Atividade 4",
                    Date = DateTime.UtcNow.AddMonths(2),
                    Description = "Atividade de 2 meses a frente",
                    Category = "Musica",
                    City = "Londres",
                    Venue = "02 Arena"
                },
                new Activity
                {
                    Title = "Atividade 5",
                    Date = DateTime.UtcNow.AddMonths(3),
                    Description = "Atividade de 3 meses a frente",
                    Category = "Bebidas",
                    City = "Londres",
                    Venue = "Arena Pub"
                }
            };

            await context.AddRangeAsync(activities);
            await context.SaveChangesAsync();
        }
    }
}
