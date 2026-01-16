import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm"

const SUPABASE_URL = "https://tiznedphmqkybivnowzq.supabase.co"
const SUPABASE_ANON_KEY = "sb_publishable_AkNyZKPVX86WGupmy3MIUQ_m9-DMdQf"

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
const logoutBtn = document.getElementById("logoutBtn")
const authButtons = document.getElementById("authButtons")
const userInfo = document.getElementById("userInfo")
const userEmail = document.getElementById("userEmail")
const nameInput = document.getElementById("authName")
const surnameInput = document.getElementById("authSurname")
const registerFields = document.getElementById("registerFields")

// Mobile Menu Toggle - GÜNCELLENMİŞ
const mobileMenuToggle = document.querySelector(".mobile-menu-toggle")
const navMenu = document.querySelector(".nav-menu")

if (mobileMenuToggle) {
  // Ortak fonksiyon: Hem dokunma hem tıklama için
  const handleMenu = (e) => {
    // Tıklamanın veya dokunmanın sayfa yenilemesini/zıplamasını engelle
    e.preventDefault();
    e.stopPropagation(); 
    
    navMenu.classList.toggle("active");
    mobileMenuToggle.classList.toggle("open"); // Buton animasyonu için
    
    console.log("Menü durumu:", navMenu.classList.contains("active"));
  };
//mobile menu toggle
  // Bilgisayar için
  mobileMenuToggle.addEventListener("click", handleMenu);
  // Telefonlar için (Daha hızlı tepki verir)
  mobileMenuToggle.addEventListener("touchend", handleMenu);
}

// Smooth scroll kısmında küçük bir düzeltme
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");
    if (targetId === "#") return; // Eğer sadece # ise bir şey yapma

    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      
      // Menüyü kapat ve hamburger ikonunu eski haline getir
      if (navMenu) navMenu.classList.remove("active");
      if (mobileMenuToggle) mobileMenuToggle.classList.remove("open");
    }
  });
});

// Slider functionality for cards
function initSliders() {
  const cards = document.querySelectorAll(".card")

  cards.forEach((card) => {
    const prevBtn = card.querySelector(".slider-btn.prev")
    const nextBtn = card.querySelector(".slider-btn.next")
    const slides = card.querySelectorAll(".slide")

    if (slides.length <= 1) {
      if (prevBtn) prevBtn.style.display = "none"
      if (nextBtn) nextBtn.style.display = "none"
      return
    }

    let currentSlide = 0

    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.classList.toggle("active", i === index)
      })
    }

    function nextSlide(e) {
      e.stopPropagation()
      currentSlide = (currentSlide + 1) % slides.length
      showSlide(currentSlide)
    }

    function prevSlide(e) {
      e.stopPropagation()
      currentSlide = (currentSlide - 1 + slides.length) % slides.length
      showSlide(currentSlide)
    }

    if (nextBtn) nextBtn.addEventListener("click", nextSlide)
    if (prevBtn) prevBtn.addEventListener("click", prevSlide)
  })
}

// Hero slider functionality
function initHeroSlider() {
  const slides = document.querySelectorAll(".hero-slide")
  const indicators = document.querySelectorAll(".hero-slider-indicators .indicator")

  if (!slides.length || !indicators.length) {
    return
  }

  let currentSlide = 0
  let autoPlayInterval

  function showSlide(index) {
    slides.forEach((slide) => slide.classList.remove("active"))
    indicators.forEach((indicator) => indicator.classList.remove("active"))

    slides[index].classList.add("active")
    indicators[index].classList.add("active")
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length
    showSlide(currentSlide)
  }

  function goToSlide(index) {
    currentSlide = index
    showSlide(currentSlide)
    resetAutoPlay()
  }

  function startAutoPlay() {
    autoPlayInterval = setInterval(nextSlide, 2000)
  }

  function stopAutoPlay() {
    if (autoPlayInterval) {
      clearInterval(autoPlayInterval)
    }
  }

  function resetAutoPlay() {
    stopAutoPlay()
    startAutoPlay()
  }

  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => goToSlide(index))
  })

  const heroImage = document.querySelector(".hero-image")
  if (heroImage) {
    heroImage.addEventListener("mouseenter", stopAutoPlay)
    heroImage.addEventListener("mouseleave", startAutoPlay)
  }

  startAutoPlay()
}

// Modal functionality
const modal = document.getElementById("modal")
const modalTitle = document.getElementById("modal-title")
const modalDesc = document.getElementById("modal-desc")
const modalMap = document.getElementById("modal-map")
const modalClose = document.querySelector(".modal-close")
const modalBackdrop = document.querySelector(".modal-backdrop")

// içerisindeki modal fonksiyonunu bu şekilde güncelle:
function openModal(title, description, mapLink, detailLink) {
  if (modalTitle) modalTitle.textContent = title;
  if (modalDesc) modalDesc.textContent = description;
  if (modalMap) {
    modalMap.href = mapLink;
    modalMap.setAttribute("target", "_blank");
    modalMap.setAttribute("rel", "noopener noreferrer");
  }

  // YENİ EKLEDİĞİMİZ KISIM: Detay Butonu
  const modalDetails = document.getElementById("modal-details");
  if (modalDetails) {
    if (detailLink) {
      modalDetails.href = detailLink;
      modalDetails.style.display = "inline-flex"; // Link varsa göster
    } else {
      modalDetails.style.display = "none"; // Link yoksa (örn: kafeler) gizle
    }
  }

  if (modal) modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  if (modal) modal.classList.remove("active")
  document.body.style.overflow = ""
}

