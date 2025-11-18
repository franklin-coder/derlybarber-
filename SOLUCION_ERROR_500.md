# 🔧 Solución Error 500

## 🔍 Diagnóstico

El error 500 probablemente se debe a:

1. **DATABASE_URL incorrecta** - Está apuntando a un proyecto viejo
2. **Tablas no existen** - Necesitas ejecutar `prisma db push`
3. **Conexión fallida** - La base de datos no está accesible

## ✅ Solución Paso a Paso

### Paso 1: Actualizar DATABASE_URL

Abre `nextjs_space/.env` y **reemplaza** la línea `DATABASE_URL` con:

```env
DATABASE_URL="postgresql://postgres:Qu%21t%40s0l2025%2A@db.qjlydtbbragytngcrjvd.supabase.co:5432/postgres"
```

**⚠️ IMPORTANTE:** La contraseña debe estar codificada:
- `!` → `%21`
- `@` → `%40`
- `*` → `%2A`

### Paso 2: Generar Cliente de Prisma

```bash
cd nextjs_space
yarn prisma generate
```

### Paso 3: Crear Tablas en la Base de Datos

```bash
yarn prisma db push
```

Esto creará las tablas necesarias.

### Paso 4: Verificar Conexión

```bash
yarn test-db
```

### Paso 5: Reiniciar el Servidor

```bash
# Presiona Ctrl+C para detener
yarn dev
```

## 🧪 Probar

1. Ve a: http://localhost:3000/contact
2. Llena el formulario
3. Envía el mensaje
4. **Revisa la consola del servidor** (no la del navegador)
5. Deberías ver: `✅ Contact submission saved to database`

## 🔍 Verificar el Error Específico

Si el error persiste, revisa la **consola del servidor** (donde corre `yarn dev`). Busca mensajes que empiecen con:
- `❌` - Errores
- `⚠️` - Advertencias
- `🔧` - Soluciones

---

**¡Sigue estos pasos y el error 500 se resolverá!**

