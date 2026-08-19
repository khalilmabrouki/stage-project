





document.addEventListener('DOMContentLoaded', () => {
  // Initialize draggable external events
  const containerEl = document.getElementById('external-events');
  if (containerEl) {
    new FullCalendar.Interaction.Draggable(containerEl, {
      itemSelector: '.external-event',
      eventData: function(eventEl) {
        return {
          title: eventEl.innerText.trim(),
          classNames: [eventEl.dataset.class]
        };
      }
    });
  }

  // Initialize Calendar
  const calendarEl = document.getElementById('calendar');
  if (calendarEl) {
    const calendar = new FullCalendar.Calendar(calendarEl, {
      plugins: [FullCalendar.DayGrid.default || FullCalendar.DayGrid, FullCalendar.TimeGrid.default || FullCalendar.TimeGrid, FullCalendar.Interaction.default || FullCalendar.Interaction],
      initialView: 'dayGridMonth',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      editable: true,
      droppable: true, // this allows things to be dropped onto the calendar
      drop: function(info) {
        // is the "remove after drop" checkbox checked?
        const dropRemoveCheckbox = document.getElementById('drop-remove');
        if (dropRemoveCheckbox && dropRemoveCheckbox.checked) {
          // if so, remove the element from the "Draggable Events" list
          info.draggedEl.parentNode.removeChild(info.draggedEl);
        }
      },
      events: [
        {
          title: 'All Day Event',
          start: new Date(new Date().setDate(new Date().getDate() - 5)).toISOString().split('T')[0],
          classNames: ['bg-primary']
        },
        {
          title: 'Long Event',
          start: new Date(new Date().setDate(new Date().getDate() - 3)).toISOString().split('T')[0],
          end: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().split('T')[0],
          classNames: ['bg-warning', 'text-dark']
        },
        {
          title: 'Meeting',
          start: new Date().toISOString().split('T')[0] + 'T10:30:00',
          end: new Date().toISOString().split('T')[0] + 'T12:30:00',
          classNames: ['bg-success']
        },
        {
          title: 'Lunch',
          start: new Date().toISOString().split('T')[0] + 'T12:00:00',
          classNames: ['bg-danger']
        },
        {
          title: 'Conference',
          start: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString().split('T')[0],
          classNames: ['bg-info']
        }
      ],
      eventClick: function(info) {
        info.jsEvent.preventDefault();
        
        // Populate Modal
        document.getElementById('viewEventTitle').innerText = info.event.title;
        
        // Format time
        let timeString = '';
        if (info.event.allDay) {
          timeString = 'All Day';
        } else {
          const start = info.event.start;
          const end = info.event.end;
          
          if (start) {
            timeString += start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          }
          if (end) {
            timeString += ' - ' + end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          }
        }
        document.getElementById('viewEventTime').innerText = timeString || 'Not specified';
        
        // Category badge logic
        const classNames = info.event.classNames;
        const categoryBadge = document.getElementById('viewEventCategory');
        categoryBadge.className = 'badge border bg-opacity-10'; // reset baseline classes
        if (classNames.includes('bg-primary')) { categoryBadge.classList.add('bg-primary', 'text-primary', 'border-primary'); categoryBadge.innerText = 'Personal'; }
        else if (classNames.includes('bg-success')) { categoryBadge.classList.add('bg-success', 'text-success', 'border-success'); categoryBadge.innerText = 'Work'; }
        else if (classNames.includes('bg-warning')) { categoryBadge.classList.add('bg-warning', 'text-dark', 'border-warning'); categoryBadge.innerText = 'Family'; }
        else if (classNames.includes('bg-danger')) { categoryBadge.classList.add('bg-danger', 'text-danger', 'border-danger'); categoryBadge.innerText = 'Urgent'; }
        else if (classNames.includes('bg-info')) { categoryBadge.classList.add('bg-info', 'text-info', 'border-info'); categoryBadge.innerText = 'Other'; }
        else { categoryBadge.classList.add('bg-secondary', 'text-secondary', 'border-secondary'); categoryBadge.innerText = 'General'; }

        // Show modal
        const viewModalEl = document.getElementById('viewEventModal');
        const viewModal = Modal.getInstance(viewModalEl) || new Modal(viewModalEl);
        viewModal.show();
      }
    });
    
    calendar.render();
  }
});
