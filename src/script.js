// Theme Toggle functionality
class ThemeController {
    constructor() {
        this.init();
    }

    init() {
        this.setupThemeToggle();
        this.loadSavedTheme();
    }

    loadSavedTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
    }

    setupThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        
        themeToggle?.addEventListener('click', () => {
            this.toggleTheme();
        });
    }

    toggleTheme() {
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
        
        // Remove transitioning class after animation completes
        setTimeout(() => {
            document.body.classList.remove('theme-transitioning');
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
        } else {
            container.classList.remove('open');
        }
    }

    closeChat() {
        this.isOpen = false;
        document.getElementById('chatbot-container').classList.remove('open');
    }

    async handleSendMessage() {
        const input = document.getElementById('chatbot-message-input');
        const message = input.value.trim();
        
        if (!message) return;
        
        input.value = '';
        await this.sendMessage(message);
    }

    async sendMessage(message) {
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

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
    try {
        new ThemeController();
        new Navigation();
        new AnimationController();
        new ChatBot();
        new PerformanceOptimizer();
        new InteractiveFeatures();

        // Add loading states
        document.body.classList.add('loaded');
        
        console.log('Portfolio website initialized successfully');
    } catch (error) {
        console.error('Error initializing portfolio website:', error);
    }
});

// Service Worker registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
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
