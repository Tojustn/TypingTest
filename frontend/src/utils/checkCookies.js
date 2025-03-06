function checkJwtCookie() {
  const cookies = document.cookie.split(';');
  const jwtCookie = cookies.find(cookie => cookie.trim().startsWith('jwt='));
  
  if (jwtCookie) {
    console.log('JWT cookie exists:', jwtCookie);
    return true;
  } else {
    console.log('JWT cookie not found');
    return false;
  }
}

export default checkJwtCookie;
