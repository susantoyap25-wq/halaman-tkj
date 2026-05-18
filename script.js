// Sample model photos data - real moments
const modelPhotos = [
  {
    id: 1,
    category: "Portrait",
    title: "Class Portrait",
    description: "Our official class portrait",
  },
  {
    id: 2,
    category: "Event",
    title: "Tech Conference",
    description: "Attending the annual tech conference",
  },
  {
    id: 3,
    category: "Study",
    title: "Study Session",
    description: "Late night study session in the lab",
  },
  {
    id: 4,
    category: "Team",
    title: "Project Team",
    description: "Working together on our final project",
  },
  {
    id: 5,
    category: "Celebration",
    title: "Achievement",
    description: "Celebrating our successful project",
  },
  {
    id: 6,
    category: "Lab",
    title: "Lab Session",
    description: "Hands-on lab session with equipment",
  },
];

// Database for storing shared experiences
const DB_NAME = 'tkj_experiences';
const DB_VERSION = 1;

// Initialize database
function initDatabase() {
  // Using localStorage as our simple database
  if (!localStorage.getItem(DB_NAME)) {
    // Initialize with sample data
    const initialData = [
      {
        id: 1,
        author: "Alex Johnson",
        content:
          "Still remember debugging that network loop for 12 hours straight! Those were the days.",
        date: "2026-01-15",
      },
      {
        id: 2,
        author: "Maria Garcia",
        content: "Miss our hardware lab sessions. We built so many PCs together!",
        date: "2026-01-14",
      },
      {
        id: 3,
        author: "David Chen",
        content:
          "The security protocols we learned here shaped my career. Thanks to everyone!",
        date: "2026-01-13",
      },
      {
        id: 4,
        author: "TKJ Alumni",
        content:
          "From resistors to routers, we learned it all. Proud to be part of the TKJ family!",
        date: "2026-01-12",
      },
    ];
    localStorage.setItem(DB_NAME, JSON.stringify(initialData));
  }
}

// Get all experiences from database
function getAllExperiences() {
  const data = localStorage.getItem(DB_NAME);
  return data ? JSON.parse(data) : [];
}

// Add a new experience to database
function addExperience(experience) {
  const experiences = getAllExperiences();
  experiences.unshift(experience); // Add to beginning of array
  localStorage.setItem(DB_NAME, JSON.stringify(experiences));
  return experience;
}

// Delete an experience from database
function deleteExperience(id) {
  let experiences = getAllExperiences();
  experiences = experiences.filter(exp => exp.id != id);
  localStorage.setItem(DB_NAME, JSON.stringify(experiences));
  return true;
}

// Get all experiences
let messages = getAllExperiences();

// DOM elements
const messagesList = document.getElementById("messagesList");
const noteForm = document.getElementById("noteForm");

// Initialize the page
document.addEventListener("DOMContentLoaded", () => {
  // Add navbar class to body for proper styling
  document.body.classList.add("has-navbar");

  // Initialize database
  initDatabase();

  renderModelPhotos();
  renderMessages();
  setupEventListeners();
  initializeScrollAnimations();
  initializeTimelineAnimations();
  setupSmoothScrolling();
  initializeDarkModeToggle();
  initializeSearchFunctionality();
  initializeParallaxEffects();
  initializeInteractiveTimeline();
  initializeAudioEffects();
  initializeSubtleEffects();
  updateTextVisibility();

  // Initialize hero slider
  showHeroSlides();
});

