const USERS_KEY = "users";
const USER_KEY = "user";
const REVIEWS_KEY = "reviews";

function initUsers() {
  // Stop if data is already initialised.
  if(localStorage.getItem(USERS_KEY) !== null)
    return;

  const users = [];

  // Set data into local storage.
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function initReviews() {
  if (localStorage.getItem(REVIEWS_KEY) !== null)
    return;

  const reviews = [];
  localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));
}

function addReview(movie, email, review, stars) {
    const reviews = getReviews();
    
    reviews.push({ movie: movie, email: email, review: review, stars: stars });
    localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));
}

function deleteReview(movie, email, reviewMsg, stars) {
  const reviews = getReviews();
  for (const review of reviews) {
    if (review.movie === movie && review.email === email && review.review === reviewMsg && review.stars === stars) {
      const index = reviews.indexOf(review);
      reviews.splice(index, 1);
      localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));
      return true;
    }
  }
}

function getReviews() {
  const data = localStorage.getItem(REVIEWS_KEY);
  return JSON.parse(data);
}

function addUser(firstname, lastname, email, password) {
    const users = getUsers();
    for (const user of users) {
      if (email === user.email) {
        return false;
      }
    }

    const date = new Date();
    let currentDay= String(date.getDate()).padStart(2, '0');
    let currentMonth = String(date.getMonth()+1).padStart(2,"0");
    let currentYear = date.getFullYear();
    let currentDate = `${currentDay}-${currentMonth}-${currentYear}`;

    users.push({ firstname: firstname, lastname: lastname, email: email, password: password, joindate: currentDate });
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    return true;
}

function editUser(firstname, lastname, prevEmail, newEmail, password, joindate) {

    const users = getUsers();
    if (prevEmail !== newEmail) {
      for (const user of users) {
          if (user.email === newEmail) {
            return false; // Check if email already exists in the system.
          }
      }

      // If email does not exist in the system, update the profile.
      for (const user of users) {
        if (prevEmail === user.email) {
          user.firstname = firstname;
          user.lastname = lastname;
          user.email = newEmail;
          user.password = password;
          user.joindate = joindate;
          localStorage.setItem(USERS_KEY, JSON.stringify(users));
          return true;
        }
      }
    }

    // If user did not change email
    for (const user of users) {
      if (prevEmail === user.email) {
        user.firstname = firstname;
        user.lastname = lastname;
        user.password = password;
        user.joindate = joindate;
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
        return true;
      } 
    }  
}

function deleteUser(email) {
  const users = getUsers();
  for (const user of users) {
    if (user.email === email) {
      const index = users.indexOf(user);
      users.splice(index, 1);
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
      return true;
    }
  }

  return false;
}

function getUsers() {
  // Extract user data from local storage.
  const data = localStorage.getItem(USERS_KEY);

  // Convert data to objects.
  return JSON.parse(data);
}

function verifyUser(email, password) {
  const users = getUsers();
  for(const user of users) {
    if(email === user.email && password === user.password)
    {
      const temp = { ...user };
      setUser(temp);
      return true;
    }
  }

  return false;
}

function setUser(user) {
  const temp = {firstname: user.firstname, lastname: user.lastname, email: user.email, password: user.password, joindate: user.joindate};
  localStorage.setItem(USER_KEY, JSON.stringify(temp));
}

function getUser() {
  return localStorage.getItem(USER_KEY);
}

function getUserFirstName(email){
  const users = getUsers();
  for(const user of users) {
    if(email === user.email)
    {
      return user.firstname;
    }
  }
}

function getUserLastName(email){
  const users = getUsers();
  for(const user of users) {
    if(email === user.email)
    {
      return user.lastname;
    }
  }
}

function getJoinDate(email){
  const users = getUsers();
  for(const user of users) {
    if(email === user.email)
    {
      return user.joindate;
    }
  }
}

function getUserPassword(email){
  const users = getUsers();
  for(const user of users) {
    if(email === user.email)
    {
      return user.password;
    }
  }
}

function removeUser() {
  localStorage.removeItem(USER_KEY);
}

export {
  initUsers,
  initReviews,
  addReview,
  deleteReview,
  getReviews,
  verifyUser,
  addUser,
  editUser,
  deleteUser,
  getUser,
  getUserFirstName,
  getUserLastName,
  getJoinDate,
  getUserPassword,
  removeUser
}
