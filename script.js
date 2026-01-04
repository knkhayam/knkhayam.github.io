// Navigation scroll effect
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.querySelector('.nav-menu');
const scrollToTop = document.getElementById('scrollToTop');
const stickyContactBtn = document.getElementById('stickyContactBtn');

// Show/hide scroll to top button, sticky contact button, and navbar effect
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  // Show sticky contact button after scrolling past hero
  if (window.scrollY > 400) {
    stickyContactBtn.classList.add('visible');
  } else {
    stickyContactBtn.classList.remove('visible');
  }
  
  // Show scroll to top button after scrolling down
  if (window.scrollY > 300) {
    scrollToTop.classList.add('visible');
  } else {
    scrollToTop.classList.remove('visible');
  }
});

// Scroll to top functionality
scrollToTop.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
  });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px 100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe elements for animation - trigger when properly in viewport
document.addEventListener('DOMContentLoaded', () => {
  const animateElements = document.querySelectorAll(
    '.publication-card, .timeline-item, .project-card, .skill-category, .contact-item'
  );
  
  animateElements.forEach((el) => {
    // Always start hidden and let observer handle visibility
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `opacity 0.6s ease, transform 0.6s ease`;
    observer.observe(el);
  });
});

// Add active state to navigation links based on scroll position
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  const scrollY = window.pageYOffset;

  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
      });
      if (navLink) {
        navLink.classList.add('active');
      }
    }
  });
});

// Removed parallax effect to prevent overlap issues

// Add hover effect to skill tags
document.querySelectorAll('.skill-tag').forEach(tag => {
  tag.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-2px) scale(1.05)';
  });
  
  tag.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
  });
});

// Add click animation to buttons
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    this.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
  .btn {
    position: relative;
    overflow: hidden;
  }
  
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: ripple-animation 0.6s ease-out;
    pointer-events: none;
  }
  
  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  
  .nav-link.active {
    color: var(--primary-color);
  }
  
  .nav-link.active::after {
    width: 100%;
  }