// Render model photos section
function renderModelPhotos() {
  const gallerySection = document.createElement("section");
  gallerySection.className = "model-photos";
  gallerySection.id = "modelPhotos";

  gallerySection.innerHTML = `
        <div class="container">
            <h2>Photo Gallery</h2>
            <div class="model-photos-grid" id="modelPhotosGrid">
                ${modelPhotos
                  .map((photo) => {
                    const imageUrl = `https://picsum.photos/400/500?random=${photo.id + 200}`;
                    return `
                        <div class="model-photo-card" data-id="${photo.id}">
                            <div class="photo-frame">
                                <img src="${imageUrl}" alt="${photo.title}" loading="lazy">
                                <div class="photo-overlay">
                                    <h4>${photo.title}</h4>
                                    <p>${photo.description}</p>
                                    <span class="category-tag">${photo.category}</span>
                                </div>
                            </div>
                        </div>
                    `;
                  })
                  .join("")}
            </div>
        </div>
    `;

  // Insert after the memories section
  const memoriesSection = document.querySelector(".tkj-gallery");
  if (memoriesSection) {
    memoriesSection.parentNode.insertBefore(
      gallerySection,
      memoriesSection.nextSibling,
    );
  }

  // Add click events to photo cards
  document.querySelectorAll(".model-photo-card").forEach((card) => {
    card.addEventListener("click", () => {
      const photoId = card.dataset.id;
      const photo = modelPhotos.find((p) => p.id == photoId);
      if (photo) {
        showPhotoModal(photo, card);
      }
    });
  });
}

// Show photo modal
function showPhotoModal(photo, element) {
  const modal = document.createElement("div");
  modal.className = "photo-modal";
  const imageUrl = `https://picsum.photos/800/1000?random=${photo.id + 200}`;

  modal.innerHTML = `
        <div class="photo-modal-content">
            <span class="close-modal" aria-label="Close modal">&times;</span>
            <div class="photo-modal-body">
                <img src="${imageUrl}" alt="${photo.title}" loading="lazy">
                <div class="photo-modal-info">
                    <h3>${photo.title}</h3>
                    <p class="category-tag">${photo.category}</p>
                    <p>${photo.description}</p>
                </div>
            </div>
        </div>
    `;

  document.body.appendChild(modal);

  // Close modal when clicking close button
  modal.querySelector(".close-modal").addEventListener("click", () => {
    modal.remove();
  });

  // Close modal when clicking outside content
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.remove();
    }
  });
}

// Trigger click effect
function triggerClickEffect(element) {
  const ripple = document.createElement("div");
  ripple.className = "ripple";

  // Position ripple at click location
  const rect = element.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);

  ripple.style.width = ripple.style.height = `${size}px`;
  ripple.style.left = `-${size / 2}px`;
  ripple.style.top = `-${size / 2}px`;

  element.appendChild(ripple);

  // Remove ripple after animation
  setTimeout(() => {
    ripple.remove();
  }, 600);
}



// Render messages to the page
function renderMessages() {
  if (!messagesList) return;

  messagesList.innerHTML = "";

  // Get fresh data from database
  messages = getAllExperiences();

  messages.forEach((message, index) => {
    const messageItem = document.createElement("div");
    messageItem.className = "message-item";
    messageItem.style.animationDelay = `${index * 0.1}s`;

    messageItem.innerHTML = `
            <div class="message-header">
                <span>${message.author}</span>
                <span>${message.date}</span>
            </div>
            <div class="message-content">${message.content}</div>
        `;

    messagesList.appendChild(messageItem);
  });
}

// Add event listeners
function setupEventListeners() {
  if (!noteForm) return;

  noteForm.addEventListener("submit", handleNoteSubmit);
}

// Handle note form submission
function handleNoteSubmit(e) {
  e.preventDefault();

  const websiteInput = document.getElementById("tkjWebsite");
  const authorInput = document.getElementById("authorName");
  const contentInput = document.getElementById("noteContent");

  if (!authorInput || !contentInput) return;

  const website = websiteInput ? websiteInput.value.trim() : '-';
  const author = authorInput.value.trim();
  const content = contentInput.value.trim();

  if (author && content) {
    // Format the message for WhatsApp
    const whatsappMessage = `Website:\n${website || '-'}\n\nYour Name:\n${author}\n\nShare a memory about our TKJ journey, projects, or lessons learned...:\n${content}`;

    // Encode the message for URL
    const encodedMessage = encodeURIComponent(whatsappMessage);

    // WhatsApp number
    const whatsappNumber = '6285319381886'; // 0898-8535-900 in international format

    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');

    // Clear the form
    if (websiteInput) websiteInput.value = "";
    authorInput.value = "";
    contentInput.value = "";
  } else {
    alert('Please fill in all required fields!');
  }
}

