
function initEditor() {
  const snowEditor = document.getElementById('snow-editor');
  if (snowEditor) {
    new Quill(snowEditor, {
      theme: 'snow',
      modules: {
        toolbar: [
          [{ 'header': [1, 2, 3, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote', 'code-block'],
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          ['clean']
        ]
      }
    });
  }

  const bubbleEditor = document.getElementById('bubble-editor');
  if (bubbleEditor) {
    new Quill(bubbleEditor, {
      theme: 'bubble'
    });
  }
}
