


async function openCashfreeCheckout(order) {
    if (!order) {
        throw new Error("Invalid Cashfree order response.");
    }

    if (order.payment_session_id || order.order_token) {
        if (typeof Cashfree === 'undefined') {
            throw new Error("Cashfree checkout script not loaded. Please refresh the page.");
        }

        const appId = window.CASHFREE_APP_ID || window.cashfree_app_id || null;
        if (!appId) {
            throw new Error("Cashfree app ID is not configured. Please set CASHFREE_APP_ID on the server.");
        }

        const cashfree = Cashfree({
          mode: window.CASHFREE_MODE || "production",
          appId
        });

        const sessionId = order.order_token;
        try {
          console.debug("Opening Cashfree checkout with session:", sessionId);
          const result = await cashfree.checkout({
            paymentSessionId: sessionId,
            redirectTarget: "_modal",
            returnUrl: window.location.href
          });

          if (result?.error) {
            // If session is invalid, fall back to payment_link
            console.warn("Cashfree checkout returned error:", result.error);
            throw new Error(result.error.message || result.error.description || "Cashfree checkout failed");
          }

          return result;
        } catch (err) {
          console.error("Cashfree checkout failed, attempting fallback:", err);
          // fallback to payment_link if available
          if (order.payment_link) {
            console.debug("Falling back to payment_link:", order.payment_link);
            window.location.href = order.payment_link;
            return { redirect: true };
          }

          throw err;
        }
    }

    if (order.payment_link) {
        window.location.href = order.payment_link;
        return { redirect: true };
    }

    throw new Error("Cashfree payment session or link is not available.");
}

function normalizeCashfreeSuccess(result) {
    const status = result?.paymentDetails?.paymentStatus || result?.paymentStatus || result?.status || result?.txStatus || result?.transactionStatus || result?.payment_status;
    if (!status) return false;
    const value = String(status).toUpperCase();
    return /SUCCESS|TXN_SUCCESS|COMPLETED|PAID|OK/.test(value);
}

async function saveInternshipPending(data) {
    const response = await fetch("/save-internship", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    return response.json().catch(() => ({ status: "error", message: "Invalid server response" }));
}

async function updateInternshipPayment(orderId, paymentId, status = "SUCCESS") {
    await fetch("/update-internship-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order_id: orderId, payment_id: paymentId, payment_status: status })
    });
}

function parseQueryParams() {
    const params = {};
    const query = window.location.search.substring(1);
    query.split("&").forEach(pair => {
        const [key, value] = pair.split("=");
        if (key) {
            params[decodeURIComponent(key)] = decodeURIComponent(value || "");
        }
    });
    return params;
}

function handleCashfreeReturn() {
    const params = parseQueryParams();
    const status = params.payment_status || params.status || params.txStatus || params.transactionStatus;
    if (!status) return;

    const success = /SUCCESS|TXN_SUCCESS|COMPLETED|PAID|OK/.test(String(status).toUpperCase());
    if (!success) return;

    const orderId = params.order_id || params.orderId || params.order_reference || params.orderRef;
    const paymentId = params.payment_id || params.paymentId || params.reference_id || params.referenceId;
    if (orderId) {
        updateInternshipPayment(orderId, paymentId, "SUCCESS");
    }

    if (document.querySelector(".modal-right")) {
        document.querySelector(".modal-right").innerHTML = `
            <h3>Payment Successful</h3>
            <p style="margin:20px 0;">Internship application submitted successfully.</p>
            <button onclick="closeApplyModal()">Done</button>
        `;
    } else {
        alert("Payment successful. Your application has been recorded.");
    }

    if (window.history && window.history.replaceState) {
        const cleanUrl = window.location.origin + window.location.pathname;
        window.history.replaceState({}, document.title, cleanUrl);
    }
}

