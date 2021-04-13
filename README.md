# Project Manager Website for COMP 474

## How to run

For both the backend and the frontend, make sure to change to the approriate directories (e.g `cd backend`).

### Backend

1. Install the Python 3 and pip
2. Create a virtual environment
    - On Windows: `py -m venv env`
    - On MacOS and Linux: `python3 -m venv env`
3. Activate the virtual environment
    - On Windows: `.\env\Scripts\activate`
    - On MacOS and Linux: `source env/bin/activate`
4. Install the required packages
    - On Windows: `py -m pip install -r requirements.txt`
    - On MacOS and Linux: `python3 -m pip install -r requirements.txt`
5. Run the backend
    - On Windows: `py manage.py runserver`
    - On MacOS and Linux: `python manage.py runserver`

### Frontend
1. Install Node.js (https://nodejs.org/)
2. Install Yarn
     - `npm install --global yarn`
3. Install the required dependencies
    - `npm install` or `yarn install`
4. Run the frontend
    - `yarn start`
