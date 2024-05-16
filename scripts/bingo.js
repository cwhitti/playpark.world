document.addEventListener
(
  'DOMContentLoaded', () =>
  {
    //declare variables
    let sentences = [];
    const fileName = document.getElementById('data-file').value;
    const generateBoardButton = document.getElementById('generateBoardButton');

    // get the entries from the txt file
    fetch(fileName)
      .then( response => response.text() )
      .then(data =>
      {
        // split sentences
        sentences = data.split('\n').filter(Boolean);

        // catch for too few
        if (sentences.length < 25) {
          // send alert
          alert('Not enough sentences in entries.txt to create a bingo board.');
          return;
      }
      // create the bingo board
      createBingoBoard(sentences);
      }
      )

      // catch any errors
      .catch(error =>
      {
        console.error('Error fetching ' + fileName + ":" , error);
      }
      );

    // Add click event listener to the button
    generateBoardButton.addEventListener
    (
      'click', function()
      {
        // Call the function to generate a new bingo board
        generateNewBoard(sentences); // Pass sentences to the function
      }
    );

    // Function to generate a new bingo board
    function generateNewBoard(sentences)
    {
        const bingoBoard = document.getElementById('bingoBoard');
        bingoBoard.innerHTML = ''; // Clear existing board
        createBingoBoard(sentences);
    }

    // shuffle the array
    function shuffle(array)
    {
      // declare variables
      let i = array.length - 1

      // loop through array
      for (i; i > 0; i--)
      {
        // generate j index
        const j = Math.floor(Math.random() * (i + 1));

        // shuffle!
        [array[i], array[j]] = [array[j], array[i]];
      }

      // return shuffled array
      return array;
    }

    // create the bingo board
    function createBingoBoard( sentences )
    {

      // grab bingoBoard object
      const boardContainer = document.getElementById('bingoBoard');

      // grab 25 sentences
      const shuffledSentences = shuffle(sentences.slice()).slice(0, 25);

      shuffledSentences[12] = "";

      // go through each sentence
      shuffledSentences.forEach((sentence, index) =>
      {
        // create div element
        const cell = document.createElement('div');

        // add bingo-cell to class list
        cell.classList.add('bingo-cell');

        if ( index == 12 )
        {
          cell.classList.add('marked');
          cell.classList.add('freespace');
        }

        else
        {
          cell.classList.toggle('unmarked');
        }

        // add inner text
        cell.innerText = sentence;

        // listen for click
        cell.addEventListener('click', () =>
        {
          if ( index !== 12 )
          {
            // toggle the marked
            cell.classList.toggle('marked');
          }

        });

        // add cell to board
        boardContainer.appendChild(cell);
      });
    }

    function checkBingo( clickedCell )
    {
      // grab all cells
      const cells = Array.from(document.querySelectorAll('.bingo-cell'));

      // set size
      const size = 5;

      // Check rows and columns
      for (let i = 0; i < size; i++)
      {
        // grab rows
        const row = cells.slice(i * size, (i + 1) * size);

        // grab cols
        const column = cells.filter((_, index) => index % size === i);

        // check to skip rows
        if ( !skipElements(row) )
        {
          // every item is YELLOW
          if ( row.every(cell => cell.classList.contains('marked') ) )
          {
            // BINGO!!!!
            // toggleAllBlue( row );

            // yay yes bingo
            return true;
          }
        }

        // check to skip rows
        if ( !skipElements(column) )
        {
          // every item is YELLOW
          if ( column.every(cell => cell.classList.contains('marked') ) )
          {
            // BINGO!!!!
            //toggleAllBlue( column );

            // yay yes bingo
            return true;
          }
        }
      } // end for loop

      // grab diagonals
      const diagonal1 = cells.filter((_, index) => index % (size + 1) === 0);
      const diagonal2 = cells.filter((_, index) => index % (size - 1) === 0 &&
                                                   index > 0 && index < size * size - 1);


       // check to skip rows
       if ( !skipElements(diagonal1) )
       {
         // every item is YELLOW
         if ( diagonal1.every(cell => cell.classList.contains('marked') ) )
         {
           // BINGO!!!!
           //toggleAllBlue( diagonal1 );

           // yay yes bingo
           return true;
         }
       }

       // check to skip rows
       if ( !skipElements(diagonal2) )
       {
         // every item is YELLOW
         if ( diagonal2.every(cell => cell.classList.contains('marked') ) )
         {
           // BINGO!!!!
           //toggleAllBlue( diagonal2 );

           // yay yes bingo
           return true;
         }
       }

       return false;
    }

    // skips elements in row, col, or diag if everything in set is won already
    function skipElements( set )
    {
      return set.every(cell => cell.classList.contains('marked'));
    }

    // toggle each element in row, col, or diag blue
    function toggleAllBlue( set )
    {
      set.forEach(cell => cell.classList.add('won'));
    }

    function toggleAllWins( set)
    {
      set.forEach(cell => cell.classList.add('won'));
    }
  }
);
