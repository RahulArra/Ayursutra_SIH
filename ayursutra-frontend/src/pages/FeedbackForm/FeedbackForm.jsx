import React, { useState } from "react";
import styles from "./FeedbackForm.module.css";

export default function FeedbackForm() {
  const [rating, setRating] = useState(3);
  const [notes, setNotes] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { rating, notes, date: new Date().toISOString() };
    console.log("Mock submit feedback:", payload);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
    }, 500);
  };

  const handleNewFeedback = () => {
    setIsSubmitted(false);
    setNotes("");
    setRating(3);
  };

  if (isSubmitted) {
    return (
      <div className={styles.feedbackPage}>
        <div className={styles.feedbackCard}>
          <div className={styles.successMessage}>
            <div className={styles.successIcon}>✨</div>
            <h2 className={styles.successTitle}>Thank You for Your Feedback!</h2>
            <p className={styles.successText}>
              Your insights help us improve the Ayurvedic experience for everyone. 
              Your feedback is valued and will be reviewed by our practitioners.
            </p>
            <button onClick={handleNewFeedback} className={styles.continueButton}>
              Submit Another Feedback
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.feedbackPage}>
      <h1 className={styles.pageTitle}>Share Your Experience</h1>

      <div className={styles.feedbackCard}>
        <div className={styles.formHeader}>
          <div className={styles.formIcon}>💭</div>
          <h2 className={styles.formTitle}>Session Feedback</h2>
          <p className={styles.formSubtitle}>
            Your feedback helps us personalize your Ayurvedic journey and improve our services. 
            Share your thoughts about your recent session.
          </p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Rating Section */}
          <div className={styles.ratingSection}>
            <div className={styles.ratingLabel}>
              <span>How was your session?</span>
              <span className={styles.ratingValue}>{rating}/5</span>
            </div>
            
            <input
              type="range"
              min={1}
              max={5}
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className={styles.ratingSlider}
            />
            
            <div className={styles.ratingLabels}>
              <span className={styles.ratingLabelItem}>Needs Improvement</span>
              <span className={styles.ratingLabelItem}>Satisfactory</span>
              <span className={styles.ratingLabelItem}>Excellent</span>
            </div>
          </div>

          {/* Notes Section */}
          <div className={styles.notesSection}>
            <label className={styles.notesLabel}>
              <span className={styles.notesIcon}>📝</span>
              Additional Comments
            </label>
            <textarea
              className={styles.notesTextarea}
              rows={5}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Share your thoughts about the session... What did you find helpful? Any suggestions for improvement?"
              maxLength={500}
            />
            <div className={styles.characterCount}>
              {notes.length}/500 characters
            </div>
          </div>

          {/* Submit Button */}
          <div className={styles.submitSection}>
            <button type="submit" className={styles.submitButton}>
              🌿 Submit Feedback
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}