window.initiatePayment = async function(paymentData) {
    try {
    // Helper: attempt create-order with retries on transient server errors
    async function createOrderWithRetries(attempts = 3) {
      let lastErr = null;
      for (let i = 1; i <= attempts; i++) {
        try {
          const resp = await fetch("/create-order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              amount: paymentData.amount,
              email: paymentData.email || "",
              receipt: paymentData.receipt || `receipt_${Date.now()}`
            })
          });

          const body = await resp.json().catch(() => ({ status: "error", message: "Invalid server response" }));

          // If success shape, return it
          if (resp.ok && !body.error && body.status !== "error") return body;

          // If server-side transient error (5xx), retry with backoff
          lastErr = body;
          if (resp.status >= 500) {
            await new Promise(r => setTimeout(r, 500 * i));
            continue;
          }

          // Non-retryable error - return immediately
          return body;
        } catch (err) {
          lastErr = { message: err.message || String(err) };
          await new Promise(r => setTimeout(r, 500 * i));
        }
      }
      return lastErr || { message: "Failed to create order" };
    }

    const order = await createOrderWithRetries(3);

    // If backend returned an error shape, show its message
    if (!order || order.error || order.status === "error") {
      const msg = order.message || "Failed to create payment order. Please try again.";
      alert(msg);
      return;
    }

        const result = await openCashfreeCheckout(order);
        if (result?.redirect) return;

        if (result?.paymentDetails && paymentData.onSuccess) {
            paymentData.onSuccess(result.paymentDetails);
        }
    } catch (error) {
        console.error("Payment error:", error);
        alert("Payment initiation failed");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    handleCashfreeReturn();

  /* ================= HEADER SCROLL ================= */
const header = document.querySelector(".top-header");

if (header) {
  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 100);
  });
}

  /* ================= MOBILE MENU ================= */
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const mobileMenu = document.querySelector(".mobile-menu");
  const mobileMenuOverlay = document.querySelector(".mobile-menu-overlay");
  const closeMenu = document.querySelector(".close-menu");

  const closeMobileMenu = () => {
    mobileMenu.classList.remove("active");
    mobileMenuOverlay.classList.remove("active");
    document.body.style.overflow = "";
  };

  mobileMenuBtn?.addEventListener("click", () => {
    mobileMenu.classList.add("active");
    mobileMenuOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
  });

  closeMenu?.addEventListener("click", closeMobileMenu);
  mobileMenuOverlay?.addEventListener("click", closeMobileMenu);

  /* ================= COUNTER ================= */
  const animateCounter = (counter) => {
  const target = +counter.dataset.target;
  let current = 0;
  const step = target / 100;

  const update = () => {
    current += step;
    if (current < target) {
      counter.textContent = Math.floor(current);
      requestAnimationFrame(update);
    } else {
      counter.textContent = target; // ✅ NO "+"
    }
  };

  update();
};


  /* ================= SCROLL ANIMATION ================= */
  const animateOnScroll = () => {
    document.querySelectorAll("[data-animation]").forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight / 1.2) {
        el.classList.add("animated");
        if (el.classList.contains("stat-box")) {
          animateCounter(el.querySelector(".counter"));
        }
      }
    });
  };

  window.addEventListener("scroll", animateOnScroll);
  animateOnScroll();

  /* ================= SWIPER ================= */
  // if (window.Swiper) {
  //   new Swiper(".heroSwiper", {
  //     loop: true,
  //     speed: 1000,
  //     autoplay: { delay: 5000 },
  //     effect: "fade",
  //     pagination: { el: ".swiper-pagination", clickable: true },
  //     navigation: {
  //       nextEl: ".swiper-button-next",
  //       prevEl: ".swiper-button-prev"
  //     }
  //   });
  // }


  /* ================= FORM ================= */
  const quoteForm = document.getElementById("quote-form");
  const submitBtn = document.getElementById("submit-btn");

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const mobileInput = document.getElementById("mobile");
  const companyInput = document.getElementById("company");
  const designationInput = document.getElementById("designation");
  const serviceSelect = document.getElementById("service");
  const messageInput = document.getElementById("message");

  if (!quoteForm || !submitBtn || !nameInput || !emailInput || !mobileInput || !companyInput || !designationInput || !serviceSelect || !messageInput) {
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const mobileRegex = /^\d{10}$/;

  function showError(id, msg) {
    const err = document.getElementById(`${id}-error`);
    const input = document.getElementById(id);
    if (err && input) {
      err.textContent = msg;
      err.classList.add("show");
      input.style.borderColor = "#ff4757";
    }
  }

  function clearError(id) {
    const err = document.getElementById(`${id}-error`);
    const input = document.getElementById(id);
    if (err) {
      err.textContent = "";
      err.classList.remove("show");
    }
    if (input) {
      input.style.borderColor = "#ddd";
    }
  }

  function clearErrors() {
    document.querySelectorAll(".error-message").forEach(e => {
      e.textContent = "";
      e.classList.remove("show");
    });
    document.querySelectorAll("input,select,textarea").forEach(i => {
      i.style.borderColor = "#ddd";
    });
  }

  function validateName(showErrorMessage = true) {
    const value = nameInput.value.trim();
    if (value.length < 3) {
      if (showErrorMessage) showError("name", "Enter valid name");
      return false;
    }
    clearError("name");
    return true;
  }

  function validateEmail(showErrorMessage = true) {
    const value = emailInput.value.trim();
    if (value === "") {
      if (showErrorMessage) showError("email", "Email is required");
      return false;
    }
    if (!emailRegex.test(value)) {
      if (showErrorMessage) showError("email", "Enter valid email");
      return false;
    }
    clearError("email");
    return true;
  }

  function validateMobile(showErrorMessage = true) {
    const value = mobileInput.value.trim();
    if (value === "") {
      if (showErrorMessage) showError("mobile", "Mobile number required");
      return false;
    }
    if (!/^[0-9]+$/.test(value)) {
      if (showErrorMessage) showError("mobile", "Only numbers allowed");
      return false;
    }
    if (value.length !== 10) {
      if (showErrorMessage) showError("mobile", "Enter 10 digit number");
      return false;
    }
    clearError("mobile");
    return true;
  }

  function validateCompany(showErrorMessage = true) {
    if (companyInput.value.trim() === "") {
      if (showErrorMessage) showError("company", "Company required");
      return false;
    }
    clearError("company");
    return true;
  }

  function validateDesignation(showErrorMessage = true) {
    if (designationInput.value.trim() === "") {
      if (showErrorMessage) showError("designation", "Designation required");
      return false;
    }
    clearError("designation");
    return true;
  }

  function validateService(showErrorMessage = true) {
    if (serviceSelect.value === "") {
      if (showErrorMessage) showError("service", "Select service");
      return false;
    }
    clearError("service");
    return true;
  }

  function validateMessage(showErrorMessage = true) {
    if (messageInput.value.trim().length < 10) {
      if (showErrorMessage) showError("message", "Minimum 10 characters");
      return false;
    }
    clearError("message");
    return true;
  }

  function validateForm(showErrors = true) {
    if (showErrors) clearErrors();

    let valid = true;
    valid = validateName(showErrors) && valid;
    valid = validateEmail(showErrors) && valid;
    valid = validateMobile(showErrors) && valid;
    valid = validateCompany(showErrors) && valid;
    valid = validateDesignation(showErrors) && valid;
    valid = validateService(showErrors) && valid;
    valid = validateMessage(showErrors) && valid;
    return valid;
  }

  function updateSubmitState() {
    if (!submitBtn) return;
    submitBtn.disabled = !validateForm(false);
    submitBtn.style.opacity = submitBtn.disabled ? "0.7" : "1";
    submitBtn.style.cursor = submitBtn.disabled ? "not-allowed" : "pointer";
  }

  nameInput.addEventListener("input", () => {
    nameInput.style.borderColor = "#ddd";
    if (nameInput.value.trim().length > 0) validateName(true);
    updateSubmitState();
  });

  emailInput.addEventListener("input", () => {
    emailInput.style.borderColor = "#ddd";
    if (emailInput.value.trim().length > 0) validateEmail(true);
    updateSubmitState();
  });

  mobileInput.addEventListener("input", () => {
    mobileInput.value = mobileInput.value.replace(/\D/g, "");
    mobileInput.value = mobileInput.value.slice(0, 10);
    mobileInput.style.borderColor = "#ddd";
    if (mobileInput.value.length > 0) validateMobile(true);
    updateSubmitState();
  });

  companyInput.addEventListener("input", () => {
    companyInput.style.borderColor = "#ddd";
    if (companyInput.value.trim().length > 0) validateCompany(true);
    updateSubmitState();
  });

  designationInput.addEventListener("input", () => {
    designationInput.style.borderColor = "#ddd";
    if (designationInput.value.trim().length > 0) validateDesignation(true);
    updateSubmitState();
  });

  serviceSelect.addEventListener("change", () => {
    serviceSelect.style.borderColor = "#ddd";
    validateService(true);
    updateSubmitState();
  });

  messageInput.addEventListener("input", () => {
    messageInput.style.borderColor = "#ddd";
    if (messageInput.value.trim().length > 0) validateMessage(true);
    updateSubmitState();
  });

  updateSubmitState();

  /* ================= SUBMIT WITH BEAUTIFUL SUCCESS ANIMATIONS ================= */
quoteForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!validateForm()) return;

  const originalText = "Submit";
  submitBtn.textContent = "Submitting...";
  submitBtn.disabled = true;

  const formData = {
    name: nameInput.value.trim(),
    email: emailInput.value.trim(),
    mobile: mobileInput.value.trim(),
    company: companyInput.value.trim(),
    designation: designationInput.value.trim(),
    service: serviceSelect.value,
    message: messageInput.value.trim()
  };

  try {
    const response = await fetch("/submit-quote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });

    const result = await response.json();

if (result.status === "success") {

    showSuccessNotification("🎉 Submitted Successfully");

    quoteForm.reset();

    // CLEAR ALL INPUTS MANUALLY
    nameInput.value = "";
    emailInput.value = "";
    mobileInput.value = "";
    companyInput.value = "";
    designationInput.value = "";
    serviceSelect.selectedIndex = 0;
    messageInput.value = "";

    // Initiate payment after success
   if (
    formData.service === "Internship" ||
    formData.service === "Workshop"
) {

    setTimeout(() => {
        initiatePayment(formData);
    }, 2000);

}

    closeQuote();

    localStorage.removeItem("userEmail");

    // CLOSE POPUP AFTER 1 SECOND
setTimeout(() => {
    closeQuote();
}, 1000);

}
else if (result.status === "exists") {

    closeQuote();

    localStorage.setItem("userEmail", emailInput.value);

    const loginModal = document.getElementById("loginModal");

    if (loginModal) {
        loginModal.style.display = "flex";
    }

    const loginEmail = document.getElementById("login_email");

    if (loginEmail) {
        loginEmail.value = emailInput.value;
    }

    showErrorNotification("⚠️ Email already registered. Please login.");

}
else {

    showErrorNotification("❌ Something went wrong.");

}
  } catch (err) {
    console.error(err);
    showErrorNotification("❌ Server error");
  }

  // 🔹 ALWAYS reset button
  submitBtn.textContent = originalText;
  submitBtn.disabled = false;
});


  /* ================= BEAUTIFUL SUCCESS NOTIFICATION ================= */
  function showSuccessNotification(message) {
    // Remove any existing notification
    const existingNotification = document.querySelector('.custom-notification');
    if (existingNotification) existingNotification.remove();
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'custom-notification success';
    notification.innerHTML = `
      <div class="notification-content">
        <div class="notification-icon">🎉</div>
        <div class="notification-text">${message}</div>
        <div class="notification-close">×</div>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    // Show with animation
    setTimeout(() => {
      notification.classList.add('show');
    }, 10);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        notification.remove();
      }, 500);
    }, 4000);
    
    // Close on click
    notification.querySelector('.notification-close').addEventListener('click', () => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 500);
    });
  }

  /* ================= ERROR NOTIFICATION ================= */
  function showErrorNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'custom-notification error';
    notification.innerHTML = `
      <div class="notification-content">
        <div class="notification-icon">❌</div>
        <div class="notification-text">${message}</div>
        <div class="notification-close">×</div>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 500);
    }, 4000);
    
    notification.querySelector('.notification-close').addEventListener('click', () => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 500);
    });
  }



  /*adds video*/
