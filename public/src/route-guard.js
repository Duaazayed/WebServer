(() => {
  const isAuth = getStorage('isAuth');
  if (!isAuth) {
    logout();
    alert('Log in to view your reservation.');
    window.location.href = '/index.html';
  }
})();