# 🚨 SOLUCIÓN RÁPIDA - Problemas en Producción

## ❌ Problema Actual

Las funcionalidades de **citas** y **formulario de contacto** NO funcionan en producción (Vercel), aunque funcionan perfectamente en local.

## 🔍 Causa Raíz

**Faltan 2 variables de entorno críticas en Vercel:**

1. ❌ `NEXTAUTH_SECRET` está **VACÍA**
2. ❌ `NEXT_PUBLIC_BASE_URL` está **VACÍA**

## ✅ Solución en 3 Pasos

### Paso 1: Generar NEXTAUTH_SECRET

Ejecuta en tu terminal:

```bash
# Opción 1: Con OpenSSL
openssl rand -base64 32

# Opción 2: Con Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Opción 3: Usar el script incluido
npm run generate-secret
```

**Copia el resultado**, será algo como:
```
Kx8vZ2mP9qR3sT5wY7nB1cD4fG6hJ8kL0mN2pQ4rS6tU8vW0xY2zA4bC6dE8fG0h
```

### Paso 2: Configurar Variables en Vercel

1. Ve a: https://vercel.com/dashboard
2. Selecciona tu proyecto **"derlybarber-"**
3. Ve a: **Settings** → **Environment Variables**
4. Agrega estas 2 variables:

| Variable | Valor | Entornos |
|----------|-------|----------|
| `NEXTAUTH_SECRET` | [el secret que generaste] | ✅ Production, ✅ Preview, ✅ Development |
| `NEXT_PUBLIC_BASE_URL` | `https://tu-dominio.vercel.app` | ✅ Production, ✅ Preview, ✅ Development |

**IMPORTANTE:** Reemplaza `https://tu-dominio.vercel.app` con tu URL real de Vercel.

### Paso 3: Re-deployar

**Opción A: Desde Vercel Dashboard**
1. Ve a **Deployments**
2. Click en los **3 puntos** del último deployment
3. Click en **"Redeploy"**

**Opción B: Hacer un nuevo commit**
```bash
git add .
git commit -m "Fix: Add missing environment variables"
git push origin main
```

## 🎯 Verificación

Después del re-deploy, prueba:

1. ✅ Formulario de contacto: `https://tu-dominio.vercel.app/contact`
2. ✅ Sistema de citas: `https://tu-dominio.vercel.app/booking`

## 📊 Estado de Variables

| Variable | Estado Actual | Requerida |
|----------|---------------|-----------|
| `DATABASE_URL` | ✅ Configurada | ✅ Sí |
| `DIRECT_URL` | ✅ Configurada | ✅ Sí |
| `NEXTAUTH_SECRET` | ❌ **VACÍA** | ✅ **SÍ** |
| `NEXT_PUBLIC_BASE_URL` | ❌ **VACÍA** | ✅ **SÍ** |
| `EMAIL_USER` | ✅ Configurada | ✅ Sí |
| `EMAIL_PASSWORD` | ✅ Configurada | ✅ Sí |
| `EMAIL_HOST` | ✅ Configurada | ✅ Sí |
| `EMAIL_PORT` | ✅ Configurada | ✅ Sí |

## 🛠️ Scripts Útiles

```bash
# Generar NEXTAUTH_SECRET
npm run generate-secret

# Verificar variables de entorno
npm run verify-env

# Configurar base de datos (ejecutar migraciones)
npm run setup-db
```

## 📖 Documentación Completa

Para más detalles, lee: **[CONFIGURAR_VERCEL_PRODUCCION.md](./CONFIGURAR_VERCEL_PRODUCCION.md)**

## 🆘 ¿Aún no funciona?

1. **Revisa los logs en Vercel:**
   - Ve a tu proyecto → Deployments → Click en el deployment → Functions
   - Busca errores en `/api/appointments` y `/api/contact`

2. **Verifica la consola del navegador:**
   - Abre DevTools (F12)
   - Ve a la pestaña "Console"
   - Busca errores en rojo

3. **Verifica que las tablas existan en Supabase:**
   ```bash
   npx prisma studio
   ```
   Deberías ver: `appointments`, `contact_submissions`, etc.

---

**¡Eso es todo!** Con estos 3 pasos simples, tu aplicación debería funcionar perfectamente en producción. 🎉
