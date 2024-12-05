import React, { useEffect, useState } from 'react';

const Profile = () => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const username = localStorage.getItem('username');
    setUserData({ name: username }); // עדכון הנתונים בהתאם לצורך
  }, []);

  return (
    <div>
      <h2>פרטי משתמש</h2>
      <p>שם משתמש: {userData.name}</p>
      {/* הוסף פרטים נוספים אם יש */}
    </div>
  );
};

export default Profile;
