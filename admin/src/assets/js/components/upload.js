




function initUpload() {
  const inputElement = document.querySelector('.filepond');
  if (inputElement) {
    FilePond.registerPlugin(
      FilePondPluginImagePreview,
      FilePondPluginFileValidateType,
      FilePondPluginFileValidateSize
    );
    
    FilePond.create(inputElement, {
      allowMultiple: true,
      allowReorder: true,
      maxFiles: 5,
      maxFileSize: '5MB',
      acceptedFileTypes: ['image/png', 'image/jpeg', 'image/gif', 'application/pdf'],
      labelIdle: 'Drag & Drop your files or <span class="filepond--label-action"> Browse </span>'
    });
  }

  const profilePondElement = document.getElementById('filepond-profile');
  if (profilePondElement) {
    FilePond.create(profilePondElement, {
      labelIdle: 'Drag & Drop your picture or <span class="filepond--label-action">Browse</span>',
      imagePreviewHeight: 170,
      stylePanelLayout: 'compact circle',
      styleLoadIndicatorPosition: 'center bottom',
      styleButtonRemoveItemPosition: 'center bottom'
    });
  }
}
