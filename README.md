# Derly Barbershop - Barbería Latina

Landing page profesional para Derly, barbería latina en Montreal con servicio multilingüe (Español/Inglés/Francés).

## 🚀 Características

- 💈 Sistema de reservas en línea
- 📝 Blog multilingüe con sistema de comentarios
- 📧 Formulario de contacto con envío automático de emails
- 🌐 Soporte completo para 3 idiomas (ES/EN/FR)
- 🎨 Diseño moderno y responsivo
- 🔐 Autenticación con NextAuth.js
- 📊 Base de datos con Prisma + PostgreSQL

## 📋 Requisitos Previos

- Node.js 18+ 
- PostgreSQL (o cuenta en Railway/Neon/Supabase)
- Cuenta de Gmail para envío de emails

## 🛠️ Instalación Local

1. **Clonar el repositorio**
```bash
git clone https://github.com/tu-usuario/derly-barbershop.git
cd derly-barbershop
```

2. **Instalar dependencias**
```bash
npm install --legacy-peer-deps
```

3. **Configurar variables de entorno**

Copia el archivo `.env.example` a `.env` y configura las variables:

```bash
cp .env.example .env
```

Edita el archivo `.env` con tus datos:

```env
# Database
DATABASE_URL="postgresql://usuario:password@localhost:5432/derly_barbershop"

# NextAuth
NEXTAUTH_SECRET="genera-un-secret-aleatorio-aqui"
NEXTAUTH_URL="http://localhost:3000"

# Email (Gmail)
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT="587"
EMAIL_USER="tu-email@gmail.com"
EMAIL_PASSWORD="tu-app-password-de-gmail"
EMAIL_FROM="tu-email@gmail.com"
```

4. **Configurar Base de Datos**

```bash
# Generar cliente de Prisma
npx prisma generate

# Ejecutar migraciones
npx prisma db push

# (Opcional) Poblar con datos de ejemplo
npx prisma db seed
```

5. **Iniciar servidor de desarrollo**

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🌐 Despliegue en Vercel

### Opción 1: Desde GitHub (Recomendado)

1. **Sube tu código a GitHub**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Conecta con Vercel**
   - Ve a [vercel.com](https://vercel.com)
   - Click en "New Project"
   - Importa tu repositorio de GitHub
   - Vercel detectará automáticamente que es Next.js

3. **Configura las variables de entorno en Vercel**

En el dashboard de Vercel, ve a Settings > Environment Variables y agrega:

```
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=...
NEXTAUTH_URL=https://tu-dominio.vercel.app
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=tu-email@gmail.com
EMAIL_PASSWORD=tu-app-password
EMAIL_FROM=tu-email@gmail.com
```

4. **Despliega**
   - Vercel desplegará automáticamente
   - Cada push a main desplegará automáticamente

### Opción 2: Desde CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Desplegar
vercel

# Configurar variables de entorno
vercel env add DATABASE_URL
vercel env add NEXTAUTH_SECRET
# ... etc

# Desplegar a producción
vercel --prod
```

## 📧 Configurar Gmail para Emails

1. Ve a tu cuenta de Google
2. Activa la verificación en 2 pasos
3. Ve a "Contraseñas de aplicaciones"
4. Genera una contraseña para "Correo"
5. Usa esa contraseña en `EMAIL_PASSWORD`

[Guía completa aquí](https://support.google.com/accounts/answer/185833)

## 🗄️ Base de Datos

### Opción 1: Railway (Recomendado para producción)

1. Ve a [railway.app](https://railway.app)
2. Crea un nuevo proyecto
3. Agrega PostgreSQL
4. Copia la DATABASE_URL
5. Pégala en las variables de entorno de Vercel

### Opción 2: Neon

1. Ve a [neon.tech](https://neon.tech)
2. Crea un nuevo proyecto
3. Copia la connection string
4. Úsala como DATABASE_URL

### Opción 3: Supabase

1. Ve a [supabase.com](https://supabase.com)
2. Crea un nuevo proyecto
3. Ve a Settings > Database
4. Copia la connection string (modo "Session")
5. Úsala como DATABASE_URL

## 🔒 Seguridad

⚠️ **IMPORTANTE**: Nunca subas el archivo `.env` a GitHub. Ya está incluido en `.gitignore`.

## 📁 Estructura del Proyecto

```
├── app/                    # App Router de Next.js
│   ├── api/               # API Routes
│   ├── blog/              # Páginas del blog
│   ├── booking/           # Sistema de reservas
│   └── contact/           # Formulario de contacto
├── components/            # Componentes React
│   ├── sections/         # Secciones de la landing
│   └── ui/               # Componentes UI (shadcn)
├── lib/                  # Utilidades y configuración
│   ├── auth.ts          # Configuración NextAuth
│   ├── db.ts            # Cliente Prisma
│   ├── email.ts         # Configuración email
│   └── i18n.ts          # Traducciones
├── prisma/              # Schema de base de datos
└── public/              # Archivos estáticos
```

## 🌍 Traducciones

El sitio soporta 3 idiomas. Para agregar o modificar traducciones, edita:
- `lib/i18n.ts`

## 📝 Licencia

© 2024 Derly Barbershop. Todos los derechos reservados.

## 🤝 Soporte

Para preguntas o soporte:
- Email: derlybarber@gmail.com
- WhatsApp: +57 300 243 7648
