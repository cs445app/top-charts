

// import React, { useState, useEffect } from 'react';
// import { IonContent, IonPage, IonSearchbar, IonModal, IonButton } from '@ionic/react';
// import Chart from 'chart.js/auto'; // Import Chart.js library
// import './Search.css'; // Import CSS file

// // Define types for props and search result
// type SearchResult = string[];
// type SearchProps = {};

// // Define the Search component
// const Search: React.FC<SearchProps> = () => {
//   // State hooks for search query, results, and selected result
//   const [searchQuery, setSearchQuery] = useState<string>('');
//   const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
//   const [selectedResult, setSelectedResult] = useState<SearchResult | null>(null);
//   const [showChartModal, setShowChartModal] = useState<boolean>(false);
//   const [selectedStreams, setSelectedStreams] = useState<string>('');
//   const [shouldDisplayElements, setShouldDisplayElements] = useState<boolean>(true); // State to manage visibility of elements

//   // Function to handle search
//   const handleSearch = async (event: CustomEvent) => {
//     const query = (event.detail.value as string) || '';
//     setSearchQuery(query);

//     // Fetch CSV data from the server
//     try {
//       const response = await fetch('src/theme/MusicList.csv');
//       if (!response.ok) {
//         throw new Error('Failed to fetch CSV file');
//       }
//       const csvData = await response.text();

//       // Perform search in fetched CSV data
//       const results = searchData(query, csvData);
//       setSearchResults(results);
//     } catch (error) {
//       console.error('Error fetching CSV file:', error);
//     }
//   };

//   // Function to search CSV data
//   const searchData = (query: string, csvData: string): SearchResult[] => {
//     const rows = csvData.split('\n').map(row => row.split(','));

//     // Filter rows based on artist name
//     const results = rows.filter(row => {
//       const artistName = row[2]; // Index 2 contains the artist name
//       return artistName && artistName.toLowerCase().includes(query.toLowerCase());
//     });

//     return results;
//   };

//   // Function to handle selection of a search result
//   const handleResultSelection = (result: SearchResult) => {
//     setSelectedResult(result);
//     setShowChartModal(true);

//     // Extract streams from the selected result
//     const streamString = result[result.length - 1];
//     const streams = streamString.match(/\d+/g)?.join(','); // Extract all digits and join with commas
//     setSelectedStreams(streams || '');
//   };

//   // Function to display pie chart
//   const displayPieChart = () => {
//     const ctx = document.getElementById('pieChart') as HTMLCanvasElement;
//     if (ctx) {
//       new Chart(ctx, {
//         type: 'pie',
//         data: {
//           labels: ['Total Streams of This Artist', 'Total Streams of Top 200 Artist'],
//           datasets: [{
//             label: 'Total Streams',
//             data: selectedStreams.split(',').map(parseFloat).concat(20093095926.00), // Add the new number to the dataset
//             backgroundColor: ['#007bff', '#ff0000'] // Blue for top 200 artist, Red for this artist
//           }]
//         }
//       });
//     } else {
//       console.error('Canvas element not found');
//     }
//   };

//   // Function to handle modal presentation
//   const handleModalPresentation = () => {
//     displayPieChart();
//   };

//   // Effect to handle modal presentation
//   useEffect(() => {
//     if (showChartModal) {
//       handleModalPresentation();
//     }
//   }, [showChartModal, selectedStreams]);

//   // Effect to set initial visibility of elements
//   useEffect(() => {
//     setShouldDisplayElements(true);
//   }, []);

//   // Function to handle focus on search bar
//   const handleSearchBarFocus = () => {
//     setShouldDisplayElements(false);
//   };

//   return (
//     <IonPage>
//       <IonContent color={'dark'} className="ion-padding">
//         {/* Rectangle Background */}
//         <div className='top-rectangle'></div>   

//         {/* Search bar */}
//         <div className="search-container">
//           <IonSearchbar
//             value={searchQuery}
//             onIonChange={handleSearch}
//             color={'dark'}
//             placeholder="Search Artist"
//             inputMode="text"
//             autocapitalize={''}
//             onFocus={handleSearchBarFocus}
//           ></IonSearchbar>
//         </div>

