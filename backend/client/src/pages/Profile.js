function Profile() {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  return (
    <div style={{ padding: "20px" }}>
      <h2>User Profile</h2>

      {userInfo ? (
        <div>
          <p><strong>Name:</strong> {userInfo.name}</p>
          <p><strong>Email:</strong> {userInfo.email}</p>
        </div>
      ) : (
        <p>Please login</p>
      )}
    </div>
  );
}

export default Profile;