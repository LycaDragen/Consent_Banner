(function(window, document){

  // --- Configuración por defecto ---
  const consentConfig = {
    text: "We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.",
    image: "./img/cookie_100.png",
    colors: {
      // Banner
      bannerBg: "#f8f9fa",
      bannerText: "#000000",
      
      // Botones principales (los 3 del banner)
      buttonPrimaryBg: "#28a745",
      buttonPrimaryText: "#ffffff",
      buttonSecondaryBg: "#f2f2f2",
      buttonSecondaryText: "#000000",
      
      // Hover (efectos al pasar el mouse)
      buttonHoverBg: "#218838",
      buttonHoverText: "#ffffff",
      buttonSecondaryHoverBg: "#e0e0e0",
      buttonSecondaryHoverText: "#000000",
      
      // Botones de selección individuales (4 switches)
      switchOnBg: "#28a745",
      switchOffBg: "#cccccc",
      
      // Icono minimizado
      iconBg: "#28a745",
      
      // Botón de cierre (X)
      closeBtnBg: "#f2f2f2",
      closeBtnColor: "#000000",
      closeBtnHoverBg: "#e0e0e0",
      closeBtnHoverColor: "#000000"
    },
    
    // Tamaños de fuente personalizables
    fontSizes: {
      bannerText: "16px",
      optionText: "15px",
      buttonText: "14px"
    },
    
    // Posición e ícono
    iconPosition: "left",
    showMinimizedIcon: true,
    
    // Textos personalizables de categorías
    labels: {
      necessary: "Necessary",
      preferences: "Preferences",
      statistics: "Statistics",
      marketing: "Marketing"
    },
    
    // Textos personalizables de botones
    buttonTexts: {
      denyAll: "Deny All",
      allowSelection: "Allow Selection",
      allowAll: "Allow All"
    }
  };

  // merge shallow: window.ConsentBannerConfig may override keys
  const defaultConfig = window.ConsentBannerConfig || {};
  const config = Object.assign({}, consentConfig, defaultConfig);
  // merge nested objects (colors, fontSizes, labels, buttonTexts)
  config.colors = Object.assign({}, consentConfig.colors, (defaultConfig.colors || {}));
  config.fontSizes = Object.assign({}, consentConfig.fontSizes, (defaultConfig.fontSizes || {}));
  config.labels = Object.assign({}, consentConfig.labels, (defaultConfig.labels || {}));
  config.buttonTexts = Object.assign({}, consentConfig.buttonTexts, (defaultConfig.buttonTexts || {}));

  const style = document.createElement("link");
  style.rel = "stylesheet";
  style.href = "./dist/consent-banner.css";
  document.head.appendChild(style);

  const bannerHtml = `
    <div id="consentOverlay" class="hidden"></div>
    <div id="consentBanner" class="hidden">
      <button id="closeBtn">×</button>
      <p id="consentText">${config.text}</p>

      <div class="consentOption">
        <span>${config.labels.necessary}</span>
        <label class="switch">
          <input type="checkbox" id="necessaryCheckbox" checked disabled>
          <span class="slider round"></span>
        </label>
      </div>

      <div class="consentOption">
        <span>${config.labels.preferences}</span>
        <label class="switch">
          <input type="checkbox" id="preferencesCheckbox">
          <span class="slider round"></span>
        </label>
      </div>

      <div class="consentOption">
        <span>${config.labels.statistics}</span>
        <label class="switch">
          <input type="checkbox" id="statisticsCheckbox">
          <span class="slider round"></span>
        </label>
      </div>

      <div class="consentOption">
        <span>${config.labels.marketing}</span>
        <label class="switch">
          <input type="checkbox" id="marketingCheckbox">
          <span class="slider round"></span>
        </label>
      </div>

      <div id="bannerActions">
        <button id="denyAllBtn">${config.buttonTexts.denyAll}</button>
        <button id="allowSelectionBtn">${config.buttonTexts.allowSelection}</button>
        <button id="allowAllBtn">${config.buttonTexts.allowAll}</button>
      </div>
    </div>

    <div id="minimizedIcon">
      <img src="${config.image}" alt="Consent Icon">
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', bannerHtml);

  const consentBanner = document.getElementById("consentBanner");
  const consentOverlay = document.getElementById("consentOverlay");
  const minimizedIcon = document.getElementById("minimizedIcon");

  const closeBtn = document.getElementById("closeBtn");
  const denyAllBtn = document.getElementById("denyAllBtn");
  const allowSelectionBtn = document.getElementById("allowSelectionBtn");
  const allowAllBtn = document.getElementById("allowAllBtn");

  const preferencesCheckbox = document.getElementById("preferencesCheckbox");
  const statisticsCheckbox = document.getElementById("statisticsCheckbox");
  const marketingCheckbox = document.getElementById("marketingCheckbox");

  // --- integración con GTM ---
  // This function updates consent when user makes choices
  function updateConsentToGTM() {
    // Get current checkbox states
    const prefsChecked = preferencesCheckbox ? preferencesCheckbox.checked : false;
    const statsChecked = statisticsCheckbox ? statisticsCheckbox.checked : false;
    const marketingChecked = marketingCheckbox ? marketingCheckbox.checked : false;
    
    // Build consent object based on checkbox states
    // Necessary cookies (security_storage and functionality_storage) are always granted
    const consents = {
      functionality_storage: "granted",  // Always granted (Necessary)
      security_storage: "granted",        // Always granted (Necessary)
      personalization_storage: prefsChecked ? "granted" : "denied",  // Only Preferences controls this
      analytics_storage: statsChecked ? "granted" : "denied",         // Only Statistics controls this
      ad_storage: marketingChecked ? "granted" : "denied",           // Only Marketing controls this
      ad_personalization: marketingChecked ? "granted" : "denied",   // Only Marketing controls this
      ad_user_data: marketingChecked ? "granted" : "denied",         // Only Marketing controls this
    };
    
    // Send consent update command using gtag
    // This automatically triggers the "Consent Update" event in GTM
    gtag('consent', 'update', consents);
  }

  // --- apply config to CSS variables and inline values ---
  function applyConfig() {
    const consentTextEl = document.getElementById("consentText");
    if (consentTextEl) consentTextEl.innerText = config.text;
    const imgEl = minimizedIcon.querySelector("img");
    if (imgEl) imgEl.src = config.image;

    // base colors
    consentBanner.style.setProperty('--banner-bg', config.colors.bannerBg || '#f8f9fa');
    consentBanner.style.setProperty('--banner-text', config.colors.bannerText || '#000000');

    consentBanner.style.setProperty('--button-primary-bg', config.colors.buttonPrimaryBg || '#28a745');
    consentBanner.style.setProperty('--button-primary-text', config.colors.buttonPrimaryText || '#ffffff');

    consentBanner.style.setProperty('--button-secondary-bg', config.colors.buttonSecondaryBg || '#f2f2f2');
    consentBanner.style.setProperty('--button-secondary-text', config.colors.buttonSecondaryText || '#000000');

    // hover colors
    consentBanner.style.setProperty('--button-primary-hover-bg', config.colors.buttonHoverBg || '#218838');
    consentBanner.style.setProperty('--button-primary-hover-text', config.colors.buttonHoverText || '#ffffff');
    consentBanner.style.setProperty('--button-secondary-hover-bg', config.colors.buttonSecondaryHoverBg || '#e0e0e0');
    consentBanner.style.setProperty('--button-secondary-hover-text', config.colors.buttonSecondaryHoverText || '#000000');

    // switch colors
    consentBanner.style.setProperty('--switch-on-bg', config.colors.switchOnBg || '#28a745');
    consentBanner.style.setProperty('--switch-off-bg', config.colors.switchOffBg || '#cccccc');

    // close button
    consentBanner.style.setProperty('--close-btn-bg', config.colors.closeBtnBg || '#f2f2f2');
    consentBanner.style.setProperty('--close-btn-text', config.colors.closeBtnColor || '#000000');
    consentBanner.style.setProperty('--close-btn-hover-bg', config.colors.closeBtnHoverBg || '#e0e0e0');
    consentBanner.style.setProperty('--close-btn-hover-text', config.colors.closeBtnHoverColor || '#000000');

    consentBanner.style.setProperty('--icon-bg', config.colors.iconBg || '#28a745');

    // font sizes
    consentBanner.style.setProperty('--banner-font-size', config.fontSizes.bannerText || '16px');
    consentBanner.style.setProperty('--option-font-size', config.fontSizes.optionText || '15px');
    consentBanner.style.setProperty('--button-font-size', config.fontSizes.buttonText || '14px');

    // icon position
    if (config.iconPosition === "right") {
      minimizedIcon.style.left = "auto";
      minimizedIcon.style.right = "20px";
    } else {
      minimizedIcon.style.left = "20px";
      minimizedIcon.style.right = "auto";
    }

    // show/hide minimized icon
    if (!config.showMinimizedIcon) {
      minimizedIcon.style.display = "none";
    }
  }

  function showBanner() {
    consentBanner.classList.remove("hidden");
    consentOverlay.style.display = "block";
    minimizedIcon.style.display = "none";
  }

  function closeBanner() {
    savePreferences();
    updateConsentToGTM();
    consentBanner.classList.add("hidden");
    consentOverlay.style.display = "none";
    minimizedIcon.style.display = config.showMinimizedIcon ? "block" : "none";
  }

  function denyAll() {
    preferencesCheckbox.checked = false;
    statisticsCheckbox.checked = false;
    marketingCheckbox.checked = false;
    closeBanner();
  }

  function allowSelection() {
    preferencesCheckbox.disabled = false;
    statisticsCheckbox.disabled = false;
    marketingCheckbox.disabled = false;
    closeBanner();
  }

  function allowAll() {
    preferencesCheckbox.checked = true;
    statisticsCheckbox.checked = true;
    marketingCheckbox.checked = true;
    preferencesCheckbox.disabled = false;
    statisticsCheckbox.disabled = false;
    marketingCheckbox.disabled = false;
    closeBanner();
  }

  function savePreferences() {
    const prefs = {
      preferences: preferencesCheckbox.checked,
      statistics: statisticsCheckbox.checked,
      marketing: marketingCheckbox.checked,
    };
    localStorage.setItem("userPreferences", JSON.stringify(prefs));
  }

  function loadPreferences() {
    const saved = localStorage.getItem("userPreferences");
    if(saved){
      const prefs = JSON.parse(saved);
      preferencesCheckbox.checked = prefs.preferences;
      statisticsCheckbox.checked = prefs.statistics;
      marketingCheckbox.checked = prefs.marketing;
      consentBanner.classList.add("hidden");
      consentOverlay.style.display = "none";
      minimizedIcon.style.display = config.showMinimizedIcon ? "block" : "none";
      updateConsentToGTM();
    } else {
      showBanner();
    }
  }

  // --- Eventos ---
  // Add event listeners with null checks
  if (closeBtn) closeBtn.addEventListener("click", closeBanner);
  if (minimizedIcon) minimizedIcon.addEventListener("click", showBanner);
  if (denyAllBtn) denyAllBtn.addEventListener("click", denyAll);
  if (allowSelectionBtn) allowSelectionBtn.addEventListener("click", allowSelection);
  if (allowAllBtn) allowAllBtn.addEventListener("click", allowAll);

  if (preferencesCheckbox) preferencesCheckbox.addEventListener("change", updateConsentToGTM);
  if (statisticsCheckbox) statisticsCheckbox.addEventListener("change", updateConsentToGTM);
  if (marketingCheckbox) marketingCheckbox.addEventListener("change", updateConsentToGTM);

  // --- Statistics/Marketing button tracking ---
  const statsMarketingBtn = document.getElementById("statistics-marketing-button");
  if (statsMarketingBtn) {
    statsMarketingBtn.addEventListener("click", function() {
      // Only track if both Statistics and Marketing are enabled
      const statsEnabled = statisticsCheckbox ? statisticsCheckbox.checked : false;
      const marketingEnabled = marketingCheckbox ? marketingCheckbox.checked : false;
      
      if (statsEnabled && marketingEnabled) {
        // Send GTM event with tracking
        gtag('event', 'statistics_marketing_button_click', {
          'event_category': 'engagement',
          'event_label': 'Statistics Marketing Button',
          'value': 1
        });
        console.log('Statistics and Marketing tracking enabled - button click tracked');
      } else {
        console.log('Statistics and Marketing not enabled - click not tracked');
        alert('Please enable Statistics and Marketing cookies to track this button click.');
      }
    });
  }

  // --- Inicializar ---
  document.addEventListener("DOMContentLoaded", () => {
    applyConfig();
    loadPreferences();
  });

  window.WPConsentBannerInit = function(){
    try {
      applyConfig();
      loadPreferences();
    } catch(e) {}
  };

  window.WPConsentBannerLoaded = true;

})(window, document);