// Safe Close Button Functionality (removed - no overlay elements in HTML)


    /* popup */

// // Get DOM elements
// const plansBtn = document.querySelector('.plans-btn');
// const plansPopup = document.getElementById('plansPopup');
// const closePopupBtn = document.querySelector('.close-popup');
// const selectPlanBtns = document.querySelectorAll('.select-plan');

// // Open popup when Plans button is clicked
// plansBtn.addEventListener('click', () => {
//   plansPopup.style.display = 'flex';
//   document.body.style.overflow = 'hidden'; // Prevent scrolling
// });

// // Close popup when close button is clicked
// closePopupBtn.addEventListener('click', () => {
//   plansPopup.style.display = 'none';
//   document.body.style.overflow = 'auto';
// });

// // Close popup when clicking outside the content
// plansPopup.addEventListener('click', (e) => {
//   if (e.target === plansPopup) {
//     plansPopup.style.display = 'none';
//     document.body.style.overflow = 'auto';
//   }
// });

// // Close popup with Escape key
// document.addEventListener('keydown', (e) => {
//   if (e.key === 'Escape' && plansPopup.style.display === 'flex') {
//     plansPopup.style.display = 'none';
//     document.body.style.overflow = 'auto';
//   }
// });

// // Handle plan selection
// selectPlanBtns.forEach(btn => {
//   btn.addEventListener('click', () => {
//     const planName = btn.closest('.plan-card').querySelector('h3').textContent;
//     alert(`You selected the ${planName}. Our team will contact you shortly!`);
//     plansPopup.style.display = 'none';
//     document.body.style.overflow = 'auto';
//   });
// });

