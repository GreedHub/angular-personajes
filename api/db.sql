USE [master]
GO
/****** Object:  Database [leagueoflol]    Script Date: 30-Sep-20 10:42:36 PM ******/
CREATE DATABASE [leagueoflol]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'leagueoflol', FILENAME = N'/var/opt/mssql/data/leagueoflol.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'leagueoflol_log', FILENAME = N'/var/opt/mssql/data/leagueoflol_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [leagueoflol] SET COMPATIBILITY_LEVEL = 140
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [leagueoflol].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [leagueoflol] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [leagueoflol] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [leagueoflol] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [leagueoflol] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [leagueoflol] SET ARITHABORT OFF 
GO
ALTER DATABASE [leagueoflol] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [leagueoflol] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [leagueoflol] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [leagueoflol] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [leagueoflol] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [leagueoflol] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [leagueoflol] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [leagueoflol] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [leagueoflol] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [leagueoflol] SET  DISABLE_BROKER 
GO
ALTER DATABASE [leagueoflol] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [leagueoflol] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [leagueoflol] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [leagueoflol] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [leagueoflol] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [leagueoflol] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [leagueoflol] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [leagueoflol] SET RECOVERY FULL 
GO
ALTER DATABASE [leagueoflol] SET  MULTI_USER 
GO
ALTER DATABASE [leagueoflol] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [leagueoflol] SET DB_CHAINING OFF 
GO
ALTER DATABASE [leagueoflol] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [leagueoflol] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [leagueoflol] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [leagueoflol] SET QUERY_STORE = OFF
GO
USE [leagueoflol]
GO
/****** Object:  User [dbUser]    Script Date: 30-Sep-20 10:42:36 PM ******/
CREATE USER [dbUser] FOR LOGIN [dbUser] WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_owner] ADD MEMBER [dbUser]
GO
/****** Object:  Table [dbo].[personajes]    Script Date: 30-Sep-20 10:42:36 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[personajes](
	[id_personaje] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[id_personaje] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[roles]    Script Date: 30-Sep-20 10:42:36 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[roles](
	[id_rol] [int] IDENTITY(1,1) NOT NULL,
	[rol] [varchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[id_rol] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[roles_por_personaje]    Script Date: 30-Sep-20 10:42:36 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[roles_por_personaje](
	[id_rol] [int] NOT NULL,
	[id_personaje] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id_rol] ASC,
	[id_personaje] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  StoredProcedure [dbo].[agregarRol]    Script Date: 30-Sep-20 10:42:36 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[agregarRol]
	-- Add the parameters for the stored procedure here
	@idPersonaje int,
	@idRol int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	insert 
	into roles_por_personaje (id_personaje,id_rol)
	values(@idPersonaje,@idRol);


END
GO
/****** Object:  StoredProcedure [dbo].[borrarPersonaje]    Script Date: 30-Sep-20 10:42:36 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[borrarPersonaje]
	-- Add the parameters for the stored procedure here
	 @id int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	
	-- Insert statements for procedure here

	delete from roles_por_personaje
	where id_personaje = @id;

	delete from personajes
	where id_personaje = @id;


END
GO
/****** Object:  StoredProcedure [dbo].[crearPersonaje]    Script Date: 30-Sep-20 10:42:36 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[crearPersonaje]
	-- Add the parameters for the stored procedure here
	@nombre varchar(50)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	insert into personajes (nombre)
	values (@nombre);
END
GO
/****** Object:  StoredProcedure [dbo].[obtenerPersonajes]    Script Date: 30-Sep-20 10:42:36 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[obtenerPersonajes]
	-- Add the parameters for the stored procedure here

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	select p.nombre, r.rol ,p.id_personaje, r.id_rol
	from leagueoflol..personajes p
	left join roles_por_personaje rp on p.id_personaje = rp.id_personaje
	left join roles r on r.id_rol = rp.id_rol
END
GO
/****** Object:  StoredProcedure [dbo].[obtenerRoles]    Script Date: 30-Sep-20 10:42:36 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[obtenerRoles]
	-- Add the parameters for the stored procedure here

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	select *
	from roles



END
GO
/****** Object:  StoredProcedure [dbo].[obtenerRolesDePersonaje]    Script Date: 30-Sep-20 10:42:36 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[obtenerRolesDePersonaje]
	-- Add the parameters for the stored procedure here
	@idPersonaje int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	select id_rol
	from roles_por_personaje
	where id_personaje = @idPersonaje
	

END
GO
USE [master]
GO
ALTER DATABASE [leagueoflol] SET  READ_WRITE 
GO
