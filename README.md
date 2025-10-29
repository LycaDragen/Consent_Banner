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
    
    <!-- 2. Configurar Consent Mode por defecto (ANTES de GTM) -->
    <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    
    // Establecer el estado de consentimiento por defecto como denegado (excepto las cookies necesarias que siempre se otorgan)
    gtag('consent', 'default', {
      'ad_storage': 'denied',
      'analytics_storage': 'denied',
      'ad_user_data': 'denied',
      'ad_personalization': 'denied',
      'functionality_storage': 'granted',  // Necesarias - siempre otorgadas
      'personalization_storage': 'denied',
      'security_storage': 'granted',         // Necesarias - siempre otorgadas
      'wait_for_update': 500
    });
    </script>
    
    <!-- 3. Google Tag Manager (opcional) -->
    <!-- Coloca aquí tu código de GTM si lo usas -->
</head>
<body>
    <!-- Tu contenido aquí -->
    
    <!-- 4. Configuración personalizada del banner (opcional) -->
    <script src="src/config.js"></script>
    
    <!-- 5. Banner principal -->
    <script src="dist/consent-banner.js"></script>
</body>
</html>
```

**📌 Importante:** El bloque de configuración de consent (paso 2) debe ir en el `<head>`, **ANTES** de que se cargue Google Tag Manager o cualquier otro script de tracking. Esto asegura que el consent mode se inicialice correctamente antes de que GTM comience a funcionar.

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

### 📋 Valores por Defecto
```javascript
{
    text: "We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.",
    image: "./img/cookie_100.png",
    iconPosition: "left",
    showMinimizedIcon: true,
    labels: {
        necessary: "Necessary",
        preferences: "Preferences",
        statistics: "Statistics",
        marketing: "Marketing"
    },
    buttonTexts: {
        denyAll: "Deny All",
        allowSelection: "Allow Selection",
        allowAll: "Allow All"
    }
}
```

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
    optionText: "15px",    // Opciones (Necesarias, Preferencias, etc.)
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

### 📝 Textos Personalizables de Categorías y Botones
```javascript
labels: {
    necessary: "Necessary",      // Etiqueta para cookies necesarias
    preferences: "Preferences",  // Etiqueta para cookies de preferencias
    statistics: "Statistics",    // Etiqueta para cookies de estadísticas
    marketing: "Marketing"       // Etiqueta para cookies de marketing
},
buttonTexts: {
    denyAll: "Deny All",                    // Texto del botón rechazar todo
    allowSelection: "Allow Selection",      // Texto del botón permitir selección
    allowAll: "Allow All"                   // Texto del botón permitir todo
}
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
El banner envía automáticamente eventos de consentimiento usando Google Consent Mode y se actualiza en tiempo real cuando el usuario cambia las preferencias. Los eventos aparecen en GTM como **"Consent Update"**:

```javascript
gtag('consent', 'update', {
    functionality_storage: "granted" | "denied",
    personalization_storage: "granted" | "denied",
    analytics_storage: "granted" | "denied",
    ad_storage: "granted" | "denied",
    ad_personalization: "granted" | "denied",
    ad_user_data: "granted" | "denied",
    security_storage: "granted" | "denied"
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

### 📐 Breakpoints Responsive
El banner se adapta automáticamente a diferentes tamaños de pantalla:

- **≤768px**: Tablets y pantallas medianas
  - Botones apilados verticalmente
  - Ancho: 90% con máximo 400px
  
- **≤480px**: Móviles estándar
  - Padding superior aumentado (40px)
  - Botón de cierre reposicionado
  
- **≤460px**: Móviles medianos
  - Padding superior: 45px
  - Centrado automático con márgenes equilibrados
  
- **≤360px**: Móviles muy pequeños
  - Padding superior: 50px
  - Elementos optimizados para pantallas estrechas

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
1. **Asegúrate de incluir el bloque de consent en el `<head>`** - El bloque con `gtag('consent', 'default', {...})` es necesario y debe estar ANTES de GTM
2. Verifica que `window.dataLayer` existe en la consola del navegador
3. Revisa la consola del navegador para errores
4. Asegúrate de que GTM está configurado para escuchar el evento **"Consent Update"**
5. El orden correcto en el `<head>` debe ser: CSS → Bloque de consent → GTM

---

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Puedes usarlo libremente en proyectos comerciales y no comerciales.

