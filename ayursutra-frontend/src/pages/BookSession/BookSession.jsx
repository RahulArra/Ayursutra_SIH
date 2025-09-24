import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./BookSession.module.css";

const therapies = [
  {
    id: "vamana",
    name: "Vamana",
    icon: "🌿",
    description: "Therapeutic vomiting for cleansing the 'kapha' dosha",
    duration: "60 mins",
    price: "₹1,500"
  },
  {
    id: "nasya",
    name: "Nasya",
    icon: "👃",
    description: "Nasal administration of herbs or oils to cleanse the head and sinus area",
    duration: "45 mins",
    price: "₹2,000"
  },
  {
    id: "virechana",
    name: "Virechana",
    icon: "💊",
    description: "Purgation therapy for 'pitta' dosha detoxification",
    duration: "90 mins",
    price: "₹2,500"
  },
  {
    id: "basti",
    name: "Basti",
    icon: "🩹",
    description: "Herbal enema therapy for 'vata' dosha balance",
    duration: "75 mins",
    price: "₹3,000"
  },
  {
    id: "raktamokshana",
    name: "Raktamokshana",
    icon: "💉",
    description: "Blood purification therapy",
    duration: "75 mins",
    price: "₹3,000"
  }
];

const practitioners = [
  { id: 1, name: "Dr. Anjali Sharma", specialization: "Mental Wellness" },
  { id: 2, name: "Dr. Rajesh Kumar", specialization: "Detox Therapy" },
  { id: 3, name: "Dr. Priya Patel", specialization: "Stress Management" }
];

