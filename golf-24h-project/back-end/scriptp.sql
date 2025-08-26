-- =====================================
--  Create Database 
-- =====================================
CREATE DATABASE golf_booking;

\c golf_booking;

-- =====================================
--  Customers Table
-- =====================================
CREATE TABLE customer (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(100),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Index to find phone number quickly
CREATE UNIQUE INDEX idx_customers_phone ON customers(phone);

-- =====================================
--  Timeslots Table
-- =====================================
CREATE TABLE time_slot (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'available'
        CHECK (status IN ('available', 'booked', 'blocked'))
);

-- Index: find slot by day
CREATE INDEX idx_timeslots_date ON timeslots(date);

-- ensure unique slot (date + start_time + end_time) 
CREATE UNIQUE INDEX uniq_timeslot_per_day 
    ON timeslots(date, start_time, end_time);

-- =====================================
--  Bookings Table
-- =====================================
CREATE TABLE booking (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
    timeslot_id UUID NOT NULL REFERENCES timeslots(id) ON DELETE CASCADE,
    status VARCHAR(20) NOT NULL DEFAULT 'pending'
        CHECK (status IN ('pending', 'confirmed', 'cancelled')),
    created_at TIMESTAMP DEFAULT NOW()
);

-- ensure 1 timeslot have 1 booking confirmed
CREATE UNIQUE INDEX uniq_timeslot_booking
    ON bookings(timeslot_id)
    WHERE status = 'confirmed';

CREATE TABLE area (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,         
    location VARCHAR(255),               
    description TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE UNIQUE INDEX idx_area_name ON area(name);
CREATE TABLE stadium (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    area_id UUID NOT NULL REFERENCES area(id) ON DELETE CASCADE, 
    name VARCHAR(100) NOT NULL,         
    capacity INT,
    surface_type VARCHAR(50),           
    price_per_hour NUMERIC(10,2),   
    description TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);


CREATE UNIQUE INDEX uniq_stadium_per_area 
    ON stadium(area_id, name);

ALTER TABLE time_slot
    ADD COLUMN stadium_id UUID NOT NULL REFERENCES stadium(id) ON DELETE CASCADE;


CREATE INDEX idx_timeslot_stadium_date 
    ON time_slot(stadium_id, date);

-- =====================================
--  Seed Data
-- =====================================
-- Customers
INSERT INTO customer (name, phone, email)
VALUES 
  ('Nguyen Van A', '0900000001', 'a@example.com'),
  ('Tran Thi B', '0900000002', 'b@example.com');

-- Timeslots 
INSERT INTO time_slot (date, start_time, end_time, status)
VALUES
  (CURRENT_DATE, '08:00', '09:00', 'available'),
  (CURRENT_DATE, '09:00', '10:00', 'available'),
  (CURRENT_DATE, '10:00', '11:00', 'blocked'); 

-- Booking: Nguyen Van A booking slot 8:00
INSERT INTO booking (customer_id, timeslot_id, status)
VALUES (
  (SELECT id FROM customer WHERE phone = '0900000001'),
  (SELECT id FROM time_slot WHERE date = CURRENT_DATE AND start_time = '08:00'),
  'confirmed'
);

-- Update status timeslot
UPDATE time_slot
SET status = 'booked'
WHERE date = CURRENT_DATE AND start_time = '08:00';
