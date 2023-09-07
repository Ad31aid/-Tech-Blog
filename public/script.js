
window.addEventListener('load', () => {
        alert('Welcome to Tech Blog!');
      });
      
      const mobileMenuButton = document.querySelector('#mobile-menu-button');
      const mobileMenu = document.querySelector('#mobile-menu');
      
      if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
          mobileMenu.classList.toggle('show');
        });
      }
      
      const toggleMessageButton = document.querySelector('#toggle-message-button');
      const hiddenMessage = document.querySelector('#hidden-message');
      
      if (toggleMessageButton && hiddenMessage) {
        toggleMessageButton.addEventListener('click', () => {
          hiddenMessage.classList.toggle('hidden');
        });
      }
      
      