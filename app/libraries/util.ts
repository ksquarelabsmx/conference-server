export const months = [
  { name: "January", val: 1 },
  { name: "February", val: 2 },
  { name: "March", val: 3 },
  { name: "April", val: 4 },
  { name: "May", val: 5 },
  { name: "June", val: 6 },
  { name: "July", val: 7 },
  { name: "August", val: 8 },
  { name: "September", val: 9 },
  { name: "October", val: 10 },
  { name: "November", val: 11 },
  { name: "December", val: 12 }
];

export const weekdays = [
  { name: "Sunday", val: 0 },
  { name: "Monday", val: 1 },
  { name: "Tuesday", val: 2 },
  { name: "Wednesday", val: 3 },
  { name: "Thursday", val: 4 },
  { name: "Friday", val: 5 },
  { name: "Saturday", val: 6 }
];

export const colors = ["red", "purple", "blue", "light-blue", "orange"];

export function numberFixedLen(n, len) {
  return (1e4 + "" + n).slice(-len);
}

export function numToMonth(n) {
  return months[n - 1].name;
}

export function getRandomColor() {
  let index = Math.floor(Math.random() * colors.length);
  return colors[index];
}

export function getActualDate() {
  let date = new Date();
  let actualDate = date.toLocaleString("es-MX", {
    formatMatcher: "basic",
    timeZone: "America/Mexico_City"
  });
  return actualDate;
}

export function isEmpty(attribute) {
  //check if it's a falsy value, don't include 0
  if (!attribute && attribute !== 0) {
    return true;
  }
  return false;
}
