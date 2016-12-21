namespace Loomaaed.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitialCreate : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Loom",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Nimi = c.String(nullable: false, maxLength: 255),
                        Synniaasta = c.DateTime(nullable: false),
                        Vanus = c.Int(nullable: false),
                        Lisamisaeg = c.DateTime(nullable: false),
                        Liik_Id = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Loomaliik", t => t.Liik_Id, cascadeDelete: true)
                .Index(t => t.Nimi, unique: true)
                .Index(t => t.Liik_Id);
            
            CreateTable(
                "dbo.Loomaliik",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Nimetus = c.String(nullable: false, maxLength: 255),
                    })
                .PrimaryKey(t => t.Id)
                .Index(t => t.Nimetus, unique: true);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Loom", "Liik_Id", "dbo.Loomaliik");
            DropIndex("dbo.Loomaliik", new[] { "Nimetus" });
            DropIndex("dbo.Loom", new[] { "Liik_Id" });
            DropIndex("dbo.Loom", new[] { "Nimi" });
            DropTable("dbo.Loomaliik");
            DropTable("dbo.Loom");
        }
    }
}