/*---------Drop down -----------*/




/*---------plan pdf --------*/



  /* ================= ADD ALL CSS ANIMATIONS ================= */
  const style = document.createElement('style');
  style.textContent = `
    /* Success Notification */
    .custom-notification {
      position: fixed;
      top: 20px;
      right: 20px;
      background: white;
      border-radius: 10px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.2);
      padding: 15px 20px;
      z-index: 99999;
      transform: translateX(150%);
      transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
      min-width: 300px;
      border-left: 5px solid #1188e3;
    }
    
    .custom-notification.success {
      border-left-color: #00b894;
    }
    
    .custom-notification.error {
      border-left-color: #ff4757;
    }
    
    .custom-notification.show {
      transform: translateX(0);
    }
    
    .notification-content {
      display: flex;
      align-items: center;
      gap: 15px;
    }
    
    .notification-icon {
      font-size: 24px;
      animation: bounce 2s infinite;
    }
    
    .notification-text {
      flex: 1;
      font-weight: 500;
      color: #333;
    }
    
    .notification-close {
      cursor: pointer;
      font-size: 24px;
      color: #999;
      transition: color 0.3s;
    }
    
    .notification-close:hover {
      color: #333;
    }
    
    /* Dancing Cursor */
    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
    
    /* Ripple Effect */
    @keyframes ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
    
    /* Pulse Border for Input */
    @keyframes pulseBorder {
      0% { box-shadow: 0 0 0 0 rgba(18, 139, 205, 0.7); }
      70% { box-shadow: 0 0 0 10px rgba(76, 229, 53, 0); }
      100% { box-shadow: 0 0 0 0 rgba(76, 229, 53, 0); }
    }
    
    /* Float Animation for Particles */
    @keyframes floatParticle {
      0% {
        transform: translate(0, 0) scale(1);
        opacity: 1;
      }
      100% {
        transform: translate(50px, -30px) scale(0);
        opacity: 0;
      }
    }
    
    /* Dancing Animation for Cursor */
    @keyframes dance {
      0% { transform: translate(-50%, -50%) rotate(0deg); }
      25% { transform: translate(-50%, -50%) rotate(10deg); }
      50% { transform: translate(-50%, -50%) rotate(-10deg); }
      75% { transform: translate(-50%, -50%) rotate(5deg); }
      100% { transform: translate(-50%, -50%) rotate(0deg); }
    }
    
    .dancing-cursor {
      animation: dance 0.5s infinite;
    }
    
    /* Services Highlight */
    @keyframes servicesGlow {
      0% { box-shadow: 0 0 10px rgba(76, 229, 53, 0.5); }
      50% { box-shadow: 0 0 30px rgba(76, 229, 53, 0.8); }
      100% { box-shadow: 0 0 10px rgba(76, 229, 53, 0.5); }
    }
    
    .services-highlight {
      animation: servicesGlow 2s infinite;
    }
  `;
  document.head.appendChild(style);

  console.log("✅ JavaScript loaded with beautiful animations!");
});

/* ================= SWIPER INITIALIZATION ================= */
/*const swiper = new Swiper('.heroSwiper', {
  loop: true,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false
  },
  speed: 900,
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },
  on: {
    init(swiper) {
      playCurrentVideo(swiper);
    },
    slideChangeTransitionStart(swiper) {
      pauseAllVideos();
    },
    slideChangeTransitionEnd(swiper) {
      playCurrentVideo(swiper);
    }
  }
});*/

/* Pause ALL videos (including cloned ones) */
function pauseAllVideos() {
  document.querySelectorAll('.slide-video').forEach(video => {
    video.pause();
    video.currentTime = 0;
  });
}

/* Play ONLY active slide video (handles loop clones correctly) */
function playCurrentVideo(swiper) {
  const activeSlide = swiper.slides[swiper.activeIndex];
  const video = activeSlide.querySelector('video');

  if (video) {
    video.muted = true; // required for autoplay
    video.play().catch(() => {});
  }
}

// WhatsApp toggle function
function toggleWhatsApp() {
  document.getElementById("whatsappPopup").classList.toggle("show");
}

// Logo track click handler
const track = document.querySelector(".logo-track");
if (track) {
  track.addEventListener("click", () => {
    track.style.animationDuration = "8s";
    setTimeout(() => {
      track.style.animationDuration = "25s";
    }, 2000);
  });
}

// Mega menu functionality
document.querySelectorAll('.nav-item.mega-parent').forEach(item => {
  item.addEventListener('click', function(e) {
    if (window.innerWidth <= 576 || ('ontouchstart' in window)) {
      e.preventDefault();
      // close others
      document.querySelectorAll('.nav-item.active').forEach(el => {
        if (el !== this) el.classList.remove('active');
      });
      this.classList.toggle('active');
    }
  });
});

// Close mega menu when tapping outside
document.addEventListener('click', e => {
  if (!e.target.closest('.nav-item')) {
    document.querySelectorAll('.nav-item.active').forEach(el => {
      el.classList.remove('active');
    });
  }
});

// Login modal functionality
const modal = document.getElementById("loginModal");
const form = document.getElementById("loginForm");

if (modal && form) {
  // Auto open login popup when page loads


  // Close popup
  window.closeLogin = () => {
    modal.style.display = "none";
  };

  // Form submit
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    try {
      const res = await fetch("/login", {
        method: "POST",
        body: formData
      });

      const data = await res.json();

      // ===== SUCCESS LOGIN =====
      if (data.status === "success") {
        modal.style.display = "none";

        const welcomeBox = document.getElementById("welcomeMessage");
        if (welcomeBox) {
          welcomeBox.classList.add("show");
          setTimeout(() => {
            welcomeBox.classList.remove("show");
          }, 2500);
        }
      }

      // ===== EMAIL NOT REGISTERED =====
      else if (data.status === "not_found") {
        const errorBox = document.getElementById("errorMessage");
        if (errorBox) {
          errorBox.classList.add("show");
          setTimeout(() => {
            errorBox.classList.remove("show");
          }, 2500);
        }
      }

      // ===== OTHER ERROR =====
      else {
        showServerError();
      }

    } catch (err) {
      console.log(err);
      showServerError();
    }
  });
}

