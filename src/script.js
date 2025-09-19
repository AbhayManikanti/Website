// Theme Toggle functionality
class ThemeController {
    constructor() {
        this.toggleCount = 0;
        this.easterEggActivated = false;
        this.isAnimating = false; // Add animation state tracking
        this.init();
    }

    init() {
        this.setupThemeToggle();
        this.loadSavedTheme();
        this.createEasterEggElements();
    }

    loadSavedTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
    }

    setupThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        
        themeToggle?.addEventListener('click', (e) => {
            console.log('Toggle clicked - isAnimating:', this.isAnimating, 'easterEggActivated:', this.easterEggActivated);
            
            // Prevent clicking during animation or if easter egg is active
            if (this.isAnimating) {
                console.log('Blocked: animation in progress');
                return; // Block clicks during sweeping animation
            }
            
            if (this.easterEggActivated) {
                console.log('Easter egg active, showing crimson popup');
                this.showCrimsonPopup();
                return;
            }
            
            console.log('Normal theme toggle');
            this.toggleTheme();
        });
    }

    toggleTheme() {
        if (this.easterEggActivated) return; // Prevent toggling after easter egg
        
        this.toggleCount++;
        console.log('Toggle count:', this.toggleCount); // Debug log
        
        // Check for easter egg trigger BEFORE setting animation state
        if (this.toggleCount >= 5) {
            console.log('Activating easter egg!'); // Debug log
            this.activateEasterEgg();
            return;
        }
        
        // Set animation state and disable toggle button (only for normal toggles)
        this.isAnimating = true;
        const themeToggle = document.getElementById('theme-toggle');
        themeToggle?.classList.add('animating');
        
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        // Determine which animation to show
        const animationToShow = newTheme === 'dark' ? 'moon' : 'sun';
        
        // Show the appropriate big animation
        this.showThemeAnimation(animationToShow);
        
        // Add transitioning class for sweeping animation
        document.body.classList.add('theme-transitioning');
        
        // Wait for animation to start, then change theme
        setTimeout(() => {
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        }, 400);
        
        // Remove transitioning class and re-enable button after animation completes
        setTimeout(() => {
            document.body.classList.remove('theme-transitioning');
            this.isAnimating = false;
            themeToggle?.classList.remove('animating');
        }, 1200);
    }
    
    showThemeAnimation(type) {
        const sunAnimation = document.getElementById('sun-animation');
        const moonAnimation = document.getElementById('moon-animation');
        const sunIcon = sunAnimation?.querySelector('.big-sun');
        const moonIcon = moonAnimation?.querySelector('.big-moon');
        
        if (type === 'sun') {
            // Show sun animation (switching to light mode)
            sunAnimation.classList.add('active');
            sunIcon?.classList.add('animate');
            
            // Hide animation after completion
            setTimeout(() => {
                sunAnimation.classList.remove('active');
                sunIcon?.classList.remove('animate');
            }, 1000);
        } else {
            // Show moon animation (switching to dark mode)
            moonAnimation.classList.add('active');
            moonIcon?.classList.add('animate');
            
            // Hide animation after completion
            setTimeout(() => {
                moonAnimation.classList.remove('active');
                moonIcon?.classList.remove('animate');
            }, 1000);
        }
    }
    
    createEasterEggElements() {
        // Create red moon animation container
        const redMoonContainer = document.createElement('div');
        redMoonContainer.id = 'red-moon-animation';
        redMoonContainer.innerHTML = `
            <div class="red-moon-convergence">
                <div class="converging-sun"><i class="fas fa-sun"></i></div>
                <div class="converging-moon"><i class="fas fa-moon"></i></div>
                <div class="red-moon"></div>
            </div>
            <div class="easter-egg-text">
                <h2 class="easter-title">Easter Egg Unlocked</h2>
                <p class="easter-subtitle">The Dark Side of the Moon</p>
            </div>
        `;
        document.body.appendChild(redMoonContainer);
        
        // Create crimson moon popup message
        const popupMessage = document.createElement('div');
        popupMessage.id = 'crimson-popup';
        popupMessage.innerHTML = `
            <div class="crimson-message">
                <div class="crimson-icon"></div>
                <p>The crimson moon's radiance cannot be escaped</p>
            </div>
        `;
        document.body.appendChild(popupMessage);
    }
    
    activateEasterEgg() {
        this.easterEggActivated = true;
        
        // Clean up any animation states and make button ready for crimson popup
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            // Remove any lingering animation classes
            themeToggle.classList.remove('animating');
            // Add disabled class for visual feedback
            themeToggle.classList.add('disabled');
            // Ensure it's clickable for crimson popup
            themeToggle.style.pointerEvents = 'auto';
            themeToggle.style.cursor = 'pointer';
        }
        // Reset animation state
        this.isAnimating = false;
        
        // Show red moon animation
        const redMoonAnimation = document.getElementById('red-moon-animation');
        redMoonAnimation?.classList.add('active');
        
        // Start convergence animation sequence
        setTimeout(() => {
            redMoonAnimation?.querySelector('.red-moon-convergence')?.classList.add('converging');
        }, 500);
        
        // Show easter egg text
        setTimeout(() => {
            redMoonAnimation?.querySelector('.easter-egg-text')?.classList.add('show');
        }, 4000);
        
        // Apply red horror theme
        setTimeout(() => {
            document.documentElement.setAttribute('data-theme', 'horror');
            document.body.classList.add('horror-mode');
        }, 5000);
        
        // Hide red moon animation but keep theme
        setTimeout(() => {
            redMoonAnimation?.classList.remove('active');
            // Ensure toggle button is clickable for crimson popup
            const themeToggle = document.getElementById('theme-toggle');
            if (themeToggle) {
                themeToggle.style.pointerEvents = 'auto';
                console.log('Toggle button made clickable for crimson popup');
            }
        }, 6000);
    }
    
    showCrimsonPopup() {
        try {
            console.log('showCrimsonPopup called');
            const popup = document.getElementById('crimson-popup');
            console.log('Popup element found:', popup);
            
            if (!popup) {
                console.warn('Crimson popup element not found, recreating...');
                this.createCrimsonPopup();
                return;
            }
            
            console.log('Adding show class to popup');
            // Show popup
            popup.classList.add('show');
            
            // Hide after 3 seconds
            setTimeout(() => {
                if (popup && popup.parentNode) {
                    console.log('Hiding crimson popup');
                    popup.classList.remove('show');
                }
            }, 3000);
        } catch (error) {
            console.error('Error showing crimson popup:', error);
        }
    }
    
    createCrimsonPopup() {
        try {
            // Remove existing popup if any
            const existingPopup = document.getElementById('crimson-popup');
            if (existingPopup) {
                existingPopup.remove();
            }
            
            // Create crimson moon popup message
            const popupMessage = document.createElement('div');
            popupMessage.id = 'crimson-popup';
            popupMessage.innerHTML = `
                <div class="crimson-message">
                    <div class="crimson-icon"></div>
                    <p>The crimson moon's radiance cannot be escaped</p>
                </div>
            `;
            document.body.appendChild(popupMessage);
            
            // Show it immediately after creation
            setTimeout(() => {
                this.showCrimsonPopup();
            }, 50);
        } catch (error) {
            console.error('Error creating crimson popup:', error);
        }
    }
}

