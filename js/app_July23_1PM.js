$(document).ready(function () {
    var questionNum = 0;
    var userInput = 0;
    var numRight = 0;
    var indivQuestion = $('.question');


    function Question(prompt, answers, right) {
        this.prompt = prompt;
        this.answers = answers;
        this.right = right;
    }

    questions = [
        new Question(
            "What does HTML stand for?", [
                "Home Tool Markup Language",
                "Hyperlinks and Text Markup Language",
                "Hyper Text Markup Language",
            ],
            3
        ),
        new Question(
            "Who is making the Web standards?", [
                "Google",
                "Mozilla",
                "Microsoft",
                "The World Wide Web Consortium"
            ],
            4
        ),
        new Question(
            "Choose the correct HTML element for the largest heading:", [
                "heading",
                "head",
                "h6",
                "h1"
            ],
            1
        ),
        new Question(
            "What is the correct HTML element for inserting a line break?", [
                "break",
                "lb",
                "br",

            ],
            3
        ),
        new Question(
            "What is the correct HTML element for inserting a line break?", [
                "break",
                "lb",
                "br",

            ],
            3
        )
    ];


    function QuizSection(question, choice) {
        this.question = question;
        this.choice = choice;
    }
    QuizSection.prototype.showQuestion = function () {

        indivQuestion.empty();
        if (this.question != null) {

            indivQuestion.append('<h2>' + this.question.prompt + '</h2><div class="option"></div>');
            for (var i = 0; i < this.question.answers.length; i++) {
                $('.option').append('<div class="answer"><input type="checkbox" name="question" id="answer-' + i + '" value="' + i + '"> <label for="answer-' + i + '"><span></span>' + this.question.answers[i] + '</label></div>');
            }
        } else {

            indivQuestion
                .append('<h2>You comes to the end of the quiz</h2>')
                .append('<h2>You got ' + numRight + ' right.</h2>');
        }

        if (questionNum >= questions.length) {
            $('.questionNum').text(questions.length);
        } else {
            $('.questionNum').text(questionNum + 1)
        }
    }

    QuizSection.prototype.attachEventHandlers = function () {

        $('.submit').on('click', 'button', function () {
            console.log('.submit button');
            userInput = $('input[name=question]:checked', '.answer').val();
            console.log('userInput: ' + userInput);
            console.log('questionNum: ' + questionNum);
            quizMonitor = new Quiz(questions[questionNum]);
            quizMonitor.checkGrade();
            questionNum++;
            quizMonitor.nextQuestion();
        });
        $('.reset').on('click', 'button', function () {
            console.log('.reset button');
            questionNum = 0;
            quizMonitor = new Quiz(questions[questionNum]);
            quizMonitor.nextQuestion();
            numRight = 0;
            $('.right span').text(numRight);
        });
    }

    function Quiz(question) {
        this.question = question;

    }
    Quiz.prototype.nextQuestion = function () {
        questionView = new QuizSection(questions[questionNum]);
        questionView.showQuestion(questions[questionNum]);
    }
    Quiz.prototype.checkGrade = function () {
        console.log('numRight before if: ' + numRight);
        if (parseInt(userInput) === questions[questionNum].right) {
            numRight++;
        }
        console.log('numRight after if: ' + numRight);

        $('.right span').text(numRight);
    }
    questionView = new QuizSection(questions[questionNum], $('.main'));
    questionView.showQuestion(questions[questionNum]);
    $('.totalQuestions').text(questions.length);
    questionView.attachEventHandlers();
});
