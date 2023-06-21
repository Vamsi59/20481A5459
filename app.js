import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [trains, setTrains] = useState([
    { id: 1, trainNumber: "17250", name: "Machilipatnam Expr..", departureTime: "09:00:00", availableSeatsAC: 10, availableSeatsSleeper: 20, priceAC: 100, priceSleeper: 150 },
    { id: 2, trainNumber: "07898", name: "Vijayawada Expr..", departureTime: "10:30:00", availableSeatsAC: 25, availableSeatsSleeper: 35, priceAC: 150, priceSleeper: 175 },
    { id: 3, trainNumber: "52369", name: "Hyderabad Expr..", departureTime: "12:15:00", availableSeatsAC: 20, availableSeatsSleeper: 45, priceAC: 130, priceSleeper: 250 },
    { id: 4, trainNumber: "75138", name: "Golkonda Expr..", departureTime: "14:45:00", availableSeatsAC: 18, availableSeatsSleeper: 15, priceAC: 160, priceSleeper: 120 },
    { id: 5, trainNumber: "96348", name: "Chennai Expr..", departureTime: "17:30:00", availableSeatsAC: 30, availableSeatsSleeper: 25, priceAC: 190, priceSleeper: 160 },
  ]);

  const [selectedTrain, setSelectedTrain] = useState(null);
  const [bookingOption, setBookingOption] = useState(null);
  const [ticketBooked, setTicketBooked] = useState(false);

  const handleBookSeat = (trainId, option) => {
    setSelectedTrain(trainId);
    setBookingOption(option);
  };

  const handleClearSelection = () => {
    setSelectedTrain(null);
    setBookingOption(null);
    setTicketBooked(false);
  };

  const handleConfirmBooking = () => {
    // Perform booking logic here
    // Update available seats for the selected train and booking option
    const updatedTrains = trains.map((train) => {
      if (train.id === selectedTrain) {
        if (bookingOption === "AC") {
          return { ...train, availableSeatsAC: train.availableSeatsAC - 1 };
        } else if (bookingOption === "Sleeper") {
          return { ...train, availableSeatsSleeper: train.availableSeatsSleeper - 1 };
        }
      }
      return train;
    });
    setTrains(updatedTrains);
    setTicketBooked(true);
  };

  // Sort the trains array based on price in descending order
  const sortedTrains = [...trains].sort((a, b) => b.priceAC - a.priceAC);

  const getTimeColor = (departureTime) => {
    const currentTime = new Date().getTime();
    const selectedTime = new Date(`2023-01-01T${departureTime}`).getTime();
    const differenceInMinutes = Math.floor((selectedTime - currentTime) / (1000 * 60));

    if (differenceInMinutes <= 30) {
      return "text-danger"; // Apply red color
    }
    return ""; // Default color
  };

  return (
    <div className="container">
      <h1 align="center" className="mt-4">
        Train Availability
      </h1>
      <table className="table shadow-sm mt-4">
        <thead className="bg-light">
          <tr>
            <th>Train Number</th>
            <th>Train Name</th>
            <th>Departure Time</th>
            <th>AC Seats</th>
            <th>Sleeper Seats</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {sortedTrains.map((train) => (
            <tr key={train.id} className={selectedTrain === train.id ? "selected" : ""}>
              <td>{train.trainNumber}</td>
              <td>{train.name}</td>
              <td className={getTimeColor(train.departureTime)}>{train.departureTime}</td>
              <td>{train.availableSeatsAC}</td>
              <td>{train.availableSeatsSleeper}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => handleBookSeat(train.id, "AC")}
                  disabled={train.availableSeatsAC === 0}
                >
                  Book AC (${train.priceAC})
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => handleBookSeat(train.id, "Sleeper")}
                  disabled={train.availableSeatsSleeper === 0}
                >
                  Book Sleeper (${train.priceSleeper})
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedTrain && bookingOption && (
        <div className="mt-4">
          <h3>Train Details</h3>
          <button className="btn btn-primary" onClick={handleClearSelection}>
            Back to Train List
          </button>
          <div className="mt-4">
            <h4>Train: {trains.find((train) => train.id === selectedTrain).name}</h4>
            <h5>Booking Option: {bookingOption}</h5>
            <button className="btn btn-primary" onClick={handleConfirmBooking}>
              Confirm Booking
            </button>
          </div>
        </div>
      )}

      {ticketBooked && selectedTrain && (
        <div className="mt-4">
          <h3>Ticket Booked!</h3>
          <p>Your ticket has been successfully booked for:</p>
          <h4>Train: {trains.find((train) => train.id === selectedTrain).name}</h4>
          <h5>Booking Option: {bookingOption}</h5>
        </div>
      )}
    </div>
  );
};

export default App;