// Server error animation
function showServerError() {
  const errorBox = document.getElementById("errorMessage");
  if (errorBox) {
    errorBox.querySelector("h2").innerText = "Server Error";
    errorBox.querySelector("p").innerText = "Please try again later";

    errorBox.classList.add("show");

    setTimeout(() => {
      errorBox.classList.remove("show");
    }, 2500);
  }
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
});

document.querySelectorAll(".fade-up").forEach(el => {
  observer.observe(el);
});


// CHAT TOGGLE
// ===============================
// TOGGLE CHAT - SIMPLE & ROBUST
// ===============================
function toggleChat(event) {
  const wrapper = document.querySelector(".chatbot-wrapper");
  const chat = document.getElementById("chatContainer");

  if (!wrapper || !chat) {
    console.error("chatbot-wrapper or chatContainer missing");
    return;
  }

  const isActive = wrapper.classList.toggle("active");
  chat.classList.toggle("active", isActive);

  if (event) {
    event.stopPropagation();
    event.preventDefault();
  }

  // In active mode: hide the floating bubble button
  const chatToggle = document.querySelector(".chat-toggle");
  if (chatToggle) {
    chatToggle.style.display = isActive ? "none" : "flex";
  }
}

// Initialize chat after a short delay to ensure DOM is ready
setTimeout(function() {
  console.log("Initializing chat functionality...");
  const chatContainer = document.getElementById("chatContainer");
  if (chatContainer) {
    console.log("Chat container found - ready for interactions");

    const chatInput = document.getElementById("userInput");
    if (chatInput) {
      chatInput.addEventListener("keydown", function(e) {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          sendMessage();
        }
      });
    }
  }
}, 100);

// ===============================
// SEND MESSAGE
// ===============================
// async function sendMessage() {

//   const input = document.getElementById("userInput");
//   const chatBox = document.getElementById("chat-box");

//   let message = input.value.trim();
//   if (!message) return;

//   // USER MESSAGE
//   chatBox.innerHTML += `<div class="user-msg">${message}</div>`;
//   input.value = "";

//   // 🔥 REMOVE OLD TYPING
//   let oldTyping = document.querySelector(".typing");
//   if (oldTyping) oldTyping.remove();

//   // 🔥 ADD NEW TYPING
//   const typingDiv = document.createElement("div");
//   typingDiv.className = "bot-msg typing";
//   typingDiv.innerHTML = "Typing...";
//   chatBox.appendChild(typingDiv);

//   chatBox.scrollTop = chatBox.scrollHeight;

//   try {
//     const res = await fetch("/chat", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({ message })
//     });

//     const data = await res.json();

//     // REMOVE TYPING
//     typingDiv.remove();

//     // BOT MESSAGE
//     chatBox.innerHTML += `<div class="bot-msg">${data.reply}</div>`;

//   } catch (error) {
//     typingDiv.remove();
//     chatBox.innerHTML += `<div class="bot-msg">⚠️ Server error</div>`;
//     console.error(error);
//   }

//   // AUTO SCROLL
//   chatBox.scrollTop = chatBox.scrollHeight;
// }



function handleCall(e) {
  const isMobile = /iPhone|Android|iPad/i.test(navigator.userAgent);

  if (!isMobile) {
    e.preventDefault(); // stop tel
    document.getElementById("callPopup").style.display = "flex";
  }
}

function closePopup() {
  document.getElementById("callPopup").style.display = "none";
}


// MATRIX ANIMATION
const matrixCards = document.querySelectorAll('.matrix-card');

window.addEventListener('scroll', () => {
  matrixCards.forEach(card => {
    const top = card.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      card.classList.add('show');
    }
  });
});




// MARKET ANIMATION
const marketCards = document.querySelectorAll('.market-card');

window.addEventListener('scroll', () => {
  marketCards.forEach(card => {
    const top = card.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      card.classList.add('show');
    }
  });
});

// CURSOR EFFECT
document.querySelectorAll(".process-card .icon-box").forEach(box => {
  box.addEventListener("mousemove", e => {
    const rect = box.getBoundingClientRect();
    box.style.setProperty("--x", `${e.clientX - rect.left}px`);
    box.style.setProperty("--y", `${e.clientY - rect.top}px`);
  });
});

// SCROLL ANIMATION
const processCards = document.querySelectorAll(".process-card");

window.addEventListener("scroll", () => {
  processCards.forEach(card => {
    if (card.getBoundingClientRect().top < window.innerHeight - 100) {
      card.classList.add("show");
    }
  });
});

// CURSOR EFFECT
document.querySelectorAll(".tech-items span").forEach(item => {
  item.addEventListener("mousemove", e => {
    const rect = item.getBoundingClientRect();
    item.style.setProperty("--x", `${e.clientX - rect.left}px`);
    item.style.setProperty("--y", `${e.clientY - rect.top}px`);
  });
});

// SCROLL ANIMATION
const techGroups = document.querySelectorAll(".tech-group");

window.addEventListener("scroll", () => {
  techGroups.forEach(group => {
    if (group.getBoundingClientRect().top < window.innerHeight - 100) {
      group.classList.add("show");
    }
  });
});

const mobileElements = document.querySelectorAll(".mobile-content, .mobile-image");

window.addEventListener("scroll", () => {
  mobileElements.forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 100) {
      el.classList.add("show");
    }
  });
});

document.querySelectorAll(".faq-item").forEach(item => {
  item.addEventListener("click", () => {

    // Close others (optional)
    document.querySelectorAll(".faq-item").forEach(i => {
      if (i !== item) i.classList.remove("active");
    });

    // Toggle current
    item.classList.toggle("active");

  });
});

