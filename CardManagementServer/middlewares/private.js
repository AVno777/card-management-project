function authenticate(req, res, next) {
  const { username, password } = req.body;

  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (user && user.isAdmin) {
    // User is authenticated and is an admin
    req.user = user; // Attach the user object to the request for further use
    next();
  } else {
    // Invalid credentials or non-admin user
    res.status(401).json({ error: "Invalid credentials or non-admin user" });
  }
}