`;
document.head.appendChild(style);

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply debounce to scroll handlers
const debouncedScrollHandler = debounce(() => {
  const scrollY = window.pageYOffset;
  
  // Navbar scroll effect
  if (scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  // Active nav link
  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
      });
      if (navLink) {
        navLink.classList.add('active');
      }
    }
  });
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Chat Widget Functionality
const chatWidget = document.getElementById('chatWidget');
const chatToggleFloat = document.getElementById('chatToggleFloat');
const chatToggleBtn = document.getElementById('chatToggleBtn');
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
const chatMessages = document.getElementById('chatMessages');
const chatSendBtn = document.getElementById('chatSendBtn');

// Ensure chat button is always visible
function ensureChatButtonVisible() {
  if (chatToggleFloat) {
    chatToggleFloat.style.display = 'flex';
    chatToggleFloat.style.visibility = 'visible';
    chatToggleFloat.style.opacity = '1';
    chatToggleFloat.classList.remove('hidden');
  }
}

// Run on load and after a short delay to override any animations
ensureChatButtonVisible();
setTimeout(ensureChatButtonVisible, 100);
setTimeout(ensureChatButtonVisible, 700); // After entrance animation completes

// Generate or retrieve session ID
let sessionId = localStorage.getItem('chatSessionId') || generateSessionId();
if (!localStorage.getItem('chatSessionId')) {
  localStorage.setItem('chatSessionId', sessionId);
}

function generateSessionId() {
  return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// Backend API URL - adjust this to match your backend server
// For production, you can set this via a data attribute on the chat widget or use environment-based config
const API_URL = chatWidget.dataset.apiUrl || 'http://localhost:3000/api/chat';

// Toggle chat widget
function toggleChat() {
  chatWidget.classList.toggle('active');
  // Chat button stays visible at all times
}

chatToggleFloat.addEventListener('click', toggleChat);
chatToggleBtn.addEventListener('click', toggleChat);

// Simple markdown renderer for chat messages
function renderMarkdown(text) {
  if (!text) return '';
  
  // Escape HTML to prevent XSS
  function escapeHtml(unsafe) {
    return unsafe
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
  
  let html = escapeHtml(text);
  
  // Split by code blocks to preserve them
  const codeBlockRegex = /```([\s\S]*?)```/g;
  const codeBlocks = [];
  let codeBlockIndex = 0;
  
  html = html.replace(codeBlockRegex, (match, code) => {
    const placeholder = `__CODE_BLOCK_${codeBlockIndex}__`;
    codeBlocks[codeBlockIndex] = '<pre><code>' + code.trim() + '</code></pre>';
    codeBlockIndex++;
    return placeholder;
  });
  
  // Process inline code
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
  
  // Process bold: **text** or __text__ (must be at least 2 chars)
  html = html.replace(/\*\*([^*\n]+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/__(.+?)__/g, '<strong>$1</strong>');
  
  // Process italic: *text* (single asterisk, not already processed as bold)
  html = html.replace(/\*([^*\n]+?)\*/g, '<em>$1</em>');
  
  // Process links: [text](url)
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
  
  // Restore code blocks
  codeBlocks.forEach((codeBlock, index) => {
    html = html.replace(`__CODE_BLOCK_${index}__`, codeBlock);
  });
  
  // Line breaks: \n -> <br>
  html = html.replace(/\n/g, '<br>');
  
  return html;
}

// Add message to chat
function addMessage(content, isUser = false) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `chat-message ${isUser ? 'chat-message-user' : 'chat-message-assistant'}`;
  
  const contentDiv = document.createElement('div');
  contentDiv.className = 'message-content';
  
  // For user messages, use textContent (security)
  // For assistant messages, render markdown
  if (isUser) {
    const p = document.createElement('p');
    p.textContent = content;
    contentDiv.appendChild(p);
  } else {
    // Render markdown for assistant messages
    contentDiv.innerHTML = renderMarkdown(content);
  }
  
  messageDiv.appendChild(contentDiv);
  chatMessages.appendChild(messageDiv);
  
  // Scroll to bottom
  chatMessages.scrollTop = chatMessages.scrollHeight;
  
  return messageDiv;
}

// Add loading indicator
function addLoadingMessage() {
  const messageDiv = document.createElement('div');
  messageDiv.className = 'chat-message chat-message-assistant';
  messageDiv.id = 'loadingMessage';
  
  const contentDiv = document.createElement('div');
  contentDiv.className = 'message-content';
  
  const loadingDiv = document.createElement('div');
  loadingDiv.className = 'chat-loading';
  loadingDiv.innerHTML = '<span></span><span></span><span></span>';
  contentDiv.appendChild(loadingDiv);
  
  messageDiv.appendChild(contentDiv);
  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  
  return messageDiv;
}

// Remove loading indicator
function removeLoadingMessage() {
  const loadingMsg = document.getElementById('loadingMessage');
  if (loadingMsg) {
    loadingMsg.remove();
  }
}

// Send message to backend
async function sendMessage(message) {
  try {
    // Disable input and button
    chatInput.disabled = true;
    chatSendBtn.disabled = true;
    
    // Add user message
    addMessage(message, true);
    
    // Add loading indicator
    addLoadingMessage();
    
    // Send to backend
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: message,
        sessionId: sessionId
      })
    });
    
    // Remove loading indicator
    removeLoadingMessage();
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Add assistant response
    if (data.success && data.message) {
      addMessage(data.message, false);
    } else {
      throw new Error('Invalid response from server');
    }
    
  } catch (error) {
    console.error('Error sending message:', error);
    removeLoadingMessage();
    
    // Show error message
    let errorMsg = 'Sorry, I encountered an error. Please try again.';
    if (error.message.includes('rate limit')) {
      errorMsg = 'Too many requests. Please wait a moment and try again.';
    } else if (error.message.includes('Failed to fetch')) {
      errorMsg = 'Unable to connect to the server. Please check if the backend is running.';
    }
    
    addMessage(errorMsg, false);
  } finally {
    // Re-enable input and button
    chatInput.disabled = false;
    chatSendBtn.disabled = false;
    chatInput.focus();
  }
}

// Handle form submission
chatForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const message = chatInput.value.trim();
  
  if (message) {
    chatInput.value = '';
    await sendMessage(message);
  }
});

// Allow Enter key to send (but Shift+Enter for new line)
chatInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    chatForm.dispatchEvent(new Event('submit'));
  }
});

// Auto-focus input when chat opens
chatToggleFloat.addEventListener('click', () => {
  setTimeout(() => {
    if (chatWidget.classList.contains('active')) {
      chatInput.focus();
    }
  }, 300);
});

