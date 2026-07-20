export const style1 = `
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Inter, system-ui, sans-serif;
  }
  
  :root {
    --bg: #0f0f12;
    --card: rgba(255, 255, 255, 0.06);
    --card-border: rgba(255, 255, 255, 0.12);
    --text: #f6f6f6;
    --muted: #b5b5b5;
    --primary: #d7b17c;
    --shadow: 0 15px 40px rgba(0, 0, 0, 0.35);
    --radius: 22px;
    --container: 1280px;
  }
  
  html {
    scroll-behavior: smooth;
  }
  
  body {
    background: var(--bg);
    color: var(--text);
  }
  
  a {
    text-decoration: none;
    color: inherit;
  }
  
  img {
    display: block;
    width: 100%;
  }
  
  section {
    padding: 90px 24px;
  }
  
  
  
  .container {
    max-width: var(--container);
    margin: auto;
  }
  
  .section-header {
    margin-bottom: 48px;
    text-align: center;
  }
  
  .section-header span {
    color: var(--primary);
    text-transform: uppercase;
    letter-spacing: 2px;
    font-size: 12px;
  }
  
  .section-header h2 {
    font-size: clamp(32px, 5vw, 52px);
    margin-top: 12px;
  }
  
  .section-header p {
    color: var(--muted);
    max-width: 650px;
    margin: 16px auto 0;
  }
  
  /* NAVBAR */
  
  .navbar {
    position: fixed;
    top: 18px;
    left: 50%;
    transform: translateX(-50%);
    width: min(1200px, calc(100% - 24px));
    z-index: 1000;
  
    backdrop-filter: blur(20px);
    background: rgba(15, 15, 18, 0.7);
  
    border: 1px solid rgba(255, 255, 255, 0.08);
  
    border-radius: 999px;
    padding: 14px 24px;
  
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .logo {
    display: flex;
    align-items: center;
    font-size: 20px;
    font-weight: 700;
  }
  
  .logo-image {
    width: 42px;
    aspect-ratio: 1;
    object-fit: cover;
    border-radius: 50%;
    border: 2px solid rgba(255, 255, 255, 0.15);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  }
  
  .nav-links {
    display: flex;
    gap: 24px;
    list-style: none;
  }
  
  .nav-links a {
    color: var(--muted);
    transition: 0.25s;
  }
  
  .nav-links a:hover {
    color: white;
  }
  
  .nav-btn {
    background: linear-gradient(135deg, var(--primary), #f2d6a5);
    color: #111;
    padding: 12px 20px;
    border-radius: 999px;
    font-weight: 600;
  }
  
  .menu-btn {
    display: none;
    font-size: 28px;
    cursor: pointer;
  }
  
  /* HERO */
  
  .hero {
    min-height: 100vh;
    position: relative;
    display: flex;
    align-items: center;
    overflow: hidden;
  }
  
  .hero-bg {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    transform: scale(1.1);
  }
  
  .hero-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.1),
      rgba(0, 0, 0, 0.2 )
    );
  }
  
  .hero-content {
    position: relative;
    z-index: 2;
    max-width: 700px;
  }
  
  .hero-subtitle {
    color: var(--primary);
    letter-spacing: 4px;
    text-transform: uppercase;
  }
  
  .hero h1 {
    font-size: clamp(52px, 8vw, 90px);
    line-height: 1;
    margin: 18px 0;
  }
  
  .hero p {
    color: var(--muted);
    font-size: 18px;
    line-height: 1.8;
  }
  
  .hero-actions {
    margin-top: 40px;
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
  }
  
  .btn-primary,
  .btn-secondary {
    padding: 16px 28px;
    border-radius: 999px;
    font-weight: 600;
  }
  
  .btn-primary {
    background: linear-gradient(135deg, var(--primary), #f2d6a5);
    color: black;
  }
  
  .btn-secondary {
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
  
  /* INTRO */
  
  .intro-card {
    padding: 60px;
    border-radius: var(--radius);
    background: var(--card);
    border: 1px solid var(--card-border);
    backdrop-filter: blur(20px);
    box-shadow: var(--shadow);
    text-align: center;
  }
  
  .intro-card p {
    color: var(--muted);
    font-size: 18px;
    line-height: 1.8;
  }
  
  /* SERVICES */
  
  .services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
    gap: 28px;
  }
  
  .service-card {
    background: var(--card);
    border: 1px solid var(--card-border);
    border-radius: var(--radius);
    overflow: hidden;
    transition: 0.3s;
  }
  
  .service-card:hover {
    transform: translateY(-8px);
  }
  
  .service-top {
    padding: 26px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    display: flex;
    justify-content: space-between;
  }
  
  .service-item {
    padding: 18px 26px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  }
  
  .service-item:last-child {
    border: none;
  }
  
  .service-item span {
    color: var(--muted);
  }
  
  /* GALLERY */
  
  .gallery-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }
  
  .gallery-item {
    border-radius: var(--radius);
    overflow: hidden;
    height: 320px;
  }
  
  
  .gallery-item img {
    height: 100%;
    object-fit: cover;
    transition: 0.5s;
  }
  
  .gallery-item:hover img {
    transform: scale(1.08);
  }
  
  /* OFFERS */
  
  .offers-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 24px;
  }
  
  .offer-card {
    padding: 30px;
    border-radius: var(--radius);
  
    background: linear-gradient(
      135deg,
      rgba(215, 177, 124, 0.15),
      rgba(255, 255, 255, 0.04)
    );
  
    border: 1px solid var(--card-border);
  }
  
  .offer-card h3 {
    margin-bottom: 14px;
  }
  
  .offer-card p {
    color: var(--muted);
  }
  
  /* HOURS */
  
  .hours-card {
    max-width: 800px;
    margin: auto;
    background: var(--card);
    border-radius: var(--radius);
    border: 1px solid var(--card-border);
    padding: 32px;
  }
  
  .hour {
    display: flex;
    justify-content: space-between;
    padding: 18px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  }
  
  .hour:last-child {
    border: none;
  }
  
  /* CONTACT */
  
  .contact-grid {
    display: grid;
    grid-template-columns: 420px 1fr;
    gap: 28px;
  }
  
  .contact-card {
    padding: 30px;
    border-radius: var(--radius);
    background: var(--card);
    border: 1px solid var(--card-border);
  }
  
  .contact-item {
    margin-bottom: 28px;
  }
  
  .contact-item h4 {
    margin-bottom: 8px;
    color: var(--primary);
  }
  
  .contact-item p,
  .contact-item a {
    color: var(--muted);
  }
  
  iframe {
    width: 100%;
    min-height: 500px;
    border: none;
    border-radius: var(--radius);
  }
  
  footer {
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    padding: 30px;
    text-align: center;
    color: var(--muted);
  }
  
  @media (max-width: 950px) {
    .gallery-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  
    .gallery-item:nth-child(2) {
      grid-column: span 1;
    }
  
    .contact-grid {
      grid-template-columns: 1fr;
    }
  
    .nav-links,
    .nav-btn {
      display: none;
    }
  
    .menu-btn {
      display: block;
    }
  
    .navbar.active {
      border-radius: 24px;
    }
  
    .navbar.active .nav-links {
      display: flex;
      flex-direction: column;
      position: absolute;
      top: 80px;
      left: 0;
      width: 100%;
      padding: 24px;
      border-radius: 24px;
      background: rgba(15, 15, 18, 0.95);
    }
  }
  
  @media (max-width: 650px) {
    section {
      padding: 70px 18px;
    }
  
    .gallery-grid {
      grid-template-columns: 1fr;
    }
  
    .intro-card {
      padding: 36px 24px;
    }
  
    .hero-actions {
      flex-direction: column;
    }
  
    .btn-primary,
    .btn-secondary {
      text-align: center;
    }
  }
  
`

