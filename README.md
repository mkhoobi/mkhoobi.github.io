# Portfolio site

A one-page portfolio in plain HTML, CSS and JavaScript. There is no build step, no framework and no server code, so it runs on any static host or plain web server.

```
portfolio/
├── index.html      ← all your content lives here
├── styles.css      ← colors, fonts, layout
├── script.js       ← dark mode, mobile menu, scroll fade-in
└── assets/         ← images, favicon, CV
```

## Editing the content

All text is in `index.html`, filled in from the CV of October 2026. To add a publication, copy an `<li>` inside a `<ol class="pubs">` block; to add a research card, copy an `<article class="card">` block. The photo is `assets/mahta.jpg` and the downloadable CV is `assets/resume.pdf`, so replace those files to update them. Change `--accent` at the top of `styles.css` to change the site's main color.

## Preview locally

Open `index.html` directly in a browser, or run a tiny local server from this folder:

```sh
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Host it

Any of these work. Upload the contents of this folder so `index.html` sits at the root.

**GitHub Pages (free)**
1. Create a repository (e.g. `your-username.github.io`) and push these files to it.
2. In the repo, go to Settings → Pages, choose "Deploy from a branch", pick `main` and `/ (root)`.
3. The site goes live at `https://your-username.github.io`.

**Netlify or Cloudflare Pages (free)**
Drag this folder onto Netlify's "Deploy manually" page, or connect the GitHub repo in Cloudflare Pages with no build command and output directory `/`.

**Your own server (nginx)**
Copy the folder to the server, for example to `/var/www/portfolio`, and add:

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /var/www/portfolio;
    index index.html;
    location / { try_files $uri $uri/ =404; }
}
```

Then reload nginx and add HTTPS with `sudo certbot --nginx -d yourdomain.com`.

**Docker**
```sh
docker run -d -p 8080:80 -v "$PWD":/usr/share/nginx/html:ro nginx:alpine
```

## Custom domain

On GitHub Pages, Netlify or Cloudflare, add the domain in the site settings and create the DNS record they show you (usually a `CNAME` pointing at the host). On your own server, point an `A` record at the server's IP.
