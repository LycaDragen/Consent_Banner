# Banner de Consentimiento de Cookies

Un banner de consentimiento de cookies completamente personalizable que permite a los usuarios aceptar, rechazar o personalizar su consentimiento. Guarda las preferencias en localStorage y comunica automáticamente el estado de consentimiento a Google Tag Manager (dataLayer) para habilitar o bloquear scripts según el consentimiento.

---

## 🚀 Características Principales

- ✅ **Popup de consentimiento** con opciones granulares
- ✅ **Overlay con efecto blur** para mejor enfoque visual
- ✅ **Personalización completa** de colores, fuentes y efectos
- ✅ **Efectos hover** en botones y elementos interactivos
- ✅ **Switches personalizables** para cada tipo de cookie
- ✅ **Icono minimizado** para reabrir el banner
- ✅ **Persistencia** de preferencias en localStorage (clave: `"userPreferences"`)
- ✅ **Integración GTM** automática con dataLayer
- ✅ **Configuración sencilla** desde un solo archivo
- ✅ **Responsive** y compatible con todos los navegadores

---

## 📁 Estructura del Proyecto

```
consent-banner-demo/
│
├─ dist/
│ ├─ consent-banner.css    # Estilos del banner con variables CSS
│ └─ consent-banner.js    # Script principal que inyecta el popup
│
├─ src/
│ └─ config.js            # Configuración personalizable del banner
│
├─ img/
│ └─ cookie_100.png      # Icono por defecto del banner
│
├─ index.html             # Página de demostración
└─ README.md
```

---

## 🛠️ Instalación

### Opción 1: Descarga Directa
Descarga los archivos y cópialos a tu proyecto.

### Opción 2: CDN (Próximamente)
```html
<link rel="stylesheet" href="https://cdn.tu-dominio.com/consent-banner.css">
<script src="https://cdn.tu-dominio.com/consent-banner.js"></script>
```

---

## 📖 Método de Uso

### Implementación Básica

```html
<!DOCTYPE html>
<html>
<head>
    <!-- 1. Incluir CSS -->
    <link rel="stylesheet" href="dist/consent-banner.css">
</head>
<body>
    <!-- Tu contenido aquí -->
    
    <!-- 2. Configuración personalizada (opcional) -->
    <script src="src/config.js"></script>
    
    <!-- 3. Banner principal -->
    <script src="dist/consent-banner.js"></script>
</body>
</html>
```

### Implementación con Configuración Personalizada

```html
<script>
// Configuración personalizada
window.ConsentBannerConfig = {
    text: "Tu mensaje personalizado aquí",
    colors: {
        bannerBg: "#ffffff",
        buttonPrimaryBg: "#007bff"
    }
};
</script>
<script src="dist/consent-banner.js"></script>
```

---

## ⚙️ Configuración Avanzada

El archivo `src/config.js` permite personalizar completamente el banner. Si no se especifica una configuración personalizada, se usarán los valores por defecto:

### 🎨 Colores Personalizables
```javascript
colors: {
    // Banner
    bannerBg: "#f8f9fa",           // Fondo del banner
    bannerText: "#000000",         // Texto del banner
    
    // Botones principales
    buttonPrimaryBg: "#28a745",    // Botón "Allow All"
    buttonPrimaryText: "#ffffff",
    buttonSecondaryBg: "#f2f2f2", // Botones "Deny All" y "Allow Selection"
    buttonSecondaryText: "#000000",
    
    // Hover (efectos al pasar el mouse)
    buttonHoverBg: "#218838", // Color de hover para el botón "Allow All"
    buttonHoverText: "#ffffff", // Color del texto en hover para "Allow All"
    buttonSecondaryHoverBg: "#e0e0e0", // Color de hover para botones secundarios
    buttonSecondaryHoverText: "#000000", // Color del texto en hover para botones secundarios
    
    // Switches
    switchOnBg: "#28a745",         // Switch activado
    switchOffBg: "#cccccc",        // Switch desactivado
    
    // Botón de cierre (X)
    closeBtnBg: "#f2f2f2", // Color de fondo del botón de cierre
    closeBtnColor: "#000000", // Color del texto del botón de cierre
    closeBtnHoverBg: "#e0e0e0", // Color de fondo en hover del botón de cierre
    closeBtnHoverColor: "#000000", // Color del texto en hover del botón de cierre
    
    // Icono minimizado
    iconBg: "#28a745"              // Fondo del icono
}
```

