(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()

  document.addEventListener('DOMContentLoaded', () => {
    const menuBtns = document.querySelectorAll('.menu-btn');
    const popupMenus = document.querySelectorAll('.popup-menu');

    menuBtns.forEach((menuBtn, index) => {
        menuBtn.addEventListener('click', (event) => {
            // Close other menus
            popupMenus.forEach((popupMenu, i) => {
                if (i !== index) {
                    popupMenu.style.display = 'none';
                }
            });

            // Toggle the clicked menu
            const popupMenu = popupMenus[index];
            popupMenu.style.display = popupMenu.style.display === 'block' ? 'none' : 'block';
            event.stopPropagation(); // Prevent event bubbling
        });
    });

    document.addEventListener('click', (event) => {
        if (!event.target.closest('.menu-container')) {
            // Hide all popup menus if clicking outside
            popupMenus.forEach(popupMenu => {
                popupMenu.style.display = 'none';
            });
        }
    });


    document.querySelectorAll('.delete-btn').forEach(deleteBtn => {
        deleteBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to delete?')) {
                alert('Delete button clicked');
            }
            const popupMenu = deleteBtn.closest('.popup-menu');
            popupMenu.style.display = 'none';
        });
    });
});

