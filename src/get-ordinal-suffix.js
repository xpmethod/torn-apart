export default function(n) {
  const suffix = ["th", "st", "nd", "rd"],
    variance = n % 100;
  return suffix[(variance - 20) % 10]||suffix[variance]||suffix[0];
}
