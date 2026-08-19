

document.addEventListener('DOMContentLoaded', () => {
  const emailItems = document.querySelectorAll('.email-item');
  const readEmailModal = document.getElementById('readEmailModal');
  
  if (!readEmailModal) return;

  let modalInstance = new bootstrap.Modal(readEmailModal);

  emailItems.forEach(item => {
    item.addEventListener('click', (e) => {
      // Don't open email if clicking checkbox or star
      if (e.target.closest('.email-checkbox') || e.target.closest('.email-star')) {
        return;
      }

      // Mark as read
      if (item.classList.contains('unread')) {
        item.classList.remove('unread');
      }

      // Extract data
      const sender = item.querySelector('.email-sender')?.textContent.trim() || 'Unknown Sender';
      const subject = item.querySelector('.email-subject')?.textContent.trim() || 'No Subject';
      const time = item.querySelector('.email-time')?.textContent.trim() || '';
      const snippet = item.querySelector('.email-snippet')?.textContent.trim().replace(/^- /, '') || '';
      const badge = item.querySelector('.badge');
      
      // Populate Modal
      document.getElementById('readEmailSubject').textContent = subject;
      document.getElementById('readEmailSender').textContent = sender;
      document.getElementById('readEmailTime').textContent = time;
      document.getElementById('readEmailBody').innerHTML = `<p>${snippet}</p><p><em>(More email content would load here...)</em></p>`;
      
      const avatarImg = document.getElementById('readEmailAvatar');
      if (avatarImg) {
        avatarImg.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(sender)}&background=random`;
      }

      const badgeContainer = document.getElementById('readEmailBadge');
      if (badge) {
        badgeContainer.textContent = badge.textContent;
        badgeContainer.className = badge.className;
        badgeContainer.style.display = 'inline-block';
      } else {
        badgeContainer.style.display = 'none';
      }

      // Show Modal
      modalInstance.show();
    });
  });
});
