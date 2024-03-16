# LeetCode Dislikes

The LeetCode team followed the global idea of hiding negative feedback and hid the dislike counts. This extension shows them.

## How it works?

They didn't remove the dislike counts from the API, so the extension sends an additional request to obtain them and then displays them on the UI.
The code is somewhat hardcoded, which means it may break easily if they make any changes.
However, the logic is straightforward, around 80 lines of code.

## How to use it?

Open [Chrome Extensions](chrome://extensions/), toggle developer mode, and load the unpacked extension.