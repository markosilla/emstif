USE [master]
GO

/****** Object:  Database [ZooDb]    Script Date: 30.12.2016 21:51:40 ******/
CREATE DATABASE [ZooDb]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'ZooDb', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL12.SQLEXPRESS\MSSQL\DATA\ZooDb.mdf' , SIZE = 4288KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'ZooDb_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL12.SQLEXPRESS\MSSQL\DATA\ZooDb_log.ldf' , SIZE = 1072KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO

ALTER DATABASE [ZooDb] SET COMPATIBILITY_LEVEL = 120
GO

IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [ZooDb].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO

ALTER DATABASE [ZooDb] SET ANSI_NULL_DEFAULT OFF 
GO

ALTER DATABASE [ZooDb] SET ANSI_NULLS OFF 
GO

ALTER DATABASE [ZooDb] SET ANSI_PADDING OFF 
GO

ALTER DATABASE [ZooDb] SET ANSI_WARNINGS OFF 
GO

ALTER DATABASE [ZooDb] SET ARITHABORT OFF 
GO

ALTER DATABASE [ZooDb] SET AUTO_CLOSE ON 
GO

ALTER DATABASE [ZooDb] SET AUTO_SHRINK OFF 
GO

ALTER DATABASE [ZooDb] SET AUTO_UPDATE_STATISTICS ON 
GO

ALTER DATABASE [ZooDb] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO

ALTER DATABASE [ZooDb] SET CURSOR_DEFAULT  GLOBAL 
GO

ALTER DATABASE [ZooDb] SET CONCAT_NULL_YIELDS_NULL OFF 
GO

ALTER DATABASE [ZooDb] SET NUMERIC_ROUNDABORT OFF 
GO

ALTER DATABASE [ZooDb] SET QUOTED_IDENTIFIER OFF 
GO

ALTER DATABASE [ZooDb] SET RECURSIVE_TRIGGERS OFF 
GO

ALTER DATABASE [ZooDb] SET  ENABLE_BROKER 
GO

ALTER DATABASE [ZooDb] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO

ALTER DATABASE [ZooDb] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO

ALTER DATABASE [ZooDb] SET TRUSTWORTHY OFF 
GO

ALTER DATABASE [ZooDb] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO

ALTER DATABASE [ZooDb] SET PARAMETERIZATION SIMPLE 
GO

ALTER DATABASE [ZooDb] SET READ_COMMITTED_SNAPSHOT ON 
GO

ALTER DATABASE [ZooDb] SET HONOR_BROKER_PRIORITY OFF 
GO

ALTER DATABASE [ZooDb] SET RECOVERY SIMPLE 
GO

ALTER DATABASE [ZooDb] SET  MULTI_USER 
GO

ALTER DATABASE [ZooDb] SET PAGE_VERIFY CHECKSUM  
GO

ALTER DATABASE [ZooDb] SET DB_CHAINING OFF 
GO

ALTER DATABASE [ZooDb] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO

ALTER DATABASE [ZooDb] SET TARGET_RECOVERY_TIME = 0 SECONDS 
GO

ALTER DATABASE [ZooDb] SET DELAYED_DURABILITY = DISABLED 
GO

ALTER DATABASE [ZooDb] SET  READ_WRITE 
GO










USE [ZooDb]
GO

/****** Object:  Table [dbo].[Species]    Script Date: 30.12.2016 22:13:23 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Species](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](255) NOT NULL,
 CONSTRAINT [PK_dbo.Species] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[Name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO









USE [ZooDb]
GO

/****** Object:  Table [dbo].[Animal]    Script Date: 30.12.2016 22:08:02 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Animal](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](255) NOT NULL,
	[YearOfBirth] [int] NOT NULL,
	[CreationDate] [datetime] NOT NULL,
	[Species_Id] [int] NOT NULL,
 CONSTRAINT [PK_dbo.Animal] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[Name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[Animal] ADD  CONSTRAINT [DF_Animal_CreationDate]  DEFAULT (getdate()) FOR [CreationDate]
GO

ALTER TABLE [dbo].[Animal]  WITH CHECK ADD  CONSTRAINT [FK_dbo.Animal_dbo.Species_Species_Id] FOREIGN KEY([Species_Id])
REFERENCES [dbo].[Species] ([Id])
ON DELETE CASCADE
GO

ALTER TABLE [dbo].[Animal] CHECK CONSTRAINT [FK_dbo.Animal_dbo.Species_Species_Id]
GO











/***INSERT DATA***/


USE [ZooDb]
GO
INSERT INTO [dbo].[Species] ([Name]) VALUES ('Kass')
GO

USE [ZooDb]
GO
INSERT INTO [dbo].[Species] ([Name]) VALUES ('Koer')
GO

USE [ZooDb]
GO
INSERT INTO [dbo].[Species] ([Name]) VALUES ('Kaamel')
GO

USE [ZooDb]
GO
INSERT INTO [dbo].[Species] ([Name]) VALUES ('Ahv')
GO

USE [ZooDb]
GO
INSERT INTO [dbo].[Species] ([Name]) VALUES ('Lehm')
GO

USE [ZooDb]
GO
INSERT INTO [dbo].[Species] ([Name]) VALUES ('Kala')
GO



USE [ZooDb]
GO

INSERT INTO [dbo].[Animal]
           ([Name]
           ,[YearOfBirth]
           ,[CreationDate]
           ,[Species_Id])
     VALUES
           ('Kiisu', 1980, GETDATE(), '1')
GO

USE [ZooDb]
GO

INSERT INTO [dbo].[Animal]
           ([Name]
           ,[YearOfBirth]
           ,[CreationDate]
           ,[Species_Id])
     VALUES
           ('Muri', 1986, GETDATE(), '2')
GO

INSERT INTO [dbo].[Animal]
           ([Name]
           ,[YearOfBirth]
           ,[CreationDate]
           ,[Species_Id])
     VALUES
           ('Cameli', 1987, GETDATE(), '3')
GO

INSERT INTO [dbo].[Animal]
           ([Name]
           ,[YearOfBirth]
           ,[CreationDate]
           ,[Species_Id])
     VALUES
           ('Pärdik', 2000, GETDATE(), '4')
GO

INSERT INTO [dbo].[Animal]
           ([Name]
           ,[YearOfBirth]
           ,[CreationDate]
           ,[Species_Id])
     VALUES
           ('Amuu', 2010, GETDATE(), '5')
GO

INSERT INTO [dbo].[Animal]
           ([Name]
           ,[YearOfBirth]
           ,[CreationDate]
           ,[Species_Id])
     VALUES
           ('Nemo', 2015, GETDATE(), '6')
GO



/* SKIP BELOW - MUSTSHOULD FAIL */



USE [ZooDb]
GO
INSERT INTO [dbo].[Species] ([Name]) VALUES ('Kala')
GO

INSERT INTO [dbo].[Animal]
           ([Name]
           ,[YearOfBirth]
           ,[CreationDate]
           ,[Species_Id])
     VALUES
           ('Nemo', 2015, GETDATE(), '6')
GO





