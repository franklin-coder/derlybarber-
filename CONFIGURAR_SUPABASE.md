# 🔧 Configurar Supabase - Base de Datos

## 📋 Información de tu Proyecto Supabase

- **Project URL:** https://qjlydtbbragytngcrjvd.supabase.co
- **Database Host:** db.qjlydtbbragytngcrjvd.supabase.co
- **Database Port:** 5432
- **Database Name:** postgres
- **Database User:** postgres
- **Database Password:** Qu!t@s0l2025*
- **Anon Key:** eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqbHlkdGJicmFneXRuZ2NyanZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM0MDg1NDEsImV4cCI6MjA3ODk4NDU0MX0.5JwOFRPOFIoVxIX4gg2pg0oEXw2yxVVdTkI67t0wJjg

## 🔗 Connection String

La contraseña tiene caracteres especiales que deben ser codificados en la URL:
- `!` = `%21`
- `@` = `%40`
- `*` = `%2A`

**DATABASE_URL:**
```
postgresql://postgres:Qu%21t%40s0l2025%2A@db.qjlydtbbragytngcrjvd.supabase.co:5432/postgres
```

## ✅ Pasos para Configurar

1. **Actualizar .env** con la DATABASE_URL
2. **Ejecutar prisma generate** para generar el cliente
3. **Ejecutar prisma db push** para crear las tablas
4. **Verificar conexión** con un test
5. **Probar** guardando una reserva y un mensaje de contacto

---

**¡Vamos a configurarlo ahora!**

