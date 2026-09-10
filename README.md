# Europa Pharmaceuticals — easy upload

The full name **Europa Pharmaceuticals** appears together in matching type, without a separate small “Pharmaceuticals” subtitle. The signature retains Anar Ahmadzada, Head of Business Development, his existing mobile and WhatsApp numbers, the linked Boran&Co crest, and the original confidentiality paragraph.

The Europa logo links to https://www.europapharmaceutical.com/. The link is included when copying the signature into Outlook or downloading the email HTML.

The contact grid also includes a clickable Web link to https://www.europapharmaceutical.com/ and the Office address: Štefánikova 879/5, 811 06 Bratislava, Slovakia.

## Upload these four files

There are **no subfolders**. All the page code is contained in `index.html`.

```text
index.html
europa-emblem.png
boranco-crest.png
README.md
```

1. Right-click the downloaded ZIP in Windows and choose **Extract All**.
2. Open the extracted location until you see the four files above.
3. Open the main file list of your GitHub repository. Choose **Add file → Upload files**.
4. Select all four extracted files together and drag them into the upload area. Upload the files themselves, not the ZIP.
5. Choose **Commit changes** to save them. This replaces the previous `index.html` when uploaded to the same repository root.

Previously uploaded CSS or JavaScript files can remain; this new page does not use them. Both PNG files must be next to `index.html` in the main repository file list. You do not need to create an `assets` folder.

If the repository is connected to Vercel, wait for its deployment to finish, then open the published page and refresh it. For GitHub Pages, the usual publishing source is your main branch and **/(root)** in **Settings → Pages**.

## Copy into Outlook

Use **Copy signature** on the published HTTPS page, then paste into Outlook's desktop or web signature editor. The logos use the public page address automatically. You can preview locally by opening `index.html`, but copying requires the deployed address so recipients can load the images.

Use the page's width selector to check the layout. On very narrow screens, the full brand name may wrap naturally using the same type style; it is not forced into two different wordmark lines. The signature keeps a fluid width.

The Outlook phone app can strip visual formatting when pasting into its signature settings. The Phone preview is a layout check, not a guarantee of mobile-app signature installation.

To change personal details later, edit the `EUROPA_SIGNATURE_CONFIG` block near the bottom of `index.html`. The original artwork remains in the earlier source package; only the two email logos are needed here.

Official GitHub help: https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository
