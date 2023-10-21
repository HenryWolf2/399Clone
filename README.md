# Mass Spectrometry Hub (MaSH)

## Project Management

[Backend](https://team-4.atlassian.net/jira/software/projects/BACK/boards/3)

[Frontend](https://team-4.atlassian.net/jira/software/projects/FRONT/boards/1)

## Project Description
The aim of this project is the publication of the AdductHunter tool allowing users to use the tool and share their results. The website will enable users to take their Mass Spec data collected through research, run it through AdductHunter, and then publicize the results to the public and to groups that match their research niche. 

## Technologies
This project comprises React in the frontend and Django in the backend. This allows us to create a RESTful API that links to our database, and the frontend can call this when needed.

## Setup
When setting up to run, setup and run the backend, and then the frontend. 

### Backend Setup
First, ensure that the migration files are in the polls/migrations folder.

Download PgAdmin4 and set up a database.

Create a .env file in the following format:
```
DEBUG=True
SECRET_KEY=django-insecure-h1q4$h^*uy=820@v!(o(2&)(6@66&a8f+ks@9&u!m*i47rv#3*
DB_NAME=
DB_USER=
DB_PASSWORD=
DB_HOST=localhost
DB_PORT=
```
Fill in the information as you have set it up in PgAdmin4.

Place this .env file in the ./backend/MassSpecHub folder.

run the following commands to run the backend Django server:
```
> pip install -r requirements.txt
> cd backend
> cd MassSpecHub
> python manage.py migrate
> python manage.py runserver
```

### Frontend Setup
When in the root folder, run these commands to install the packages required and run the react app

```
cd frontend
npm install
npm start
```


## Usage Examples
Please see below some example videos of the website in use, with the different sections and their purpose. 
https://drive.google.com/drive/folders/1YdYR0nJXU9lj8ruZfsVDilcTESotYHG9?usp=sharing 

## Website Link
Currently, we are waiting on access to a UOA server from our client, and once this is done, the link will be placed here. 

## Future Plan
There are two main categories in which we will be making improvements in the future, and these are refactoring and new features. 

### Refactoring

- Improve our design. Some of the website's design could be improved to look more modern, where some sections were modernized from client feedback, and some were left as is. Those left as is were fine for our client, but we would like the whole website to look modern.
- Responsivity. Overall, we want to improve the responsiveness of the website, in both its usage and its intuitiveness. This will mean adding more indicators so that users know exactly what does what, and shortening some forms and the number of clicks it takes for users to get between sections. This will improve user experience, and make the site easier to use for all.
- Improving security is something that we need to think about its implications. In Django, there exists built in security measure that we have taken advantage of, and some time will need to be dedicated to ensure that these measures are enough in the backend, and that the frontend cannot be exploited in any way to abuse this. This will probably consist of some more testing, and sending the website to people with more security experience than ourselves.
- Scalability could become an issue depending on the uptake of the website. Seeing as our testing thus far has consisted of no concurrency and very small database instances, as the site grows, we could run into scalability issues which will need to be dealt with. However, this is something that we only have to think about if there is a large uptake, and if this uptake results in problems for users.
- Finally, we could make changes to make the website look better on smaller screens, for example phones. This would mean we would have to reduce our use of two wide columns, and do thorough testing and design work to create a great experience for our mobile users. 

### New Features
- Improved graphing. Currently, our graphs display very barebones information that is gathered from the AdductHunter tool. However, the other team for this project appears to have a much more advanced graphing system, where we could make some improvements to ours based on this. Our focus throughout this project was not heavily on graphing, and with some user feedback, and input from the other team we feel making our graphs better will overall improve user anaylses.
- Expand social features. To make the website more collaborative, some more social features would be great additions, such as the ability to save analyses, comment on analyses and share analyses would all increase the collaborative aspect of the site. 

## Acknowledgements
[MUI Documentation](https://mui.com/material-ui/getting-started/)

[Recharts API](https://recharts.org/en-US/api)

[Django REST Framework Docs](https://www.django-rest-framework.org/)
