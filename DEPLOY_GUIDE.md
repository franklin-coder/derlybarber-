
# 🚀 Guía Rápida de Despliegue

## ✅ Antes de Comenzar

Tu proyecto ya incluye:
- ✓ `.gitignore` configurado
- ✓ `.env.example` con plantilla
- ✓ `README.md` con documentación completa

## 📦 Subir a GitHub

```bash
# 1. Si no has inicializado git
git init
git add .
git commit -m "Initial commit: Derly Barbershop"

# 2. Conectar con GitHub (crea el repo primero en github.com)
git remote add origin https://github.com/TU-USUARIO/derly-barbershop.git
git branch -M main
git push -u origin main
```

## ☁️ Desplegar en Vercel

1. Ve a [vercel.com](https://vercel.com) e inicia sesión con GitHub
2. Click "New Project" → Importa tu repositorio
3. Configura estas variables de entorno:

```
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=genera-con-openssl-rand-base64-32
NEXTAUTH_URL=https://tu-proyecto.vercel.app
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=tu-email@gmail.com
EMAIL_PASSWORD=tu-app-password-gmail
EMAIL_FROM=tu-email@gmail.com
```

4. Click "Deploy"
5. ¡Listo! 🎉

## 📧 Configurar Gmail

1. Activa verificación en 2 pasos en tu cuenta Google
2. Ve a [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
3. Genera contraseña para "Correo"
4. Usa esa contraseña en `EMAIL_PASSWORD`

## 🗄️ Base de Datos

Opciones recomendadas:
- **Railway**: [railway.app](https://railway.app) - Fácil y rápido
- **Neon**: [neon.tech](https://neon.tech) - Plan gratuito generoso
- **Supabase**: [supabase.com](https://supabase.com) - Con panel de admin

Para más detalles, consulta `README.md`

---
**¡Éxito! 🚀**
