Hey! Here's the GitHub embed tool I've been working on. It lets you embed GitHub markdown files directly into MyCourses content pages.

**Generator:** https://people.rit.edu/~jxtadm/mycourses-git-reader/generate-embed.html

**Steps:**
1. Open the generator link above
2. Paste a GitHub URL into the top field (e.g. `https://github.com/jptweb/IGME-340-Shared/blob/main/weekly/3A.md`) — the repo and file path will auto-fill
3. Copy the **full embed** code (use the Copy button)
4. In MyCourses, create or edit a content page
5. Switch to the HTML editor (click the `</>` button in the WYSIWYG toolbar)
6. Paste the embed code in and save

The content will update automatically when you push changes to GitHub (there's a ~30 min cache). You can also click the refresh button in the widget header to force an update. Relative links in the markdown will open the file on GitHub in a new tab.

Let me know if you run into anything!