if (modalClose) modalClose.addEventListener("click", closeModal)
if (modalBackdrop) modalBackdrop.addEventListener("click", closeModal)

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal && modal.classList.contains("active")) {
    closeModal()
  }
})

// Active nav link on scroll
function updateActiveNavLink() {
  // Buraya yeni ID'leri ekledik: #dernek-haberler ve #cards-grid
const sections = document.querySelectorAll(".city-section, .hero, #dernek-haberler, #ara-baslik-kapsayici")
  const navLinks = document.querySelectorAll(".nav-link")
  let current = ""

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    if (window.pageYOffset >= sectionTop - 200) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (current && link.getAttribute("href") === `#${current}`) {
      link.classList.add("active")
    } else if (!current && link.getAttribute("href") === "#") {
      link.classList.add("active")
    }
  })
}

// Initialize everything on page load
document.addEventListener("DOMContentLoaded", async () => {

  // 🔐 Kullanıcı oturum kontrolü (ÇOK ÖNEMLİ)
  await checkUser()

  // 🎞️ Sliderlar
  initSliders()
  initHeroSlider()

  // 🧭 Navbar aktif link
  updateActiveNavLink()

  // 🖼️ Kart slide tıklama → modal aç
  // içerisindeki DOMContentLoaded içindeki tıklama olayını güncelle:
// script.js içindeki DOMContentLoaded bölümünde:
document.querySelectorAll(".slide").forEach((slide) => {
  slide.addEventListener("click", () => {
    if (!slide.classList.contains("active")) return;

    // 'detail' verisini de çekiyoruz
    const { place, desc, map, detail } = slide.dataset; 
    openModal(place, desc, map, detail);
  });
});
  // 🗺️ Modal içindeki harita linki
  if (modalMap) {
    modalMap.addEventListener("click", (e) => {
      const href = modalMap.getAttribute("href")
      if (href && href !== "#") {
        window.open(href, "_blank", "noopener,noreferrer")
        e.preventDefault()
      }
    })
  }

})





// OTURUM KONTROL
async function checkUser() {
  const { data } = await supabase.auth.getUser()

  if (data?.user) {
    authButtons.style.display = "none"
    userInfo.style.display = "flex"

    // Metadata'dan isim çekme
    // checkUser fonksiyonunun içindeki ilgili kısmı şöyle güncelle:
const firstName = data.user.user_metadata?.first_name || "";
const lastName = data.user.user_metadata?.last_name || "";

// Baş harfleri büyüten fonksiyon
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

const fullName = firstName && lastName 
    ? `${capitalize(firstName)} ${capitalize(lastName)}` 
    : data.user.email;

document.getElementById("welcomeEmail").textContent = fullName;
    
    document.getElementById("welcomeText").style.display = "block"
  } else {
    authButtons.style.display = "flex"
    userInfo.style.display = "none"
    document.getElementById("welcomeText").style.display = "none"
  }
}






supabase.auth.onAuthStateChange(() => {
  checkUser()
})

let isLogin = true

const authModal = document.getElementById("authModal")
const authTitle = document.getElementById("authTitle")
const authSubmit = document.getElementById("authSubmit")
const authSwitch = document.getElementById("authSwitch")
const emailInput = document.getElementById("authEmail")
const passInput = document.getElementById("authPassword")

document.getElementById("openLogin").onclick = () => openAuth(true)
document.getElementById("openRegister").onclick = () => openAuth(false)
document.getElementById("closeAuth").onclick = closeAuth
document.querySelector(".auth-backdrop").onclick = closeAuth

function openAuth(login) {
  isLogin = login
  authTitle.textContent = login ? "Giriş Yap" : "Kayıt Ol"
  authSubmit.textContent = login ? "Giriş Yap" : "Kayıt Ol"
  authSwitch.innerHTML = login
    ? `Hesabın yok mu? <span>Kayıt Ol</span>`
    : `Zaten hesabın var mı? <span>Giriş Yap</span>`
    
  // YENİ: Kayıt alanlarını göster/gizle
  if (registerFields) {
    registerFields.style.display = login ? "none" : "flex"
  }
  
  authModal.classList.add("active")
}
const toast = document.getElementById("toast")

function showToast(message, type = "success") {
  toast.textContent = message

  toast.classList.remove("success", "error", "warning")
  toast.classList.add("show", type)

  setTimeout(() => {
    toast.classList.remove("show", type)
  }, 2500)
}


authSwitch.onclick = () => openAuth(!isLogin)

