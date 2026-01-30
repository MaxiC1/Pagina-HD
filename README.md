# Hugo Díaz y Cía - E-Commerce Canon

E-commerce completo para venta y arriendo de fotocopiadoras Canon. Desarrollado con React 18 + TypeScript + Vite.

## 🚀 Características

### Funcionalidades Públicas
- ✅ **Home completo**: Hero slider, banner promocional, categorías, productos destacados, testimonios, logos de clientes
- ✅ **Catálogo de productos**: Filtros avanzados (categoría, precio, búsqueda), ordenamiento, responsive
- ✅ **Detalle de producto**: Galería de imágenes, tabs de información, productos relacionados
- ✅ **Carrito de compras**: Gestión de cantidad, aplicar cupones, cálculo de totales
- ✅ **Checkout**: Formulario de datos del cliente, resumen del pedido
- ✅ **Integración Getnet**: Link de pago para procesar transacciones
- ✅ **Páginas estáticas**: Servicios, Nosotros, Contacto
- ✅ **WhatsApp flotante**: Botón de contacto directo
- ✅ **Animaciones**: Framer Motion en componentes clave

### Panel de Administración
- ✅ **Login seguro**: Autenticación solo para administradores
- ✅ **Dashboard**: Métricas de ventas, pedidos, productos y clientes
- ✅ **Gestión básica**: Visualización de pedidos y estadísticas

## 🛠️ Stack Tecnológico

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Estilos**: Tailwind CSS + shadcn/ui
- **Estado Global**: Zustand con persistencia
- **Routing**: React Router DOM v6
- **Animaciones**: Framer Motion
- **Iconos**: Lucide React
- **Pagos**: Integración con Getnet (modo sandbox)

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview
```

## 🎨 Paleta de Colores

```css
--primary: 217 91% 40%        /* Azul corporativo */
--secondary: 210 20% 96%      /* Gris claro */
--accent: 45 93% 47%          /* Amarillo/Naranja */
--background: 0 0% 100%       /* Blanco */
--foreground: 222 47% 11%     /* Negro texto */
```

## 📱 Páginas Implementadas

### Públicas
- `/` - Home
- `/productos` - Catálogo
- `/producto/:id` - Detalle de producto
- `/carrito` - Carrito de compras
- `/checkout` - Checkout
- `/pago/resultado` - Resultado del pago
- `/servicios` - Servicios
- `/nosotros` - Sobre la empresa
- `/contacto` - Formulario de contacto

### Administración
- `/admin/login` - Login de administrador
- `/admin/dashboard` - Dashboard con métricas

## 🔐 Credenciales de Administrador

```
Usuario: admin
Contraseña: admin123
```

**IMPORTANTE**: Cambiar estas credenciales antes de poner en producción.
Editar el archivo `src/store/adminStore.ts`.

## 🎯 Datos Demo

El proyecto incluye:
- 20 productos Canon (fotocopiadoras, impresoras, multifuncionales, tóner, accesorios)
- 6 categorías de productos
- Cupones de descuento de prueba:
  - `DESCUENTO10` - 10% de descuento
  - `DESCUENTO20` - 20% de descuento
  - `BIENVENIDO` - 15% de descuento

## 💳 Integración de Pagos - Getnet

### Modo Sandbox (Desarrollo)
El proyecto está configurado en modo sandbox. Los pagos son simulados y no se procesan realmente.

### Configuración para Producción

1. Crear archivo `.env` en la raíz:
```env
VITE_GETNET_BASE_URL=https://api.getnet.cl
VITE_GETNET_SELLER_ID=tu_seller_id
VITE_GETNET_CLIENT_ID=tu_client_id
VITE_GETNET_CLIENT_SECRET=tu_client_secret
```

2. Descomentar el código de producción en `src/lib/getnet.ts`

3. Documentación oficial: https://www.getnet.cl/developers

## 📦 Estructura del Proyecto

```
src/
├── components/
│   ├── ui/              # Componentes shadcn/ui
│   ├── layout/          # Header, Footer, WhatsAppButton
│   ├── home/            # Secciones del home
│   ├── products/        # ProductCard, etc.
│   └── admin/           # ProtectedRoute
├── pages/
│   ├── Index.tsx        # Home
│   ├── ProductsPage.tsx
│   ├── ProductDetailPage.tsx
│   ├── CartPage.tsx
│   ├── CheckoutPage.tsx
│   ├── PaymentResultPage.tsx
│   ├── ServicesPage.tsx
│   ├── AboutPage.tsx
│   ├── ContactPage.tsx
│   └── admin/
│       ├── AdminLogin.tsx
│       └── AdminDashboard.tsx
├── store/
│   ├── cartStore.ts         # Carrito de compras
│   ├── orderStore.ts        # Pedidos
│   ├── adminStore.ts        # Autenticación admin
│   └── wishlistStore.ts     # Favoritos
├── lib/
│   ├── utils.ts             # Utilidades
│   └── getnet.ts            # Integración de pagos
└── data/
    └── products.ts          # Productos demo
```

## 🚀 Próximos Pasos

### Para completar el proyecto:

1. **Panel Admin Completo**
   - CRUD de productos
   - Gestión de pedidos con cambio de estados
   - Gestión de cupones
   - Editor de contenido (banners, logos)

2. **Optimizaciones**
   - Lazy loading de imágenes
   - Code splitting de rutas
   - PWA con Service Worker
   - SEO con meta tags dinámicos

3. **Funcionalidades Adicionales**
   - Sistema de reviews de productos
   - Comparador de productos
   - Cotizador de arriendo
   - Chat en vivo

4. **Producción**
   - Configurar variables de entorno
   - Conectar con backend real
   - Implementar analytics
   - Configurar CDN para imágenes

## 🔧 Personalización

### Cambiar colores
Editar `tailwind.config.js` y `src/index.css`

### Cambiar productos
Editar `src/data/products.ts`

### Cambiar información de contacto
Editar `src/components/layout/Header.tsx` y `Footer.tsx`

### Cambiar número de WhatsApp
Editar `src/components/layout/WhatsAppButton.tsx`

## 📝 Notas Importantes

1. **NO HAY registro de usuarios**: Solo los clientes compran, no crean cuentas
2. **Pagos externos**: Se redirige a Getnet para el pago
3. **Datos en localStorage**: Carrito, pedidos y sesión admin se guardan localmente
4. **Modo demo**: Las imágenes de productos son placeholder de Unsplash
5. **Responsive**: Diseñado mobile-first, funciona en todos los dispositivos

## 🐛 Solución de Problemas

### El build falla
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Las rutas no funcionan en producción
Configurar el servidor para redirigir todas las rutas a `index.html` (SPA).

### Los estilos no se aplican
Verificar que Tailwind esté correctamente configurado en `tailwind.config.js`.

## 📄 Licencia

Proyecto desarrollado para Hugo Díaz y Cía. Todos los derechos reservados.

## 👨‍💻 Soporte

Para consultas o soporte, contactar a:
- Email: ventas@hugodiaz.cl
- Teléfono: +56 9 1234 5678
- WhatsApp: +56 9 1234 5678
