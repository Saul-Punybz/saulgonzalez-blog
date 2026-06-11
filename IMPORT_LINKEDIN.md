# Importar artículos de LinkedIn al blog

Flujo semi-automático con Claude Code (LinkedIn no ofrece API ni RSS para artículos personales, así que se usa el navegador con tu sesión).

## Cómo usarlo

Di a Claude Code: **"IMPORT LINKEDIN"**

Claude hará automáticamente:

1. Abrir Chrome → `linkedin.com/in/saulgonzalez11/recent-activity/articles/`
2. Extraer los URLs de todos los artículos publicados (`a[href*="/pulse/"]`)
3. Comparar contra los ya importados: `grep -h linkedinUrl content/posts/*.md`
4. Para cada artículo nuevo: abrir la página, extraer título/fecha/contenido completo
5. Convertir a markdown con el frontmatter estándar:
   ```yaml
   ---
   title: "..."
   excerpt: "..."          # primer párrafo, ~180 chars
   date: "YYYY-MM-DD"      # fecha de publicación en LinkedIn
   tags: [...]
   readTime: "N min"       # de LinkedIn o ~200 palabras/min
   cover: "https://images.unsplash.com/..."  # imagen temática
   linkedinUrl: "https://www.linkedin.com/pulse/..."
   ---
   ```
6. `npm run build` para verificar
7. Commit + push + `vercel deploy --prod --yes`
8. Ping IndexNow con los URLs nuevos
9. Actualizar la lista de posts en `public/llms.txt` del sitio principal (saulgonzalez-site) y redeploy

## Notas

- El `linkedinUrl` en el frontmatter activa el badge de LinkedIn en el post y sirve como clave de deduplicación.
- El sitemap, feed.xml y llms.txt del blog se generan solos desde `content/posts/`.
- Requiere sesión de LinkedIn activa en Chrome.
