export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.data?.token
    if (user && token) {
      return { Authorization: 'Bearer ' + token };
    } else {
      return {};
    }
}