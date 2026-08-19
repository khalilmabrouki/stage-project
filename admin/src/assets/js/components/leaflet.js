

const initLeafletMaps = () => {
  // Basic Map
  const basicEl = document.getElementById('leaflet-basic');
  if (basicEl) {
    const map = L.map('leaflet-basic').setView([51.505, -0.09], 13);
    
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    L.marker([51.5, -0.09]).addTo(map)
      .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
      .openPopup();
  }

  // Popup Map
  const popupEl = document.getElementById('leaflet-popup');
  if (popupEl) {
    const map2 = L.map('leaflet-popup').setView([48.8566, 2.3522], 12); // Paris
    
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map2);

    const circle = L.circle([48.8566, 2.3522], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: 1500
    }).addTo(map2);

    circle.bindPopup("I am a circle centered in Paris.");
  }

  // Dark Map
  const darkEl = document.getElementById('leaflet-dark');
  if (darkEl) {
    const map3 = L.map('leaflet-dark').setView([40.7128, -74.0060], 12); // New York
    
    // Using CartoDB Dark Matter tiles
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 20
    }).addTo(map3);

    L.marker([40.7128, -74.0060]).addTo(map3)
      .bindPopup('New York City');
  }
};