// Navigation functionality
class Navigation {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollEffect();
        this.setupMobileMenu();
        this.setupSmoothScrolling();
    }

    setupScrollEffect() {
        const navbar = document.querySelector('.navbar');
        let lastScrollY = window.scrollY;

        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 100) {
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.boxShadow = 'none';
            }

            lastScrollY = currentScrollY;
        });
    }

    setupMobileMenu() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');

        hamburger?.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Close menu when clicking a nav link (for UX)
        navMenu?.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Also close menu on resize up
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    setupSmoothScrolling() {
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
    }
}

// Animations and scroll effects
class AnimationController {
    constructor() {
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.setupCounterAnimations();
    }

    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        document.querySelectorAll('.section-title, .section-subtitle, .project-card, .skill-category, .timeline-item').forEach(el => {
            observer.observe(el);
        });
    }

    setupCounterAnimations() {
        const counters = document.querySelectorAll('.stat-number');
        const speed = 200;

        const animateCounter = (counter) => {
            const originalText = counter.textContent;
        
            // Use regular expressions to extract the different parts
            const prefixMatch = originalText.match(/^[£$€]/); // Matches common currency symbols at the start
            const prefix = prefixMatch ? prefixMatch[0] : ''; // Get the matched currency symbol or an empty string
        
            const numericPart = originalText.replace(/^[£$€]|\D/g, ''); // Removes currency symbol and non-digits
            const target = parseInt(numericPart, 10);
        
            const suffixMatch = originalText.match(/[^0-9.]+$/); // Matches any non-digit characters at the end
            const suffix = suffixMatch ? suffixMatch[0] : ''; // Get the matched suffix or an empty string
        
            const speed = 200; // Define your speed here
            const increment = target / speed;
            let current = 0;
        
            const updateCount = () => {
                if (current < target) {
                    current += increment;
                    const displayValue = Math.round(current);
                    counter.textContent = prefix + displayValue + suffix;
                    requestAnimationFrame(updateCount);
                } else {
                    counter.textContent = prefix + target + suffix; // Set the final value correctly
                }
            };
        
            updateCount();
        };

        const observerOptions = {
            threshold: 0.5
        };

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                    entry.target.classList.add('animated');
                    animateCounter(entry.target);
                }
            });
        }, observerOptions);

        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }
}

// Updated ChatBot class with fixed hyperlink functionality
class ChatBot {
    constructor() {
        this.isOpen = false;
        // Check if user has ever sent a message (not just opened chatbot)
        this.hasUsedChatbot = false;
        try {
            this.hasUsedChatbot = localStorage.getItem('chatbot-used') === 'true';
        } catch (e) {
            console.warn('LocalStorage not available, treating as first time');
        }
        this.apiUrl = 'https://fastapi-backend-925151288978.asia-southeast1.run.app/ask';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.showWelcomeMessage();
    }

