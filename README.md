# integration4

## Team Members
- Maria (Shaper & Plant)
- Muhammed (Teamworker & Implementer)
- Alex (Completer/Finsher & Specialist)
- Maxim (Coordinator & Monitor Evaluator)

## List of agreements
- Be consistent

### Team Work
- Always communicate on the work you have done
- Try to finish your tasks on time, if you will not be ready on time let the others know so they maybe can help you
- Listen to each other :D
- Live, laugh, love <3

### Design
- Use gaps that are divideble by 4 (easyer for development with rem)
- Stick to the style we agreed on

### Development
- BEM Notation
- Never merge on the main branch alown

## Links
- [Figjam](https://www.figma.com/board/Nr3fZrnXCkMB2hazPraKhG/Integration-4-%7C-ABBY?node-id=0-1&t=FO36EDk33gBNd9JH-1)
- [Figma](https://www.figma.com/design/ezuupgFzktTVkkimQ2tv5W/Figma-%7C-Integration-4?node-id=1-4&t=3RKdeLVnpljbZjHl-1)
- [Website](https://integration4.tamperemaxim.be/)
- [Kiosk](https://integration4.tamperemaxim.be/kiosk/home)

## Setup

### Set up
1. Open the project in VS Code
2. Make a .env file and place the following items in it (or use the example.env and remove the “example”)
  - VITE_API_BASE_URL=https://bygnwlunazdyanvgaial.supabase.co
  - VITE_API_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ5Z253bHVuYXpkeWFudmdhaWFsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk1NTkwOTMsImV4cCI6MjA2NTEzNTA5M30.jDAKLpZnVbORKs2QcBpHe4EF4sji8jP6WNWJDSkSgQs
3. Then open the terminal and type “npm i”
4. Then you can type “npm run dev”

### Thinks to keep in mind
1. 2 Projects: We have 2 separate “projects” in one.
  - Kiosk, the homepage of the kiosk is located at “/kiosk/home”, the kiosk is made on iPad Air format (cause thats the closes to a kiosk screen) so when you are on the site go to the inspecter click on the “toggle device toolbare” button and choose for “iPad Air” in the drop-down on the top of your screen for the best experience.
  - Website, the homepage is located at the start url so “/“, the website is made for phone because you go to the site by scanning QR-codes so when you are on the site go to the inspecter click on the “toggle device toolbare” button and choose “iPhone SE” in the drop-down on the top of your screen for the best experience.
2. 2 Phase: The event has different phases, but on the Jury/when you guys are grading our assignment, you can’t wait for 4 days to see the other phase, so we implemented things that you still will be able to check the features of the other phases :). Here are the different things you can do:
  - Kiosk, on the kiosk, you can switch the phase by clicking on the “you@abby” text (with the blue background). By doing that, you can experience the voting
  - Website, here we don’t have a switch phase button, but we still made it possible for you to check the voting. On the participation page, even though the boxes are grayed out, we made it still possible for you guys to click on them so you can check them out.
