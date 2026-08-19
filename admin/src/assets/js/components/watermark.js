function initWatermark() {
  const container = document.getElementById('watermark-container');
  if (!container) return;

  import('watermark-js-plus').then(({ Watermark }) => {
    // Basic Text Watermark
    const btnText = document.getElementById('btn-watermark-text');
    let textWatermark = null;
    
    if (btnText) {
      btnText.addEventListener('click', () => {
        if (textWatermark) {
          textWatermark.destroy();
          textWatermark = null;
          btnText.textContent = 'Add Text Watermark';
          return;
        }
        textWatermark = new Watermark({
          content: 'Confidential',
          width: 200,
          height: 200,
          color: 'rgba(0,0,0,0.1)',
          fontSize: '24px',
          fontFamily: 'system-ui, sans-serif',
          parent: '#watermark-container',
          zIndex: 100
        });
        textWatermark.create();
        btnText.textContent = 'Remove Text Watermark';
      });
    }

    // Image Watermark
    const btnImage = document.getElementById('btn-watermark-image');
    let imageWatermark = null;
    
    if (btnImage) {
      btnImage.addEventListener('click', () => {
        if (imageWatermark) {
          imageWatermark.destroy();
          imageWatermark = null;
          btnImage.textContent = 'Add Image Watermark';
          return;
        }
        imageWatermark = new Watermark({
          image: 'https://picsum.photos/100/50?grayscale',
          width: 300,
          height: 300,
          imageWidth: 100,
          imageHeight: 50,
          parent: '#watermark-container',
          zIndex: 100,
          opacity: 0.2
        });
        imageWatermark.create();
        btnImage.textContent = 'Remove Image Watermark';
      });
    }
    // Multi-line Watermark
    const btnMulti = document.getElementById('btn-watermark-multiline');
    let multiWatermark = null;
    
    if (btnMulti) {
      btnMulti.addEventListener('click', () => {
        if (multiWatermark) {
          multiWatermark.destroy();
          multiWatermark = null;
          btnMulti.textContent = 'Add Multi-line Watermark';
          return;
        }
        multiWatermark = new Watermark({
          content: ['Strictly', 'Confidential'],
          width: 250,
          height: 250,
          color: 'rgba(0,0,0,0.1)',
          fontSize: '20px',
          fontFamily: 'system-ui, sans-serif',
          parent: '#watermark-container',
          zIndex: 100
        });
        multiWatermark.create();
        btnMulti.textContent = 'Remove Multi-line Watermark';
      });
    }

    // Colored Watermark
    const btnColor = document.getElementById('btn-watermark-color');
    let colorWatermark = null;
    
    if (btnColor) {
      btnColor.addEventListener('click', () => {
        if (colorWatermark) {
          colorWatermark.destroy();
          colorWatermark = null;
          btnColor.textContent = 'Add Colored Watermark';
          return;
        }
        colorWatermark = new Watermark({
          content: 'DRAFT',
          width: 200,
          height: 200,
          color: 'rgba(220, 53, 69, 0.15)', // Danger color with low opacity
          fontSize: '32px',
          fontFamily: 'system-ui, sans-serif',
          parent: '#watermark-container',
          zIndex: 100,
          rotate: 45
        });
        colorWatermark.create();
        btnColor.textContent = 'Remove Colored Watermark';
      });
    }
  }).catch(err => {
    console.error('Failed to load watermark-js-plus', err);
  });
}
