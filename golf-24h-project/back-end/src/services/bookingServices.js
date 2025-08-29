import { AppDataSource } from "../data-source";
import { City } from "../entities/City";
import { Stadium } from "../entities/Stadium";
import { TimeSlot } from "../entities/TimeSlot";
import { Booking } from "../entities/Booking";

export const getCityStadiumBookings = async (cityId, date) => {
  const stadiumRepo = AppDataSource.getRepository(Stadium);

  const stadiums = await stadiumRepo.find({
    where: { city: { id: cityId } },
    relations: ["timeslots", "timeslots.bookings"],
  });

  return stadiums.map(stadium => ({
    stadiumId: stadium.id,
    stadiumName: stadium.name,
    bookedSlots: stadium.timeslots
      .filter(ts => ts.date === date && ts.bookings.length > 0)
      .map(ts => ({
        start: ts.startTime,
        end: ts.endTime,
      })),
  }));
};
