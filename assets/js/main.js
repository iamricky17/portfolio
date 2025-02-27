// Custom cursor
const cursor = document.getElementById('custom-cursor');
const cursorRing = document.getElementById('cursor-ring');
const cursorTag = document.getElementById('cursor-tag');

document.addEventListener('mousemove', (e) => {
    const x = e.pageX; // Use pageX instead of clientX
    const y = e.pageY; // Use pageY instead of clientY
    
    // Update cursor position with requestAnimationFrame for smoother movement
    requestAnimationFrame(() => {
        cursor.style.left = x + 'px';
        cursor.style.top = y + 'px';
        
        cursorRing.style.left = x + 'px';
        cursorRing.style.top = y + 'px';
        
        cursorTag.style.left = (x + 10) + 'px';
        cursorTag.style.top = (y + 10) + 'px';
    });
});

document.addEventListener('mousedown', () => {
    cursor.style.transform = 'translate(-50%, -50%) rotate(135deg) scale(0.8)';
    cursorRing.style.transform = 'translate(-50%, -50%) scale(0.8)';
});

document.addEventListener('mouseup', () => {
    cursor.style.transform = 'translate(-50%, -50%) rotate(135deg) scale(1)';
    cursorRing.style.transform = 'translate(-50%, -50%) scale(1)';
});

// 3D Canvas Background
const canvas = document.getElementById('bg-canvas');
const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 30;

// Add particles
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 1000;
const posArray = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 100;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.1,
    color: document.body.classList.contains('dark') ? 0x00823b : 0x00823b,
    transparent: true,
    opacity: 0.8
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

// Animation
function animate() {
    requestAnimationFrame(animate);
    
    particlesMesh.rotation.x += 0.0002;
    particlesMesh.rotation.y += 0.0001;
    
    renderer.render(scene, camera);
}
animate();

// Window resize handler
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Theme Toggling
const body = document.body;
const themeToggle = document.getElementById('theme-toggle');
const themeToggleMobile = document.getElementById('theme-toggle-mobile');

// Check system preference
const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

if (prefersDarkMode) {
    body.classList.remove('light');
    body.classList.add('dark');
    particlesMaterial.color.set(0x48bf53);
}

function toggleTheme() {
    body.classList.toggle('dark');
    body.classList.toggle('light');
    
    // Update particle color based on theme
    if (body.classList.contains('dark')) {
        particlesMaterial.color.set(0x48bf53);
    } else {
        particlesMaterial.color.set(0x00823b);
    }
}

themeToggle.addEventListener('click', toggleTheme);
themeToggleMobile.addEventListener('click', toggleTheme);

// Mobile Menu
const menuBtn = document.getElementById('menu-btn');
const closeMenuBtn = document.getElementById('close-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const overlay = document.getElementById('overlay');
const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');

function openMenu() {
    mobileMenu.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeMenu() {
    mobileMenu.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
}

menuBtn.addEventListener('click', openMenu);
closeMenuBtn.addEventListener('click', closeMenu);
overlay.addEventListener('click', closeMenu);

mobileMenuLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
});

