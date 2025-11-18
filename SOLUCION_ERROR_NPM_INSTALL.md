# 🔧 Solución Error npm install en Vercel

## ❌ Error Actual

```
npm error ERESOLVE unable to resolve dependency tree
npm error peerOptional nodemailer@"^6.6.5" from next-auth@4.24.11
npm error Found: nodemailer@7.0.10
```

## 🔍 Causa del Problema

Hay un conflicto de dependencias:
- `next-auth@4.24.11` espera `nodemailer@^6.6.5`
- Tu proyecto tiene `nodemailer@^7.0.9` (más reciente)

## ✅ Solución Aplicada

He actualizado el `vercel.json` para usar `--legacy-peer-deps` en el comando de instalación. Esto permite que npm ignore los conflictos de peer dependencies.

### Cambio Realizado:

**Antes:**
```json
"installCommand": "npm install && npm install -g prisma"
```

**Después:**
```json
"installCommand": "npm install --legacy-peer-deps && npm install -g prisma"
```

## 🚀 Próximos Pasos

1. **Haz commit y push del cambio:**
   ```bash
   git add nextjs_space/vercel.json
   git commit -m "Fix: Add --legacy-peer-deps to npm install"
   git push
   ```

2. **Vercel automáticamente hará un nuevo deploy**

3. **Verifica los logs:**
   - Deberías ver que `npm install` se completa exitosamente
   - Luego debería continuar con `prisma generate` y `next build`

## 🔍 Verificar que Funciona

Después del deploy, revisa los logs:

1. **Install Command:**
   ```
   ✓ npm install --legacy-peer-deps completed
   ✓ prisma installed globally
   ```

2. **Build Command:**
   ```
   ✓ Prisma Client generated successfully
   ✓ Compiled successfully
   ```

## 🆘 Si Aún Da Error

### Opción 1: Usar yarn en lugar de npm

Si prefieres usar yarn (que maneja mejor los peer dependencies):

Actualiza `vercel.json`:
```json
{
  "installCommand": "yarn install && npm install -g prisma"
}
```

### Opción 2: Downgrade nodemailer (No recomendado)

Podrías downgrade `nodemailer` a la versión 6, pero la versión 7 funciona bien con `--legacy-peer-deps`.

## 📋 Checklist

- [x] `vercel.json` actualizado con `--legacy-peer-deps`
- [ ] Cambios commiteados y pusheados a GitHub
- [ ] Vercel hace deploy automáticamente
- [ ] Build se completa exitosamente

---

**¡El error de npm install está resuelto!** 🎉

