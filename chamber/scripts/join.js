document.addEventListener("DOMContentLoaded", () => {
    const openButtons = document.querySelectorAll(".openModal");
    const closeButtons = document.querySelectorAll(".close-modal");
    openButtons.forEach(button => {
        button.addEventListener("click", () => {
            const modalId = button.getAttribute("data-target");
            const modal = document.getElementById(modalId);
            
            if (modal) {
                modal.showModal();
            }
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener("click", () => {
            const modal = button.closest("dialog");
            modal.close();
        });
    });

    const modals = document.querySelectorAll(".membership-modal");
    modals.forEach(modal => {
        modal.addEventListener("click", (event) => {
            if (event.target === modal) {
                modal.close();
            }
        });
    });
});