    setupEventListeners() {
        const toggle = document.getElementById('chatbot-toggle');
        const close = document.getElementById('chatbot-close');
        const sendBtn = document.getElementById('chatbot-send');
        const input = document.getElementById('chatbot-message-input');
        const container = document.getElementById('chatbot-container');

        toggle?.addEventListener('click', () => this.toggleChat());
        close?.addEventListener('click', () => this.closeChat());
        sendBtn?.addEventListener('click', () => this.handleSendMessage());

        input?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.handleSendMessage();
            }
        });

        // Quick questions
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('quick-question')) {
                const question = e.target.dataset.question;
                this.sendMessage(question);
            }
        });

        // Hide notification after first interaction
        toggle?.addEventListener('click', () => {
            const notification = document.getElementById('chat-notification');
            if (notification) {
                notification.style.display = 'none';
            }
        });
    }

    showWelcomeMessage() {
        setTimeout(() => {
            const notification = document.getElementById('chat-notification');
            if (notification) {
                notification.style.animation = 'slideInUp 0.5s ease-out forwards';
            }
        }, 3000);

        // Auto hide notification after 10 seconds
        setTimeout(() => {
            const notification = document.getElementById('chat-notification');
            if (notification) {
                notification.style.opacity = '0';
                setTimeout(() => {
                    notification.style.display = 'none';
                }, 300);
            }
        }, 13000);
    }

    toggleChat() {
        const container = document.getElementById('chatbot-container');
        const notification = document.getElementById('chat-notification');
        
        if (notification) {
            notification.style.display = 'none';
        }

        this.isOpen = !this.isOpen;
        
        if (this.isOpen) {
            container.classList.add('open');
            document.getElementById('chatbot-message-input')?.focus();
            
            // Show backend connection popup if user has never sent a message
            if (!this.hasUsedChatbot) {
                this.showBackendConnectionPopup();
            }
        } else {
            container.classList.remove('open');
        }
    }

    closeChat() {
        this.isOpen = false;
        document.getElementById('chatbot-container').classList.remove('open');
    }

    showBackendConnectionPopup() {
        try {
            // Remove any existing backend popup first
            const existingPopup = document.getElementById('backend-connection-popup');
            if (existingPopup) {
                existingPopup.remove();
            }
            
            // Create the popup message
            const popup = document.createElement('div');
            popup.id = 'backend-connection-popup';
            popup.className = 'backend-popup';
            popup.innerHTML = `
                <div class="backend-popup-content">
                    <i class="fas fa-server"></i>
                    <p>Please wait 10-15 seconds for the first message while we connect to our backend servers</p>
                </div>
            `;
            
            // Add to body
            document.body.appendChild(popup);
            
            // Show popup with animation
            setTimeout(() => {
                if (popup && popup.parentNode) {
                    popup.classList.add('show');
                }
            }, 100);
            
            // Hide popup after 5 seconds
            setTimeout(() => {
                if (popup && popup.parentNode) {
                    popup.classList.remove('show');
                    setTimeout(() => {
                        if (popup && popup.parentNode) {
                            popup.remove();
                        }
                    }, 300);
                }
            }, 5000);
        } catch (error) {
            console.error('Error showing backend connection popup:', error);
        }
    }

    async handleSendMessage() {
        const input = document.getElementById('chatbot-message-input');
        const message = input.value.trim();
        
        if (!message) return;
        
        input.value = '';
        await this.sendMessage(message);
    }

    async sendMessage(message) {
        // Mark chatbot as used when user sends their first message
        if (!this.hasUsedChatbot) {
            this.hasUsedChatbot = true;
            try {
                localStorage.setItem('chatbot-used', 'true');
            } catch (e) {
                console.warn('Could not save chatbot usage to localStorage');
            }
        }
        
        this.addMessage(message, 'user');
        this.showTypingIndicator();

        try {
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ question: message })
            });

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            this.hideTypingIndicator();
            
            if (data.answer) {
                this.addMessage(data.answer, 'bot');
            } else {
                this.addMessage('I apologize, but I encountered an issue processing your question. Please try asking something else.', 'bot');
            }
        } catch (error) {
            console.error('Chatbot API Error:', error);
            this.hideTypingIndicator();
            this.addMessage('I\'m having some trouble connecting right now. Please try again in a moment.', 'bot');
        }
    }

    // Fixed linkification function
    linkifyText(text) {
        // Define regex patterns for different types of links
        const patterns = [
            {
                // Email addresses
                regex: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/gi,
                replacement: (match) => `<a href="mailto:${match}">${match}</a>`
            },
            {
                // Phone numbers (various formats)
                regex: /(\+?[\d\s\-\(\)]{10,})/gi,
                replacement: (match) => {
                    // Clean phone number for tel: link
                    const cleanPhone = match.replace(/\D/g, '');
                    if (cleanPhone.length >= 10) {
                        return `<a href="tel:${cleanPhone}">${match}</a>`;
                    }
                    return match;
                }
            },
            {
                // Full URLs with protocol
                regex: /\b(https?:\/\/[^\s<>'")\]]+)/gi,
                replacement: (match) => `<a href="${match}" target="_blank" rel="noopener noreferrer">${match}</a>`
            },
            {
                // URLs starting with www.
                regex: /\b(www\.[^\s<>'")\]]+)/gi,
                replacement: (match) => `<a href="https://${match}" target="_blank" rel="noopener noreferrer">${match}</a>`
            },
            {
                // Domain names with specific social media and common platforms
                regex: /\b([a-zA-Z0-9-]+\.(?:linkedin\.com\/in\/[^\s<>'")\]]+|github\.com\/[^\s<>'")\]]+|twitter\.com\/[^\s<>'")\]]+|instagram\.com\/[^\s<>'")\]]+|facebook\.com\/[^\s<>'")\]]+|youtube\.com\/[^\s<>'")\]]+|com|org|net|edu|gov|mil|int|co|io|ai|tech|dev|app|blog|info|biz|name|pro))\b/gi,
                replacement: (match) => `<a href="https://${match}" target="_blank" rel="noopener noreferrer">${match}</a>`
            }
        ];

        let linkedText = text;
        
        // Apply each pattern
        patterns.forEach(pattern => {
            linkedText = linkedText.replace(pattern.regex, pattern.replacement);
        });

        return linkedText;
    }

    addMessage(message, sender) {
        const messagesContainer = document.getElementById('chatbot-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';

        if (sender === 'bot') {
            // Step 1: Convert Markdown to HTML using marked.js (if available)
            let htmlContent;
            if (typeof marked !== 'undefined') {
                htmlContent = marked.parse(message);
            } else {
                // Fallback: basic markdown conversion
                htmlContent = message
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    .replace(/\*(.*?)\*/g, '<em>$1</em>')
                    .replace(/`(.*?)`/g, '<code>$1</code>')
                    .replace(/\n/g, '<br>');
            }
            
            // Step 2: Apply linkification to the HTML content
            // This now handles both markdown links and plain text URLs
            const linkifiedContent = this.linkifyHtmlContent(htmlContent);
            
            // Step 3: Set the innerHTML with the processed content
            messageContent.innerHTML = linkifiedContent;

        } else {
            // For user messages, apply linkification to plain text
            const linkedText = this.linkifyText(message);
            messageContent.innerHTML = `<p>${linkedText}</p>`;
        }
        
        messageDiv.appendChild(messageContent);
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // UPDATED: Helper function to linkify HTML content while preserving existing tags
    linkifyHtmlContent(html) {
        // Create a temporary DOM element to parse the HTML
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;

        // Ensure all links (including those from Markdown) open in a new tab
        tempDiv.querySelectorAll('a').forEach(anchor => {
            // Check if it's an external link (http/https)
            if (anchor.protocol === 'http:' || anchor.protocol === 'https:') {
                anchor.target = '_blank';
                anchor.rel = 'noopener noreferrer';
            }
        });

        // Recursively process text nodes to find and linkify plain text URLs
        const processTextNodes = (node) => {
            if (node.nodeType === Node.TEXT_NODE) {
                const linkedText = this.linkifyText(node.textContent);
                if (linkedText !== node.textContent) {
                    // Replace the text node with linked content
                    const wrapper = document.createElement('span');
                    wrapper.innerHTML = linkedText;
                    
                    // Replace text node with the new elements
                    const parent = node.parentNode;
                    while (wrapper.firstChild) {
                        parent.insertBefore(wrapper.firstChild, node);
                    }
                    parent.removeChild(node);
                }
            } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName.toLowerCase() !== 'a') {
                // Process child nodes, but skip existing anchor tags to avoid creating nested links
                Array.from(node.childNodes).forEach(processTextNodes);
            }
        };

        processTextNodes(tempDiv);
        return tempDiv.innerHTML;
    }

    showTypingIndicator() {
        const messagesContainer = document.getElementById('chatbot-messages');
        const typingDiv = document.createElement('div');
        typingDiv.className = 'typing-indicator';
        typingDiv.id = 'typing-indicator';
        typingDiv.innerHTML = `<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>`;
        messagesContainer.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    hideTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
}

// Utility functions
class Utils {
    static debounce(func, wait) {
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

    static throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }
}

// Performance optimization
class PerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        this.lazyLoadImages();
        this.optimizeScrollHandlers();
    }

    lazyLoadImages() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    optimizeScrollHandlers() {
        const scrollHandler = Utils.throttle(() => {
            // Optimized scroll handling
        }, 100);

        window.addEventListener('scroll', scrollHandler, { passive: true });
    }
}

