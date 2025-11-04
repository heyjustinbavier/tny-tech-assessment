Take home tech assessment for The New Yorker.

Downloading the project:
1. Clone repository, change into the directory: cd tny-tech-assessment
2. Install dependencies: npm install

Running the development server:
1. To start development server: npm start

Building the project:
1. To build static files to /dist: npm run build
2. To run the build on your machine: npx serve dist -l 3000 (this may require you to install the serve package globally) 

Notes: 
1. Some commits were made from my secondary Github account due to work done on my laptop vs home PC, but all work was done solely by me.
2. The copy for the article opener / introduction is loaded from a JS file, in a real-life scenario I'd replace that with a CMS integration so the author could make edits on their own time.
3. Currently the lights are animated based on scroll to create an interactive experience for the reader, but I've got an automatic loop animation ready to go in the comments as well if feedback requests it.
4. A GUI library (I like dat.GUI, https://github.com/dataarts/dat.gui) would be a good tool to use to dial in the cloud positioning during the design review stage. It would let collaborators experiment with the arrangement and share their preferred settings, which I would then use to update the current implementation.
   
