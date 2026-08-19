


// We also need US and Russia if we want to display them, but often they are separate plugins.
// For now, let's just initialize the world map with markers, and maybe some regions.

const initVectorMaps = () => {
  const worldMapEl = document.getElementById('vector-map-world');
  if (worldMapEl) {
    new jsVectorMap({
      selector: '#vector-map-world',
      map: 'world',
      backgroundColor: 'transparent',
      zoomOnScroll: false,
      regionStyle: {
        initial: {
          fill: '#e9ecef',
          stroke: 'none',
          strokeWidth: 0,
          strokeOpacity: 1
        },
        hover: {
          fill: '#0d6efd', // Primary color
          fillOpacity: 0.8,
          cursor: 'pointer'
        }
      },
      markers: [
        { name: 'New York', coords: [40.7128, -74.0060] },
        { name: 'London', coords: [51.5074, -0.1278] },
        { name: 'Tokyo', coords: [35.6762, 139.6503] },
        { name: 'Sydney', coords: [-33.8688, 151.2093] }
      ],
      markerStyle: {
        initial: {
          fill: '#198754', // Success color
          stroke: '#fff',
          strokeWidth: 2,
          r: 6
        },
        hover: {
          fill: '#dc3545', // Danger color
          stroke: '#fff',
          strokeWidth: 2,
          r: 8
        }
      }
    });
  }

  // Fallback for US/Russia maps using the world map zoomed in, 
  // since jsvectormap doesn't bundle individual country maps by default without extra scripts.
  const usMapEl = document.getElementById('vector-map-us');
  if (usMapEl) {
    new jsVectorMap({
      selector: '#vector-map-us',
      map: 'world',
      backgroundColor: 'transparent',
      zoomOnScroll: false,
      focusOn: {
        regions: ['US'],
        animate: true
      },
      regionStyle: {
        initial: { fill: '#e9ecef' }
      }
    });
  }

  const ruMapEl = document.getElementById('vector-map-russia');
  if (ruMapEl) {
    new jsVectorMap({
      selector: '#vector-map-russia',
      map: 'world',
      backgroundColor: 'transparent',
      zoomOnScroll: false,
      focusOn: {
        regions: ['RU'],
        animate: true
      },
      regionStyle: {
        initial: { fill: '#e9ecef' }
      }
    });
  }
};
