# Temitope Waheeb | Portfolio

Personal research and professional portfolio of **Temitope Benedict Waheeb**, geospatial scientist and geoscientist working on remote sensing, space-time pattern mining, explainable GeoAI and climate risk in Nigeria and Africa.

**Live site:** https://bherney.github.io/Portfolio/

## Sections

- **About**: profile, highlights, current research (HeatSense Nigeria), areas of work, technical skills
- **Resume**: education, research and professional experience, teaching, awards, certifications
- **Awards**: awards, scholarships and fellowships, each with its announcement, certificate or photographs
- **Certificates**: courses, professional certificates and memberships, filterable, with the certificate image, original PDF or online verification link
- **Publications**: peer-reviewed articles, manuscripts under review, conference presentations
- **Portfolio**: research figures, Python and statistics work, spatial analysis maps, dashboards and web design. Click any project to open it in the built-in viewer.
- **Activities**: conference talks, trainings delivered, volunteering and outreach, with certificates and photographs
- **Contact**: message form (Formspree)

A downloadable CV sits in the sidebar and at the top of the Resume page (`assets/docs/Temitope_Waheeb_CV.pdf`).

## Adding a new project

Each project is one `<li class="project-item">` block in `index.html`. Put the thumbnail in `assets/images/` and the large version in `assets/images/full/`, then list every large image in `data-images`, separated by `|`. The description and buttons shown in the viewer go inside the hidden `project-details` block.

## Adding a certificate, award or activity

Proof images live in `assets/images/proof/full/` (large, about 1600 px) and `assets/images/proof/thumbs/` (640 x 480). Each card is one `<li class="proof-item" data-proof-item>` block inside the Awards, Certificates or Activities page. Copy an existing card, change the image paths in `data-images` (separate several with `|`), add matching captions in `data-captions`, and set `data-cat` to one of the page's filter keys. The filter counts are written into the buttons, so update the number when you add a card.

## Links

- GitHub: https://github.com/Bherney
- LinkedIn: https://www.linkedin.com/in/temitopewaheeb
- ORCID: https://orcid.org/0009-0009-2401-6481

Built on the open-source vCard template by codewithsadee (MIT licence), customised and extended.