const quoteModal = document.getElementById("quoteModal");

// OPEN POPUP
function openQuote() {
  quoteModal.style.display = "flex";
  document.body.style.overflow = "hidden";
}

// CLOSE POPUP
function closeQuote() {
  quoteModal.style.display = "none";
  document.body.style.overflow = "auto";
}

// CLICK OUTSIDE CLOSE
window.addEventListener("click", (e) => {
  if (e.target === quoteModal) {
    closeQuote();
  }
});

// Strategic Pillar Discovery
// Not Sure Where to Start? Find Your Pillar. 

document.querySelectorAll(".consult-card").forEach(card => {
  card.addEventListener("click", function () {

    // remove old active
    document.querySelectorAll(".consult-card").forEach(c => c.classList.remove("active"));

    // add active
    this.classList.add("active");

  });
});

// CAREER ANIMATION
const cards = document.querySelectorAll(".benefit-card");

if (cards.length) {
  window.addEventListener("scroll", () => {
    cards.forEach(card => {
      const top = card.getBoundingClientRect().top;

      if (top < window.innerHeight - 50) {
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
      }
    });
  });
}

// SCROLL ANIMATION
window.addEventListener("scroll", function () {
  const cards = document.querySelectorAll(".roles-card");

  if (!cards.length) return;

  cards.forEach(card => {
    const rect = card.getBoundingClientRect();

    if (rect.top < window.innerHeight - 100) {
      card.classList.add("show");
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("careerForm");

  if (!form) return;

  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");
  const position = document.getElementById("position");
  const message = document.getElementById("message");

  // ✅ LIVE VALIDATION EVENTS (PUT HERE)
  name.addEventListener("input", validateName);
  email.addEventListener("input", validateEmail);
  phone.addEventListener("input", validatePhone);
  position.addEventListener("input", validatePosition);
  message.addEventListener("input", validateMessage);

  // ✅ FORM SUBMIT
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let isValid = true;

    document.querySelectorAll(".error").forEach(e => e.innerText = "");

    // NAME
    if (name.value.trim().length < 2) {
      document.getElementById("nameError").innerText = "Enter valid name";
      isValid = false;
    }

    // EMAIL
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
      document.getElementById("emailError").innerText = "Enter valid email";
      isValid = false;
    }

    // PHONE
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone.value)) {
      document.getElementById("phoneError").innerText = "Enter valid phone";
      isValid = false;
    }

    // POSITION
    if (position.value.trim() === "") {
      document.getElementById("positionError").innerText = "Enter position";
      isValid = false;
    }

    // MESSAGE
    if (message.value.trim().length < 10) {
      document.getElementById("messageError").innerText = "Minimum 10 characters";
      isValid = false;
    }

    // SUCCESS
    if (isValid) {
      alert("✅ Application Submitted Successfully!");
      form.reset();
    }

  });

});
// ================= LIVE VALIDATION =================

function validateName() {
  const name = document.getElementById("name").value.trim();
  const error = document.getElementById("nameError");

  if (name.length >= 2) {
    error.innerText = "";
  }
}

function validateEmail() {
  const email = document.getElementById("email").value;
  const error = document.getElementById("emailError");

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (regex.test(email)) {
    error.innerText = "";
  }
}

function validatePhone() {
  const phone = document.getElementById("phone").value;
  const error = document.getElementById("phoneError");

  const regex = /^[6-9]\d{9}$/;

  if (regex.test(phone)) {
    error.innerText = "";
  }
}

function validatePosition() {
  const position = document.getElementById("position").value.trim();
  const error = document.getElementById("positionError");

  if (position !== "") {
    error.innerText = "";
  }
}

function validateMessage() {
  const message = document.getElementById("message").value.trim();
  const error = document.getElementById("messageError");

  if (message.length >= 10) {
    error.innerText = "";
  }
}

const dropdown = document.querySelector('.download-dropdown');
const button = document.querySelector('.download-btn');

let timeout;

if (dropdown && button) {

  // OPEN
  dropdown.addEventListener('mouseenter', () => {
    clearTimeout(timeout);
    dropdown.classList.add('active');
  });

  // CLOSE
  dropdown.addEventListener('mouseleave', () => {
    timeout = setTimeout(() => {
      dropdown.classList.remove('active');
    }, 200);
  });

  // MOBILE CLICK
  button.addEventListener('click', (e) => {
    e.preventDefault();
    dropdown.classList.toggle('active');
  });

}

/* ================= INTERNSHIP SYSTEM ================= */

/* ================= INTERNSHIP SYSTEM ================= */

let currentApplyPosition = "";

/* OPEN MODAL */
const internshipPricing = {
    IT: {
        Online: { '45 Days': 5999 },
        Offline: { '45 Days': 18999 }
    },
    NonIT: {
        Online: { '45 Days': 5999 },
        Offline: { '45 Days': 18999 }
    }
};