//         {/* Display search results */}
//         <div className="results-container">
//           {searchResults.map((result, index) => (
//             <div key={index} className="search-result" onClick={() => handleResultSelection(result)}>
//               {/* Display artist, song, and streams */}
//               <p><span className="artist-label">#</span> <span className="artist-result">{result[0]}</span></p>
//               <p><span className="artist-label">Artist:</span> <span className="artist-result">{result[2]}</span></p>
//               <p> <span className="artist-label">Song:</span> <span className='artist-result'>{result[3]}</span></p>
//               <p><span className="artist-label">Streams:   </span><span className='artist-result'>{result[11].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span></p>

//             </div>
//           ))}
//         </div>

//         {/* Modal for displaying pie chart */}
//         <IonModal isOpen={showChartModal} onIonModalDidPresent={handleModalPresentation}>
//           <div className="chart-container">
//             <canvas id="pieChart" width="400" height="400"></canvas>
//             <IonButton  className='gragh-button' onClick={() => setShowChartModal(false)}>Close</IonButton>
//           </div>
//         </IonModal>
//         {shouldDisplayElements && (
//           <>
//             <div className='circle2'></div>  {/* circle */}
//             <span className='dot1'></span>    {/* circle Dot */}
//             <span className='dot2'></span>    {/* circle Dot */}
//             <div className='explain-page'>
//               <h1>Explore Top</h1>
//               <h1> 200 Artists!</h1>
//             </div>
//           </>
//         )}
//       </IonContent>
//     </IonPage>
//   );
// };

// export default Search;

import React, { useState, useEffect } from 'react';
import { IonContent, IonPage, IonSearchbar, IonModal, IonButton } from '@ionic/react';
import Chart from 'chart.js/auto'; // Import Chart.js library
import './Search.css'; // Import CSS file

// Define types for props and search result
type SearchResult = string[];
type SearchProps = {};

