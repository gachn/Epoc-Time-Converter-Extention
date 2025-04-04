document.addEventListener('DOMContentLoaded', function () {
  const relativeTimeInput = document.getElementById('relativeTime');
  const absoluteTimeOutput = document.getElementById('absoluteTime');

  relativeTimeInput.addEventListener('input', function () {
    const relativeTime = relativeTimeInput.value.trim();
    if (relativeTime) {
      try {
        const absoluteTimestamp = calculateAbsoluteTime(relativeTime);
        absoluteTimeOutput.value = absoluteTimestamp;
      } catch (error) {
        absoluteTimeOutput.value = "Invalid input";
      }
    } else {
      absoluteTimeOutput.value = "";
    }
  });

  function calculateAbsoluteTime(relativeTime) {
    const now = new Date();
    const parts = relativeTime.toLowerCase().split('+');

    if (parts.length === 1 && parts[0].trim() === 'now') {
      return Math.floor(now.getTime() / 1000); // Epoch time in seconds
    } else if (parts.length === 2) {
      const base = parts[0].trim();
      const offset = parts[1].trim();

      if (base !== 'now') {
        throw new Error("Invalid base time");
      }

      const offsetParts = offset.split(' ');
      if (offsetParts.length === 2) {
        const value = parseInt(offsetParts[0]);
        const unit = offsetParts[1].replace(/s$/, ''); // Remove trailing 's'

        if (isNaN(value)) {
          throw new Error("Invalid offset value");
        }

        switch (unit) {
          case 'day':
          case 'd':
            now.setDate(now.getDate() + value);
            break;
          case 'month':
            now.setMonth(now.getMonth() + value);
            break;
          case 'year':
          case 'y':
            now.setFullYear(now.getFullYear() + value);
            break;
          case 'hour':
          case 'h':
            now.setHours(now.getHours() + value);
            break;
          case 'minute':
          case 'min':
          case 'm':
            now.setMinutes(now.getMinutes() + value);
            break;
          case 'second':
          case 's':
            now.setSeconds(now.getSeconds() + value);
            break;
          default:
            throw new Error("Invalid offset unit");
        }
        return Math.floor(now.getTime() / 1000); // Epoch time in seconds
      } else {
        throw new Error("Invalid offset format");
      }
    } else {
      throw new Error("Invalid input format");
    }
  }
});