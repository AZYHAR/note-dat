# note-dat

## General Info:

Note Dat is a web-based application for taking, organizing, and keeping notes. Application allows user to create notebooks and notes inside them. Note can be modified, deleted, or moved to a different notebook.
Application supports user registration and logins. Notebooks and notes are assigned to user profiles and kept on the database on backend, so that users can access their notes from a web browser on any computer.  

## Heroku:

Note Dat is available on Heroku: https://node-dat.herokuapp.com

## Technologies:

### Back-end:

*	[Python 3.7](https://www.python.org)
*	[Flask 0.12.4](https://flask.palletsprojects.com/en/1.0.x/) (It is a micro framework for Python)
*	[SQLAlchemy 1.3.3](https://www.sqlalchemy.org) (It is the Python SQL toolkit and Object Relational Mapper that gives the full power and flexibility of SQL)
*	[Marshmallow 2.19.2](https://marshmallow.readthedocs.io/en/3.0/examples.html) (It is ORM/ODM/framework-agnostic library for converting complex datatypes)
*	[Flask-JWT-Extended 3.18.1](https://pythonhosted.org/Flask-JWT/) (open, industry method for representing claims securely between two parties)

### Front-end:

* [React 16.0.0](https://reactjs.org) (It is a JavaScript library for building user interfaces)
*	[Redux 3.7.2]() (It is a state management tool)
* [Material-UI 3.9.3](https://material-ui.com) (Material Design framework that helps you create your web application styling)



## Local installation
### Prerequisites
* Python
* pip
* Node.js run-time
___

#### Clone repository:

Choose one from listed repositories for git clone
```bash
  git clone https://github.com/eliyaaah/note-dat.git
  git clone https://github.com/azyhar/note-dat.git
  cd note-dat
```
#### Setup Python environment and install dependencies:
```bash
  virtualenv venv
  source venv/bin/activate     # or ./venv/Scripts/activate.ps1
  pip3 install -r requirements.txt
```

#### Run migrations:
```bash
  python3 migrate.py db init
  python3 migrate.py db migrate
  python3 migrate.py db upgrade
```

#### Start local server:
```bash
  python3 run.py
```
#### Start front-end

```bash
  cd client
  npm install
  npm start
```