// Define the Search component
const Search: React.FC<SearchProps> = () => {
  // State hooks for search query, results, and selected result
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [selectedResult, setSelectedResult] = useState<SearchResult | null>(null);
  const [showChartModal, setShowChartModal] = useState<boolean>(false);
  const [selectedStreams, setSelectedStreams] = useState<string>('');
  const [shouldDisplayElements, setShouldDisplayElements] = useState<boolean>(true); // State to manage visibility of elements

  // Mocked list of data
  const dataList: SearchResult[] = [
    ['1', 'Ariana Grande', 'we cant be friends (wait for your love)', '90071696'],
    ['2', 'Benson Boone', 'Beautiful Things', '333252910'],
    ['3', 'Djo', 'End of Beginning', '157675860'],
    ['4', '¥$', 'CARNIVAL', '190014759'],
    ['5', 'Tate McRae', 'greedy', '926565731'],
    ['6', 'Teddy Swims', 'Lose Control', '340622840'],
    ['7', 'Taylor Swift', 'Cruel Summer', '1447105643'],
    ['8', 'FloyyMenor', 'Gata Only', '111270142'],
    ['9', 'The Weeknd', 'One Of The Girls', '528411083'],
    ['10', 'Mitski', 'My Love Mine All Mine', '688471096'],
    ['11', 'Beyoncé', 'TEXAS HOLD EM', '175482749'],
    ['12', 'Noah Kahan', 'Stick Season', '473059111'],
    ['13', 'Xavi', 'La Diabla', '445897476'],
    ['14', 'Feid', 'LUNA', '339349087'],
    ['15', 'Ariana Grande', 'yes and?', '267347693'],
    ['16', 'Ariana Grande', 'the boy is mine', '39723757'],
    ['17', 'SZA', 'Saturn', '75628581'],
    ['18', 'V', 'FRI(END)S', '14375064'],
    ['19', '21 Savage', 'redrum', '248802351'],
    ['20', 'Travis Scott', 'FE!N', '373874928'],
    ['21', 'Zeynep Bastık', 'Lan', '10133688'],
    ['22', 'Arctic Monkeys', 'I Wanna Be Yours', '1442852469'],
    ['23', 'Natanael Cano', 'Madonna', '24007477'],
    ['24', 'Jack Harlow', 'Lovin On Me', '505542762'],
    ['25', 'Natasha Bedingfield', 'Unwritten', '177419062'],
    ['26', 'Billie Eilish', 'What Was I Made For? [From The Motion Picture ""Barbie""]', '703540573'],
    ['27', 'Dua Lipa', 'Houdini', '329973788'],
    ['28', 'Lord Huron', 'The Night We Met', '738305840'],
    ['29', 'Myke Towers', 'LA FALDA', '168468095'],
    ['30', 'Jung Kook', 'Seven', '1298631252'],
    ['31', 'Ariana Grande', 'bye', '36890849'],
    ['32', 'Dua Lipa', 'Training Season', '87539583'],
    ['33', 'Ariana Grande', 'eternal sunshine', '35140958'],
    ['34', 'Tyla', 'Water', '474330892'],
    ['35', 'Xavi', 'La Víctima', '327932621'],
    ['36', 'YG Marley', 'Praise Jah In The Moonlight', '154623862'],
    ['37', 'Michael Marcagi', 'Scared To Start', '78219696'],
    ['38', 'Kenya Grace', 'Strangers', '626005263'],
    ['39', 'Zach Bryan', 'I Remember Everything', '447782766'],
    ['40', 'Bryson Tiller', 'Whatever She Wants', '56671223'],
    ['41', 'Bad Bunny', 'PERRO NEGRO', '522925022'],
    ['42', 'The Weeknd', 'Starboy', '2311694768'],
    ['43', 'Jung Kook', 'Standing Next to You', '391194211'],
    ['44', 'The Weeknd', 'Popular', '661604305'],
    ['45', 'Ariana Grande', 'intro (end of the world)', '29219857'],
    ['46', 'Jimin', 'Like Crazy', '721661371'],
    ['47', 'Sabrina Carpenter', 'Feather', '201734253'],
    ['48', 'Miley Cyrus', 'Flowers', '1838616019'],
    ['49', 'KAROL G', 'QLONA', '688265701'],
    ['50', 'Olivia Rodrigo', 'vampire', '835997204'],
    ['51', 'Richy Mitch & The Coal Miners', 'Evergreen', '99258543'],
    ['52', 'David Kushner', 'Daylight', '950083176'],
    ['53', 'Harry Styles', 'As It Was', '3040464426'],
    ['54', 'Rich Amiri', 'ONE CALL', '96678918'],
    ['55', 'Coldplay', 'Viva La Vida', '819323618'],
    ['56', 'SZA', 'Snooze', '834621987'],
    ['57', 'Ariana Grande', 'supernatural', '31643120'],
    ['58', 'Bruno Mars', 'Locked out of Heaven', '803759082'],
    ['59', 'Doja Cat', 'Paint The Town Red', '924128885'],
    ['60', 'Dasha', 'Austin', '14791472'],
    ['61', 'Maluma', 'Según Quién', '416738825'],
    ['62', 'Taylor Swift', 'Lover', '664908615'],
    ['63', 'The Weeknd', 'Die For You', '1522735665'],
    ['64', 'Calle 24', 'Que Onda', '499859004'],
    ['65', 'Ariana Grande', 'dont wanna break up again', '30555641'],
    ['66', 'The Weeknd', 'Blinding Lights', '4049362956'],
    ['67', 'Lewis Capaldi', 'Someone You Loved', '3170249170'],
    ['68', 'Good Neighbours', 'Home', '76189028'],
    ['69', 'Creepy Nuts', 'Bling-Bang-Bang-Born', '119501575'],
    ['70', 'Fuerza Regida', 'HARLEY QUINN', '357425757'],
    ['71', 'Tom Odell', 'Another Love', '1836348526'],
    ['72', 'Doja Cat', 'Agora Hills', '404915868'],
    ['73', 'Taylor Swift', 'Anti-Hero', '1442549873'],
    ['74', 'LE SSERAFIM', 'Smart', '43054390'],
    ['75', 'Frank Ocean', 'Pink + White', '427479710'],
    ['76', 'Drake', 'One Dance', '2224714216'],
    ['77', 'David Guetta', 'Im Good (Blue)', '1495535879'],
    ['78', 'The Neighbourhood', 'Sweater Weather', '2115885523'],
    ['79', 'Post Malone', 'Sunflower - Spider-Man: Into the Spider-Verse', '3059545540'],
    ['80', 'Coldplay', 'Yellow', '1426216995'],
    ['81', 'Cigarettes After Sex', 'Apocalypse', '736626091'],
    ['82', 'Ariana Grande', 'true story', '28343907'],
    ['83', 'SZA', 'Kill Bill', '1697433030'],
    ['84', 'Manuel Turizo', 'La Bachata', '1541501986'],
    ['85', 'OneRepublic', 'I Aint Worried', '1432469417'],
    ['86', 'cassö', 'Prada', '449178283'],
    ['87', 'James Arthur', 'Say You Wont Let Go', '2144105769'],
    ['88', 'Sabrina Carpenter', 'Nonsense', '605918841'],
    ['89', 'One Direction', 'Night Changes', '668249704'],
    ['90', 'Sophie Ellis-Bextor', 'Murder On The Dancefloor', '193200779'],
    ['91', 'Taylor Swift', 'cardigan', '739156934'],
    ['92', 'Drake', 'Rich Baby Daddy', '264316885'],
    ['93', 'The Walters', 'I Love You So', '903110189'],
    ['94', 'Vance Joy', 'Riptide', '1506737902'],
    ['95', 'Hotel Ugly', 'Shut up My Moms Calling', '539094536'],
    ['96', 'Ariana Grande', 'i wish i hated you', '25797999'],
    ['97', 'Kygo', 'Whatever', '89086278'],
    ['98', 'OneRepublic', 'Counting Stars', '1334352789'],
    ['99', 'The Goo Goo Dolls', 'Iris', '254475803'],
    ['100', 'Billie Eilish', 'lovely', '2601781769'],
    ['101', 'KAROL G', 'CONTIGO', '68818209'],
    ['102', 'a-ha', 'Take on Me', '313937798'],
    ['103', 'Tyler The Creator', 'See You Again', '685599132'],
    ['104', 'Dua Lipa', 'Dance The Night (From Barbie The Album)', '747801130'],
    ['105', '4batz', 'act ii: date @ 8', '20747219'],
    ['106', 'Zach Bryan', 'Something in the Orange', '566803749'],
    ['107', 'Fuerza Regida', 'TÚ NAME', '22694933'],
    ['108', 'Ariana Grande', 'imperfect for you', '24328811'],
    ['109', 'Peso Pluma', 'BELLAKEO', '253319898'],
    ['110', 'Travis Scott', 'MY EYES', '207640053'],
    ['111', 'TV Girl', 'Lovers Rock', '332868993'],
    ['112', 'LE SSERAFIM', 'EASY', '51140383'],
    ['113', 'Kanye West', 'Heartless', '317964664'],
    ['114', 'Yeat', 'Breathe', '51796847'],
    ['115', 'Kali Uchis', 'Igual Que Un Ángel', '183022200'],
    ['116', 'Rihanna', 'We Found Love', '476102608'],
    ['117', 'The Police', 'Every Breath You Take', '872180865'],
    ['118', 'V', 'Love Me Again', '385853908'],
    ['119', 'The Chainsmokers', 'Something Just Like This', '1499225612'],
    ['120', '¥$', 'BURN', '65470845'],
    ['121', 'Muni Long', 'Made For Me', '45782937'],
    ['122', 'Ruth B.', 'Dandelions', '1242898069'],
    ['123', 'Travis Scott', 'goosebumps', '1527092890'],
    ['124', 'Creedence Clearwater Revival', 'Have You Ever Seen The Rain', '265131224'],
    ['125', 'Tate McRae', 'exes', '216118994'],
    ['126', 'Taylor Swift', 'august', '580610193'],
    ['127', 'JID', 'Surround Sound', '239738580'],
    ['128', 'Imagine Dragons', 'Demons', '741514741'],
    ['129', 'KAROL G', 'AMARGURA', '453523872'],
    ['130', 'Taylor Swift', 'Is It Over Now? (Taylors Version) (From The Vault)', '334075814'],
    ['131', 'Bruno Mars', 'Just the Way You Are', '513968963'],
    ['132', 'iñigo quintero', 'Si No Estás', '544965565'],
    ['133', 'Bruno Mars', 'Thats What I Like', '880484065'],
    ['134', 'Linkin Park', 'In the End', '335336111'],
    ['135', 'Macklemore & Ryan Lewis', 'Cant Hold Us', '711767859'],
    ['136', 'Eminem', 'Without Me', '1148766130'],
    ['137', 'Oscar Ortiz', 'FIRST LOVE', '126334857'],
    ['138', 'Travis Scott', 'I KNOW ?', '424375956'],
    ['139', 'Justin Bieber', 'Ghost', '1375864701'],
    ['140', 'd4vd', 'Romantic Homicide', '932039495'],
    ['141', 'French Montana', 'Unforgettable', '889711819'],
    ['142', 'Taylor Swift', 'Dont Blame Me', '751605191'],
    ['143', 'The Weeknd', 'Stargirl Interlude', '706173181'],
    ['144', 'Hozier', 'Take Me To Church', '1331570689'],
    ['145', 'Keane', 'Somewhere Only We Know', '610504276'],
    ['146', 'Morgan Wallen', 'Last Night', '773854263'],
    ['147', 'Coldplay', 'Sparks', '85995548'],
    ['148', 'Don Toliver', 'Bandit', '33114074'],
    ['149', 'Jung Kook', '3D', '422841687'],
    ['150', 'Mesita', 'Una Foto Remix', '113742955'],
    ['151', 'J. Cole', 'No Role Modelz', '1329709462'],
    ['152', 'Julión Álvarez y su Norteño Banda', 'Regalo De Dios', '45157049'],
    ['153', 'Tears For Fears', 'Everybody Wants To Rule The World', '644427684'],
    ['154', 'Arctic Monkeys', '505', '1061819405'],
    ['155', 'Harry Styles', 'Watermelon Sugar', '2397440706'],
    ['156', 'Linkin Park', 'Numb', '115664676'],
    ['157', 'Madison Beer', 'Make You Mine', '12202056'],
    ['158', 'Xavi', 'Poco A Poco', '134965792'],
    ['159', 'Junior H', 'ROCKSTAR', '23977012'],
    ['160', 'The Weeknd', 'Save Your Tears', '1722239419'],
    ['161', 'Arctic Monkeys', 'Whyd You Only Call Me When Youre High?', '842072769'],
    ['162', 'Don Omar', 'Danza Kuduro', '215350145'],
    ['163', 'Imagine Dragons', 'Believer', '2811625697'],
    ['164', 'Lana Del Rey', 'Summertime Sadness', '738401961'],
    ['165', 'Benson Boone', 'In The Stars', '185204371'],
    ['166', 'Eminem', 'Mockingbird', '890833108'],
    ['167', 'Artemas', 'if u think im pretty', '2344033'],
    ['168', 'Bruno Mars', 'When I Was Your Man', '750358497'],
    ['169', 'Ed Sheeran', 'Perfect', '2773869239'],
    ['170', 'Ofenbach', 'Overdrive', '41498290'],
    ['171', 'Junior H', 'Y LLORO', '237284489'],
    ['172', 'Adele', 'Set Fire to the Rain', '626295789'],
    ['173', 'Maroon 5', 'Maps', '312769813'],
    ['174', 'Gunna', 'fukumean', '652336971'],
    ['175', 'Glass Animals', 'Heat Waves', '2736827730'],
    ['176', 'Elton John', 'Cold Heart - PNAU Remix', '1827505080'],
    ['177', 'Stephen Sanchez', 'Until I Found You', '780497832'],
    ['178', 'Feid', 'Classy 101', '768423700'],
    ['179', 'Dimitri Vegas & Like Mike', 'Thank You (Not So Bad)', '25127841'],
    ['180', 'Lil Tecca', '500lbs', '196544156'],
    ['181', 'Arctic Monkeys', 'Do I Wanna Know?', '995665963'],
    ['182', 'New West', 'Those Eyes', '453864787'],
    ['183', 'Grupo Frontera', 'EL AMOR DE SU VIDA', '376993681'],
    ['184', 'Conan Gray', 'Heather', '1216643871'],
    ['185', 'Steve Lacy', 'Dark Red', '898457142'],
    ['186', 'Sia', 'Unstoppable', '556514766'],
    ['187', 'Kanye West', 'Father Stretch My Hands Pt. 1', '246381536'],
    ['188', 'Kendrick Lamar', 'All The Stars', '519645416'],
    ['189', 'Metro Boomin', 'Creepin', '1232028475'],
    ['190', 'The Weeknd', 'The Hills', '1170611404'],
    ['191', 'Beach Weather', 'Sex Drugs Etc.', '258556807'],
    ['192', 'Jere Klein', 'ANDO', '150216553'],
    ['193', 'Trueno', 'Mamichula - con Nicki Nicole', '50689727'],
    ['194', 'Oscar Maydon', 'Elvira', '11089769'],
    ['195', 'Fleetwood Mac', 'Dreams - 2004 Remaster', '485891829'],
    ['196', 'Bill Withers', 'Aint No Sunshine', '13625887'],
    ['197', 'Rema', 'Calm Down', '1289368492'],
    ['198', '4batz', 'act ii: date @ 8', '49633797'],
    ['199', 'The Neighbourhood', 'Softcore', '299796227'],
    ['200', 'Tory Lanez', 'The Color Violet', '460429608'],

        // Add more data as needed
  ];

// Function to handle search
const handleSearch = (event: CustomEvent) => {
  const query = (event.detail.value as string) || '';
  setSearchQuery(query);

  // Filter data based on the query
  const results = dataList.filter(row => row[1].toLowerCase().includes(query.toLowerCase())); // Filter by artist name
  setSearchResults(results);
};


  // Function to handle selection of a search result
  const handleResultSelection = (result: SearchResult) => {
    setSelectedResult(result);
    setShowChartModal(true);

    // Extract streams from the selected result
    const streamString = result[3];
    const streams = streamString.match(/\d+/g)?.join(','); // Extract all digits and join with commas
    setSelectedStreams(streams || '');
  };

  // Function to display pie chart
  const displayPieChart = () => {
    const ctx = document.getElementById('pieChart') as HTMLCanvasElement;
    if (ctx) {
      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Total Streams of This Artist', 'Total Streams of Top 200 Artist'],
          datasets: [{
            label: 'Total Streams',
            data: selectedStreams.split(',').map(parseFloat).concat(20093095926.00), // Add the new number to the dataset
            backgroundColor: ['#C850C0', '#4158D0'] // Blue for top 200 artist, Red for this artist
          }]
        }
      });
    } else {
      console.error('Canvas element not found');
    }
  };

  // Function to handle modal presentation
  const handleModalPresentation = () => {
    displayPieChart();
  };

  // Effect to handle modal presentation
  useEffect(() => {
    if (showChartModal) {
      handleModalPresentation();
    }
  }, [showChartModal, selectedStreams]);

  // Effect to set initial visibility of elements
  useEffect(() => {
    setShouldDisplayElements(true);
  }, []);

  // Function to handle focus on search bar
  const handleSearchBarFocus = () => {
    setShouldDisplayElements(false);
  };

  return (
    <IonPage>
      <IonContent color={'dark'} className="ion-padding">
        {/* Rectangle Background */}
        <div className='top-rectangle'></div>

        {/* Search bar */}
        <div className="search-container">
          <IonSearchbar
            value={searchQuery}
            onIonChange={handleSearch}
            color={'dark'}
            placeholder="Search Artist"
            inputMode="text"
            autocapitalize={''}
            onFocus={handleSearchBarFocus}
          ></IonSearchbar>
        </div>

        {/* Display search results */}
        <div className="results-container">
          {searchResults.map((result, index) => (
            <div key={index} className="search-result" onClick={() => handleResultSelection(result)}>
              {/* Display artist, song, and streams */}
              <p><span className="artist-label">#</span> <span className="artist-result">{result[0]}</span></p>
              <p><span className="artist-label">Artist:</span> <span className="artist-result">{result[1]}</span></p>
              <p> <span className="artist-label">Song:</span> <span className='artist-result'>{result[2]}</span></p>
              <p><span className="artist-label">Streams:   </span><span className='artist-result'>{result[3].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span></p>
            </div>
          ))}
        </div>

        {/* Modal for displaying pie chart */}
        
        <IonModal isOpen={showChartModal} onIonModalDidPresent={handleModalPresentation}>
          <div className="chart-container">
            <div className='chart-title'> Top Chart's Graph</div>
            <canvas id="pieChart" width="400" height="400"></canvas>
            <IonButton className='gragh-button' onClick={() => setShowChartModal(false)}>Close</IonButton>
          </div>
        </IonModal>
      
        {shouldDisplayElements && (
          <>
            <div className='circle2'></div>  {/* circle */}
            <span className='dot1'></span>    {/* circle Dot */}
            <span className='dot2'></span>    {/* circle Dot */}
            <div className='explain-page'>
              <h1>Explore Top</h1>
              <h1> 200 Artists!</h1>
            </div>
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Search;
