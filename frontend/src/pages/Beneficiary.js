import { useState } from "react";

function Beneficiary() {
  const [showMail, setShowMail] = useState(false);

  const styles = {
    container: {
      width: "50%",
      margin: "80px auto",
      textAlign: "center",
      color: "white",
      fontFamily: "Arial"
    },
    button: {
      padding: "12px 20px",
      background: "#007bff",
      border: "none",
      borderRadius: "6px",
      color: "white",
      cursor: "pointer"
    },
    emailBox: {
      marginTop: "30px",
      textAlign: "left",
      background: "#1e2a38",
      padding: "20px",
      borderRadius: "10px",
      border: "1px solid #ccc"
    },
    emailBody: {
      marginTop: "15px",
      background: "#2c3e50",
      padding: "15px",
      borderRadius: "6px"
    }
  };

  return (
    <div style={styles.container}>
      <h1>Beneficiary Access</h1>

      <button style={styles.button} onClick={() => setShowMail(true)}>
        Claim Assets
      </button>

      {showMail && (
        <div style={styles.emailBox}>
          <h3>📧 Email Notification</h3>

          <p><strong>To:</strong> beneficiary@gmail.com</p>
          <p><strong>Subject:</strong> Asset Claim Initiated</p>

          <div style={styles.emailBody}>
            <p>Dear Beneficiary,</p>

            <p>
              The asset claim request has been successfully initiated.
              You will receive further updates after verification.
            </p>

            <p><strong>Status:</strong> Pending Verification</p>

            <p>Regards,<br/>Digital Will System</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Beneficiary;