export default function BookSession() {
  const navigate = useNavigate();
  const [selectedTherapy, setSelectedTherapy] = useState("");
  const [selectedPractitioner, setSelectedPractitioner] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
  ];

  const getNextWeekDates = () => {
    const dates = [];
    for (let i = 1; i <= 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dates.push(date.toISOString().split('T')[0]);
    }
    return dates;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!selectedTherapy || !selectedPractitioner || !selectedDate || !selectedTime) {
      alert("Please fill in all required fields");
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
    }, 1000);
  };

  const handleNewBooking = () => {
    setSelectedTherapy("");
    setSelectedPractitioner("");
    setSelectedDate("");
    setSelectedTime("");
    setNotes("");
    setIsSubmitted(false);
  };

  const handleBackToDashboard = () => {
    navigate("/dashboard");
  };

  if (isSubmitted) {
    const therapyName = therapies.find(t => t.id === selectedTherapy)?.name;
    const practitionerName = practitioners.find(p => p.id == selectedPractitioner)?.name;
    
    return (
      <div className={styles.bookSessionPage}>
        <div className={styles.bookingFormCard}>
          <div className={styles.successMessage}>
            <div className={styles.successIcon}>✅</div>
            <h2 className={styles.successTitle}>Session Booked Successfully!</h2>
            <p>Your {therapyName} session with {practitionerName} has been scheduled.</p>
            
            <div style={{ marginTop: '20px', textAlign: 'left', display: 'inline-block' }}>
              <div className={styles.previewItem}>
                <span className={styles.previewLabel}>Therapy:</span>
                <span className={styles.previewValue}>{therapyName}</span>
              </div>
              <div className={styles.previewItem}>
                <span className={styles.previewLabel}>Practitioner:</span>
                <span className={styles.previewValue}>{practitionerName}</span>
              </div>
              <div className={styles.previewItem}>
                <span className={styles.previewLabel}>Date:</span>
                <span className={styles.previewValue}>
                  {new Date(selectedDate).toLocaleDateString('en-IN', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
              <div className={styles.previewItem}>
                <span className={styles.previewLabel}>Time:</span>
                <span className={styles.previewValue}>{selectedTime}</span>
              </div>
            </div>
            
            <div style={{ marginTop: '30px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button 
                onClick={handleNewBooking} 
                className={styles.submitButton}
                style={{ flex: 1, maxWidth: '200px' }}
              >
                Book Another Session
              </button>
              <button 
                onClick={handleBackToDashboard} 
                className={styles.submitButton}
                style={{ 
                  flex: 1, 
                  maxWidth: '200px',
                  background: 'linear-gradient(135deg, var(--primary-warmth), #D2691E)' 
                }}
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const selectedTherapyData = therapies.find(t => t.id === selectedTherapy);

  return (
    <div className={styles.bookSessionPage}>
      <h1 className={styles.pageTitle}>Book Panchakarma Session</h1>
      
      <div className={styles.bookingGrid}>
        {/* Booking Form */}
        <div className={styles.bookingFormCard}>
          <div className={styles.cardHeader}>
            <div className={styles.cardIcon}>📅</div>
            <h2 className={styles.cardTitle}>Session Details</h2>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Therapy Selection */}
            <div className={styles.formGroup}>
              <label className={styles.label}>Select Panchakarma Therapy *</label>
              <div className={styles.therapyOptions}>
                {therapies.map((therapy) => (
                  <div
                    key={therapy.id}
                    className={`${styles.therapyOption} ${
                      selectedTherapy === therapy.id ? styles.selected : ""
                    }`}
                    onClick={() => setSelectedTherapy(therapy.id)}
                  >
                    <div className={styles.therapyIcon}>{therapy.icon}</div>
                    <div className={styles.therapyName}>{therapy.name}</div>
                    <div className={styles.therapyDesc}>{therapy.description}</div>
                    <div className={styles.therapyDesc}>{therapy.duration} • {therapy.price}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Practitioner Selection */}
            <div className={styles.formGroup}>
              <label className={styles.label}>Select Vaidya (Practitioner) *</label>
              <select 
                className={styles.select}
                value={selectedPractitioner}
                onChange={(e) => setSelectedPractitioner(e.target.value)}
                required
              >
                <option value="">Choose a Vaidya</option>
                {practitioners.map((practitioner) => (
                  <option key={practitioner.id} value={practitioner.id}>
                    {practitioner.name} - {practitioner.specialization}
                  </option>
                ))}
              </select>
            </div>

            {/* Date and Time */}
            <div className={styles.formGroup}>
              <label className={styles.label}>Date & Time *</label>
              <div className={styles.datetimeGroup}>
                <select 
                  className={styles.select}
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  required
                >
                  <option value="">Select date</option>
                  {getNextWeekDates().map((date) => (
                    <option key={date} value={date}>
                      {new Date(date).toLocaleDateString('en-IN', { 
                        weekday: 'short', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </option>
                  ))}
                </select>

                <select 
                  className={styles.select}
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  required
                >
                  <option value="">Select time</option>
                  {timeSlots.map((time) => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Additional Notes */}
            <div className={styles.formGroup}>
              <label className={styles.label}>Prakriti & Concerns</label>
              <textarea
                className={styles.textarea}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Share your dosha type (Vata/Pitta/Kapha) and specific health concerns..."
              />
            </div>

            <button 
              type="submit" 
              className={styles.submitButton}
              disabled={!selectedTherapy || !selectedPractitioner || !selectedDate || !selectedTime}
            >
              Book Panchakarma Session
            </button>
          </form>
        </div>

        {/* Booking Preview */}
        <div className={styles.bookingPreviewCard}>
          <div className={styles.cardHeader}>
            <div className={styles.cardIcon}>👁️</div>
            <h2 className={styles.cardTitle}>Booking Summary</h2>
          </div>

          {selectedTherapyData ? (
            <>
              <div className={styles.previewItem}>
                <span className={styles.previewLabel}>Therapy:</span>
                <span className={styles.previewValue}>{selectedTherapyData.name}</span>
              </div>
              <div className={styles.previewItem}>
                <span className={styles.previewLabel}>Duration:</span>
                <span className={styles.previewValue}>{selectedTherapyData.duration}</span>
              </div>
              <div className={styles.previewItem}>
                <span className={styles.previewLabel}>Price:</span>
                <span className={styles.previewValue}>{selectedTherapyData.price}</span>
              </div>
              {selectedPractitioner && (
                <div className={styles.previewItem}>
                  <span className={styles.previewLabel}>Vaidya:</span>
                  <span className={styles.previewValue}>
                    {practitioners.find(p => p.id == selectedPractitioner)?.name}
                  </span>
                </div>
              )}
              {selectedDate && (
                <div className={styles.previewItem}>
                  <span className={styles.previewLabel}>Date:</span>
                  <span className={styles.previewValue}>
                    {new Date(selectedDate).toLocaleDateString('en-IN', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </span>
                </div>
              )}
              {selectedTime && (
                <div className={styles.previewItem}>
                  <span className={styles.previewLabel}>Time:</span>
                  <span className={styles.previewValue}>{selectedTime}</span>
                </div>
              )}
            </>
          ) : (
            <p style={{ color: '#6B7280', textAlign: 'center', padding: '20px' }}>
              Select a Panchakarma therapy to see booking details
            </p>
          )}
        </div>
      </div>
    </div>
  );
}