# 🔧 Solución Error Database en Vercel

## ❌ Error Actual

```
Environment Variable "DATABASE_URL" references Secret "database_url", which does not exist.
```

## 🔍 Causa del Problema

Vercel está interpretando el valor de `DATABASE_URL` como una referencia a un Secret en lugar de un valor directo. Esto puede pasar cuando:
- El valor tiene caracteres especiales mal codificados
- Vercel detecta un formato que parece un secret
- Hay espacios o caracteres invisibles

## ✅ Solución

### Paso 1: Eliminar la Variable Actual

1. En Vercel, ve a tu proyecto
2. Settings → Environment Variables
3. **Elimina** la variable `DATABASE_URL` actual
4. Si hay `DIRECT_URL`, también elimínala temporalmente

### Paso 2: Agregar DATABASE_URL Correctamente

1. Haz clic en **"+ Add New"**
2. **Key:** `DATABASE_URL`
3. **Value:** Pega esta URL completa (sin espacios, sin comillas):

```
postgresql://postgres:Qu%21t%40s0l2025%2A@db.qjlydtbbragytngcrjvd.supabase.co:5432/postgres
```

**⚠️ IMPORTANTE:**
- La contraseña debe estar codificada en URL:
  - `!` → `%21`
  - `@` → `%40`
  - `*` → `%2A`
- Sin comillas alrededor del valor
- Sin espacios antes o después

### Paso 3: Configurar DIRECT_URL (Opcional)

Si usas Prisma con Supabase, también necesitas `DIRECT_URL`:

1. **Key:** `DIRECT_URL`
2. **Value:**

```
postgresql://postgres:Qu%21t%40s0l2025%2A@db.qjlydtbbragytngcrjvd.supabase.co:5432/postgres
```

### Paso 4: Verificar Otras Variables

Asegúrate de que estas variables estén configuradas:

```
EMAIL_USER=minina.ia25@gmail.com
EMAIL_PASSWORD=hrdumlvswpigyvgc
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
NEXTAUTH_SECRET=tu_secret_generado
NEXTAUTH_URL=https://tu-proyecto.vercel.app
```

### Paso 5: Configurar Build Settings

En la configuración del proyecto:

1. **Root Directory:** `nextjs_space` (si tu proyecto está en esa carpeta)
2. **Build Command:** `prisma generate && next build`
3. **Install Command:** `npm install` o `yarn install`

### Paso 6: Redeploy

1. Ve a la pestaña "Deployments"
2. Haz clic en los tres puntos (...) del último deployment
3. Selecciona "Redeploy"
4. O simplemente haz un nuevo push a GitHub

## 🔍 Verificar que Funciona

Después del deploy, verifica:

1. **Logs de Build:**
   - Deberías ver: `Prisma Client generated successfully`
   - No deberías ver errores de conexión a la base de datos

2. **Logs de Runtime:**
   - Ve a tu deployment → "Functions" → "View Function Logs"
   - No deberías ver errores de `DATABASE_URL`

3. **Probar la Aplicación:**
   - Intenta hacer una reserva
   - Intenta enviar un mensaje de contacto
   - Revisa los logs si hay errores

## 🆘 Si Aún Da Error

### Opción 1: Usar Connection Pooling de Supabase

Supabase recomienda usar el connection pooler. Actualiza `DATABASE_URL` con:

```
postgresql://postgres.qjlydtbbragytngcrjvd:Qu%21t%40s0l2025%2A@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

### Opción 2: Verificar el Formato

Asegúrate de que el valor NO tenga:
- Comillas al inicio o final
- Espacios
- Saltos de línea
- Caracteres invisibles

### Opción 3: Usar Secrets de Vercel (Alternativa)

Si prefieres usar Secrets:

1. Ve a Settings → Secrets
2. Crea un nuevo Secret llamado `database_url`
3. Pega el valor de la conexión
4. En Environment Variables, usa: `@database_url`

Pero es más fácil usar el valor directo.

## 📋 Checklist

Antes de hacer deploy, verifica:

- [ ] `DATABASE_URL` está configurada sin comillas
- [ ] La contraseña está codificada (%21, %40, %2A)
- [ ] No hay espacios en el valor
- [ ] Root Directory está configurado correctamente
- [ ] Build Command incluye `prisma generate`
- [ ] Todas las variables de entorno están configuradas

---

**¡Sigue estos pasos y el error se resolverá!** 🎉

