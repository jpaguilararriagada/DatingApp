using Microsoft.EntityFrameworkCore;
using DatingApp.API.Models;
namespace DatingApp.API.Data
{
    public class DataContext: DbContext
    {
        public DataContext(DbContextOptions<DataContext> options):base(options)
        {
            
        }

        public DbSet<Value> Values{get;set;} 
        public DbSet<User> Users{get;set;} 
        public DbSet<Photo> Photos { get; set; }
        public DbSet<Like> Likes { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Like>().HasKey(k => new {k.LikerId, k.LikeeId});

            builder.Entity<Like>().HasOne(k => k.Likee).WithMany(k=> k.Likers) 
            .HasForeignKey(m=> m.LikeeId)
            .OnDelete(DeleteBehavior.Restrict);

               builder.Entity<Like>().HasOne(k => k.Liker).WithMany(k=> k.Likees) 
            .HasForeignKey(m=> m.LikerId )
            .OnDelete(DeleteBehavior.Restrict);
        }

    }
}