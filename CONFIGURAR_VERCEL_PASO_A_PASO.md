# 🚀 Configurar Vercel - Paso a Paso

## ✅ Problema Resuelto

He eliminado las referencias a Secrets del `vercel.json`. Ahora debes configurar las variables directamente en Vercel.

## 📋 Pasos para Configurar Vercel

### Paso 1: Ir a Environment Variables

1. Ve a tu proyecto en Vercel
2. Settings → Environment Variables
3. Elimina cualquier variable que tenga el formato `@nombre_secret`

### Paso 2: Agregar Variables de Entorno

Agrega estas variables **UNA POR UNA**:

#### 1. DATABASE_URL

- **Key:** `DATABASE_URL`
- **Value:** 
```
postgresql://postgres:Qu%21t%40s0l2025%2A@db.qjlydtbbragytngcrjvd.supabase.co:5432/postgres
```
- **Environment:** Production, Preview, Development (marca las tres)

**⚠️ IMPORTANTE:** 
- Sin comillas
- La contraseña codificada: `!` → `%21`, `@` → `%40`, `*` → `%2A`

#### 2. EMAIL_USER

- **Key:** `EMAIL_USER`
- **Value:** `minina.ia25@gmail.com`
- **Environment:** Production, Preview, Development

#### 3. EMAIL_PASSWORD

- **Key:** `EMAIL_PASSWORD`
- **Value:** `hrdumlvswpigyvgc`
- **Environment:** Production, Preview, Development

#### 4. EMAIL_HOST

- **Key:** `EMAIL_HOST`
- **Value:** `smtp.gmail.com`
- **Environment:** Production, Preview, Development

#### 5. EMAIL_PORT

- **Key:** `EMAIL_PORT`
- **Value:** `587`
- **Environment:** Production, Preview, Development

#### 6. NEXTAUTH_SECRET

- **Key:** `NEXTAUTH_SECRET`
- **Value:** Genera uno con: `openssl rand -base64 32`
- **Environment:** Production, Preview, Development

#### 7. NEXTAUTH_URL

- **Key:** `NEXTAUTH_URL`
- **Value:** `https://tu-proyecto.vercel.app` (reemplaza con tu URL real)
- **Environment:** Production, Preview, Development

### Paso 3: Configurar Build Settings

En la configuración del proyecto:

1. **Root Directory:** `nextjs_space` (si tu proyecto está en esa carpeta)
2. **Framework Preset:** Next.js (debería detectarse automáticamente)
3. **Build Command:** `prisma generate && next build` (ya está en vercel.json)
4. **Install Command:** `npm install && npm install -g prisma` (ya está en vercel.json)

### Paso 4: Verificar que vercel.json Está Correcto

El archivo `vercel.json` ahora solo tiene la configuración de build, sin referencias a secrets.

### Paso 5: Hacer Deploy

1. Ve a la pestaña "Deployments"
2. Si hay un deployment fallido, haz clic en "Redeploy"
3. O haz un nuevo commit y push a GitHub

## 🔍 Verificar que Funciona

### Durante el Build:

Revisa los logs del build. Deberías ver:
```
✓ Prisma Client generated successfully
✓ Compiled successfully
```

### Después del Deploy:

1. **Probar la aplicación:**
   - Ve a tu URL de Vercel
   - Intenta hacer una reserva
   - Intenta enviar un mensaje de contacto

2. **Revisar logs:**
   - Ve a tu deployment → "Functions" → "View Function Logs"
   - No deberías ver errores de `DATABASE_URL` o conexión

3. **Verificar en Supabase:**
   - Ve a tu proyecto en Supabase
   - Table Editor → `appointments` → Deberías ver las reservas
   - Table Editor → `contact_submissions` → Deberías ver los mensajes

## 🆘 Si Aún Da Error

### Error: "DATABASE_URL references Secret"

- Verifica que eliminaste todas las variables con formato `@nombre`
- Asegúrate de que `DATABASE_URL` tiene el valor directo (no `@database_url`)

### Error: "Cannot connect to database"

- Verifica que la contraseña esté codificada correctamente
- Verifica que el host sea correcto: `db.qjlydtbbragytngcrjvd.supabase.co`
- Verifica que el puerto sea `5432`

### Error: "Table does not exist"

- Ejecuta `prisma db push` localmente primero
- O agrega un script de migración en el build

## 📋 Checklist Final

Antes de hacer deploy, verifica:

- [ ] `vercel.json` NO tiene referencias a `@secrets`
- [ ] Todas las variables están en Environment Variables de Vercel
- [ ] `DATABASE_URL` tiene el valor directo (no `@database_url`)
- [ ] La contraseña está codificada (%21, %40, %2A)
- [ ] Root Directory está configurado correctamente
- [ ] Build Command incluye `prisma generate`

---

**¡Sigue estos pasos y tu deploy funcionará!** 🎉