### 📝 Tamaños de Fuente
```javascript
fontSizes: {
    bannerText: "16px",    // Texto principal
    optionText: "15px",    // Opciones (Necessary, Preferences, etc.)
    buttonText: "14px"     // Botones
}
```

### 🖼️ Configuración de Imagen
```javascript
image: "./img/cookie_100.png"  // Ruta de la imagen del banner (se muestra a 50px)
```

### 🎯 Opciones de Posicionamiento del Icono Minimizado
```javascript
iconPosition: "left",        // "left" o "right"
showMinimizedIcon: true      // true o false
```

---

## 🔧 Funcionalidades Detalladas

### Tipos de Cookies Soportados
- **Necessary** - Siempre activo (no se puede desactivar)
- **Preferences** - Preferencias del usuario
- **Statistics** - Análisis y estadísticas
- **Marketing** - Publicidad y marketing

### Botones de Acción
- **Deny All** - Rechaza todas las cookies opcionales
- **Allow Selection** - Mantiene la selección actual
- **Allow All** - Acepta todas las cookies

### Integración con Google Tag Manager
El banner envía automáticamente eventos al dataLayer y se actualiza en tiempo real cuando el usuario cambia las preferencias:

```javascript
window.dataLayer.push({
    event: "gtm_consent_update",
    consents: {
        functionality_storage: "granted" | "denied",
        personalization_storage: "granted" | "denied",
        analytics_storage: "granted" | "denied",
        ad_storage: "granted" | "denied",
        ad_personalization: "granted" | "denied",
        ad_user_data: "granted" | "denied",
        security_storage: "granted" | "denied"
    }
});
```

---

## 🌍 Limitaciones Actuales

### ⚠️ Configuración Global
**IMPORTANTE:** Actualmente el banner aplica la misma configuración a todos los usuarios, independientemente de su ubicación geográfica. No es posible crear banners específicos por país o región.

- Todas las opciones de configuración se aplican **globalmente**
- El mismo texto, colores y comportamiento se muestran a todos los usuarios
- No hay detección automática de idioma o región
- Las preferencias se guardan localmente en el navegador del usuario

### 🔮 Funcionalidades Futuras
- Configuración por geolocalización
- Detección automática de idioma
- Múltiples configuraciones regionales
- Integración con APIs de traducción

---

## 🎨 Personalización Visual

### Variables CSS Disponibles
El banner usa variables CSS que se pueden personalizar:

```css
:root {
    --banner-bg: #f8f9fa;
    --banner-text: #000000;
    --button-primary-bg: #28a745;
    --button-primary-text: #ffffff;
    --button-secondary-bg: #f2f2f2;
    --button-secondary-text: #000000;
    --button-primary-hover-bg: #218838;
    --button-primary-hover-text: #ffffff;
    --button-secondary-hover-bg: #e0e0e0;
    --button-secondary-hover-text: #000000;
    --switch-on-bg: #28a745;
    --switch-off-bg: #cccccc;
    --close-btn-bg: #f2f2f2;
    --close-btn-text: #000000;
    --close-btn-hover-bg: #e0e0e0;
    --close-btn-hover-text: #000000;
    --icon-bg: #28a745;
    --banner-font-size: 16px;
    --option-font-size: 15px;
    --button-font-size: 14px;
}
```

---

## 🔄 API del Banner

### Funciones Disponibles
```javascript
// Inicializar manualmente
window.WPConsentBannerInit();

// Verificar si está cargado
if (window.WPConsentBannerLoaded) {
    // Banner listo
}
```

---

## 📱 Compatibilidad

- ✅ Chrome, Firefox, Safari, Edge
- ✅ Dispositivos móviles y tablets
- ✅ Navegadores con soporte para CSS Variables
- ✅ Compatible con frameworks (React, Vue, Angular)

---

## 🐛 Solución de Problemas

### El banner no aparece
1. Verifica que `config.js` se carga antes que `consent-banner.js`
2. Asegúrate de que no hay errores en la consola del navegador
3. Verifica que el CSS se está cargando correctamente
4. Asegúrate de no estar usando un Ad-blocker

### Los colores no se aplican
1. Revisa la sintaxis en `config.js`
2. Verifica que los valores de color son válidos (hex, rgb, etc.)
3. Asegúrate de que el navegador soporta CSS Variables

### GTM no recibe los eventos
1. Verifica que `window.dataLayer` existe
2. Revisa la consola del navegador para errores
3. Asegúrate de que GTM está configurado para escuchar `gtm_consent_update`

---

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Puedes usarlo libremente en proyectos comerciales y no comerciales.

