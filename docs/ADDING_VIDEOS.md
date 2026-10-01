# Add or replace cooking videos in Cursor / Claude Code

All videos start expanded at full width. The Show/Hide video button retracts them; hiding stops playback. They play only when pressed.

The exported website works without ChatGPT. Videos are hosted by their creators on YouTube; healthycooks stores the video ID and credit in `dist/recipes.js`. `dist/app.js` creates the YouTube player only when someone presses Play. This implementation needs no YouTube API key and does not upload or host video files.

## Easiest workflow

1. Open the exported healthycooks folder in Cursor or Claude Code.
2. Run `npm run dev`; open http://localhost:5173.
3. Find a relevant creator video, watch it and copy its YouTube link.
4. Tell your coding assistant which recipe, step and cooking method it belongs to. Ask it to update the `videos` array in `dist/recipes.js`, keep creator credit and preserve the recipe's ingredient amounts.
5. Check playback, the external YouTube link and each method choice. Publish your changed files through your own hosting workflow when ready.

You can continue giving plain-language requests such as “Add this video to the salmon air-fryer step; keep it out of the oven method.” Your assistant edits the files; you do not need to hand-write an iframe. You may also use a screenshot to explain UI changes.

## Real example already in this project

```js
{
  id: "gbeZAN0mOi8",
  title: "Air fryer salmon",
  creator: "Lisa Bryan / Downshiftology",
  kind: "reference",
  sourceUrl: "https://downshiftology.com/recipes/air-fryer-salmon/",
  caption: "Air-fryer technique; skip the mustard and spices. Use our oil and finish with our dressing.",
  start: 0,
  end: null
}
```

The ID is the part after `v=` in a normal YouTube link, or after `/shorts/` in a Shorts link. Keep exactly the 11-character ID; do not paste an entire URL into `id`.

- `kind: "short"`: a genuinely short demonstration.
- `kind: "technique"`: a focused demonstration whose duration is not being advertised.
- `kind: "chapter"`: a specific relevant chapter in a longer video.
- `kind: "reference"`: a full recipe/reference, labelled in the creator byline.
- `start` / `end`: seconds, only when the actual boundaries have been checked. Leave `end: null` when unknown. These player settings do not create a new edited video.
- `caption`: one concise sentence about technique or ingredient differences.
- `verification`: optional internal audit metadata; not displayed in the cooking interface.

## Match the method

A step may have `methods`. Method fields override the step's fields, so put a method-specific video on that method, or use `videos: []` on alternatives that must not inherit it. For example, the salmon oven method clears the air-fryer video. `activeDemo()` currently displays the first video in the active step's `videos` array.

Check the actual action, ingredient size and equipment. A video showing cubes should not teach the timing for a whole fillet. Avoid making users cut or season twice. Keep the written ingredient list authoritative when a reference uses different seasonings.

## What can stop a video working?

Creators can remove videos, make them private or disable embedding; some videos have age/region restrictions. The “Watch on YouTube” link is the fallback. Replace an unavailable reference with another suitable one. No ChatGPT subscription is involved in serving these embeds, but visitors need internet access.

Use the creator's original hosted player and retain attribution. Downloading, cutting, rehosting or taking creator stills is a separate rights question; an embed does not grant those rights. New footage may require creator permission/licensing.

## After edits

Run `node --check dist/recipes.js` and `node --check dist/app.js`. Rebuild the proposed SQL seed with `node scripts/export-seed.cjs` after changing recipe content. The Supabase files remain a draft, not a live database. Use Git commits to keep a working version before changes. Your portable package includes source notes and handoff instructions, not the full original chat.
