import React, { useState } from "react";
import Login from "../../pages/Login";
import Register from "../../pages/Register";
import Checkout from "./Checkout";
import Payment from "../Client/Payment";

const OrderProcess = () => {
  const [completedSteps, setCompletedSteps] = useState(0); // מעקב אחר שלבים
  const [formData, setFormData] = useState({
    login: {},
    register: {},
    checkout: {},
    payment: {},
  });

  const handleStepComplete = (step, data) => {
    setFormData({ ...formData, [step]: data }); // שמירת נתונים של השלב
    setCompletedSteps((prev) => prev + 1); // מעבר לשלב הבא
  };

  return (
    <div>
      {/* שלב 1: התחברות */}
      {completedSteps >= 0 && (
        <div>
          <h3>שלב 1: התחברות</h3>
          <Login
            onComplete={(data) => handleStepComplete("login", data)}
          />
        </div>
      )}

      {/* שלב 2: רישום */}
      {completedSteps >= 1 && (
        <div>
          <h3>שלב 2: רישום</h3>
          <Register
            onComplete={(data) => handleStepComplete("register", data)}
          />
        </div>
      )}

      {/* שלב 3: הזמנה */}
      {completedSteps >= 2 && (
        <div>
          <h3>שלב 3: הזמנה</h3>
          <Checkout
            onComplete={(data) => handleStepComplete("checkout", data)}
          />
        </div>
      )}

      {/* שלב 4: תשלום */}
      {completedSteps >= 3 && (
        <div>
          <h3>שלב 4: תשלום</h3>
          <Payment
            onComplete={(data) => handleStepComplete("payment", data)}
          />
        </div>
      )}
    </div>
  );
};

export default OrderProcess;
