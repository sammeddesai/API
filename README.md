# API
CREATE THIS TABLE MANUALLY IN YOUR MYSQL DATABASE :- CREATE TABLE schools (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    latitude DECIMAL(9, 6) NOT NULL,
    longitude DECIMAL(9, 6) NOT NULL
);


dependencies : 
{
"express": "^4.21.1",
"haversine": "^1.1.1",
"nodemon": "^3.1.7",
"sql": "^0.78.0"
}

FOR TESTING USE THE FOLLOWING DATA FOR BOTH API'S
[
    {
        "name": "Sardar Vallabhbhai Patel Vidyalaya",
        "address": "123, Ahmedabad Road, Gandhinagar, Gujarat",
        "latitude": 23.0225,
        "longitude": 72.5714
    },
    {
        "name": "Delhi Public School",
        "address": "456, Sector 12, Dwarka, New Delhi",
        "latitude": 28.5660,
        "longitude": 77.0425
    },
    {
        "name": "Sree Sankara Vidyalaya",
        "address": "789, Neelankarai Road, Chennai, Tamil Nadu",
        "latitude": 12.9941,
        "longitude": 80.2407
    },
    {
        "name": "St. Xavier's High School",
        "address": "321, Park Street, Kolkata, West Bengal",
        "latitude": 22.5726,
        "longitude": 88.3639
    },
    {
        "name": "The Doon School",
        "address": "555, Mall Road, Dehradun, Uttarakhand",
        "latitude": 30.3165,
        "longitude": 78.0322
    }
]
