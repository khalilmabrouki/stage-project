function windowScroll() {
    var t = document.getElementById("navbar");
    
    // ✅ Vérifier si l'élément existe avant de le modifier
    if (t) {
        if (50 <= document.body.scrollTop || 50 <= document.documentElement.scrollTop) {
            t.classList.add("nav-sticky");
        } else {
            t.classList.remove("nav-sticky");
        }
    }
}

window.addEventListener("scroll", function(t) {
    t.preventDefault();
    windowScroll();
});

// ✅ Vérifier si les éléments existent avant d'initialiser les tooltips
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
if (tooltipTriggerList.length > 0) {
    var tooltipList = tooltipTriggerList.map(function(t) {
        return new bootstrap.Tooltip(t);
    });
}