// Add some additional interactive features
class InteractiveFeatures {
    constructor() {
        this.init();
    }



    init() {
        this.setupHoverEffects();
        this.setupClickAnimations();
        this.setupKeyboardNavigation();
    }

    setupHoverEffects() {
        // Add subtle hover effects to cards
        document.querySelectorAll('.project-card, .skill-category, .contact-item').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-4px)';
            });

            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
    }

    setupClickAnimations() {
        // Add click animation to buttons (disabled in horror mode)
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                // Skip ripple effect in horror mode
                const currentTheme = document.documentElement.getAttribute('data-theme');
                if (currentTheme === 'horror') {
                    return;
                }
                
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
    }

    setupKeyboardNavigation() {
        // Improve keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                // Close chatbot if open
                const chatbot = document.getElementById('chatbot-container');
                if (chatbot && chatbot.classList.contains('open')) {
                    document.getElementById('chatbot-close').click();
                }
            }
        });
    }
}

// PWA Install Button Controller
class PWAInstallController {
    constructor() {
        this.deferredPrompt = null;
        this.isInstalled = false;
        this.hasBeenShown = false;
        this.init();
    }

    init() {
        this.checkInstallStatus();
        this.setupEventListeners();
        this.setupInstallPromptListener();
        this.schedulePresentationLogic();
        this.checkLogoAvailability();
    }

