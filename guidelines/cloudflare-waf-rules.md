# Cloudflare WAF Rule Template

Use this custom rule in Cloudflare to reduce bot/scanner 4xx noise.

## Recommended Rule (Managed Challenge)

Expression:

```txt
(http.request.uri.path contains "/wp-admin") or
(http.request.uri.path contains "/wp-login.php") or
(http.request.uri.path contains "/xmlrpc.php") or
(http.request.uri.path contains "/phpmyadmin") or
(http.request.uri.path contains "/.env") or
(http.request.uri.path contains "/vendor/") or
(http.request.uri.path contains "/cgi-bin/") or
(http.request.uri.path contains "/boaform")
```

Action:

```txt
Managed Challenge
```

## Optional Hard Block Rule

If scanner traffic stays high, create a second rule with the same expression and action:

```txt
Block
```

## Notes

- Start with `Managed Challenge` first to avoid false positives.
- Keep your real portfolio routes accessible:
  - `/`
  - `/assets/*`
  - `/favicon.png`
  - `/og-preview.png`
  - `/Nikolai_Grigorev_Resume.pdf`