export const style2 = `
* {
margin: 0;
padding: 0;
box-sizing: border-box;
font-family: 'Inter', system-ui, sans-serif;
}

:root {
--bg: #faf8f5;
--card: #ffffff;
--card-border: #eae5dd;
--text: #1f1d1a;
--muted: #756f66;
--primary: #b8834f;
--primary-light: #f6e9d8;
--shadow: 0 10px 30px rgba(30, 25, 15, 0.06);
--shadow-hover: 0 18px 45px rgba(30, 25, 15, 0.1);
--radius: 18px;
--radius-sm: 10px;
--container: 1280px;
}

html {
scroll-behavior: smooth;
}

body {
background: var(--bg);
color: var(--text);
}

a {
text-decoration: none;
color: inherit;
}

img {
display: block;
width: 100%;
}

section {
padding: 90px 24px;
}

.container {
max-width: var(--container);
margin: auto;
}

.section-header {
margin-bottom: 48px;
text-align: center;
}

.section-header span {
color: var(--primary);
text-transform: uppercase;
letter-spacing: 2px;
font-size: 12px;
font-weight: 600;
}

.section-header h2 {
font-size: clamp(32px, 5vw, 52px);
margin-top: 12px;
font-weight: 600;
}

.section-header p {
color: var(--muted);
max-width: 650px;
margin: 16px auto 0;
line-height: 1.7;
}

/* NAVBAR */

.navbar {
position: fixed;
top: 18px;
left: 50%;
transform: translateX(-50%);
width: min(1200px, calc(100% - 24px));
z-index: 1000;

backdrop-filter: blur(16px);
background: rgba(255, 255, 255, 0.85);

border: 1px solid var(--card-border);
box-shadow: var(--shadow);

border-radius: 999px;
padding: 14px 24px;

display: flex;
align-items: center;
justify-content: space-between;
}

.logo {
display: flex;
align-items: center;
gap: 10px;
font-size: 20px;
font-weight: 700;
}

.logo-image {
width: 42px;
aspect-ratio: 1;
object-fit: cover;
border-radius: 14px;
border: 2px solid var(--card-border);
box-shadow: 0 4px 10px rgba(30, 25, 15, 0.08);
}

.nav-links {
display: flex;
gap: 24px;
list-style: none;
}

.nav-links a {
color: var(--muted);
transition: 0.25s;
font-weight: 500;
}

.nav-links a:hover {
color: var(--text);
}

.nav-btn {
background: var(--text);
color: #fff;
padding: 12px 22px;
border-radius: 999px;
font-weight: 600;
transition: 0.25s;
}

.nav-btn:hover {
background: var(--primary);
}

.menu-btn {
display: none;
font-size: 28px;
cursor: pointer;
}

/* HERO */

.hero {
min-height: 100vh;
position: relative;
display: flex;
align-items: center;
overflow: hidden;
}

.hero-bg {
position: absolute;
inset: 0;
background-size: cover;
background-position: center;
transform: scale(1.1);
}

.hero-overlay {
position: absolute;
inset: 0;
background: linear-gradient(
  to bottom,
  rgba(0, 0, 0, 0.1),
  rgba(0, 0, 0, 0.2)
);
}

.hero-content {
position: relative;
z-index: 2;
max-width: 700px;
}

.hero-subtitle {
color: var(--primary);
letter-spacing: 4px;
text-transform: uppercase;
font-weight: 600;
font-size: 13px;
}

.hero h1 {
font-size: clamp(52px, 8vw, 90px);
line-height: 1.05;
margin: 18px 0;
font-weight: 700;
color: var(--text);
}

.hero p {
color: var(--muted);
font-size: 18px;
line-height: 1.8;
}

.hero-actions {
margin-top: 40px;
display: flex;
gap: 16px;
flex-wrap: wrap;
}

.btn-primary,
.btn-secondary {
padding: 16px 28px;
border-radius: 999px;
font-weight: 600;
transition: 0.25s;
}

.btn-primary {
background: var(--primary);
color: #fff;
box-shadow: 0 10px 25px rgba(184, 131, 79, 0.3);
}

.btn-primary:hover {
background: #a3743f;
}

.btn-secondary {
border: 1.5px solid var(--card-border);
background: var(--card);
color: var(--text);
}

.btn-secondary:hover {
border-color: var(--primary);
color: var(--primary);
}

/* INTRO */

.intro-card {
padding: 60px;
border-radius: var(--radius);
background: var(--card);
border: 1px solid var(--card-border);
box-shadow: var(--shadow);
text-align: center;
}

.intro-card p {
color: var(--muted);
font-size: 18px;
line-height: 1.8;
}

/* SERVICES */

.services-grid {
display: grid;
grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
gap: 28px;
}

.service-card {
background: var(--card);
border: 1px solid var(--card-border);
border-radius: var(--radius);
overflow: hidden;
box-shadow: var(--shadow);
transition: 0.3s;
}

.service-card:hover {
transform: translateY(-8px);
box-shadow: var(--shadow-hover);
border-color: var(--primary);
}

.service-top {
padding: 26px;
background: var(--primary-light);
border-bottom: 1px solid var(--card-border);
display: flex;
justify-content: space-between;
}

.service-item {
padding: 18px 26px;
display: flex;
justify-content: space-between;
border-bottom: 1px solid var(--card-border);
}

.service-item:last-child {
border: none;
}

.service-item span {
color: var(--muted);
}

/* GALLERY */

.gallery-grid {
display: grid;
grid-template-columns: repeat(3, 1fr);
gap: 16px;
}

.gallery-item {
border-radius: var(--radius);
overflow: hidden;
height: 320px;
border: 1px solid var(--card-border);
box-shadow: var(--shadow);
}


.gallery-item img {
height: 100%;
object-fit: cover;
transition: 0.5s;
}

.gallery-item:hover img {
transform: scale(1.08);
}

/* OFFERS */

.offers-grid {
display: grid;
grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
gap: 24px;
}

.offer-card {
padding: 30px;
border-radius: var(--radius);

background: var(--primary-light);
border: 1px solid rgba(184, 131, 79, 0.25);
box-shadow: var(--shadow);
}

.offer-card h3 {
margin-bottom: 14px;
color: var(--text);
}

.offer-card p {
color: var(--muted);
}

/* HOURS */

.hours-card {
max-width: 800px;
margin: auto;
background: var(--card);
border-radius: var(--radius);
border: 1px solid var(--card-border);
box-shadow: var(--shadow);
padding: 32px;
}

.hour {
display: flex;
justify-content: space-between;
padding: 18px 0;
border-bottom: 1px solid var(--card-border);
}

.hour:last-child {
border: none;
}

/* CONTACT */

.contact-grid {
display: grid;
grid-template-columns: 420px 1fr;
gap: 28px;
}

.contact-card {
padding: 30px;
border-radius: var(--radius);
background: var(--card);
border: 1px solid var(--card-border);
box-shadow: var(--shadow);
}

.contact-item {
margin-bottom: 28px;
}

.contact-item h4 {
margin-bottom: 8px;
color: var(--primary);
}

.contact-item p,
.contact-item a {
color: var(--muted);
}

iframe {
width: 100%;
min-height: 500px;
border: 1px solid var(--card-border);
border-radius: var(--radius);
}

footer {
border-top: 1px solid var(--card-border);
padding: 30px;
text-align: center;
color: var(--muted);
}

@media (max-width: 950px) {
.gallery-grid {
  grid-template-columns: repeat(2, 1fr);
}

.gallery-item:nth-child(2) {
  grid-column: span 1;
}

.contact-grid {
  grid-template-columns: 1fr;
}

.nav-links,
.nav-btn {
  display: none;
}

.menu-btn {
  display: block;
}

.navbar.active {
  border-radius: 24px;
}

.navbar.active .nav-links {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 80px;
  left: 0;
  width: 100%;
  padding: 24px;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.97);
  border: 1px solid var(--card-border);
  box-shadow: var(--shadow);
}
}

@media (max-width: 650px) {
section {
  padding: 70px 18px;
}

.gallery-grid {
  grid-template-columns: 1fr;
}

.intro-card {
  padding: 36px 24px;
}

.hero-actions {
  flex-direction: column;
}

.btn-primary,
.btn-secondary {
  text-align: center;
}
}
`
export const style3 = `
* {
margin: 0;
padding: 0;
box-sizing: border-box;
font-family: "Inter", system-ui, sans-serif;
}

:root {
--bg: #faf6f1;
--bg-alt: #f1e8de;
--card: #ffffff;
--card-border: rgba(30, 20, 15, 0.08);
--text: #241b15;
--muted: #78685c;
--primary: #c3652f;
--primary-light: #e8a06b;
--accent: #2f5d50;
--shadow: 0 20px 45px rgba(60, 35, 15, 0.1);
--radius: 28px;
--container: 1280px;
}

html {
scroll-behavior: smooth;
}

body {
background: var(--bg);
color: var(--text);
}

a {
text-decoration: none;
color: inherit;
}

img {
display: block;
width: 100%;
}

section {
padding: 100px 24px;
}

.container {
max-width: var(--container);
margin: auto;
}

.section-header {
margin-bottom: 56px;
text-align: left;
max-width: 640px;
}

.section-header span {
color: var(--primary);
text-transform: uppercase;
letter-spacing: 3px;
font-size: 12px;
font-weight: 600;
}

.section-header h2 {
font-size: clamp(32px, 5vw, 54px);
margin-top: 14px;
font-weight: 700;
color: var(--text);
}

.section-header p {
color: var(--muted);
margin-top: 18px;
line-height: 1.7;
}

.section-header.center {
text-align: center;
margin-left: auto;
margin-right: auto;
}

/* NAVBAR */

.navbar {
position: fixed;
top: 0;
left: 0;
width: 100%;
z-index: 1000;

background: rgba(250, 246, 241, 0.85);
backdrop-filter: blur(16px);
border-bottom: 1px solid var(--card-border);

padding: 18px 32px;

display: flex;
align-items: center;
justify-content: space-between;
}

.logo {
display: flex;
align-items: center;
gap: 12px;
font-size: 20px;
font-weight: 700;
}

.logo-image {
width: 44px;
aspect-ratio: 1;
object-fit: cover;
border-radius: 12px;
border: 2px solid var(--card-border);
box-shadow: var(--shadow);
}

.nav-links {
display: flex;
gap: 32px;
list-style: none;
}

.nav-links a {
color: var(--muted);
font-weight: 500;
transition: 0.25s;
position: relative;
}

.nav-links a:hover {
color: var(--primary);
}

.nav-btn {
background: var(--primary);
color: #fff;
padding: 12px 24px;
border-radius: 14px;
font-weight: 600;
transition: 0.25s;
}

.nav-btn:hover {
background: var(--text);
}

.menu-btn {
display: none;
font-size: 28px;
cursor: pointer;
color: var(--text);
}

/* HERO */

.hero {
min-height: 100vh;
position: relative;
display: grid;
grid-template-columns: 1.1fr 0.9fr;
align-items: center;
gap: 40px;
padding-top: 140px;
overflow: hidden;
}

.hero-bg {
position: relative;
height: 100%;
min-height: 480px;
background-size: cover;
background-position: center;
border-radius: var(--radius);
box-shadow: var(--shadow);
}

.hero-overlay {
position: absolute;
inset: 0;
background: linear-gradient(
  180deg,
  rgba(36, 27, 21, 0) 40%,
  rgba(36, 27, 21, 0.55)
);
border-radius: var(--radius);
}

.hero-content {
position: relative;
z-index: 2;
max-width: 560px;
}

.hero-subtitle {
color: var(--primary);
letter-spacing: 4px;
text-transform: uppercase;
font-weight: 600;
font-size: 13px;
}

.hero h1 {
font-size: clamp(44px, 6vw, 76px);
line-height: 1.05;
margin: 20px 0;
color: var(--text);
font-weight: 700;
}

.hero p {
color: var(--muted);
font-size: 18px;
line-height: 1.8;
}

.hero-actions {
margin-top: 40px;
display: flex;
gap: 16px;
flex-wrap: wrap;
}

.btn-primary,
.btn-secondary {
padding: 16px 30px;
border-radius: 14px;
font-weight: 600;
transition: 0.25s;
}

.btn-primary {
background: var(--primary);
color: #fff;
}

.btn-primary:hover {
background: var(--accent);
}

.btn-secondary {
border: 1.5px solid var(--card-border);
color: var(--text);
}

.btn-secondary:hover {
border-color: var(--primary);
color: var(--primary);
}

/* INTRO */

.intro-card {
padding: 64px;
border-radius: var(--radius);
background: var(--bg-alt);
border: 1px solid var(--card-border);
text-align: left;
display: grid;
grid-template-columns: 1fr 1fr;
gap: 40px;
align-items: center;
}

.intro-card p {
color: var(--muted);
font-size: 18px;
line-height: 1.8;
}

/* SERVICES */

.services-grid {
display: grid;
grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
gap: 28px;
}

.service-card {
background: var(--card);
border: 1px solid var(--card-border);
border-radius: var(--radius);
overflow: hidden;
box-shadow: var(--shadow);
transition: 0.35s;
}

.service-card:hover {
transform: translateY(-10px);
}

.service-top {
padding: 28px;
background: var(--accent);
color: #fff;
display: flex;
justify-content: space-between;
}

.service-item {
padding: 20px 28px;
display: flex;
justify-content: space-between;
border-bottom: 1px solid var(--card-border);
}

.service-item:last-child {
border: none;
}

.service-item span {
color: var(--primary);
font-weight: 600;
}

/* GALLERY */

.gallery-grid {
display: grid;
grid-template-columns: repeat(3, 1fr);
grid-auto-rows: 260px;
gap: 18px;
}

.gallery-item {
border-radius: var(--radius);
overflow: hidden;
}

.gallery-item:nth-child(1) {
grid-row: span 2;
}

.gallery-item:nth-child(4) {
grid-column: span 2;
}

.gallery-item img {
height: 100%;
object-fit: cover;
transition: 0.5s;
}

.gallery-item:hover img {
transform: scale(1.08);
}

/* OFFERS */

.offers-grid {
display: grid;
grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
gap: 24px;
}

.offer-card {
padding: 32px;
border-radius: var(--radius);
background: linear-gradient(150deg, var(--primary-light), var(--primary));
color: #fff;
box-shadow: var(--shadow);
}

.offer-card h3 {
margin-bottom: 14px;
font-size: 22px;
}

.offer-card p {
color: rgba(255, 255, 255, 0.9);
}

/* HOURS */

.hours-card {
max-width: 800px;
margin: auto;
background: var(--card);
border-radius: var(--radius);
border: 1px solid var(--card-border);
box-shadow: var(--shadow);
padding: 36px;
}

.hour {
display: flex;
justify-content: space-between;
padding: 20px 0;
border-bottom: 1px solid var(--card-border);
}

.hour:last-child {
border: none;
}

/* CONTACT */

.contact-grid {
display: grid;
grid-template-columns: 1fr 420px;
gap: 28px;
}

.contact-card {
padding: 32px;
border-radius: var(--radius);
background: var(--accent);
color: #fff;
}

.contact-item {
margin-bottom: 28px;
}

.contact-item h4 {
margin-bottom: 8px;
color: var(--primary-light);
}

.contact-item p,
.contact-item a {
color: rgba(255, 255, 255, 0.85);
}

iframe {
width: 100%;
min-height: 500px;
border: none;
border-radius: var(--radius);
box-shadow: var(--shadow);
}

footer {
border-top: 1px solid var(--card-border);
padding: 32px;
text-align: center;
color: var(--muted);
background: var(--bg-alt);
}

@media (max-width: 950px) {
.hero {
  grid-template-columns: 1fr;
}

.hero-bg {
  min-height: 340px;
}

.intro-card {
  grid-template-columns: 1fr;
}

.gallery-grid {
  grid-template-columns: repeat(2, 1fr);
}

.gallery-item:nth-child(1) {
  grid-row: span 1;
}

.gallery-item:nth-child(4) {
  grid-column: span 1;
}

.contact-grid {
  grid-template-columns: 1fr;
}

.nav-links,
.nav-btn {
  display: none;
}

.menu-btn {
  display: block;
}

.navbar.active .nav-links {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 70px;
  left: 0;
  width: 100%;
  padding: 24px;
  background: var(--bg);
  border-bottom: 1px solid var(--card-border);
}
}

@media (max-width: 650px) {
section {
  padding: 70px 18px;
}

.gallery-grid {
  grid-template-columns: 1fr;
}

.intro-card {
  padding: 36px 24px;
}

.hero-actions {
  flex-direction: column;
}

.btn-primary,
.btn-secondary {
  text-align: center;
}
}
`
export const style4 = `
* {
margin: 0;
padding: 0;
box-sizing: border-box;
font-family: "Inter", system-ui, sans-serif;
}

:root {
--bg: #0a0a0c;
--bg-alt: #131316;
--card: #17171b;
--card-border: rgba(255, 255, 255, 0.1);
--text: #ffffff;
--muted: #9a9aa3;
--primary: #ff2e63;
--secondary: #00e5ff;
--tertiary: #ffe600;
--shadow: 0 20px 50px rgba(255, 46, 99, 0.15);
--radius: 6px;
--container: 1280px;
}

html {
scroll-behavior: smooth;
}

body {
background: var(--bg);
color: var(--text);
}

a {
text-decoration: none;
color: inherit;
}

img {
display: block;
width: 100%;
}

section {
padding: 110px 24px;
position: relative;
}

.container {
max-width: var(--container);
margin: auto;
}

.section-header {
margin-bottom: 60px;
text-align: left;
max-width: 640px;
}

.section-header span {
color: var(--tertiary);
text-transform: uppercase;
letter-spacing: 3px;
font-size: 13px;
font-weight: 800;
}

.section-header h2 {
font-size: clamp(38px, 6vw, 64px);
margin-top: 14px;
font-weight: 900;
text-transform: uppercase;
line-height: 1;
color: var(--text);
}

.section-header p {
color: var(--muted);
margin-top: 20px;
line-height: 1.7;
font-size: 17px;
}

.section-header.center {
text-align: center;
margin-left: auto;
margin-right: auto;
}

/* NAVBAR */

.navbar {
position: fixed;
top: 0;
left: 0;
width: 100%;
z-index: 1000;

background: rgba(10, 10, 12, 0.9);
backdrop-filter: blur(14px);
border-bottom: 2px solid var(--primary);

padding: 18px 32px;

display: flex;
align-items: center;
justify-content: space-between;
}

.logo {
display: flex;
align-items: center;
gap: 12px;
font-size: 20px;
font-weight: 900;
text-transform: uppercase;
letter-spacing: 1px;
}

.logo-image {
width: 44px;
aspect-ratio: 1;
object-fit: cover;
border-radius: 50%;
border: 2px solid var(--primary);
}

.nav-links {
display: flex;
gap: 34px;
list-style: none;
}

.nav-links a {
color: var(--muted);
font-weight: 700;
text-transform: uppercase;
font-size: 14px;
letter-spacing: 0.5px;
transition: 0.2s;
}

.nav-links a:hover {
color: var(--secondary);
}

.nav-btn {
background: var(--primary);
color: #fff;
padding: 12px 26px;
border-radius: var(--radius);
font-weight: 800;
text-transform: uppercase;
font-size: 14px;
transition: 0.2s;
box-shadow: 4px 4px 0 var(--tertiary);
}

.nav-btn:hover {
transform: translate(2px, 2px);
box-shadow: 2px 2px 0 var(--tertiary);
}

.menu-btn {
display: none;
font-size: 28px;
cursor: pointer;
color: var(--text);
}

/* HERO */

.hero {
min-height: 100vh;
position: relative;
display: flex;
align-items: center;
overflow: hidden;
padding-top: 90px;
}

.hero-bg {
position: absolute;
inset: 0;
background-size: cover;
background-position: center;
filter: saturate(1.3) contrast(1.05);
}

.hero-overlay {
position: absolute;
inset: 0;
background: linear-gradient(
    100deg,
    rgba(10, 10, 12, 0.95) 20%,
    rgba(10, 10, 12, 0.4) 75%
  ),
  linear-gradient(0deg, rgba(255, 46, 99, 0.25), transparent 50%);
}

.hero-content {
position: relative;
z-index: 2;
max-width: 680px;
}

.hero-subtitle {
display: inline-block;
color: #000;
background: var(--tertiary);
padding: 6px 14px;
letter-spacing: 2px;
text-transform: uppercase;
font-weight: 800;
font-size: 13px;
border-radius: var(--radius);
}

.hero h1 {
font-size: clamp(52px, 8vw, 100px);
line-height: 0.95;
margin: 22px 0;
text-transform: uppercase;
font-weight: 900;
color: var(--text);
}

.hero h1 span {
color: var(--primary);
-webkit-text-stroke: 2px var(--secondary);
}

.hero p {
color: var(--muted);
font-size: 18px;
line-height: 1.8;
}

.hero-actions {
margin-top: 44px;
display: flex;
gap: 18px;
flex-wrap: wrap;
}

.btn-primary,
.btn-secondary {
padding: 17px 32px;
border-radius: var(--radius);
font-weight: 800;
text-transform: uppercase;
font-size: 14px;
letter-spacing: 0.5px;
transition: 0.2s;
}

.btn-primary {
background: var(--primary);
color: #fff;
box-shadow: 5px 5px 0 var(--secondary);
}

.btn-primary:hover {
transform: translate(3px, 3px);
box-shadow: 2px 2px 0 var(--secondary);
}

.btn-secondary {
border: 2px solid var(--secondary);
color: var(--secondary);
}

.btn-secondary:hover {
background: var(--secondary);
color: #000;
}

/* INTRO */

.intro-card {
padding: 64px;
border-radius: var(--radius);
background: var(--card);
border: 2px solid var(--card-border);
border-left: 6px solid var(--secondary);
text-align: left;
}

.intro-card p {
color: var(--muted);
font-size: 19px;
line-height: 1.8;
}

/* SERVICES */

.services-grid {
display: grid;
grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
gap: 28px;
}

.service-card {
background: var(--card);
border: 2px solid var(--card-border);
border-radius: var(--radius);
overflow: hidden;
transition: 0.3s;
}

.service-card:nth-child(3n + 1) {
border-top: 4px solid var(--primary);
}
.service-card:nth-child(3n + 2) {
border-top: 4px solid var(--secondary);
}
.service-card:nth-child(3n + 3) {
border-top: 4px solid var(--tertiary);
}

.service-card:hover {
transform: translateY(-6px);
border-color: var(--secondary);
}

.service-top {
padding: 28px;
border-bottom: 2px solid var(--card-border);
display: flex;
justify-content: space-between;
font-weight: 800;
text-transform: uppercase;
}

.service-item {
padding: 20px 28px;
display: flex;
justify-content: space-between;
border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.service-item:last-child {
border: none;
}

.service-item span {
color: var(--tertiary);
font-weight: 700;
}

/* GALLERY */

.gallery-grid {
display: grid;
grid-template-columns: repeat(4, 1fr);
gap: 14px;
}

.gallery-item {
border-radius: var(--radius);
overflow: hidden;
height: 320px;
position: relative;
border: 2px solid transparent;
transition: 0.3s;
}

.gallery-item:nth-child(3n + 1):hover {
border-color: var(--primary);
}
.gallery-item:nth-child(3n + 2):hover {
border-color: var(--secondary);
}
.gallery-item:nth-child(3n + 3):hover {
border-color: var(--tertiary);
}

.gallery-item:nth-child(2) {
grid-column: span 2;
}

.gallery-item img {
height: 100%;
object-fit: cover;
transition: 0.5s;
filter: saturate(1.2);
}

.gallery-item:hover img {
transform: scale(1.08);
}

/* OFFERS */

.offers-grid {
display: grid;
grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
gap: 24px;
}

.offer-card {
padding: 34px;
border-radius: var(--radius);
background: var(--card);
border: 2px solid var(--card-border);
position: relative;
overflow: hidden;
}

.offer-card::before {
content: "";
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 5px;
background: linear-gradient(
  90deg,
  var(--primary),
  var(--secondary),
  var(--tertiary)
);
}

.offer-card h3 {
margin-bottom: 14px;
text-transform: uppercase;
font-weight: 900;
font-size: 22px;
}

.offer-card p {
color: var(--muted);
}

/* HOURS */

.hours-card {
max-width: 800px;
margin: auto;
background: var(--card);
border-radius: var(--radius);
border: 2px solid var(--card-border);
padding: 36px;
}

.hour {
display: flex;
justify-content: space-between;
padding: 20px 0;
border-bottom: 1px solid rgba(255, 255, 255, 0.08);
font-weight: 600;
}

.hour:last-child {
border: none;
}

/* CONTACT */

.contact-grid {
display: grid;
grid-template-columns: 420px 1fr;
gap: 28px;
}

.contact-card {
padding: 32px;
border-radius: var(--radius);
background: var(--card);
border: 2px solid var(--card-border);
border-left: 6px solid var(--primary);
}

.contact-item {
margin-bottom: 28px;
}

.contact-item h4 {
margin-bottom: 8px;
color: var(--secondary);
text-transform: uppercase;
font-size: 14px;
letter-spacing: 1px;
}

.contact-item p,
.contact-item a {
color: var(--muted);
}

iframe {
width: 100%;
min-height: 500px;
border: none;
border-radius: var(--radius);
border: 2px solid var(--card-border);
filter: grayscale(0.4) invert(0.9) contrast(0.9);
}

footer {
border-top: 2px solid var(--primary);
padding: 32px;
text-align: center;
color: var(--muted);
background: var(--bg-alt);
text-transform: uppercase;
font-size: 13px;
letter-spacing: 1px;
}

@media (max-width: 950px) {
.gallery-grid {
  grid-template-columns: repeat(2, 1fr);
}

.gallery-item:nth-child(2) {
  grid-column: span 1;
}

.contact-grid {
  grid-template-columns: 1fr;
}

.nav-links,
.nav-btn {
  display: none;
}

.menu-btn {
  display: block;
}

.navbar.active .nav-links {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 70px;
  left: 0;
  width: 100%;
  padding: 24px;
  background: var(--bg);
  border-bottom: 2px solid var(--primary);
}
}

@media (max-width: 650px) {
section {
  padding: 70px 18px;
}

.gallery-grid {
  grid-template-columns: 1fr;
}

.intro-card {
  padding: 36px 24px;
}

.hero-actions {
  flex-direction: column;
}

.btn-primary,
.btn-secondary {
  text-align: center;
}
}

`
export const style5 = `
* {
margin: 0;
padding: 0;
box-sizing: border-box;
font-family: "Inter", system-ui, sans-serif;
}

:root {
--bg: #fff9f0;
--bg-alt: #fff2e0;
--card: #ffffff;
--card-border: #1a1a1a;
--text: #1a1a1a;
--muted: #5c5650;
--primary: #ff5a3c;
--secondary: #7c5cff;
--tertiary: #00c896;
--pop: #ffd23f;
--shadow: 6px 6px 0 var(--card-border);
--radius: 18px;
--container: 1280px;
}

html {
scroll-behavior: smooth;
}

body {
background: var(--bg);
color: var(--text);
}

a {
text-decoration: none;
color: inherit;
}

img {
display: block;
width: 100%;
}

section {
padding: 100px 24px;
position: relative;
}

.container {
max-width: var(--container);
margin: auto;
}

.section-header {
margin-bottom: 56px;
text-align: left;
max-width: 640px;
position: relative;
}

.section-header span {
display: inline-block;
background: var(--pop);
color: var(--text);
border: 2.5px solid var(--card-border);
padding: 5px 14px;
border-radius: 999px;
text-transform: uppercase;
letter-spacing: 1px;
font-size: 12px;
font-weight: 800;
transform: rotate(-2deg);
}

.section-header h2 {
font-size: clamp(34px, 5.5vw, 58px);
margin-top: 18px;
font-weight: 900;
line-height: 1.02;
color: var(--text);
}

.section-header p {
color: var(--muted);
margin-top: 18px;
line-height: 1.7;
font-size: 17px;
}

.section-header.center {
text-align: center;
margin-left: auto;
margin-right: auto;
}

/* NAVBAR */

.navbar {
position: fixed;
top: 16px;
left: 50%;
transform: translateX(-50%);
width: min(1200px, calc(100% - 24px));
z-index: 1000;

background: var(--card);
border: 2.5px solid var(--card-border);
box-shadow: var(--shadow);

border-radius: 999px;
padding: 14px 26px;

display: flex;
align-items: center;
justify-content: space-between;
}

.logo {
display: flex;
align-items: center;
gap: 10px;
font-size: 20px;
font-weight: 900;
}

.logo-image {
width: 42px;
aspect-ratio: 1;
object-fit: cover;
border-radius: 50%;
border: 2.5px solid var(--card-border);
}

.nav-links {
display: flex;
gap: 26px;
list-style: none;
}

.nav-links a {
color: var(--text);
font-weight: 700;
transition: 0.2s;
}

.nav-links a:hover {
color: var(--primary);
}

.nav-btn {
background: var(--secondary);
color: #fff;
padding: 11px 22px;
border-radius: 999px;
font-weight: 800;
border: 2.5px solid var(--card-border);
box-shadow: 3px 3px 0 var(--card-border);
transition: 0.15s;
}

.nav-btn:hover {
transform: translate(2px, 2px);
box-shadow: 1px 1px 0 var(--card-border);
}

.menu-btn {
display: none;
font-size: 28px;
cursor: pointer;
}

/* HERO */

.hero {
min-height: 100vh;
position: relative;
display: grid;
grid-template-columns: 1fr 0.85fr;
align-items: center;
gap: 50px;
padding-top: 130px;
overflow: hidden;
}

.hero-bg {
position: relative;
height: 100%;
min-height: 460px;
background-size: cover;
background-position: center;
border-radius: var(--radius);
border: 3px solid var(--card-border);
box-shadow: 10px 10px 0 var(--primary);
transform: rotate(2deg);
}

.hero-overlay {
position: absolute;
inset: 0;
border-radius: var(--radius);
background: linear-gradient(
  180deg,
  rgba(0, 0, 0, 0) 55%,
  rgba(0, 0, 0, 0.35)
);
}

.hero-content {
position: relative;
z-index: 2;
max-width: 560px;
}

.hero-subtitle {
display: inline-block;
background: var(--tertiary);
border: 2.5px solid var(--card-border);
color: var(--text);
padding: 6px 16px;
border-radius: 999px;
letter-spacing: 1px;
text-transform: uppercase;
font-weight: 800;
font-size: 13px;
transform: rotate(-1.5deg);
}

.hero h1 {
font-size: clamp(46px, 6.5vw, 84px);
line-height: 1;
margin: 22px 0;
font-weight: 900;
color: var(--text);
}

.hero h1 span {
color: var(--primary);
text-decoration: underline;
text-decoration-color: var(--pop);
text-decoration-thickness: 8px;
text-underline-offset: 4px;
}

.hero p {
color: var(--muted);
font-size: 18px;
line-height: 1.8;
}

.hero-actions {
margin-top: 40px;
display: flex;
gap: 18px;
flex-wrap: wrap;
}

.btn-primary,
.btn-secondary {
padding: 16px 30px;
border-radius: 999px;
font-weight: 800;
border: 2.5px solid var(--card-border);
transition: 0.15s;
}

.btn-primary {
background: var(--primary);
color: #fff;
box-shadow: 4px 4px 0 var(--card-border);
}

.btn-primary:hover {
transform: translate(2px, 2px);
box-shadow: 2px 2px 0 var(--card-border);
}

.btn-secondary {
background: var(--card);
color: var(--text);
box-shadow: 4px 4px 0 var(--secondary);
}

.btn-secondary:hover {
transform: translate(2px, 2px);
box-shadow: 2px 2px 0 var(--secondary);
}

/* INTRO */

.intro-card {
padding: 60px;
border-radius: var(--radius);
background: var(--card);
border: 3px solid var(--card-border);
box-shadow: var(--shadow);
text-align: center;
}

.intro-card p {
color: var(--muted);
font-size: 18px;
line-height: 1.8;
}

/* SERVICES */

.services-grid {
display: grid;
grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
gap: 30px;
}

.service-card {
background: var(--card);
border: 3px solid var(--card-border);
border-radius: var(--radius);
overflow: hidden;
box-shadow: var(--shadow);
transition: 0.2s;
}

.service-card:nth-child(3n + 1) .service-top {
background: var(--primary);
color: #fff;
}
.service-card:nth-child(3n + 2) .service-top {
background: var(--secondary);
color: #fff;
}
.service-card:nth-child(3n + 3) .service-top {
background: var(--tertiary);
color: #fff;
}

.service-card:hover {
transform: translate(-3px, -3px);
box-shadow: 9px 9px 0 var(--card-border);
}

.service-top {
padding: 26px;
border-bottom: 3px solid var(--card-border);
display: flex;
justify-content: space-between;
font-weight: 800;
}

.service-item {
padding: 18px 26px;
display: flex;
justify-content: space-between;
border-bottom: 2px solid #f0e8dc;
}

.service-item:last-child {
border: none;
}

.service-item span {
color: var(--primary);
font-weight: 800;
}

/* GALLERY */

.gallery-grid {
display: grid;
grid-template-columns: repeat(4, 1fr);
gap: 18px;
}

.gallery-item {
border-radius: var(--radius);
overflow: hidden;
height: 320px;
border: 3px solid var(--card-border);
}

.gallery-item:nth-child(odd) {
transform: rotate(-1.2deg);
}
.gallery-item:nth-child(even) {
transform: rotate(1.2deg);
}

.gallery-item:nth-child(2) {
grid-column: span 2;
}

.gallery-item img {
height: 100%;
object-fit: cover;
transition: 0.4s;
}

.gallery-item:hover img {
transform: scale(1.08);
}

/* OFFERS */

.offers-grid {
display: grid;
grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
gap: 26px;
}

.offer-card {
padding: 30px;
border-radius: var(--radius);
background: var(--pop);
border: 3px solid var(--card-border);
box-shadow: var(--shadow);
}

.offer-card:nth-child(3n + 2) {
background: var(--tertiary);
color: #fff;
}
.offer-card:nth-child(3n + 3) {
background: var(--secondary);
color: #fff;
}

.offer-card h3 {
margin-bottom: 14px;
font-weight: 900;
font-size: 22px;
}

.offer-card p {
opacity: 0.85;
}

/* HOURS */

.hours-card {
max-width: 800px;
margin: auto;
background: var(--card);
border-radius: var(--radius);
border: 3px solid var(--card-border);
box-shadow: var(--shadow);
padding: 32px;
}

.hour {
display: flex;
justify-content: space-between;
padding: 18px 0;
border-bottom: 2px solid #f0e8dc;
font-weight: 700;
}

.hour:last-child {
border: none;
}

/* CONTACT */

.contact-grid {
display: grid;
grid-template-columns: 420px 1fr;
gap: 28px;
}

.contact-card {
padding: 30px;
border-radius: var(--radius);
background: var(--secondary);
color: #fff;
border: 3px solid var(--card-border);
box-shadow: var(--shadow);
}

.contact-item {
margin-bottom: 28px;
}

.contact-item h4 {
margin-bottom: 8px;
color: var(--pop);
text-transform: uppercase;
font-size: 14px;
letter-spacing: 1px;
}

.contact-item p,
.contact-item a {
color: rgba(255, 255, 255, 0.9);
}

iframe {
width: 100%;
min-height: 500px;
border: 3px solid var(--card-border);
border-radius: var(--radius);
box-shadow: var(--shadow);
}

footer {
border-top: 3px solid var(--card-border);
padding: 30px;
text-align: center;
color: var(--muted);
background: var(--bg-alt);
font-weight: 600;
}

@media (max-width: 950px) {
.hero {
  grid-template-columns: 1fr;
}

.hero-bg {
  min-height: 340px;
  transform: none;
}

.gallery-grid {
  grid-template-columns: repeat(2, 1fr);
}

.gallery-item {
  transform: none !important;
}

.gallery-item:nth-child(2) {
  grid-column: span 1;
}

.contact-grid {
  grid-template-columns: 1fr;
}

.nav-links,
.nav-btn {
  display: none;
}

.menu-btn {
  display: block;
}

.navbar.active .nav-links {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 80px;
  left: 0;
  width: 100%;
  padding: 24px;
  border-radius: 24px;
  background: var(--card);
  border: 2.5px solid var(--card-border);
}
}

@media (max-width: 650px) {
section {
  padding: 70px 18px;
}

.gallery-grid {
  grid-template-columns: 1fr;
}

.intro-card {
  padding: 36px 24px;
}

.hero-actions {
  flex-direction: column;
}

.btn-primary,
.btn-secondary {
  text-align: center;
}
}

`
export const style6 = `
* {
margin: 0;
padding: 0;
box-sizing: border-box;
font-family: "Cormorant Garamond", "Georgia", serif;
}

:root {
--bg: #faf7f2;
--bg-alt: #f3ede3;
--card: #ffffff;
--card-border: #d8cdb8;
--text: #2b2620;
--muted: #756c60;
--primary: #a67c52;
--secondary: #5c6b57;
--tertiary: #8a7159;
--pop: #c9a86a;
--shadow: 0 12px 30px rgba(43, 38, 32, 0.08);
--radius: 4px;
--container: 1280px;
}

html {
scroll-behavior: smooth;
}

body {
background: var(--bg);
color: var(--text);
}

a {
text-decoration: none;
color: inherit;
}

img {
display: block;
width: 100%;
}

section {
padding: 110px 24px;
position: relative;
}

.container {
max-width: var(--container);
margin: auto;
}

.section-header {
margin-bottom: 60px;
text-align: left;
max-width: 640px;
position: relative;
}

.section-header span {
display: inline-block;
background: transparent;
color: var(--primary);
border: 1px solid var(--primary);
padding: 6px 18px;
border-radius: 999px;
text-transform: uppercase;
letter-spacing: 3px;
font-size: 11px;
font-weight: 600;
font-family: "Inter", system-ui, sans-serif;
}

.section-header h2 {
font-size: clamp(32px, 5vw, 52px);
margin-top: 20px;
font-weight: 500;
line-height: 1.15;
color: var(--text);
letter-spacing: 0.3px;
}

.section-header p {
color: var(--muted);
margin-top: 18px;
line-height: 1.8;
font-size: 18px;
}

.section-header.center {
text-align: center;
margin-left: auto;
margin-right: auto;
}

/* NAVBAR */

.navbar {
position: fixed;
top: 0;
left: 50%;
transform: translateX(-50%);
width: 100%;
z-index: 1000;

background: rgba(250, 247, 242, 0.9);
backdrop-filter: blur(10px);
border: none;
border-bottom: 1px solid var(--card-border);
box-shadow: none;

border-radius: 0;
padding: 22px 48px;

display: flex;
align-items: center;
justify-content: space-between;
}

.logo {
display: flex;
align-items: center;
gap: 12px;
font-size: 22px;
font-weight: 600;
letter-spacing: 0.5px;
}

.logo-image {
width: 40px;
aspect-ratio: 1;
object-fit: cover;
border-radius: 50%;
border: 1px solid var(--card-border);
}

.nav-links {
display: flex;
gap: 40px;
list-style: none;
font-family: "Inter", system-ui, sans-serif;
}

.nav-links a {
color: var(--text);
font-weight: 500;
font-size: 14px;
letter-spacing: 0.5px;
transition: 0.25s;
padding-bottom: 4px;
border-bottom: 1px solid transparent;
}

.nav-links a:hover {
color: var(--primary);
border-bottom: 1px solid var(--primary);
}

.nav-btn {
background: transparent;
color: var(--text);
padding: 11px 26px;
border-radius: 999px;
font-weight: 600;
font-size: 13px;
letter-spacing: 0.5px;
font-family: "Inter", system-ui, sans-serif;
border: 1px solid var(--text);
box-shadow: none;
transition: 0.25s;
}

.nav-btn:hover {
background: var(--text);
color: var(--bg);
transform: none;
box-shadow: none;
}

.menu-btn {
display: none;
font-size: 26px;
cursor: pointer;
}

/* HERO */

.hero {
min-height: 100vh;
position: relative;
display: grid;
grid-template-columns: 1fr 0.85fr;
align-items: center;
gap: 60px;
padding-top: 140px;
overflow: hidden;
}

.hero-bg {
position: relative;
height: 100%;
min-height: 460px;
background-size: cover;
background-position: center;
border-radius: var(--radius);
border: 1px solid var(--card-border);
box-shadow: var(--shadow);
transform: none;
}

.hero-overlay {
position: absolute;
inset: 0;
border-radius: var(--radius);
background: linear-gradient(
  180deg,
  rgba(43, 38, 32, 0) 55%,
  rgba(43, 38, 32, 0.25)
);
}

.hero-content {
position: relative;
z-index: 2;
max-width: 560px;
}

.hero-subtitle {
display: inline-block;
background: transparent;
border: 1px solid var(--primary);
color: var(--primary);
padding: 7px 18px;
border-radius: 999px;
letter-spacing: 3px;
text-transform: uppercase;
font-weight: 600;
font-size: 12px;
font-family: "Inter", system-ui, sans-serif;
transform: none;
}

.hero h1 {
font-size: clamp(44px, 6vw, 78px);
line-height: 1.08;
margin: 26px 0;
font-weight: 500;
color: var(--text);
letter-spacing: 0.2px;
}

.hero h1 span {
color: var(--primary);
text-decoration: none;
font-style: italic;
}

.hero p {
color: var(--muted);
font-size: 19px;
line-height: 1.85;
}

.hero-actions {
margin-top: 44px;
display: flex;
gap: 20px;
flex-wrap: wrap;
font-family: "Inter", system-ui, sans-serif;
}

.btn-primary,
.btn-secondary {
padding: 16px 34px;
border-radius: 999px;
font-weight: 600;
font-size: 14px;
letter-spacing: 0.5px;
border: 1px solid var(--text);
transition: 0.25s;
}

.btn-primary {
background: var(--text);
color: var(--bg);
box-shadow: none;
}

.btn-primary:hover {
background: var(--primary);
border-color: var(--primary);
transform: translateY(-2px);
box-shadow: 0 8px 20px rgba(166, 124, 82, 0.3);
}

.btn-secondary {
background: transparent;
color: var(--text);
box-shadow: none;
}

.btn-secondary:hover {
background: var(--text);
color: var(--bg);
transform: translateY(-2px);
}

/* INTRO */

.intro-card {
padding: 64px;
border-radius: var(--radius);
background: var(--card);
border: 1px solid var(--card-border);
box-shadow: var(--shadow);
text-align: center;
}

.intro-card p {
color: var(--muted);
font-size: 19px;
line-height: 1.85;
}

/* SERVICES */

.services-grid {
display: grid;
grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
gap: 32px;
}

.service-card {
background: var(--card);
border: 1px solid var(--card-border);
border-radius: var(--radius);
overflow: hidden;
box-shadow: var(--shadow);
transition: 0.3s;
}

.service-card:nth-child(3n + 1) .service-top {
background: var(--bg-alt);
color: var(--text);
}
.service-card:nth-child(3n + 2) .service-top {
background: var(--bg-alt);
color: var(--text);
}
.service-card:nth-child(3n + 3) .service-top {
background: var(--bg-alt);
color: var(--text);
}

.service-card:hover {
transform: translateY(-4px);
box-shadow: 0 18px 36px rgba(43, 38, 32, 0.1);
}

.service-top {
padding: 26px 28px;
border-bottom: 1px solid var(--card-border);
display: flex;
justify-content: space-between;
font-weight: 600;
font-size: 20px;
letter-spacing: 0.2px;
}

.service-item {
padding: 20px 28px;
display: flex;
justify-content: space-between;
border-bottom: 1px solid var(--bg-alt);
font-size: 16px;
}

.service-item:last-child {
border: none;
}

.service-item span {
color: var(--primary);
font-weight: 600;
font-family: "Inter", system-ui, sans-serif;
}

/* GALLERY (dynamic content — structural rules only) */

.gallery-grid {
display: grid;
grid-template-columns: repeat(4, 1fr);
gap: 20px;
}

.gallery-item {
border-radius: var(--radius);
overflow: hidden;
height: 320px;
border: 1px solid var(--card-border);
transform: none;
box-shadow: var(--shadow);
}

.gallery-item img {
height: 100%;
object-fit: cover;
transition: 0.5s;
filter: saturate(0.92);
}

.gallery-item:hover img {
transform: scale(1.06);
filter: saturate(1);
}

/* OFFERS */

.offers-grid {
display: grid;
grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
gap: 28px;
}

.offer-card {
padding: 32px;
border-radius: var(--radius);
background: var(--card);
border: 1px solid var(--card-border);
box-shadow: var(--shadow);
color: var(--text);
}

.offer-card:nth-child(3n + 2) {
background: var(--card);
color: var(--text);
}
.offer-card:nth-child(3n + 3) {
background: var(--card);
color: var(--text);
}

.offer-card h3 {
margin-bottom: 16px;
font-weight: 600;
font-size: 22px;
color: var(--primary);
}

.offer-card p {
opacity: 0.85;
line-height: 1.7;
}

/* HOURS */

.hours-card {
max-width: 800px;
margin: auto;
background: var(--card);
border-radius: var(--radius);
border: 1px solid var(--card-border);
box-shadow: var(--shadow);
padding: 36px;
}

.hour {
display: flex;
justify-content: space-between;
padding: 20px 0;
border-bottom: 1px solid var(--bg-alt);
font-weight: 500;
font-size: 17px;
}

.hour:last-child {
border: none;
}

/* CONTACT */

.contact-grid {
display: grid;
grid-template-columns: 420px 1fr;
gap: 28px;
}

.contact-card {
padding: 32px;
border-radius: var(--radius);
background: var(--text);
color: var(--bg);
border: 1px solid var(--card-border);
box-shadow: var(--shadow);
}

.contact-item {
margin-bottom: 30px;
}

.contact-item h4 {
margin-bottom: 10px;
color: var(--pop);
text-transform: uppercase;
font-size: 13px;
letter-spacing: 2px;
font-family: "Inter", system-ui, sans-serif;
font-weight: 600;
}

.contact-item p,
.contact-item a {
color: rgba(250, 247, 242, 0.85);
font-size: 17px;
}

iframe {
width: 100%;
min-height: 500px;
border: 1px solid var(--card-border);
border-radius: var(--radius);
box-shadow: var(--shadow);
filter: grayscale(0.3) contrast(0.95);
}

footer {
border-top: 1px solid var(--card-border);
padding: 34px;
text-align: center;
color: var(--muted);
background: var(--bg-alt);
font-weight: 500;
font-size: 15px;
}

@media (max-width: 950px) {
.hero {
  grid-template-columns: 1fr;
}

.hero-bg {
  min-height: 340px;
  transform: none;
}

.gallery-grid {
  grid-template-columns: repeat(2, 1fr);
}

.contact-grid {
  grid-template-columns: 1fr;
}

.nav-links,
.nav-btn {
  display: none;
}

.menu-btn {
  display: block;
}

.navbar.active .nav-links {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 80px;
  left: 0;
  width: 100%;
  padding: 28px;
  border-radius: 0;
  background: var(--card);
  border-bottom: 1px solid var(--card-border);
}
}

@media (max-width: 650px) {
section {
  padding: 70px 18px;
}

.gallery-grid {
  grid-template-columns: 1fr;
}

.intro-card {
  padding: 40px 26px;
}

.hero-actions {
  flex-direction: column;
}

.btn-primary,
.btn-secondary {
  text-align: center;
}
}
`
export const style7 = `
* {
margin: 0;
padding: 0;
box-sizing: border-box;
font-family: "Cormorant Garamond", "Georgia", serif;
}

:root {
--bg: #12100e;
--bg-alt: #1a1714;
--card: #1e1a16;
--card-border: #3a332a;
--text: #f2ede4;
--muted: #a89e8f;
--primary: #c9a86a;
--secondary: #8a9b83;
--tertiary: #b08968;
--pop: #d8b878;
--shadow: 0 16px 40px rgba(0, 0, 0, 0.45);
--radius: 4px;
--container: 1280px;
}

html {
scroll-behavior: smooth;
}

body {
background: var(--bg);
color: var(--text);
}

a {
text-decoration: none;
color: inherit;
}

img {
display: block;
width: 100%;
}

section {
padding: 110px 24px;
position: relative;
}

.container {
max-width: var(--container);
margin: auto;
}

.section-header {
margin-bottom: 60px;
text-align: left;
max-width: 640px;
position: relative;
}

.section-header span {
display: inline-block;
background: transparent;
color: var(--primary);
border: 1px solid var(--primary);
padding: 6px 18px;
border-radius: 999px;
text-transform: uppercase;
letter-spacing: 3px;
font-size: 11px;
font-weight: 600;
font-family: "Inter", system-ui, sans-serif;
}

.section-header h2 {
font-size: clamp(32px, 5vw, 52px);
margin-top: 20px;
font-weight: 500;
line-height: 1.15;
color: var(--text);
letter-spacing: 0.3px;
}

.section-header p {
color: var(--muted);
margin-top: 18px;
line-height: 1.8;
font-size: 18px;
}

.section-header.center {
text-align: center;
margin-left: auto;
margin-right: auto;
}

/* NAVBAR */

.navbar {
position: fixed;
top: 0;
left: 50%;
transform: translateX(-50%);
width: 100%;
z-index: 1000;

background: rgba(18, 16, 14, 0.85);
backdrop-filter: blur(10px);
border: none;
border-bottom: 1px solid var(--card-border);
box-shadow: none;

border-radius: 0;
padding: 22px 48px;

display: flex;
align-items: center;
justify-content: space-between;
}

.logo {
display: flex;
align-items: center;
gap: 12px;
font-size: 22px;
font-weight: 600;
letter-spacing: 0.5px;
color: var(--text);
}

.logo-image {
width: 40px;
aspect-ratio: 1;
object-fit: cover;
border-radius: 50%;
border: 1px solid var(--card-border);
}

.nav-links {
display: flex;
gap: 40px;
list-style: none;
font-family: "Inter", system-ui, sans-serif;
}

.nav-links a {
color: var(--muted);
font-weight: 500;
font-size: 14px;
letter-spacing: 0.5px;
transition: 0.25s;
padding-bottom: 4px;
border-bottom: 1px solid transparent;
}

.nav-links a:hover {
color: var(--primary);
border-bottom: 1px solid var(--primary);
}

.nav-btn {
background: transparent;
color: var(--text);
padding: 11px 26px;
border-radius: 999px;
font-weight: 600;
font-size: 13px;
letter-spacing: 0.5px;
font-family: "Inter", system-ui, sans-serif;
border: 1px solid var(--text);
box-shadow: none;
transition: 0.25s;
}

.nav-btn:hover {
background: var(--primary);
border-color: var(--primary);
color: var(--bg);
transform: none;
box-shadow: none;
}

.menu-btn {
display: none;
font-size: 26px;
cursor: pointer;
color: var(--text);
}

/* HERO */

.hero {
min-height: 100vh;
position: relative;
display: grid;
grid-template-columns: 1fr 0.85fr;
align-items: center;
gap: 60px;
padding-top: 140px;
overflow: hidden;
}

.hero-bg {
position: absolute;
inset: 0;
background-size: cover;
background-position: center;
transform: scale(1.1);
}

.hero-overlay {
position: absolute;
inset: 0;
background: linear-gradient(
  to right,
  rgba(0, 0, 0, 0.85),
  rgba(0, 0, 0, 0.3)
);
}

.hero-content {
position: relative;
z-index: 2;
max-width: 560px;
}

.hero-subtitle {
display: inline-block;
background: transparent;
border: 1px solid var(--primary);
color: var(--primary);
padding: 7px 18px;
border-radius: 999px;
letter-spacing: 3px;
text-transform: uppercase;
font-weight: 600;
font-size: 12px;
font-family: "Inter", system-ui, sans-serif;
transform: none;
}

.hero h1 {
font-size: clamp(44px, 6vw, 78px);
line-height: 1.08;
margin: 26px 0;
font-weight: 500;
color: var(--text);
letter-spacing: 0.2px;
}

.hero h1 span {
color: var(--primary);
text-decoration: none;
font-style: italic;
}

.hero p {
color: var(--muted);
font-size: 19px;
line-height: 1.85;
}

.hero-actions {
margin-top: 44px;
display: flex;
gap: 20px;
flex-wrap: wrap;
font-family: "Inter", system-ui, sans-serif;
}

.btn-primary,
.btn-secondary {
padding: 16px 34px;
border-radius: 999px;
font-weight: 600;
font-size: 14px;
letter-spacing: 0.5px;
border: 1px solid var(--text);
transition: 0.25s;
}

.btn-primary {
background: var(--primary);
color: var(--bg);
border-color: var(--primary);
box-shadow: none;
}

.btn-primary:hover {
background: transparent;
color: var(--primary);
transform: translateY(-2px);
box-shadow: 0 8px 20px rgba(201, 168, 106, 0.25);
}

.btn-secondary {
background: transparent;
color: var(--text);
box-shadow: none;
}

.btn-secondary:hover {
background: var(--text);
color: var(--bg);
transform: translateY(-2px);
}

/* INTRO */

.intro-card {
padding: 64px;
border-radius: var(--radius);
background: var(--card);
border: 1px solid var(--card-border);
box-shadow: var(--shadow);
text-align: center;
}

.intro-card p {
color: var(--muted);
font-size: 19px;
line-height: 1.85;
}

/* SERVICES */

.services-grid {
display: grid;
grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
gap: 32px;
}

.service-card {
background: var(--card);
border: 1px solid var(--card-border);
border-radius: var(--radius);
overflow: hidden;
box-shadow: var(--shadow);
transition: 0.3s;
}

.service-card:nth-child(3n + 1) .service-top,
.service-card:nth-child(3n + 2) .service-top,
.service-card:nth-child(3n + 3) .service-top {
background: var(--bg-alt);
color: var(--text);
}

.service-card:hover {
transform: translateY(-4px);
border-color: var(--primary);
box-shadow: 0 18px 36px rgba(0, 0, 0, 0.55);
}

.service-top {
padding: 26px 28px;
border-bottom: 1px solid var(--card-border);
display: flex;
justify-content: space-between;
font-weight: 600;
font-size: 20px;
letter-spacing: 0.2px;
}

.service-item {
padding: 20px 28px;
display: flex;
justify-content: space-between;
border-bottom: 1px solid var(--bg-alt);
font-size: 16px;
color: var(--muted);
}

.service-item:last-child {
border: none;
}

.service-item span {
color: var(--primary);
font-weight: 600;
font-family: "Inter", system-ui, sans-serif;
}

/* GALLERY (dynamic content — structural rules only) */

.gallery-grid {
display: grid;
grid-template-columns: repeat(4, 1fr);
gap: 20px;
}

.gallery-item {
border-radius: var(--radius);
overflow: hidden;
height: 320px;
border: 1px solid var(--card-border);
transform: none;
box-shadow: var(--shadow);
}

.gallery-item img {
height: 100%;
object-fit: cover;
transition: 0.5s;
filter: brightness(0.9) saturate(0.95);
}

.gallery-item:hover img {
transform: scale(1.06);
filter: brightness(1) saturate(1);
}

/* OFFERS */

.offers-grid {
display: grid;
grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
gap: 28px;
}

.offer-card {
padding: 32px;
border-radius: var(--radius);
background: var(--card);
border: 1px solid var(--card-border);
box-shadow: var(--shadow);
color: var(--text);
}

.offer-card h3 {
margin-bottom: 16px;
font-weight: 600;
font-size: 22px;
color: var(--primary);
}

.offer-card p {
opacity: 0.75;
line-height: 1.7;
color: var(--muted);
}

/* HOURS */

.hours-card {
max-width: 800px;
margin: auto;
background: var(--card);
border-radius: var(--radius);
border: 1px solid var(--card-border);
box-shadow: var(--shadow);
padding: 36px;
}

.hour {
display: flex;
justify-content: space-between;
padding: 20px 0;
border-bottom: 1px solid var(--bg-alt);
font-weight: 500;
font-size: 17px;
color: var(--muted);
}

.hour:last-child {
border: none;
}

/* CONTACT */

.contact-grid {
display: grid;
grid-template-columns: 420px 1fr;
gap: 28px;
}

.contact-card {
padding: 32px;
border-radius: var(--radius);
background: var(--bg-alt);
color: var(--text);
border: 1px solid var(--card-border);
box-shadow: var(--shadow);
}

.contact-item {
margin-bottom: 30px;
}

.contact-item h4 {
margin-bottom: 10px;
color: var(--pop);
text-transform: uppercase;
font-size: 13px;
letter-spacing: 2px;
font-family: "Inter", system-ui, sans-serif;
font-weight: 600;
}

.contact-item p,
.contact-item a {
color: var(--muted);
font-size: 17px;
}

iframe {
width: 100%;
min-height: 500px;
border: 1px solid var(--card-border);
border-radius: var(--radius);
box-shadow: var(--shadow);
filter: invert(0.92) contrast(0.9) grayscale(0.2);
}

footer {
border-top: 1px solid var(--card-border);
padding: 34px;
text-align: center;
color: var(--muted);
background: var(--bg-alt);
font-weight: 500;
font-size: 15px;
}

@media (max-width: 950px) {
.hero {
  grid-template-columns: 1fr;
}

.hero-bg {
  position: relative;
  top: auto;
  right: auto;
  bottom: auto;
  width: 100%;
  min-height: 340px;
}

.gallery-grid {
  grid-template-columns: repeat(2, 1fr);
}

.contact-grid {
  grid-template-columns: 1fr;
}

.nav-links,
.nav-btn {
  display: none;
}

.menu-btn {
  display: block;
}

.navbar.active .nav-links {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 80px;
  left: 0;
  width: 100%;
  padding: 28px;
  border-radius: 0;
  background: var(--card);
  border-bottom: 1px solid var(--card-border);
}
}

@media (max-width: 650px) {
section {
  padding: 70px 18px;
}

.gallery-grid {
  grid-template-columns: 1fr;
}

.intro-card {
  padding: 40px 26px;
}

.hero-actions {
  flex-direction: column;
}

.btn-primary,
.btn-secondary {
  text-align: center;
}
}
`