    checkInstallStatus() {
        // Check if app is already installed
        if (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) {
            this.isInstalled = true;
            this.hideInstallButton();
            return;
        }

        // Check if user has dismissed the prompt before
        const dismissed = localStorage.getItem('pwa-install-dismissed');
        const dismissedTime = localStorage.getItem('pwa-install-dismissed-time');
        
        if (dismissed && dismissedTime) {
            const daysSinceDismissed = (Date.now() - parseInt(dismissedTime)) / (1000 * 60 * 60 * 24);
            
            // If dismissed recently (same session), don't show button again but make logo available
            const hoursSinceDismissed = (Date.now() - parseInt(dismissedTime)) / (1000 * 60 * 60);
            if (hoursSinceDismissed < 1) { // Don't show button for 1 hour after dismissal
                this.hasBeenShown = true;
            }
        }
    }

    setupEventListeners() {
        const installButton = document.getElementById('pwa-install-button');
        const installContainer = document.getElementById('pwa-install-container');
        const popupBackdrop = document.getElementById('pwa-popup-backdrop');
        const popup = document.getElementById('pwa-install-popup');
        const cancelBtn = document.getElementById('pwa-popup-cancel');
        const installBtn = document.getElementById('pwa-popup-install');

        // Main install button click - show detailed popup
        installButton?.addEventListener('click', () => {
            this.showInstallPopup();
        });

        // Popup backdrop click - close popup
        popupBackdrop?.addEventListener('click', () => {
            this.hideInstallPopup();
        });

        // Cancel button - hide for a week
        cancelBtn?.addEventListener('click', () => {
            this.dismissInstallPrompt();
        });

        // Install button in popup - trigger actual install
        installBtn?.addEventListener('click', () => {
            this.triggerInstall();
        });

        // Auto-collapse logic after showing for a while
        let collapseTimer;
        const resetCollapseTimer = () => {
            clearTimeout(collapseTimer);
            if (!this.hasBeenShown && installContainer && !installContainer.classList.contains('collapsed')) {
                collapseTimer = setTimeout(() => {
                    installContainer.classList.add('collapsed');
                }, 8000); // Collapse after 8 seconds
            }
        };

        // Reset timer on hover
        installContainer?.addEventListener('mouseenter', () => {
            clearTimeout(collapseTimer);
            installContainer.classList.remove('collapsed');
        });

        installContainer?.addEventListener('mouseleave', resetCollapseTimer);

        // Monitor chatbot state to adjust positioning
        this.setupChatbotConflictAvoidance();

        // Start collapse timer when first shown
        setTimeout(resetCollapseTimer, 100);
    }