// Create map
function initMap() {
    // CoICT UDSM location
    const coictLocation = { lat: -6.7731, lng: 39.2383 };
    
    // Create a map showing CoICT location
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: coictLocation,
        styles: [
            {
                "featureType": "all",
                "elementType": "labels.text.fill",
                "stylers": [{"color": "#7c93a3"}, {"lightness": "-10"}]
            },
            {
                "featureType": "administrative.country",
                "elementType": "geometry",
                "stylers": [{"visibility": "on"}]
            },
            {
                "featureType": "administrative.country",
                "elementType": "geometry.stroke",
                "stylers": [{"color": "#a0a4a5"}]
            },
            {
                "featureType": "administrative.province",
                "elementType": "geometry.stroke",
                "stylers": [{"color": "#62838e"}]
            },
            {
                "featureType": "landscape",
                "elementType": "geometry.fill",
                "stylers": [{"color": "#f5f5f5"}]
            },
            {
                "featureType": "landscape.man_made",
                "elementType": "geometry.fill",
                "stylers": [{"color": "#f5f5f5"}]
            },
            {
                "featureType": "landscape.natural",
                "elementType": "geometry.fill",
                "stylers": [{"color": "#f5f5f5"}]
            },
            {
                "featureType": "landscape.natural.landcover",
                "elementType": "geometry.fill",
                "stylers": [{"color": "#f5f5f5"}]
            },
            {
                "featureType": "landscape.natural.terrain",
                "elementType": "geometry.fill",
                "stylers": [{"visibility": "off"}]
            },
            {
                "featureType": "poi",
                "elementType": "all",
                "stylers": [{"visibility": "simplified"}]
            },
            {
                "featureType": "poi.business",
                "elementType": "all",
                "stylers": [{"visibility": "simplified"}]
            },
            {
                "featureType": "poi.medical",
                "elementType": "all",
                "stylers": [{"visibility": "simplified"}]
            },
            {
                "featureType": "poi.park",
                "elementType": "all",
                "stylers": [{"visibility": "simplified"}]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry.fill",
                "stylers": [{"color": "#e6f0d7"}, {"visibility": "simplified"}]
            },
            {
                "featureType": "poi.place_of_worship",
                "elementType": "all",
                "stylers": [{"visibility": "simplified"}]
            },
            {
                "featureType": "poi.school",
                "elementType": "all",
                "stylers": [{"visibility": "simplified"}]
            },
            {
                "featureType": "poi.sports_complex",
                "elementType": "all",
                "stylers": [{"visibility": "simplified"}]
            },
            {
                "featureType": "road",
                "elementType": "all",
                "stylers": [{"saturation": "-100"}, {"visibility": "on"}]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [{"visibility": "on"}]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry.fill",
                "stylers": [{"color": "#ffffff"}]
            },
            {
                "featureType": "road.local",
                "elementType": "geometry.fill",
                "stylers": [{"color": "#ffffff"}, {"visibility": "on"}]
            },
            {
                "featureType": "transit",
                "elementType": "labels.icon",
                "stylers": [{"saturation": "-25"}]
            },
            {
                "featureType": "transit.line",
                "elementType": "all",
                "stylers": [{"visibility": "simplified"}]
            },
            {
                "featureType": "transit.station.airport",
                "elementType": "labels.icon",
                "stylers": [{"saturation": "-26"}]
            },
            {
                "featureType": "water",
                "elementType": "geometry.fill",
                "stylers": [{"color": "#a3cdff"}]
            }
        ]
    });
    
    // Add marker for CoICT
    const marker = new google.maps.Marker({
        position: coictLocation,
        map: map,
        title: "College of ICT, University of Dar es Salaam",
        icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillColor: "#00823b",
            fillOpacity: 1,
            strokeWeight: 2,
            strokeColor: "#ffffff"
        }
    });
    
    // Add info window
    const infoWindow = new google.maps.InfoWindow({
        content: `
            <div style="padding: 10px; max-width: 200px;">
                <h3 style="margin: 0 0 5px 0; color: #00823b; font-weight: bold;">Patrick Zablon</h3>
                <p style="margin: 0; font-size: 14px;">College of ICT, University of Dar es Salaam</p>
            </div>
        `
    });
    
    marker.addListener("click", () => {
        infoWindow.open(map, marker);
    });
    
    // Open info window by default
    infoWindow.open(map, marker);
}

// Load Google Maps API with callback
function loadGoogleMaps() {
    const script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?callback=initMap';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
}

// Form Handling
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const statusMessage = document.getElementById('status-message');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // In a real application, you would send this data to a server
    // Here we're just simulating a successful submission
    
    // Show success message
    formStatus.classList.remove('hidden');
    statusMessage.textContent = `Thanks ${name}! Your message has been sent successfully.`;
    statusMessage.classList.add('text-green-600');
    
    // Reset form
    contactForm.reset();
    
    // Hide message after 5 seconds
    setTimeout(() => {
        formStatus.classList.add('hidden');
    }, 5000);
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll Animations
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.animate-fade-in');
    
    // Immediately animate above-the-fold content
    animatedElements.forEach(element => {
        element.style.opacity = 1;
    });
    
    // Animation for elements as they come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    // Observe all cards and project elements
    document.querySelectorAll('.card, .project-card, .stat-card').forEach(element => {
        element.style.opacity = 0;
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
        observer.observe(element);
    });

    // Apply 3D effect on cards
    document.querySelectorAll('.card, .project-card, .stat-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const xPercent = x / rect.width - 0.5;
            const yPercent = y / rect.height - 0.5;
            
            const rotateX = yPercent * -8;
            const rotateY = xPercent * 8;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
    
    // Load Google Maps
    loadGoogleMaps();
});

// Helper function for typing effect
function typeWriter(element, text, i, speed, callback) {
    if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(() => typeWriter(element, text, i, speed, callback), speed);
    } else if (callback) {
        callback();
    }
}

// For the typing effect
const typingElement = document.getElementById('typing-text');
typingElement.textContent = '';

// Start typing effect when the page loads
window.addEventListener('DOMContentLoaded', () => {
    // First clear the element
    typingElement.textContent = '';
    
    // Start typing
    setTimeout(() => {
        typeWriter(typingElement, 'Patrick Zablon', 0, 100);
    }, 1000);
});