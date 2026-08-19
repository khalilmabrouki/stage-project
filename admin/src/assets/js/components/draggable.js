

function initDraggableLists() {
  const simpleEl = document.getElementById('draggable-list');
  const gridEl = document.getElementById('draggable-grid');
  
  const kanbanTodo = document.getElementById('kanban-todo');
  const kanbanProgress = document.getElementById('kanban-progress');
  const kanbanDone = document.getElementById('kanban-done');

  if (simpleEl) {
    new Sortable(simpleEl, {
      animation: 150,
      ghostClass: 'opacity-50'
    });
  }

  if (gridEl) {
    new Sortable(gridEl, {
      animation: 150,
      ghostClass: 'opacity-50'
    });
  }

  // Kanban shared
  const kanbanOptions = {
    group: 'kanban',
    animation: 150,
    ghostClass: 'opacity-50'
  };

  if (kanbanTodo) new Sortable(kanbanTodo, kanbanOptions);
  if (kanbanProgress) new Sortable(kanbanProgress, kanbanOptions);
  if (kanbanDone) new Sortable(kanbanDone, kanbanOptions);
}