    setupChatbotConflictAvoidance() {
        const chatbotContainer = document.getElementById('chatbot-container');
        const installContainer = document.getElementById('pwa-install-container');
        
        if (!chatbotContainer || !installContainer) return;

        // Watch for chatbot opening/closing
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    const chatbotIsOpen = chatbotContainer.classList.contains('open');
                    this.adjustForChatbot(chatbotIsOpen);
                }
            });
        });

        observer.observe(chatbotContainer, {
            attributes: true,
            attributeFilter: ['class']
        });

        // Initial check
        const chatbotIsOpen = chatbotContainer.classList.contains('open');
        this.adjustForChatbot(chatbotIsOpen);
    }

    adjustForChatbot(chatbotIsOpen) {
        const installContainer = document.getElementById('pwa-install-container');
        if (!installContainer) return;

        if (chatbotIsOpen) {
            // Move install button out of the way when chatbot is open
            installContainer.style.transform = 'translateY(-20px)';
            
            // On very small screens, move it above the chatbot
            if (window.innerWidth <= 380) {
                installContainer.style.transform = 'translateY(-80px)';
            }
        } else {
            // Reset position when chatbot is closed
            installContainer.style.transform = '';
        }
    }

    setupInstallPromptListener() {
        window.addEventListener('beforeinstallprompt', (e) => {
            console.log('💡 PWA install prompt available');
            
            // Prevent the mini-infobar from appearing
            e.preventDefault();
            
            // Store the event for later use
            this.deferredPrompt = e;
            
            // Show our custom install button
            this.showInstallButton();
        });

        // Listen for successful installation
        window.addEventListener('appinstalled', (e) => {
            console.log('🎉 PWA installed successfully!');
            this.isInstalled = true;
            this.hideInstallButton();
            this.hideInstallPopup();
            
            // Track successful installation
            this.trackInstallEvent('installed');
            
            // Clear the deferred prompt
            this.deferredPrompt = null;
        });
    }

    schedulePresentationLogic() {
        // Debug current state
        console.log('📱 PWA Presentation Logic:');
        console.log('  - isInstalled:', this.isInstalled);
        console.log('  - hasBeenShown:', this.hasBeenShown);
        console.log('  - dismissed storage:', localStorage.getItem('pwa-install-dismissed'));
        
        // Don't show if already installed or recently dismissed
        if (this.isInstalled) {
            console.log('📱 PWA already installed, skipping button');
            return;
        }
        
        if (this.hasBeenShown) {
            console.log('📱 PWA button already shown recently, skipping');
            return;
        }

        console.log('📱 PWA button showing INSTANTLY!');
        
        // Show the button immediately
        this.showInstallButton();

        // Add pulse animation after more time to draw attention
        setTimeout(() => {
            const installButton = document.getElementById('pwa-install-button');
            if (installButton && !this.hasBeenShown) {
                installButton.classList.add('pulse');
                
                // Remove pulse after a few cycles
                setTimeout(() => {
                    installButton.classList.remove('pulse');
                }, 6000);
            }
        }, 20000); // Pulse after 20 seconds
    }

    showInstallButton() {
        const container = document.getElementById('pwa-install-container');
        if (container) {
            container.classList.remove('hidden');
            container.style.display = 'block'; // Force display
            console.log('📱 PWA install button shown');
            console.log('Button classes:', container.className);
            console.log('Button display:', getComputedStyle(container).display);
        } else {
            console.error('❌ PWA install container not found!');
        }
    }

    hideInstallButton() {
        const container = document.getElementById('pwa-install-container');
        if (container) {
            container.classList.add('hidden');
        }
    }

    showInstallPopup() {
        const popup = document.getElementById('pwa-install-popup');
        const backdrop = document.getElementById('pwa-popup-backdrop');
        
        if (popup && backdrop) {
            backdrop.classList.add('show');
            popup.classList.add('show');
            
            // Prevent body scroll
            document.body.style.overflow = 'hidden';
            
            this.trackInstallEvent('popup_shown');
        }
    }

    hideInstallPopup() {
        const popup = document.getElementById('pwa-install-popup');
        const backdrop = document.getElementById('pwa-popup-backdrop');
        
        if (popup && backdrop) {
            backdrop.classList.remove('show');
            popup.classList.remove('show');
            
            // Restore body scroll
            document.body.style.overflow = '';
        }
    }

    async triggerInstall() {
        if (!this.deferredPrompt) {
            console.warn('No install prompt available');
            this.showFallbackInstructions();
            return;
        }

        try {
            // Show the install prompt
            const result = await this.deferredPrompt.prompt();
            
            console.log('Install prompt result:', result.outcome);
            
            if (result.outcome === 'accepted') {
                console.log('✅ User accepted the install prompt');
                this.trackInstallEvent('accepted');
            } else {
                console.log('❌ User dismissed the install prompt');
                this.trackInstallEvent('dismissed');
            }
            
            // Hide our UI
            this.hideInstallPopup();
            
            // Clear the deferred prompt
            this.deferredPrompt = null;
            
        } catch (error) {
            console.error('❌ Install prompt error:', error);
            this.showFallbackInstructions();
        }
    }

    dismissInstallPrompt() {
        // Mark as dismissed but not for a week - user can click logo
        localStorage.setItem('pwa-install-dismissed', 'true');
        localStorage.setItem('pwa-install-dismissed-time', Date.now().toString());
        
        this.hasBeenShown = true;
        this.hideInstallPopup();
        this.flyButtonToLogo();
        
        this.trackInstallEvent('dismissed_maybe_later');
        
        console.log('📱 Install prompt dismissed - button flying to logo');
    }

    flyButtonToLogo() {
        const container = document.getElementById('pwa-install-container');
        const logo = document.getElementById('nav-logo');
        
        if (container && logo) {
            console.log('💥 Button exploding into sparks!');
            
            // Start button explosion animation
            container.classList.add('exploding');
            
            // Create explosion sparks immediately
            this.createExplosionSparks(container, logo);
            
            // Hide button after explosion
            setTimeout(() => {
                container.classList.add('hidden');
                container.classList.remove('exploding');
                console.log('💥 Button explosion complete');
            }, 600);
            
            // Make logo clickable after all sparks arrive
            setTimeout(() => {
                if (logo) {
                    logo.classList.add('pwa-available');
                    this.setupLogoClickListener();
                    console.log('✨ Logo is now interactive for PWA install');
                }
            }, 2000); // After all sparks have traveled
        }
    }

    createExplosionSparks(buttonElement, logoElement) {
        const buttonRect = buttonElement.getBoundingClientRect();
        const logoRect = logoElement.getBoundingClientRect();
        
        // Button center coordinates
        const buttonCenterX = buttonRect.left + buttonRect.width / 2;
        const buttonCenterY = buttonRect.top + buttonRect.height / 2;
        
        // Logo center coordinates  
        const logoCenterX = logoRect.left + logoRect.width / 2;
        const logoCenterY = logoRect.top + logoRect.height / 2;
        
        // Calculate travel distance
        const deltaX = logoCenterX - buttonCenterX;
        const deltaY = logoCenterY - buttonCenterY;
        
        console.log(`🎆 Creating explosion: ${deltaX}px, ${deltaY}px to logo`);
        
        // Create 20 sparks with different timing and paths
        const sparkCount = 20;
        let maxArrivalTime = 0;
        
        for (let i = 0; i < sparkCount; i++) {
            setTimeout(() => {
                const arrivalTime = this.createExplosionSpark(
                    buttonCenterX, 
                    buttonCenterY, 
                    deltaX, 
                    deltaY, 
                    i
                );
                maxArrivalTime = Math.max(maxArrivalTime, arrivalTime);
            }, i * 30); // Stagger spark creation
        }
        
        // Trigger logo flash when sparks start arriving
        setTimeout(() => {
            logoElement.classList.add('impact-flash');
            console.log('💥 Logo flash as sparks arrive!');
            
            setTimeout(() => {
                logoElement.classList.remove('impact-flash');
            }, 600);
        }, 800); // Start flash as first sparks arrive
    }

    createExplosionSpark(startX, startY, deltaX, deltaY, index) {
        const spark = document.createElement('div');
        spark.className = 'pwa-spark spark-to-logo';
        
        // Add some randomness to starting position (explosion spread)
        const explosionRadius = 40;
        const angle = (index / 20) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
        const distance = Math.random() * explosionRadius;
        
        const startOffsetX = Math.cos(angle) * distance;
        const startOffsetY = Math.sin(angle) * distance;
        
        spark.style.left = (startX + startOffsetX) + 'px';
        spark.style.top = (startY + startOffsetY) + 'px';
        
        // Random travel time and easing for natural movement
        const travelTime = 1.0 + Math.random() * 0.8; // 1.0 to 1.8 seconds
        const delay = Math.random() * 0.3; // 0 to 0.3 seconds delay
        
        // Set CSS custom properties for this spark
        spark.style.setProperty('--spark-target-x', deltaX + 'px');
        spark.style.setProperty('--spark-target-y', deltaY + 'px');
        spark.style.setProperty('--spark-duration', travelTime + 's');
        spark.style.setProperty('--spark-delay', delay + 's');
        
        // Different easing for variety
        const easings = [
            'cubic-bezier(0.2, 0.8, 0.2, 1)',
            'cubic-bezier(0.4, 0, 0.2, 1)',
            'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        ];
        spark.style.setProperty('--spark-easing', easings[index % easings.length]);
        
        document.body.appendChild(spark);
        
        // Remove spark after animation completes
        const totalTime = (delay + travelTime) * 1000;
        setTimeout(() => {
            if (spark.parentNode) {
                spark.parentNode.removeChild(spark);
            }
        }, totalTime + 100);
        
        return totalTime;
    }

    setupLogoClickListener() {
        const logo = document.getElementById('nav-logo');
        
        if (logo && !logo.hasAttribute('data-pwa-listener')) {
            logo.setAttribute('data-pwa-listener', 'true');
            
            logo.addEventListener('click', (e) => {
                e.preventDefault();
                this.showInstallPopupFromLogo();
            });
            
            // Add tooltip
            logo.title = 'Click to install app to home screen';
        }
    }

    showInstallPopupFromLogo() {
        // Show popup directly without showing the button again
        this.showInstallPopup();
        this.trackInstallEvent('logo_clicked');
        console.log('📱 PWA install triggered from logo click');
    }

    checkLogoAvailability() {
        // If user previously dismissed, make logo available
        const dismissed = localStorage.getItem('pwa-install-dismissed');
        const logo = document.getElementById('nav-logo');
        
        if (dismissed && !this.isInstalled && logo) {
            const dismissedTime = localStorage.getItem('pwa-install-dismissed-time');
            const daysSinceDismissed = dismissedTime ? 
                (Date.now() - parseInt(dismissedTime)) / (1000 * 60 * 60 * 24) : 0;
            
            // Make logo available if dismissed within the last 30 days
            if (daysSinceDismissed < 30) {
                logo.classList.add('pwa-available');
                this.setupLogoClickListener();
                console.log('📱 PWA install available via logo click');
            }
        }
    }

    showFallbackInstructions() {
        // Show browser-specific instructions for manual installation
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        const isAndroid = /Android/.test(navigator.userAgent);
        
        let instructions = '';
        
        if (isIOS) {
            instructions = 'To install: Tap the Share button and select "Add to Home Screen"';
        } else if (isAndroid) {
            instructions = 'To install: Tap the menu button and select "Add to Home Screen" or "Install"';
        } else {
            instructions = 'To install: Look for the install button in your browser\'s address bar';
        }
        
        // Update popup content with instructions
        const popupContent = document.querySelector('.pwa-popup-content p');
        if (popupContent) {
            popupContent.textContent = instructions;
        }
        
        // Hide the install button in popup, show only cancel
        const installBtn = document.getElementById('pwa-popup-install');
        if (installBtn) {
            installBtn.style.display = 'none';
        }
    }

    trackInstallEvent(action) {
        // Track installation events for analytics
        console.log(`📊 PWA Install Event: ${action}`);
        
        // You can integrate with your analytics service here
        try {
            // Example: Google Analytics 4
            if (typeof gtag === 'function') {
                gtag('event', 'pwa_install', {
                    action: action,
                    timestamp: Date.now()
                });
            }
            
            // Example: Custom analytics
            // this.sendCustomAnalytics('pwa_install', { action });
            
        } catch (error) {
            console.warn('Analytics tracking failed:', error);
        }
    }

    // Public method to manually trigger install button
    showInstallButtonManually() {
        if (!this.isInstalled) {
            this.showInstallButton();
        }
    }

    // Public method to check if installation is available
    isInstallAvailable() {
        return !!this.deferredPrompt && !this.isInstalled;
    }
}

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
    try {
        new ThemeController();
        new Navigation();
        new AnimationController();
        new ChatBot();
        new PerformanceOptimizer();
        new InteractiveFeatures();
        new PWAInstallController(); // Add PWA install functionality

        // Add loading states
        document.body.classList.add('loaded');
        
        console.log('Portfolio website initialized successfully');
    } catch (error) {
        console.error('Error initializing portfolio website:', error);
    }
});

