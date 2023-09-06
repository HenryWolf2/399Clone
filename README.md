# Mass Spectrometry Hub
## Backend Setup
First ensure that the migration files are present in the polls/migrations folder.

Download PgAdmin4, and set up a database.

Create a .env file in the following format:
```
DEBUG=True
SECRET_KEY=django-insecure-h1q4$h^*uy=820@v!(o(2&)(6@66&a8f+ks@9&u!m*i47rv#3*
DB_NAME= THIS IS THE NAME OF YOUR DATABASE ON POSTGRES YOULL USE TO TEST
DB_USER= POSTGRES USERNAME (default = postgres)
DB_PASSWORD= POSTGRES PASSWORD
DB_HOST=localhost
DB_PORT=5432
```
Place this .env file in the ./backend/MassSpecHub folder.

run the following commands to run the backend Django server:
```
> cd backend
> cd MassSpecHub
> python manage.py migrate
> python manage.py runserver
```

## Frontend Setup
Running the React App, after you've changed your folder to the frontend folder you can run the react app with npm start. This essentially runs the app in the development mode meaning we can reload the page to make the live changes and any errors are seen in the console.

It should automatically open the local host however it can be found at, [http://localhost:3000](http://localhost:3000).
```
cd frontend
npm install
npm start
```

When we want to actually run our react app properly we can use this command. 
```
npm run build
```

Install mui into the project
```
npm install @mui/material @emotion/react @emotion/styled
```

Install the font roborto which is default used by mui
```
npm install @fontsource/roboto
```

Install the icons from mui
```
npm install @mui/icons-material
```