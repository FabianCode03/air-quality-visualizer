# Air Quality Visualizer

## Project description

Our air quality visualizer offers real-time data from monitoring stations and presenting them through intuitive visualizations. With customizable filters for specific stations, timeframes and locations, our user-centric approach ensures quick and easy access to relevant information. All data is fetched by the api from the Umweltbundesamt.

## Features

1. Filter panel - in the upper left corner:
   Users can fine-tune their data, offering a range of customization options for a personalized interface.
   Navigate through specific time frames and filter results based on various factors such as the measurement station's location (e.g., within a city). Autocomplete input fields enable "fly-to-station" feature to highlight the selected values and show them on the interactive map.

2. Filter slider - in the lower left corner:
   The slider filters the stations based on the air quality index, allowing the user to only show meassurements of a specific range of values.
   If you want to hide or show the stations with no meassurements, you can toggle them by using the button on the right.

3. Information panel - in the upper right corner:
   For easy interpretation of displayed data, a dedicated panel on the right provides general information about the number of stations, the number of datasets and their values

4. Interactive Map:
   Powered by OpenStreetView, our map displays station locations, air quality indices, and various overlays highlighting regional states by using geo json overlays. The map is implemented across the whole width of the screen to provide our users a modern look and feel, while having enough room to display data. It is touch compatible and optimized for fast scrolling and zooming relative to the amount of information displayed.

## Continuation of the project:

1. Enhanced Station Information:
   Clicking on a station or selecting it from the filter panel will reveal detailed information about the station in the Information panel. This will contain station specific information like concrete values of populants, station uptime and their specific locations.

2. Extend our options listed in the filter panel:
   It shall be possible to query specific populance by station and graph them by exceedences.

## Contributors

- Fabian Behrendt 36334
- Florian Wollensak 36369
- Dominik Mally 36621

## Time Spent

450 Commits on Github over all Branches

## Tools and Frameworks

- Vue 3 Options API
- Vuetify
- ChatGPT
- Copilot
- Vue Datepicker: https://vue3datepicker.com/
- Navbar Implementation:
  - [YouTube Tutorial 1](https://www.youtube.com/watch?v=pbU9JxMriOo)
  - [YouTube Tutorial 2](https://www.youtube.com/watch?v=Qnj5CsUD0cs&t=12s)
- API endpoint: https://luftqualitaet.api.bund.dev/

## Getting Started

To run the Air Quality Visualizer application, follow these steps:

1. Install dependencies:

   ```
   npm install
   ```

2. Start the proxy-server:

   ```
   npm run startServer
   ```

3. Open the url https://fabiancode03.github.io/air-quality-visualizer/ or run it locally by typing:

   ```
   npm run dev
   ```

Now, you should be able to access our application :)