// Service Worker registration (for PWA capabilities)
if ('serviceWorker' in navigator && navigator.serviceWorker) {
    // Use a more robust approach that works in all environments
    const registerServiceWorker = async () => {
        console.log('[Main] Registering service worker...');
        console.log('[Main] Current origin:', window.location.origin);
        console.log('[Main] SW support check passed');
        
        // Detect testing environments
        const isTestEnvironment = navigator.userAgent.includes('Google') || 
                                 navigator.userAgent.includes('Lighthouse') ||
                                 window.navigator.webdriver;
        console.log('[Main] Test environment detected:', isTestEnvironment);
        
        try {
            // Check security context
            if (!window.isSecureContext) {
                throw new Error('Service Workers require HTTPS or localhost');
            }
            
            // Try Google-friendly minimal SW first, then full-featured version
            const registrationAttempts = [
                { path: '/sw-simple.js', scope: '/' },
                { path: '/sw.js', scope: '/' },
                { path: './sw.js', scope: './' }
            ];
            
            let registration = null;
            let lastError = null;
            
            for (const attempt of registrationAttempts) {
                try {
                    console.log(`[Main] Attempting SW registration with path: ${attempt.path}, scope: ${attempt.scope}`);
                    
                    registration = await navigator.serviceWorker.register(attempt.path, {
                        scope: attempt.scope,
                        updateViaCache: 'none'
                    });
                    
                    console.log('[Main] SW registered successfully:', registration);
                    console.log('[Main] SW scope:', registration.scope);
                    console.log('[Main] SW installing:', registration.installing?.state);
                    console.log('[Main] SW waiting:', registration.waiting?.state);
                    console.log('[Main] SW active:', registration.active?.state);
                    break; // Success, exit loop
                    
                } catch (attemptError) {
                    console.warn(`[Main] Registration attempt failed for ${attempt.path}:`, attemptError.message);
                    lastError = attemptError;
                    continue; // Try next strategy
                }
            }
            
            if (!registration) {
                throw lastError || new Error('All registration attempts failed');
            }
            
            // Set up event listeners for successful registration
            registration.addEventListener('updatefound', () => {
                const newWorker = registration.installing;
                console.log('[Main] New service worker installing...');
                
                newWorker?.addEventListener('statechange', () => {
                    console.log('[Main] SW state changed to:', newWorker.state);
                    if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                        console.log('[Main] New service worker installed');
                        // Optionally show update notification
                        if (typeof showUpdateNotification === 'function') {
                            showUpdateNotification();
                        }
                    }
                });
            });
            
            // Listen for service worker messages
            navigator.serviceWorker.addEventListener('message', event => {
                console.log('[Main] Message from SW:', event.data);
            });
            
            // Check controller status
            if (navigator.serviceWorker.controller) {
                console.log('[Main] ✅ Page is controlled by service worker');
                console.log('[Main] Controller SW state:', navigator.serviceWorker.controller.state);
            } else {
                console.log('[Main] ⏳ Page is not controlled yet - SW will control on next visit');
            }
            
            // Attempt to update
            try {
                await registration.update();
                console.log('[Main] SW update check completed');
            } catch (updateError) {
                console.log('[Main] SW update check failed (this is normal):', updateError.message);
            }
            
            return registration;
            
        } catch (error) {
            console.warn('[Main] ❌ Service Worker registration completely failed');
            console.warn('[Main] Error:', error.message);
            console.warn('[Main] Error details:', error);
            
            // Provide helpful debugging information
            console.group('[Main] SW Debugging Information:');
            console.log('• Secure context:', window.isSecureContext);
            console.log('• SW support:', 'serviceWorker' in navigator);
            console.log('• Current URL:', window.location.href);
            console.log('• Origin:', window.location.origin);
            console.log('• Protocol:', window.location.protocol);
            console.groupEnd();
            
            if (error.message.includes('rejected') || error.name === 'TypeError') {
                console.warn('[Main] 🔍 This appears to be a hosting/network issue.');
                console.warn('[Main] Common causes:');
                console.warn('  • CDN or hosting provider blocking service workers');
                console.warn('  • Network security policies');
                console.warn('  • Browser security restrictions in production');
                console.warn('  • Service worker file not properly served');
            }
            
            console.log('[Main] 💡 PWA features will be limited but site remains fully functional');
            return null;
        }
    };
    
    // Register when page loads
    if (document.readyState === 'loading') {
        window.addEventListener('load', registerServiceWorker);
    } else {
        // Page already loaded
        registerServiceWorker();
    }
} else {
    console.warn('[Main] ❌ Service Workers not supported in this browser');
    console.log('[Main] PWA features unavailable but site will work normally');
}

// Listen for SW controller changes (when new SW takes control)
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.addEventListener('controllerchange', () => {
        console.log('[Main] Service worker controller changed, reloading page');
        window.location.reload();
    });
}

// Function to show update notification
function showUpdateNotification() {
    // Create a subtle notification about available update
    const notification = document.createElement('div');
    notification.id = 'sw-update-notification';
    notification.innerHTML = `
        <div style="
            position: fixed;
            top: 20px;
            right: 20px;
            background: #6366f1;
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            font-size: 14px;
            cursor: pointer;
            transition: all 0.3s ease;
        ">
            <i class="fas fa-sync-alt" style="margin-right: 8px;"></i>
            New version available! Click to update.
        </div>
    `;
    
    notification.addEventListener('click', () => {
        if (navigator.serviceWorker.controller) {
            navigator.serviceWorker.controller.postMessage({ type: 'SKIP_WAITING' });
        }
    });
    
    document.body.appendChild(notification);
    
    // Auto-hide after 10 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.opacity = '0';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }
    }, 10000);
}

// Error handling
window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
    // Could send to error tracking service here
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    // Could send to error tracking service here
});
