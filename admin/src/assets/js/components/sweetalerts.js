

function initSweetAlerts() {
  const basicBtn = document.getElementById('swalBasic');
  const successBtn = document.getElementById('swalSuccess');
  const errorBtn = document.getElementById('swalError');
  const warningBtn = document.getElementById('swalWarning');
  const infoBtn = document.getElementById('swalInfo');
  const confirmBtn = document.getElementById('swalConfirm');
  const htmlBtn = document.getElementById('swalHtml');
  const imageBtn = document.getElementById('swalImage');
  const autoCloseBtn = document.getElementById('swalAutoClose');
  const ajaxBtn = document.getElementById('swalAjax');

  if (basicBtn) {
    basicBtn.addEventListener('click', () => {
      Swal.fire({
        title: 'Any fool can use a computer',
        confirmButtonColor: '#004276'
      });
    });
  }

  if (successBtn) {
    successBtn.addEventListener('click', () => {
      Swal.fire({
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500
      });
    });
  }

  if (errorBtn) {
    errorBtn.addEventListener('click', () => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        confirmButtonColor: '#004276'
      });
    });
  }

  if (warningBtn) {
    warningBtn.addEventListener('click', () => {
      Swal.fire({
        icon: 'warning',
        title: 'Are you sure?',
        text: 'You will not be able to recover this imaginary file!',
        confirmButtonColor: '#ffc107',
        confirmButtonText: 'Yes, proceed',
        showCancelButton: true,
        cancelButtonColor: '#6c757d'
      });
    });
  }

  if (infoBtn) {
    infoBtn.addEventListener('click', () => {
      Swal.fire({
        icon: 'info',
        title: 'Information',
        text: 'This is a message showing detailed logs and statistics.',
        confirmButtonColor: '#0dcaf0'
      });
    });
  }

  if (confirmBtn) {
    confirmBtn.addEventListener('click', () => {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#198754',
        cancelButtonColor: '#dc3545',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: 'Deleted!',
            text: 'Your file has been deleted.',
            icon: 'success',
            confirmButtonColor: '#004276'
          });
        }
      });
    });
  }

  if (htmlBtn) {
    htmlBtn.addEventListener('click', () => {
      Swal.fire({
        title: '<strong>HTML <u>example</u></strong>',
        icon: 'info',
        html: `You can use <b>bold text</b>, <a href="#">links</a> and other HTML elements.`,
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: '<i class="fa fa-thumbs-up"></i> Great!',
        confirmButtonAriaLabel: 'Thumbs up, great!',
        cancelButtonText: '<i class="fa fa-thumbs-down"></i> Cancel',
        cancelButtonAriaLabel: 'Thumbs down',
        confirmButtonColor: '#004276',
        cancelButtonColor: '#6c757d'
      });
    });
  }

  if (imageBtn) {
    imageBtn.addEventListener('click', () => {
      Swal.fire({
        title: 'Beautiful View',
        text: 'Modal with a custom responsive image header.',
        imageUrl: 'https://unsplash.it/400/200',
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',
        confirmButtonColor: '#004276'
      });
    });
  }

  if (autoCloseBtn) {
    autoCloseBtn.addEventListener('click', () => {
      let timerInterval;
      Swal.fire({
        title: 'Auto close alert!',
        html: 'I will close in <b></b> milliseconds.',
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
          const timer = Swal.getPopup().querySelector('b');
          timerInterval = setInterval(() => {
            timer.textContent = `${Swal.getTimerLeft()}`;
          }, 100);
        },
        willClose: () => {
          clearInterval(timerInterval);
        }
      });
    });
  }

  if (ajaxBtn) {
    ajaxBtn.addEventListener('click', () => {
      Swal.fire({
        title: 'Submit your Github username',
        input: 'text',
        inputAttributes: {
          autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Look up',
        showLoaderOnConfirm: true,
        confirmButtonColor: '#004276',
        cancelButtonColor: '#6c757d',
        preConfirm: async (login) => {
          try {
            const response = await fetch(`https://api.github.com/users/${login}`);
            if (!response.ok) {
              return Swal.showValidationMessage(`Request failed: ${response.statusText}`);
            }
            return await response.json();
          } catch (error) {
            Swal.showValidationMessage(`Request failed: ${error}`);
          }
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: `${result.value.login}'s avatar`,
            imageUrl: result.value.avatar_url,
            confirmButtonColor: '#004276'
          });
        }
      });
    });
  }

  const toastBtn = document.getElementById('swalToast');
  if (toastBtn) {
    toastBtn.addEventListener('click', () => {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: 'success',
        title: 'Signed in successfully'
      });
    });
  }

  const inputBtn = document.getElementById('swalInput');
  if (inputBtn) {
    inputBtn.addEventListener('click', async () => {
      const { value: email } = await Swal.fire({
        title: 'Input email address',
        input: 'email',
        inputLabel: 'Your email address',
        inputPlaceholder: 'Enter your email address',
        confirmButtonColor: '#004276'
      });
      if (email) {
        Swal.fire(`Entered email: ${email}`);
      }
    });
  }

  const queueBtn = document.getElementById('swalQueue');
  if (queueBtn) {
    queueBtn.addEventListener('click', async () => {
      const steps = ['1', '2', '3'];
      const Queue = Swal.mixin({
        progressSteps: steps,
        confirmButtonText: 'Next >',
        showClass: { backdrop: 'swal2-noanimation' },
        hideClass: { backdrop: 'swal2-noanimation' },
        confirmButtonColor: '#004276'
      });

      await Queue.fire({
        title: 'Step 1',
        currentProgressStep: 0,
        text: 'This is the first step.'
      });
      await Queue.fire({
        title: 'Step 2',
        currentProgressStep: 1,
        text: 'This is the second step.'
      });
      await Queue.fire({
        title: 'Step 3',
        currentProgressStep: 2,
        text: 'You are done!',
        confirmButtonText: 'Finish'
      });
    });
  }
}