// Show feedback message
function showMessage(text, type) {
  const messageDiv = document.createElement("div");
  messageDiv.className = `feedback-message ${type}`;
  messageDiv.textContent = text;
  messageDiv.setAttribute("role", "alert");
  messageDiv.setAttribute("aria-live", "assertive");

  document.body.appendChild(messageDiv);

  // Remove message after 3 seconds
  setTimeout(() => {
    messageDiv.remove();
  }, 3000);
}

// Add scroll animations
function initializeScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");

        // Add extra animation for certain elements
        if (entry.target.classList.contains("skill-card")) {
          animateSkillCard(entry.target);
        }
      }
    });
  }, observerOptions);

  // Observe elements to animate
  document
    .querySelectorAll(
      ".skill-card, .photo-item, .message-item, .timeline-item, .model-photo-card",
    )
    .forEach((el) => {
      el.classList.add("animate-out");
      observer.observe(el);
    });
}

// Initialize timeline journey card animations
function initializeTimelineAnimations() {
  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const card = entry.target;
        if (card.classList.contains('journey-card')) {
          card.classList.add('visible');

          // Trigger progress bar animation
          const progressBar = card.querySelector('.progress-bar > div');
          if (progressBar) {
            setTimeout(() => {
              progressBar.style.width = '100%';
            }, 300);
          }
        }

        // Stop observing once visible
        observer.unobserve(card);
      }
    });
  }, observerOptions);

  // Observe all journey cards
  setTimeout(() => {
    document.querySelectorAll('.journey-card').forEach((card) => {
      observer.observe(card);
    });
  }, 100);
}

// Animate skill card with extra flair
function animateSkillCard(card) {
  // Add a pulse effect
  card.style.animation = "pulse 2s infinite";
  setTimeout(() => {
    card.style.animation = "";
  }, 4000);
}

// Setup smooth scrolling for navigation
function setupSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });
}

// Dark mode toggle
function initializeDarkModeToggle() {
  // Get the mode toggle button from the navbar
  const toggleBtn = document.getElementById("modeToggle");
  const modeIcon = document.getElementById("modeIcon");

  if (!toggleBtn || !modeIcon) return;

  // Check for saved theme preference
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    modeIcon.className = "fas fa-moon"; // Moon icon for dark mode
  } else {
    modeIcon.className = "fas fa-sun"; // Sun icon for light mode
  }

  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
      localStorage.setItem("theme", "dark");
      modeIcon.className = "fas fa-moon"; // Moon icon for dark mode
    } else {
      localStorage.setItem("theme", "light");
      modeIcon.className = "fas fa-sun"; // Sun icon for light mode
    }

    // Update navbar appearance based on theme
    updateNavbarAppearance();
  });
}

// Update navbar appearance based on theme
function updateNavbarAppearance() {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;

  if (document.body.classList.contains("dark-mode")) {
    navbar.style.background = "rgba(20, 20, 35, 0.95)";
  } else {
    navbar.style.background = "rgba(33, 37, 41, 0.95)";
  }
}

// Update text visibility based on current mode for maximum readability
function updateTextVisibility() {
  // This function is now handled by CSS, keeping for compatibility
}

// Search functionality
function initializeSearchFunctionality() {
  // Search functionality is disabled
}

// Parallax effect for header
function initializeParallaxEffects() {
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const parallaxHeader = document.querySelector(".tkj-header");

    if (parallaxHeader) {
      const rate = scrolled * -0.5;
      parallaxHeader.style.transform = `translateY(${rate}px)`;
    }
  });
}

// Interactive timeline
function initializeInteractiveTimeline() {
  const timelineItems = document.querySelectorAll(".timeline-item");

  timelineItems.forEach((item, index) => {
    // Add click effect to timeline items
    item.addEventListener("click", () => {
      // Highlight the clicked item
      timelineItems.forEach((i) => i.classList.remove("active-timeline"));
      item.classList.add("active-timeline");

      // Show additional details
      const content = item.querySelector(".timeline-content");
      content.style.transform = "scale(1.05)";
      setTimeout(() => {
        content.style.transform = "scale(1)";
      }, 300);
    });
  });
}

// Audio effects
function initializeAudioEffects() {
  // Audio functionality placeholder
}

// Subtle effects
function initializeSubtleEffects() {
  // Subtle effects placeholder
}


// Hero slides
function showHeroSlides() {
  // Hero slider functionality placeholder
}
