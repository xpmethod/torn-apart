export default function() {
  const int = setInterval(() => true, 9999);
  for (let i = 0; i <= int; i++) {
    clearInterval(i);
  }
}
