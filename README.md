# note-dat

## General Info:

Note Dat is a web-based application for taking, organizing, and keeping notes. Application allows user to create notebooks and notes inside them. Note can be modified, deleted, or moved to a different notebook.
Application supports user registration and logins. Notebooks and notes are assigned to user profiles and kept on the database on backend, so that users can access their notes from a web browser on any computer.  

## Heroku:

Note Dat is available on Heroku: https://node-dat.herokuapp.com

## Technologies:

### Back-end:

*	Python 3.7
*	Flask 0.12.4
*	SQLAlchemy 1.3.3
*	Marshmallow 2.19.2
*	Flask-JWT-Extended 3.18.1

### Front-end:

* React 16.0.0
*	Redux 3.7.2



## Local installation
### Prerequisites
* Python
* pip
* Node.js run-time
___

#### Clone repository:

Choose one from listed repositories for git clone
```
git clone https://github.com/eliyaaah/note-dat.git
git clone https://github.com/azyhar/note-dat.git
cd note-dat
```
#### Setup Python environment and install dependencies:
```
virtualenv venv
source venv/bin/activate     # or ./venv/Scripts/activate.ps1
pip3 install -r requirements.txt
```

#### Run migrations:
```
python3 migrate.py db init
python3 migrate.py db migrate
python3 migrate.py db upgrade
```

#### Start local server:
```
python3 run.py
```
#### Start front-end

```
cd client
npm install
npm start
```
