document.addEventListener('DOMContentLoaded', () =>
{
  // get the entries from the txt file
  fetch('entries.txt')

    // grab the text
    .then(response => response.text())

    // create the data
    .then(data =>
      {
        // split the data on new lines
        const sentences = data.split('\n').filter(Boolean);

        // ensure we have enough sentences
        if (sentences.length < 25)
        {
          alert('Not enough sentences in entries.txt to create a bingo board.');
          return;
        }

      // create bingo board
      createBingoBoard(sentences);
    })

    // catch entries.txt not existing
    .catch(error =>
    {
      console.error('Error fetching entries.txt:', error);
    });

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
      [array[i], array[j]] = [array[j], array[i]];
    }

    // return shuffled array
    return array;
  }

  // create the bingo board
  function createBingoBoard( sentences )
  {
    // declare variables
    let bingo = false;

      // grab bingoBoard object
      const boardContainer = document.getElementById('bingoBoard');

      // grab 25 sentences
      const shuffledSentences = shuffle(sentences.slice()).slice(0, 25);

    // go through each sentence
    shuffledSentences.forEach(sentence =>
    {
      // create div element
      const cell = document.createElement('div');

      // add bingo-cell to class list
      cell.classList.add('bingo-cell');

      // add inner text
      cell.innerText = sentence;

      // listen for click
      cell.addEventListener('click', () =>
      {

        // toggle the marked
        cell.classList.toggle('marked');

        if ( checkBingo( cell ) )
        {
          alert("Bingo");
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
          toggleAllBlue( row );

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
          toggleAllBlue( column );

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
         toggleAllBlue( diagonal1 );

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
         toggleAllBlue( diagonal2 );

         // yay yes bingo
         return true;
       }
     }

     return false;
  }

  function isInsideGrid(row, col) {
    return row >= 0 && row < 5 && col >= 0 && col < 5;
  }

  // skips elements in row, col, or diag if everything in set is won already
  function skipElements( set )
  {
    return set.every(cell => cell.classList.contains('won'));
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

  // handles highlights for entire row, col, or diag
  function handleHighlights( type, clickedCell )
  {
    
  }

});
