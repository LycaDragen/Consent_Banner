// Aqui puedes cambiar la configuración del banner
window.ConsentBannerConfig = {
    text: "We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.",
    image: "./img/cookie_100.png", // Ruta de la imagen del banner, se mostrara a 50px pero se recomienda colocar de 100-200px
    
    colors: {
        // Banner
        bannerBg: "#f8f9fa", // Color de fondo del banner
        bannerText: "#000000", // Color del texto del banner (descripción y items)
        
        // Botones principales (los 3 del banner)
        buttonPrimaryBg: "#28a745", // Color de fondo del botón "Allow All"
        buttonPrimaryText: "#ffffff", // Color del texto del botón "Allow All"
        buttonSecondaryBg: "#f2f2f2", // Color de fondo de los botones "Deny All" y "Allow Selection"
        buttonSecondaryText: "#000000", // Color del texto de los botones "Deny All" y "Allow Selection"
        
        // Hover (efectos al pasar el mouse)
        buttonHoverBg: "#218838", // Color de hover para el botón "Allow All"
        buttonHoverText: "#ffffff", // Color del texto en hover para "Allow All"
        buttonSecondaryHoverBg: "#e0e0e0", // Color de hover para botones secundarios
        buttonSecondaryHoverText: "#000000", // Color del texto en hover para botones secundarios
        
        // Botones de selección individuales (4 switches)
        switchOnBg: "#28a745", // Color cuando el switch está activado
        switchOffBg: "#cccccc", // Color cuando el switch está desactivado
        
        // Icono minimizado
        iconBg: "#28a745", // Color de fondo del icono minimizado (si es transparente)
        
        // Botón de cierre (X)
        closeBtnBg: "#f2f2f2", // Color de fondo del botón de cierre
        closeBtnColor: "#000000", // Color del texto del botón de cierre
        closeBtnHoverBg: "#e0e0e0", // Color de fondo en hover del botón de cierre
        closeBtnHoverColor: "#000000" // Color del texto en hover del botón de cierre
    },
    
    // Tamaños de fuente personalizables
    fontSizes: {
        bannerText: "16px", // Tamaño del texto principal del banner
        optionText: "15px", // Tamaño del texto de las opciones (Necessary, Preferences, etc.)
        buttonText: "14px" // Tamaño del texto de los botones
    },
    
    // Posición e ícono
    iconPosition: "left", // Posición del icono minimizado: "left" o "right"
    showMinimizedIcon: true // Muestra u oculta el icono minimizado: true o false
};