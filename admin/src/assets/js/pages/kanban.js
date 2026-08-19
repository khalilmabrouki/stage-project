

document.addEventListener('DOMContentLoaded', () => {
  const kanbanContainers = document.querySelectorAll('.kanban-tasks');

  kanbanContainers.forEach((container) => {
    if (container) {
      new Sortable(container, {
        group: 'shared', // set both lists to same group
        animation: 150,
        ghostClass: 'sortable-ghost',
        dragClass: 'sortable-drag',
        handle: '.cursor-move' // restrict drag to the handle/card
      });
    }
  });
});
