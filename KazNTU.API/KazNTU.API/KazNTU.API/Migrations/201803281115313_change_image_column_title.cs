namespace KazNTU.API.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class change_image_column_title : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Users", "Image", c => c.String());
            DropColumn("dbo.Users", "ImageUrl");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Users", "ImageUrl", c => c.String());
            DropColumn("dbo.Users", "Image");
        }
    }
}
