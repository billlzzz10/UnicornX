// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Toggle Dark/Light Mode
  const themeToggle = document.getElementById('theme-toggle');
  const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
  
  function toggleDarkMode() {
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('darkMode', document.documentElement.classList.contains('dark'));
  }
  
  // Check for saved dark mode preference
  if (localStorage.getItem('darkMode') === 'true') {
    document.documentElement.classList.add('dark');
  }
  
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleDarkMode);
  }
  if (mobileThemeToggle) {
    mobileThemeToggle.addEventListener('click', toggleDarkMode);
  }
  
  // Mobile Menu
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuContent = document.getElementById('mobile-menu-content');
  const closeMobileMenu = document.getElementById('close-mobile-menu');
  
  function toggleMobileMenu() {
    mobileMenu.classList.toggle('hidden');
    setTimeout(() => {
      mobileMenuContent.classList.toggle('-translate-x-full');
    }, 10);
  }
  
  if (mobileMenuButton) {
    mobileMenuButton.addEventListener('click', toggleMobileMenu);
  }
  
  if (closeMobileMenu) {
    closeMobileMenu.addEventListener('click', toggleMobileMenu);
  }
  
  // Subtask Toggle for task cards
  const subtaskToggles = document.querySelectorAll('.subtask-toggle');
  
  subtaskToggles.forEach(toggle => {
    toggle.addEventListener('click', function() {
      this.classList.toggle('open');
      const container = this.closest('.task-card').querySelector('.subtasks-container');
      container.classList.toggle('closed');
      container.classList.toggle('open');
    });
  });
  
  // Mood Selection
  const moodButtons = document.querySelectorAll('.mood-button');
  let selectedMood = null;
  
  moodButtons.forEach(button => {
    button.addEventListener('click', function() {
      moodButtons.forEach(btn => btn.classList.remove('border-primary-600'));
      this.classList.add('border-primary-600');
      selectedMood = this.dataset.mood;
    });
  });
  
  // Update State Button
  const updateStateButton = document.getElementById('update-state');
  
  if (updateStateButton) {
    updateStateButton.addEventListener('click', function() {
      const energyLevel = document.getElementById('energy-slider').value;
      
      if (!selectedMood) {
        alert('Please select your mood first');
        return;
      }
      
      // This section can connect to an API or handle data locally
      console.log(`Mood: ${selectedMood}, Energy: ${energyLevel}`);
      // Further processing such as updating advice or recommendations can be added here
    });
  }
});