export const style8 = `
* {
margin: 0;
padding: 0;
box-sizing: border-box;
font-family: 'Inter', system-ui, sans-serif;
}

:root {
--bg: #faf7f2;
--surface: #ffffff;
--card: rgba(255, 255, 255, 0.75);
--card-border: rgba(17, 17, 17, 0.08);
--text: #201c18;
--muted: #6f6a63;
--primary: #b3855a;
--primary-light: #e8d3b8;
--shadow: 0 15px 40px rgba(30, 25, 15, 0.08);
--radius: 22px;
--container: 1280px;
}

html {
scroll-behavior: smooth;
}

body {
background: var(--bg);
color: var(--text);
}

a {
text-decoration: none;
color: inherit;
}

img {
display: block;
width: 100%;
}

section {
padding: 90px 24px;
}

.container {
max-width: var(--container);
margin: auto;
}

.section-header {
margin-bottom: 48px;
text-align: center;
}

.section-header span {
color: var(--primary);
text-transform: uppercase;
letter-spacing: 2px;
font-size: 12px;
font-weight: 600;
}

.section-header h2 {
font-size: clamp(32px, 5vw, 52px);
margin-top: 12px;
font-weight: 600;
letter-spacing: -0.5px;
}

.section-header p {
color: var(--muted);
max-width: 650px;
margin: 16px auto 0;
}

/* NAVBAR */

.navbar {
position: fixed;
top: 18px;
left: 50%;
transform: translateX(-50%);
width: min(1200px, calc(100% - 24px));
z-index: 1000;

backdrop-filter: blur(20px);
background: rgba(255, 255, 255, 0.75);

border: 1px solid rgba(17, 17, 17, 0.06);
box-shadow: 0 8px 30px rgba(30, 25, 15, 0.06);

border-radius: 999px;
padding: 14px 24px;

display: flex;
align-items: center;
justify-content: space-between;
}

.logo {
display: flex;
align-items: center;
font-size: 20px;
font-weight: 700;
color: var(--text);
}

.logo-image {
width: 42px;
aspect-ratio: 1;
object-fit: cover;
border-radius: 50%;
border: 2px solid rgba(17, 17, 17, 0.08);
box-shadow: 0 4px 12px rgba(30, 25, 15, 0.12);
}

.nav-links {
display: flex;
gap: 24px;
list-style: none;
}

.nav-links a {
color: var(--muted);
font-weight: 500;
transition: 0.25s;
}

.nav-links a:hover {
color: var(--primary);
}

.nav-btn {
background: linear-gradient(135deg, var(--primary), var(--primary-light));
color: #201c18;
padding: 12px 20px;
border-radius: 999px;
font-weight: 600;
}

.menu-btn {
display: none;
font-size: 28px;
cursor: pointer;
color: var(--text);
}

/* HERO */

.hero {
min-height: 100vh;
position: relative;
display: flex;
align-items: center;
overflow: hidden;
background: var(--surface);
}

.hero-bg {
position: absolute;
inset: 0;
background-size: cover;
background-position: center;
transform: scale(1.1);
/* opacity is injected inline via {{backgroundOpacity}} */
}

.hero-overlay {
position: absolute;
inset: 0;
background: linear-gradient(
  to bottom,
  rgba(250, 247, 242, 0.2),
  rgba(250, 247, 242, 0.2)
);
}

.hero-content {
position: relative;
z-index: 2;
max-width: 700px;
}

.hero-subtitle {
color: var(--primary);
letter-spacing: 4px;
text-transform: uppercase;
font-weight: 600;
font-size: 13px;
}

.hero h1 {
font-size: clamp(52px, 8vw, 90px);
line-height: 1.05;
margin: 18px 0;
color: var(--text);
font-weight: 600;
letter-spacing: -1px;
}

.hero p {
color: var(--muted);
font-size: 18px;
line-height: 1.8;
}

.hero-actions {
margin-top: 40px;
display: flex;
gap: 16px;
flex-wrap: wrap;
}

.btn-primary,
.btn-secondary {
padding: 16px 28px;
border-radius: 999px;
font-weight: 600;
}

.btn-primary {
background: linear-gradient(135deg, var(--primary), var(--primary-light));
color: #201c18;
box-shadow: 0 10px 25px rgba(179, 133, 90, 0.35);
}

.btn-secondary {
border: 1px solid rgba(17, 17, 17, 0.15);
color: var(--text);
}

/* INTRO */

.intro-card {
padding: 60px;
border-radius: var(--radius);
background: var(--card);
border: 1px solid var(--card-border);
backdrop-filter: blur(20px);
box-shadow: var(--shadow);
text-align: center;
}

.intro-card p {
color: var(--muted);
font-size: 18px;
line-height: 1.8;
}

/* SERVICES */

.services-grid {
display: grid;
grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
gap: 28px;
}

.service-card {
background: var(--surface);
border: 1px solid var(--card-border);
border-radius: var(--radius);
overflow: hidden;
box-shadow: var(--shadow);
transition: 0.3s;
}

.service-card:hover {
transform: translateY(-8px);
}

.service-top {
padding: 26px;
border-bottom: 1px solid rgba(17, 17, 17, 0.06);
display: flex;
justify-content: space-between;
}

.service-top h3 {
font-weight: 600;
}

.service-item {
padding: 18px 26px;
display: flex;
justify-content: space-between;
border-bottom: 1px solid rgba(17, 17, 17, 0.05);
}

.service-item:last-child {
border: none;
}

.service-item span {
color: var(--muted);
}

.service-item strong {
color: var(--primary);
}

/* GALLERY */

.gallery-grid {
display: grid;
grid-template-columns: repeat(3, 1fr);
gap: 16px;
}

.gallery-item {
border-radius: var(--radius);
overflow: hidden;
height: 320px;
box-shadow: var(--shadow);
}

.gallery-item img {
height: 100%;
object-fit: cover;
transition: 0.5s;
}

.gallery-item:hover img {
transform: scale(1.08);
}

/* OFFERS */

.offers-grid {
display: grid;
grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
gap: 24px;
}

.offer-card {
padding: 30px;
border-radius: var(--radius);

background: linear-gradient(
  135deg,
  rgba(179, 133, 90, 0.12),
  rgba(255, 255, 255, 0.6)
);

border: 1px solid var(--card-border);
}

.offer-card h3 {
margin-bottom: 14px;
color: var(--text);
font-weight: 600;
}

.offer-card p {
color: var(--muted);
}

/* HOURS */

.hours-card {
max-width: 800px;
margin: auto;
background: var(--surface);
border-radius: var(--radius);
border: 1px solid var(--card-border);
box-shadow: var(--shadow);
padding: 32px;
}

.hour {
display: flex;
justify-content: space-between;
padding: 18px 0;
border-bottom: 1px solid rgba(17, 17, 17, 0.06);
}

.hour:last-child {
border: none;
}

.hour span {
color: var(--muted);
}

/* CONTACT */

.contact-grid {
display: grid;
grid-template-columns: 420px 1fr;
gap: 28px;
}

.contact-card {
padding: 30px;
border-radius: var(--radius);
background: var(--surface);
border: 1px solid var(--card-border);
box-shadow: var(--shadow);
}

.contact-item {
margin-bottom: 28px;
}

.contact-item h4 {
margin-bottom: 8px;
color: var(--primary);
font-weight: 600;
}

.contact-item p,
.contact-item a {
color: var(--muted);
}

iframe {
width: 100%;
min-height: 500px;
border: none;
border-radius: var(--radius);
box-shadow: var(--shadow);
}

footer {
border-top: 1px solid rgba(17, 17, 17, 0.08);
padding: 30px;
text-align: center;
color: var(--muted);
}

@media (max-width: 950px) {
.gallery-grid {
  grid-template-columns: repeat(2, 1fr);
}

.gallery-item:nth-child(2) {
  grid-column: span 1;
}

.contact-grid {
  grid-template-columns: 1fr;
}

.nav-links,
.nav-btn {
  display: none;
}

.menu-btn {
  display: block;
}

.navbar.active {
  border-radius: 24px;
}

.navbar.active .nav-links {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 80px;
  left: 0;
  width: 100%;
  padding: 24px;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.97);
}
}

@media (max-width: 650px) {
section {
  padding: 70px 18px;
}

.gallery-grid {
  grid-template-columns: 1fr;
}

.intro-card {
  padding: 36px 24px;
}

.hero-actions {
  flex-direction: column;
}

.btn-primary,
.btn-secondary {
  text-align: center;
}
}
`