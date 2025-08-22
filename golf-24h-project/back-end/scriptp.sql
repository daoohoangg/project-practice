-- =====================================
--  Create Database 
-- =====================================
CREATE DATABASE golf_booking;

\c golf_booking;

-- =====================================
--  Customers Table
-- =====================================
CREATE TABLE customers (
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
CREATE TABLE timeslots (
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
CREATE TABLE bookings (
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

-- =====================================
--  Seed Data
-- =====================================
-- Customers
INSERT INTO customers (name, phone, email)
VALUES 
  ('Nguyen Van A', '0900000001', 'a@example.com'),
  ('Tran Thi B', '0900000002', 'b@example.com');

-- Timeslots 
INSERT INTO timeslots (date, start_time, end_time, status)
VALUES
  (CURRENT_DATE, '08:00', '09:00', 'available'),
  (CURRENT_DATE, '09:00', '10:00', 'available'),
  (CURRENT_DATE, '10:00', '11:00', 'blocked'); 

-- Booking: Nguyen Van A booking slot 8:00
INSERT INTO bookings (customer_id, timeslot_id, status)
VALUES (
  (SELECT id FROM customers WHERE phone = '0900000001'),
  (SELECT id FROM timeslots WHERE date = CURRENT_DATE AND start_time = '08:00'),
  'confirmed'
);

-- Update status timeslot
UPDATE timeslots
SET status = 'booked'
WHERE date = CURRENT_DATE AND start_time = '08:00';
