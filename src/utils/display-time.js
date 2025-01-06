function displayTime(time) {
    const seconds = time/1;
    if (seconds < 60) {
      return seconds + " seconds";
    } else if (seconds < 3600) {
      return Math.floor(seconds / 60) + " minutes";
    } else if (seconds < 86400) {
      return Math.floor(seconds / 3600) + " hours";
    } else if (seconds < 604800) {
      return Math.floor(seconds / 86400) + " days";
    } else if (seconds < 2592000) {
      return Math.floor(seconds / 604800) + " weeks";
    } else if (seconds < 31536000) {
      return Math.floor(seconds / 2592000) + " months";
    } else {
      return Math.floor(seconds / 31536000) + " years";
    }
  }
  
  module.exports = { displayTime };
  