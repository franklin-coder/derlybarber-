# 🗄️ Guía: Configurar Base de Datos Supabase

## ✅ Tu Información de Supabase

- **Project URL:** https://qjlydtbbragytngcrjvd.supabase.co
- **Database Host:** db.qjlydtbbragytngcrjvd.supabase.co
- **Password:** Qu!t@s0l2025*

## 🔧 Paso 1: Configurar DATABASE_URL en .env

Abre `nextjs_space/.env` y agrega o actualiza la línea `DATABASE_URL`:

```env
DATABASE_URL="postgresql://postgres:Qu%21t%40s0l2025%2A@db.qjlydtbbragytngcrjvd.supabase.co:5432/postgres"
```

**⚠️ IMPORTANTE:** La contraseña debe estar codificada en URL:
- `!` → `%21`
- `@` → `%40`
- `*` → `%2A`

## 🔧 Paso 2: Generar Cliente de Prisma

```bash
cd nextjs_space
yarn prisma generate
```

## 🔧 Paso 3: Crear Tablas en la Base de Datos

```bash
yarn prisma db push
```

Esto creará las siguientes tablas:
- ✅ `appointments` - Para guardar las reservas
- ✅ `contact_submissions` - Para guardar los mensajes de contacto
- ✅ `users`, `accounts`, `sessions` - Para autenticación
- ✅ `blog_posts`, `comments` - Para el blog

## 🔧 Paso 4: Verificar Conexión

```bash
yarn test-db
```

Deberías ver:
```
✅ Database connection successful!
✅ appointments exists
✅ contact_submissions exists
```

## 🧪 Paso 5: Probar que Funciona

1. **Inicia el servidor:**
   ```bash
   yarn dev
   ```

2. **Prueba el formulario de contacto:**
   - Ve a: http://localhost:3000/contact
   - Llena el formulario
   - Envía el mensaje
   - Revisa la consola del servidor: deberías ver `✅ Contact submission saved to database`

3. **Prueba una reserva:**
   - Ve a: http://localhost:3000/booking
   - Reserva una cita
   - Revisa la consola: deberías ver `✅ Appointment saved to database`

4. **Verifica en Supabase:**
   - Ve a tu proyecto en Supabase
   - Table Editor → `contact_submissions` → Deberías ver tu mensaje
   - Table Editor → `appointments` → Deberías ver tu reserva

## ✅ Resultado Esperado

Después de configurar:

1. ✅ **Reservas se guardan** en la tabla `appointments`
2. ✅ **Mensajes de contacto se guardan** en la tabla `contact_submissions`
3. ✅ **Emails se envían** automáticamente
4. ✅ **Puedes ver los datos** en Supabase Table Editor

## 🆘 Si Hay Errores

### Error: "P1001 - Can't reach database server"
- Verifica que la DATABASE_URL esté correcta
- Verifica que la contraseña esté codificada (con %21, %40, %2A)
- Verifica que Supabase esté activo

### Error: "P1000 - Authentication failed"
- Verifica que la contraseña sea correcta
- Asegúrate de que esté codificada en la URL

### Error: "Table does not exist"
- Ejecuta: `yarn prisma db push`
- Verifica que se crearon las tablas

---

**¡Sigue estos pasos y tu base de datos estará funcionando!** 🎉

