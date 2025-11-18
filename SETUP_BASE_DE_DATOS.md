# 🗄️ Configuración de Base de Datos (Supabase)

## ⚠️ IMPORTANTE - Leer antes de hacer deploy

Este documento explica cómo configurar correctamente la base de datos antes de deployar la aplicación en Vercel.

---

## 📋 Problema Identificado

El comando `prisma db push --accept-data-loss` se removió del `vercel.json` porque causaba errores durante el build en Vercel:

```
Error: P1001: Can't reach database server at `db.qjlydtbbragytngcrjvd.supabase.co:5432`
Error: Command "prisma generate && prisma db push --accept-data-loss && next build" exited with 1
```

**Razón:** Vercel no puede conectarse a Supabase durante el proceso de build por restricciones de red y seguridad.

---

## ✅ Solución

Las tablas de la base de datos deben crearse **ANTES** de hacer el deploy a Vercel, ejecutando el comando desde tu máquina local.

---

## 🚀 Pasos para Configurar la Base de Datos

### 1️⃣ Verificar las Variables de Entorno Locales

Asegúrate de tener un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
# Base de Datos Supabase
DATABASE_URL="postgresql://postgres.qjlydtbbragytngcrjvd:[TU_PASSWORD]@db.qjlydtbbragytngcrjvd.supabase.co:5432/postgres"
DIRECT_URL="postgresql://postgres.qjlydtbbragytngcrjvd:[TU_PASSWORD]@db.qjlydtbbragytngcrjvd.supabase.co:5432/postgres?pgbouncer=true"
```

> **📝 Nota:** Reemplaza `[TU_PASSWORD]` con la contraseña real de tu proyecto Supabase.

---

### 2️⃣ Instalar Dependencias

Si aún no has instalado las dependencias, ejecuta:

```bash
npm install --legacy-peer-deps
```

---

### 3️⃣ Crear las Tablas en Supabase

Desde la raíz del proyecto, ejecuta el siguiente comando:

```bash
npx prisma db push
```

Este comando:
- 📊 Lee tu esquema de Prisma (`prisma/schema.prisma`)
- 🔗 Se conecta a tu base de datos Supabase
- 🏗️ Crea todas las tablas y relaciones necesarias

---

### 4️⃣ Verificar la Creación de Tablas

Para confirmar que las tablas se crearon correctamente:

#### Opción A: Prisma Studio
```bash
npx prisma studio
```
Esto abrirá una interfaz visual donde puedes ver todas tus tablas.

#### Opción B: Dashboard de Supabase
1. Accede a [supabase.com](https://supabase.com/dashboard)
2. Selecciona tu proyecto
3. Ve a **Table Editor** en el menú lateral
4. Verifica que las tablas estén creadas

---

### 5️⃣ Configurar Variables de Entorno en Vercel

Antes de hacer deploy, asegúrate de que las siguientes variables estén configuradas en Vercel:

1. Ve a tu proyecto en [Vercel](https://vercel.com)
2. Settings → Environment Variables
3. Agrega:
   - `DATABASE_URL`
   - `DIRECT_URL`
   - Otras variables requeridas (ver `.env.example`)

---

## 🔄 Workflow Recomendado

### Primera vez / Cambios en el Schema

Cuando necesites modificar el esquema de la base de datos:

1. **Local:** Edita `prisma/schema.prisma`
2. **Local:** Ejecuta `npx prisma db push`
3. **Local:** Verifica con `npx prisma studio`
4. **Git:** Haz commit de los cambios
5. **Vercel:** El deploy se ejecutará automáticamente (sin `db push`)

---

## ⚙️ Comandos Útiles de Prisma

| Comando | Descripción |
|---------|-------------|
| `npx prisma db push` | Sincroniza el schema con la base de datos |
| `npx prisma studio` | Abre interfaz visual para ver/editar datos |
| `npx prisma generate` | Genera el cliente de Prisma (se hace automáticamente) |
| `npx prisma migrate dev` | Crea migraciones (para desarrollo con historial) |
| `npx prisma db pull` | Genera schema desde una BD existente |

---

## 🆘 Solución de Problemas

### Error: "Can't reach database server"

**Causa:** La URL de conexión es incorrecta o el servidor no es accesible.

**Solución:**
1. Verifica que `DATABASE_URL` en `.env` sea correcta
2. Confirma que tu IP está en la whitelist de Supabase (o usa IPv4)
3. Verifica que tu proyecto Supabase esté activo

---

### Error: "Environment variable not found: DATABASE_URL"

**Solución:** Asegúrate de tener el archivo `.env` en la raíz del proyecto.

---

### Las tablas no aparecen en Supabase

**Solución:**
1. Ejecuta `npx prisma db push` nuevamente
2. Revisa el output en la terminal para ver errores
3. Verifica que estés conectado al proyecto correcto de Supabase

---

## 📚 Recursos Adicionales

- [Documentación de Prisma](https://www.prisma.io/docs)
- [Guía de Supabase + Prisma](https://supabase.com/docs/guides/integrations/prisma)
- [Deployment en Vercel con Prisma](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-vercel)

---

## ✅ Checklist Pre-Deploy

Antes de hacer deploy a Vercel, confirma que:

- [ ] Ejecutaste `npx prisma db push` localmente
- [ ] Las tablas aparecen en Supabase Dashboard
- [ ] Todas las variables de entorno están en Vercel
- [ ] El archivo `vercel.json` está actualizado (sin `db push`)
- [ ] Hiciste commit de todos los cambios

---

**🎉 ¡Listo! Ahora puedes hacer deploy a Vercel sin errores de base de datos.**
