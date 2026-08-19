const initWorldClock = () => {
  const clockContainer = document.getElementById('world-clock-list');
  if (!clockContainer) return;

  const cities = [
    { name: 'New York', tz: 'America/New_York', flag: '🇺🇸' },
    { name: 'London', tz: 'Europe/London', flag: '🇬🇧' },
    { name: 'Dubai', tz: 'Asia/Dubai', flag: '🇦🇪' },
    { name: 'Mumbai', tz: 'Asia/Kolkata', flag: '🇮🇳' },
    { name: 'Tokyo', tz: 'Asia/Tokyo', flag: '🇯🇵' },
    { name: 'Sydney', tz: 'Australia/Sydney', flag: '🇦🇺' },
  ];

  function updateClocks() {
    const now = new Date();
    
    let html = '';
    cities.forEach(city => {
      // get time in specific timezone
      const timeStr = now.toLocaleTimeString('en-US', {
        timeZone: city.tz,
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
      
      const hourStr = now.toLocaleTimeString('en-US', { timeZone: city.tz, hour: 'numeric', hour12: false });
      const hour = parseInt(hourStr, 10);
      
      let icon = '☀️';
      let period = 'Day';
      if (hour >= 18 || hour < 5) {
        icon = '🌙';
        period = 'Night';
      } else if (hour >= 16 && hour < 18) {
        icon = '🌇';
        period = 'Evening';
      }

      html += `
        <div class="d-flex justify-content-between align-items-center p-3 rounded bg-body-tertiary border border-opacity-50 hover-shadow transition-all">
          <div class="d-flex align-items-center gap-3" style="width: 40%;">
            <span class="fs-22">${city.flag}</span>
            <span class="fw-semibold text-body">${city.name}</span>
          </div>
          <div class="text-center" style="width: 30%;">
            <span class="fw-bold font-monospace fs-16 text-primary tracking-wide">${timeStr}</span>
          </div>
          <div class="d-flex align-items-center justify-content-end gap-2 text-muted" style="width: 30%;">
            <span class="fs-18">${icon}</span>
            <span class="small fw-medium text-uppercase letter-spacing-1">${period}</span>
          </div>
        </div>
      `;
    });
    
    clockContainer.innerHTML = html;
  }

  updateClocks();
  setInterval(updateClocks, 1000);
};