window.openApply = function(position = "Internship Position") {

    currentApplyPosition = position;

    const isIT = [
        'Frontend Developer Intern',
        'Backend Developer Intern',
        'Full Stack Developer Intern'
    ].includes(position);

    const packageType = isIT ? 'IT' : 'NonIT';
    const packageLabel = isIT ? 'IT Package' : 'Non-IT Package';
    const today = new Date().toISOString().split('T')[0];

    const modal = document.getElementById("applyModal");

    modal.style.display = "flex";

    document.querySelector(".modal-right").innerHTML = `

        <h3>
            Apply for ${position}
        </h3>

        <label for="full_name">Full Name</label>
        <input type="text"
               id="full_name"
               placeholder="Full Name">

        <label for="email">Email Address</label>
        <input type="email"
               id="email"
               placeholder="Email Address">

        <label for="mobile">Mobile Number</label>
        <input type="tel"
               id="mobile"
               placeholder="Mobile Number"
               maxlength="10">

        <label for="date_select">Preferred Start Date</label>
        <input type="date"
               id="date_select"
               min="${today}">

        <label for="time_slot_select">Preferred Time Slot</label>
        <select id="time_slot_select">
            <option value="">Select Time Slot</option>
            <option>10:00 AM - 12:00 PM</option>
            <option>12:00 PM - 02:00 PM</option>
            <option>02:00 PM - 04:00 PM</option>
            <option>04:00 PM - 06:00 PM</option>
        </select>

        <label for="mode_select">Preferred Mode</label>

        <select id="mode_select" onchange="updateInternshipFee()" required>

            <option value="">
                Select Package
            </option>

            <option value="Online">
                Online Package
            </option>

            <option value="Offline">
                Offline Package
            </option>

        </select>

        <label for="duration_select">Preferred Internship Duration</label>
        <select id="duration_select">
            <option value="45 Days" selected>45 Days</option>
        </select>

        <div class="fee-box">
            ${packageLabel} : <span id="internshipFeeAmount">₹${internshipPricing[packageType].Online['45 Days']}</span>
        </div>

        <div class="package-summary" id="packageSummary">
            <strong>Package details:</strong><br>
            Online Internship - ₹5,999<br>
            Offline Internship - ₹18,999<br>
            Duration - 45 Days
        </div>

       <button onclick="submitInternshipApplication()">
    Submit Application
</button>

        <button onclick="closeApplyModal()"
                class="cancel-btn">
            Cancel
        </button>

    `;

    window.currentInternshipPackageType = packageType;
    updateInternshipFee();
};

window.updateInternshipFee = function() {
    const modeSelect = document.getElementById('mode_select');
    const durationSelect = document.getElementById('duration_select');
    const fee = document.getElementById('internshipFeeAmount');
    const summary = document.getElementById('packageSummary');
    const dateSelect = document.getElementById('date_select');
    const timeSlotSelect = document.getElementById('time_slot_select');
    if (!modeSelect || !durationSelect || !fee) return;

    const packageType = window.currentInternshipPackageType || 'IT';
    const mode = modeSelect.value;
    const duration = durationSelect.value;
    const dateValue = dateSelect?.value || '';
    const timeSlotValue = timeSlotSelect?.value || '';

    if (!mode) {
        fee.textContent = "₹0";
        return;
    }

    const amount = internshipPricing[packageType][mode][duration];
    fee.textContent = `₹${amount.toLocaleString()}`;

    if (summary) {
        const summaryLines = [
            'Online Internship - ₹5,999',
            'Offline Internship - ₹18,999',
            `Duration - ${duration}`
        ];
        if (dateValue) summaryLines.push(`Start Date - ${dateValue}`);
        if (timeSlotValue) summaryLines.push(`Time Slot - ${timeSlotValue}`);

        summary.innerHTML = `
            <strong>Internship Details:</strong><br>
            ${summaryLines.join('<br>')}
        `;
    }
};

/* SEND OTP */


/* OTP BOX */


/* VERIFY OTP */

/* START CASHFREE PAYMENT */
window.startInternshipPayment = async function() {
    const storedData = JSON.parse(localStorage.getItem("internshipData"));
    if (!storedData) {
        alert("Missing internship details. Please re-open the application form.");
        return;
    }

    const packageType = [
        'Frontend Developer Intern',
        'Backend Developer Intern',
        'Full Stack Developer Intern'
    ].includes(storedData.position) ? 'IT' : 'NonIT';

    const mode = storedData.mode || 'Online';
    const duration = storedData.duration || '45 Days';
    const amountINR = internshipPricing[packageType][mode][duration];
    const amountValue = amountINR;

    try {
        const response = await fetch("/create-order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                amount: amountValue,
                email: storedData.email,
                phone: storedData.mobile,
                return_url: window.location.origin + "/payment-success?order_id={order_id}"
            })
        });

        const order = await response.json();
        if (!order.order_token && !order.payment_link) {
            alert(order.message || "Unable to create payment order.");
            return;
        }

        const pendingSave = await saveInternshipPending({
            full_name: storedData.full_name,
            email: storedData.email,
            mobile: storedData.mobile,
            internship_role: currentApplyPosition,
            internship_mode: storedData.mode || 'Online',
            internship_duration: storedData.duration || '45 Days',
            internship_date: storedData.date || null,
            internship_time_slot: storedData.time_slot || null,
            package_type: 'Standard',
            amount: amountINR,
            order_id: order.order_id,
            payment_status: 'PENDING'
        });

        if (pendingSave.status !== 'success') {
            alert(pendingSave.message || 'Unable to save application before payment.');
            return;
        }

        if (typeof Cashfree === 'undefined') {
            alert("Cashfree checkout script not loaded. Please refresh the page.");
            return;
        }

        const cashfree = Cashfree({
            mode: window.CASHFREE_MODE || "production",
            appId: window.CASHFREE_APP_ID || window.cashfree_app_id || null
        });

        if (!order.order_token) {
            window.location.href = order.payment_link;
            return;
        }

          window.location.href = order.payment_link;
          return;

        if (result?.error) {
            throw new Error(result.error.message || result.error.description || "Cashfree checkout failed");
        }

        let paymentId = null;
        let paymentSuccess = false;

        if (normalizeCashfreeSuccess(result)) {
            paymentSuccess = true;
            paymentId = result?.paymentDetails?.referenceId || result?.paymentDetails?.paymentId || result?.paymentDetails?.reference_id || result?.paymentDetails?.payment_id || result?.paymentDetails?.txRef || result?.paymentDetails?.referenceId || result?.payment_id || result?.reference_id || result?.referenceId;
        }

        if (paymentSuccess) {
            await updateInternshipPayment(order.order_id, paymentId, "SUCCESS");
            document.querySelector(".modal-right").innerHTML = `
                <h3>Payment Successful</h3>
                <p style="margin:20px 0;">Internship application submitted successfully.</p>
                <button onclick="closeApplyModal()">Done</button>
            `;
        } else {
            alert("Payment was not completed successfully.");
        }
    } catch (error) {
        console.error(error);
        alert("Unable to process the internship payment.");
    }
};

