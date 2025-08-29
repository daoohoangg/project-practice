-- DROP OLD TABLES
DROP TABLE IF EXISTS booking;
DROP TABLE IF EXISTS stadium;
DROP TABLE IF EXISTS city;

-- CITY
CREATE TABLE city (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL
);

-- STADIUM
CREATE TABLE stadium (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    img VARCHAR(255),
    rules TEXT,
    city_id UUID NOT NULL,
    CONSTRAINT fk_city FOREIGN KEY (city_id) REFERENCES city(id) ON DELETE CASCADE
);

-- BOOKING
CREATE TABLE booking (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    city_id UUID NOT NULL,
    stadium_id UUID NOT NULL,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    status VARCHAR(20) NOT NULL,
    CONSTRAINT fk_booking_city FOREIGN KEY (city_id) REFERENCES city(id) ON DELETE CASCADE,
    CONSTRAINT fk_booking_stadium FOREIGN KEY (stadium_id) REFERENCES stadium(id) ON DELETE CASCADE
);


