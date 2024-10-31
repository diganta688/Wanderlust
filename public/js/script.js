(() => {
    'use strict'
  
    const forms = document.querySelectorAll('.needs-validation')
  
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


    let userbtn = document.getElementById('user');
    let userDropdown = document.getElementById('userDropdown');
    userbtn.addEventListener('click', (event) => {
      userDropdown.style.display = userDropdown.style.display === 'block' ? 'none' : 'block';
      event.stopPropagation();
    });
    document.addEventListener('click', (event) => {
      if (!userDropdown.contains(event.target) && event.target !== userbtn) {
        userDropdown.style.display = 'none';
      }
    });


    let showStayImg = document.getElementById('showStayImg');
    let innerShowStayImg = document.getElementById('innerShowStayImg');
    let scale = 1;
    showStayImg.addEventListener('wheel', (e) => {
      e.preventDefault();
      if (e.deltaY < 0) {
        scale += 0.1;
      } else {
        scale -= 0.1;
      }
      scale = Math.min(Math.max(1, scale), 3);
      innerShowStayImg.style.transform = `scale(${scale})`;
      if (scale > 1) {
        showStayImg.style.cursor = 'zoom-out'; 
      } else {
        showStayImg.style.cursor = 'zoom-in'; 
      }
    });

    showStayImg.addEventListener('mousemove', (e) => {
      const rect = showStayImg.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      innerShowStayImg.style.transformOrigin = `${x}% ${y}%`; 
    });


    filter1a