authSubmit.onclick = async () => {
    const email = emailInput.value.trim();
    const password = passInput.value.trim();

    // 1. Temel Kontrol
    if (!email || !password) {
        showToast("Email ve şifre giriniz", "error");
        return;
    }

    if (isLogin) {
        // --- GİRİŞ YAPMA MANTIĞI ---
        const { error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            if (error.message.includes("Email not confirmed")) {
                showToast("📩 Lütfen email adresini doğrula", "error");
            } else {
                showToast(error.message, "error");
            }
            return;
        }

        showToast("Giriş başarılı 🎉");
        closeAuth();
        await checkUser();

    } else {
        // --- KAYIT OLMA MANTIĞI ---
        const name = nameInput.value.trim();
        const surname = surnameInput.value.trim();
        const phoneInput = document.getElementById("authPhone"); // Telefon inputunu yakala
        const phone = phoneInput ? phoneInput.value.trim() : "";

        // İsim, soyisim ve telefon kontrolü
        if (!name || !surname) {
            showToast("Lütfen adınızı ve soyadınızı giriniz", "error");
            return;
        }
        
        if (phone.length < 10) {
            showToast("Lütfen geçerli bir telefon numarası giriniz", "error");
            return;
        }

        // Baş harfleri büyüterek kaydetme (Data temizliği)
        const cleanName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
        const cleanSurname = surname.charAt(0).toUpperCase() + surname.slice(1).toLowerCase();

        const { error } = await supabase.auth.signUp({ 
            email, 
            password,
            options: {
                data: {
                    first_name: cleanName,
                    last_name: cleanSurname,
                    phone_number: phone // Telefonu veritabanına gönderiyoruz
                }
            }
        })

        if (error) {
            showToast(error.message, "error");
            return;
        }

        // 🔔 Başarılı Kayıt Sonrası Arayüzü Kilitle
        document.getElementById("authInfo").style.display = "block";
        
        emailInput.disabled = true;
        passInput.disabled = true;
        if (nameInput) nameInput.disabled = true;
        if (surnameInput) surnameInput.disabled = true;
        if (phoneInput) phoneInput.disabled = true; // Telefonu da kilitle

        authSubmit.style.display = "none";
        authSwitch.style.display = "none";
        authTitle.textContent = "Email Doğrulama Gerekli";

        showToast("📩 Doğrulama linki gönderildi");
    }
}

// Enter tuşu ile giriş yapma özelliğini de ekleyelim:
[emailInput, passInput].forEach(input => {
    input.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            authSubmit.click();
        }
    });
});



function closeAuth() {
  authModal.classList.remove("active")

  emailInput.value = ""
  passInput.value = ""

  emailInput.disabled = false
  passInput.disabled = false

  authSubmit.style.display = "block"
  authSwitch.style.display = "block"

  const info = document.getElementById("authInfo")
  if (info) info.style.display = "none"
}
if (logoutBtn) {
  logoutBtn.onclick = async () => {
    const { error } = await supabase.auth.signOut()

    if (error) {
      showToast("Çıkış yapılamadı", "error")
      return
    }
    if(nameInput) nameInput.disabled = false
  if(surnameInput) surnameInput.disabled = false

    showToast("👋 Çıkış yapıldı")
  }
}
async function haberCek() {
    const tabloID = "10K9Hn0zvmILaz-HOunQAfiO1H3OHcqzYWN5Gn6utcpI";
    const url = `https://docs.google.com/spreadsheets/d/${tabloID}/gviz/tq?tqx=out:csv`;

    try {
        const response = await fetch(url);
        const data = await response.text();
        const satirlar = data.split('\n')
                             .map(s => s.replace(/"/g, "").trim())
                             .filter(s => s.includes("instagram.com"));

        const container = document.getElementById('haber-alani');
        if (container) {
            container.innerHTML = ""; 

            satirlar.slice(0, 3).forEach(link => {
                const wrap = document.createElement('div');
                wrap.className = 'haber-cerceve'; // CSS'te yazdığımız sınıfı ekledik

                // ÖNEMLİ: data-instgrm-captioned eklemiyoruz, böylece alt yazılar gelmez
                wrap.innerHTML = `
                    <blockquote class="instagram-media" data-instgrm-version="14" style="width:100%; margin:0;">
                        <a href="${link}"></a>
                    </blockquote>
                `;
                container.appendChild(wrap);
            });

            if (window.instgrm) {
                window.instgrm.Embeds.process();
            }
        }
    } catch (e) {
        console.error("Hata:", e);
    }
}
const mobileAuthBtn = document.querySelector('.mobile-auth-btn');
const mobileAuthMenu = document.querySelector('.mobile-auth-menu');

mobileAuthBtn.addEventListener('click', () => {
  mobileAuthMenu.style.display =
    mobileAuthMenu.style.display === 'block' ? 'none' : 'block';
});

// dışarı tıklanınca kapansın
document.addEventListener('click', (e) => {
  if (!e.target.closest('.mobile-auth')) {
    mobileAuthMenu.style.display = 'none';
  }
});

const bubble = document.getElementById("feedbackBubble");
const panel = document.getElementById("feedbackPanel");

bubble.addEventListener("click", () => {
  panel.style.display = panel.style.display === "block" ? "none" : "block";
});


window.addEventListener('load', haberCek);
window.addEventListener("scroll", updateActiveNavLink)

