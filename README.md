# Mass Spectrometry Hub
## Backend Setup
First ensure that the migration files are present in the polls/migrations folder.

Download PgAdmin4, and set up a database.

Copy the information for the database into an env file following the format given in the discord.

run the following commands to run the backend Django server:
```
> cd backend
> cd MassSpecHub
> python manage.py migrate
> python manage.py runserver
```
