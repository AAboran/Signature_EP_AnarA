# Europa Pharmaceuticals — email signature

Anar Ahmadzada · Head of Business Development

An independent static repository for the Europa Pharmaceuticals email signature. It includes a responsive preview, a formatted **Copy signature** button, and **Download HTML**. No build, package installation, API keys, or paid service is required.

[Open the signature preview](index.html)

## Upload to GitHub

Extract the ZIP and upload its **contents** to a new repository root, with `index.html` at the top level. This is a separate Europa package; the previous Boran&Co and Dominika packages remain separate.

To publish with GitHub Pages, open **Settings → Pages**, choose **Deploy from a branch**, choose your repository's branch (usually `main`) and **/(root)**, and save. When the deployment finishes, open the HTTPS address shown by GitHub. The image URLs work with repository subpaths and custom domains. [GitHub publishing instructions](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

The same files can be served by any static HTTPS host. For an existing Vercel static-site setup, use this folder as the site's root; there is no build step.

## Copy into Outlook

1. Open the **published HTTPS page**.
2. Click **Copy signature**.
3. Paste into Outlook's signature editor for Windows, Mac or web, keeping source formatting.
4. Save and send a test email to confirm the layout and logos appear for the recipient.

The signature fills its containing email width. Its copied markup uses inline formatting and presentation tables; no preview width, controls or page styles are included. Keep the logo files at their published URLs so existing signatures can continue loading them. A recipient's email settings may still block remote images.

You can open `index.html` locally to preview the design. Local image paths cannot be used by recipients: the copy and HTML download controls therefore require a public HTTPS deployment address. If using a local preview after deployment, enter that address in the page's **Published site address** field. This changes only the current page session.

The **Phone** width setting previews a narrow email layout. It does not promise that the Outlook phone app will preserve a visual signature pasted into its mobile signature settings.

## Edit personal details

Edit `signature-config.js`, then reload or redeploy the page:

- Name: Anar Ahmadzada.
- Title: Head of Business Development, following the requested senior business-development role.
- Mobile and WhatsApp: reused from Anar's prior signature.
- Europa email, website and office: omitted because they have not been supplied. Add them to their empty fields when available; the contact rows adapt automatically.
- Boran&Co: the group membership text and crest both link to `https://www.boranco.eu`.
- `publicBaseUrl`: normally leave blank; the public deployment address is detected automatically. For a local preview, this can instead contain the exact HTTPS address of the already-deployed page.

Only include details intended to be shared with email recipients.

## Design and asset notes

The signature pairs the supplied gold European map with navy, warm white, a fine gold separator, and restrained serif typography. The company is named **Europa Pharmaceuticals**, as requested; the supplied banner's original “Europa Pharmaceutical” lettering is preserved in the source archive.

The linked Boran&Co crest uses the clean, transparent crest already prepared for the prior Boran&Co signature. The newly supplied original coat of arms is also included unaltered in `originals/`. This keeps the group symbol legible at email size while retaining the supplied artwork.

The confidentiality paragraph is copied **verbatim** from the prior Boran&Co signature, including the agreed 10px type, 15px line spacing and darker grey. No new legal wording has been added.

## Files

```text
index.html                    Preview and installation page
styles.css                    Preview page styles only
signature-config.js           Name, role, contacts and group link
signature.js                  Email HTML and plain-text generator
app.js                        Copy, export and preview controls
assets/europa-emblem.png       Supplied Europa map logo, unaltered
assets/boranco-crest.png       Clean crest from the prior signature
originals/                    Supplied banner and original coat of arms
.nojekyll                     Static GitHub Pages marker
.gitignore                    Local file exclusions
README.md                     This guide
```

## Verification

Browser checks cover wide email, standard email, and narrow phone layouts, including 320px and 390px browser widths. The copied HTML was checked for full-width layout, public image paths under a GitHub Pages repository subpath, both clipboard methods and preservation of the original disclaimer. These are browser/code checks; the package has not been sent through a live Outlook account or published to your GitHub repository.
