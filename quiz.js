(function() 
 {
  let allQuestions = [{
    question: "The tree sends downroots from its branches to the soil is know as:",
    options: ["Oak", "Pine", "Banyan", "Palm"],
    answer: 2
  }, {
    question: "Electric bulb filament is made of",
    options: ["Copper", "Aluminum", "lead", "Tungsten"],
    answer: 3
  }, {
    question: "Non Metal that remains liquid at room temprature is",
    options: ["Phophorous", "Bromine", "Chlorine","Helium"],
    answer: 1
  }, {
    question: "Which of the following is used in Pencils ?",
    options: ["Graphite", "Silicon", "Charcoal", "Phosphorous"],
    answer: 0
  }, {
    question: "Chemical formula of water ?",
    options: ["NaA1O2", "H2O", "Al2O3", "CaSiO3"],
    answer: 1
  }, {
    question: "The gas filled in electric bulb is ?",
    options: ["Nitrogen", "Hydrogen", "Carbon Dioxide", "Oxygen"],
    answer: 0
  }, {
    question: "Whashing soda is the comman name for",
    options: ["Sodium Carbonate", "Calcium Bicarbonate", "Sodium Bicarbonate", "Calcium Carbonate"],
    answer: 0
  }, {
    question: "Which gas is not known as green house gas ?",
    options: ["Methane", "Nitrous oxide", "Carbon Dioxide", "Hydrogen"],
    answer: 3
  }, {
    question: "The hardest substance availabe on earth is",
    options: ["Gold", "Iron", "Diamond", "Platinum"],
    answer: 2
  }, {
    question: "Used as a lubricant",
    options: ["Graphite", "Silica", "Iron Oxide", "Diamond"],
    answer: 0
    }];
  
  let blur = 50;
  let quesCounter = 0;
  let selectOptions = [];
  let quizSpace = $('#quiz');
  
  /* Blur code */
  document.getElementById("img").style.filter = `blur(${blur}px)`;

  nextQuestion();
    
  $('#next').click(function () 
    {
        chooseOption();
        if(+selectOptions[quesCounter]===+allQuestions[quesCounter].answer){
          blur-=10;
          document.getElementById("img").style.filter=`blur(${blur}px)`;
          console.log(selectOptions[quesCounter]);
        }
        if (isNaN(selectOptions[quesCounter])) 
        {
            alert('Please select an option !');
        } 
        else 
        {
          quesCounter++;
          nextQuestion();
        }
    });
  
  $('#prev').click(function () 
    {
        chooseOption();
        quesCounter--;
        nextQuestion();
    });
  
  function createElement(index) 
    {
        let element = $('<div>',{id: 'question'});
        let header = $('<h2>Question No. ' + (index + 1) + ' :</h2>');
        element.append(header);

        let question = $('<p>').append(allQuestions[index].question);
        element.append(question);

        let radio = radioButtons(index);
        element.append(radio);

        return element;
    }
  
  function radioButtons(index) 
    {
        let radioItems = $('<ul>');
        let item;
        let input = '';
        for (let i = 0; i < allQuestions[index].options.length; i++) {
          item = $('<li>');
          input = '<input type="radio" name="answer" value=' + i + ' />';
          input += allQuestions[index].options[i];
          item.append(input);
          radioItems.append(item);
        }
        return radioItems;
  }
  
  function chooseOption() 
    {
        selectOptions[quesCounter] = +$('input[name="answer"]:checked').val();
    }
   
  function nextQuestion() 
    {
        quizSpace.fadeOut(function() 
            {
              $('#question').remove();
              if(quesCounter < allQuestions.length)
                {
                    let nextQuestion = createElement(quesCounter);
                    quizSpace.append(nextQuestion).fadeIn();
                    if (!(isNaN(selectOptions[quesCounter]))) 
                    {
                      $('input[value='+selectOptions[quesCounter]+']').prop('checked', true);
                    }
                    if(quesCounter === 1)
                    {
                      $('#prev').show();
                    } 
                    else if(quesCounter === 0)
                    {
                      $('#prev').hide();
                      $('#next').show();
                    }
                    // console.log(quesCounter);
                    // console.log(selectOptions);
                    // console.log(selectOptions);
                    // let index = quesCounter <1 ?0:quesCounter; 
                  
                }
              else 
                {
                    let scoreRslt = displayResult();
                    quizSpace.append(scoreRslt).fadeIn();
                    $('#next').hide();
                    $('#prev').hide();
                }
        });
    }
  
  function displayResult() 
    {
        let score = $('<p>',{id: 'question'});
        let correct = 0;
        for (let i = 0; i < selectOptions.length; i++) 
        {
          if (selectOptions[i] === allQuestions[i].answer) 
          {
            correct++;
          }
        }
        score.append('You scored ' + correct + ' out of ' +allQuestions.length);
        if (correct >= 5) {
          document.getElementById("img").style.filter = "blur(0)";
          score.append('\n, Well Done !! You have successfully Revealed the Image');
        }
        else {
          score.append('\nBetter luck next time !! :) ');
        }
        return score;
  }
})();