/* CLOSE MODAL */
window.closeApplyModal = function(){

    document.getElementById("applyModal").style.display = "none";

};

/* ================= WORKSHOP ================= */

/* =========================================
   WORKSHOP BOOKING SYSTEM
========================================= */

const workshopForm =
document.getElementById("workshopForm");

const workshopPriceText =
document.getElementById("priceText");

/* UPDATE PRICE */

function updateWorkshopAmount() {

    const hours =
    document.getElementById("hours");

    if (!hours || !workshopPriceText)
    return;

    let amount = 0;

    if (hours.value === "1 Day") {

        amount = 999;

    }

    else if (hours.value === "2 Days") {

        amount = 1499;

    }

    workshopPriceText.innerHTML =
    `Workshop Fee: ₹${amount}`;

    return amount;
}

/* CHANGE EVENT */

const hoursSelect =
document.getElementById("hours");

if (hoursSelect) {

    hoursSelect.addEventListener(
        "change",
        updateWorkshopAmount
    );

    updateWorkshopAmount();
}

/* =====================================
   WORKSHOP PAYMENT
===================================== */

window.startWorkshopPayment = async function() {

    const storedData = JSON.parse(
        localStorage.getItem("workshopData") || "null"
    );

    if (!storedData) {

        alert("Workshop data missing");

        return;
    }

    try {

        const response = await fetch("/create-order", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                amount: storedData.amount,

                email: storedData.email,

                phone: storedData.phone,

                return_url:
                window.location.origin +
                "/workshop-success?order_id={order_id}"

            })

        });

        const order = await response.json();

        console.log(order);

       if (!order.payment_link && !order.order_token) {

        alert(order.message || "Payment link failed");

        return;
    }

        /* SAVE WORKSHOP */

        const saveResponse = await fetch("/save-workshop", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                ...storedData,

                order_id: order.order_id,

                payment_status: "PENDING"

            })

        });

        const saveData = await saveResponse.json();

        if (saveData.status !== "success") {

            alert("Workshop save failed");

            return;
        }

        /* OPEN CASHFREE */

        window.location.href = order.payment_link;

    }

    catch (error) {

        console.log(error);

        alert("Workshop payment failed");

    }

};

/* =====================================
   WORKSHOP FORM SUBMIT
===================================== */

if (workshopForm) {

    workshopForm.addEventListener(
        "submit",

        async function(e) {

            e.preventDefault();

            const data = {

                name:
                document.getElementById("name").value,

                phone:
                document.getElementById("phone").value,

                email:
                document.getElementById("email").value,

                category:
                document.getElementById("category").value,

                type:
                document.getElementById("type").value,

                date:
                document.getElementById("date").value,

                hours:
                document.getElementById("hours").value,

                time:
                document.getElementById("time").value,

                amount:
                updateWorkshopAmount()

            };

            localStorage.setItem(
                "workshopData",
                JSON.stringify(data)
            );

            await startWorkshopPayment();

        }

    );

}

/* =====================================
   WORKSHOP CATEGORY DROPDOWN
===================================== */

const category =
document.getElementById("category");

const type =
document.getElementById("type");

if(category){

category.addEventListener(
"change",

function(){

    let options = "";

    /* IT WORKSHOPS */

    if(this.value === "IT"){

        options = `

        <option value="">
            Select Workshop Type
        </option>

        <option>
            Full Stack Development
        </option>

        <option>
            Python Development
        </option>

        <option>
            Azure Cloud
        </option>

        <option>
            React Development
        </option>

        `;
    }

    /* NON IT */

    else if(this.value === "Non-IT"){

        options = `

        <option value="">
            Select Workshop Type
        </option>

        <option>
            SEO / SEM
        </option>

        <option>
            Digital Marketing
        </option>

        <option>
            Meta Ads
        </option>

        <option>
            Google Ads
        </option>

        <option>
            Social Media Marketing
        </option>

        <option>
            AI Graphic Design
        </option>

        `;
    }

    type.innerHTML = options;

});

}

async function submitInternshipApplication() {
    const amount = parseFloat(
        document.getElementById("internshipFeeAmount")
        .innerText
        .replace("₹", "")
        .replace(",", "")
    );

    const dateValue = document.getElementById("date_select").value;
    const timeSlot = document.getElementById("time_slot_select").value;

    const data = {
        full_name: document.getElementById("full_name").value,
        email: document.getElementById("email").value,
        mobile: document.getElementById("mobile").value,
        internship_role: currentApplyPosition,
        internship_mode: document.getElementById("mode_select").value,
        internship_duration: document.getElementById("duration_select").value,
        internship_date: dateValue,
        internship_time_slot: timeSlot,
        amount: amount
    };

    if (!data.full_name || !data.email || !data.mobile || !data.internship_mode || !data.internship_duration || !data.internship_date || !data.internship_time_slot) {
        alert("Please fill in all fields, including preferred date and time slot.");
        return;
    }

    try {
        const response = await fetch("/create-order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                amount: amount,
                email: data.email,
                phone: data.mobile,
                return_url: window.location.origin + "/payment-success?order_id={order_id}"
            })
        });

        const order = await response.json();

        if (!order.payment_link) {
            alert(order.message || "Unable to create payment order.");
            return;
        }

        const pendingSave = await saveInternshipPending({
            full_name: data.full_name,
            email: data.email,
            mobile: data.mobile,
            internship_role: data.internship_role,
            internship_mode: data.internship_mode,
            internship_duration: data.internship_duration,
            internship_date: data.internship_date,
            internship_time_slot: data.internship_time_slot,
            package_type: 'Standard',
            amount: amount,
            order_id: order.order_id,
            payment_status: 'PENDING'
        });

        if (pendingSave.status !== 'success') {
            alert(pendingSave.message || 'Unable to save application before payment.');
            return;
        }

        window.location.href = order.payment_link;

    } catch (error) {
        console.error(error);
        alert("Payment failed. Please try again.");
    }
}