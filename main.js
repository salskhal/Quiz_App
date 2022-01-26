let startBtn = document.querySelector(".start--btn")
let category = document.querySelectorAll(".category--grid_card")
let userName = document.querySelector(".user--input")
let beginQuiz = document.querySelector(".category--btn")
let nextBtn = document.querySelector(".btn-next-question")
let currentActive = ""
let categoryNumber, currentUser
let score = 0
let options = document.querySelectorAll(".option-text")
// let questionIndex

let questionArray = []

let availableQuestion = []

let currentQuestion = {}

let acceptingAnswers = false

startBtn.addEventListener("click", function () {
    document.querySelector(".start").classList.add("hidden")
    document.querySelector(".category-select").classList.remove("hidden")
    document.title = "Category"
})


beginQuiz.addEventListener("click", quizBegin)




// select active 
category.forEach(value => {
    value.addEventListener("click", function () {
        const currActive = document.querySelector('.selected')
        if (currActive) {
            currActive.classList.remove('selected')
        }
        value.classList.toggle('selected')
        if (value.classList.contains("selected")) {
            currentActive = value.innerText
        }
        //  console.log(currentActive)
    })
})
const categoryArray = [{
        category: "General Knowledge",
        categoryNumber: 9
    },
    {
        category: "Music",
        categoryNumber: 12
    },
    {
        category: "Television",
        categoryNumber: 14
    },
]


function quizBegin() {
    currentUser = userName.value
    categoryArray.map(obj => {
        if (obj.category !== currentActive || currentUser === "") {
            document.querySelector(".error").innerText = "Enter Username or Select a Category"
        } else {
            // document.querySelector(".error").style.display = 'none'
            document.querySelector(".user-name").innerText = currentUser
            categoryNumber = obj.categoryNumber
            fetchQuestion(categoryNumber)
        }
    })

}


function fetchQuestion(category) {
    const api = `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=medium&type=multiple`
    // console.log(userName)
    fetch(api)
        .then(res => res.json())
        .then(data => {
            questionArray = data.results.map(loadedQuestion => {
                const formatedQuestion = {
                    question: loadedQuestion.question
                }

                const answerChoices = [...loadedQuestion.incorrect_answers]

                formatedQuestion.answer = Math.floor(Math.random() * 4) + 1

                answerChoices.splice(
                    formatedQuestion.answer - 1,
                    0,
                    loadedQuestion.correct_answer
                )

                answerChoices.forEach((choice, index) => {
                    formatedQuestion['choice' + (index + 1)] = choice;
                });
                return formatedQuestion

            })
            startGame()
        })
        .catch(error => {
            console.log(error)
        })
}



function startGame() {
    availableQuestion = [...questionArray]
    console.log(availableQuestion)
    setNextQuestion()
    document.querySelector(".category-select").classList.add("hidden")
    document.querySelector(".quiz-app").classList.remove("hidden")
}


let questionCounter = 0

const MAX_QUESTION = 3
const BONUS_POINT = 10


setNextQuestion = () => {
    console.log(availableQuestion)
    if (availableQuestion.length === 0 || questionCounter >= MAX_QUESTION) {
        document.querySelector(".final").classList.remove("hidden")
        document.querySelector(".quiz-app").classList.add("hidden")
        document.querySelector(".yay").innerHTML = `${currentUser} finished with ${score} Points`
    } else {
        questionCounter++
        const questionIndex = Math.floor(Math.random() * availableQuestion.length)

        currentQuestion = availableQuestion[questionIndex]

        document.querySelector(".question").innerHTML = currentQuestion.question
        document.querySelector(".question-number").innerHTML = `Question ${questionCounter} / ${MAX_QUESTION}`

        options.forEach(option => {
            const number = option.dataset['number'];
            option.innerHTML = currentQuestion['choice' + number]
        })

        availableQuestion.splice(questionIndex, 1);
        acceptingAnswers = true
    }

}




options.forEach(option => {
    option.addEventListener("click", (e) => {
        if (!acceptingAnswers) return

        acceptingAnswers = false

        const selectedOption = e.target
        const selectedAnswer = selectedOption.dataset["number"]

        console.log(selectedAnswer)

        const rightOrWrong =
            selectedAnswer == currentQuestion.answer ? "right" : "false"; 

        if (rightOrWrong === "right"){
            incrementScore(BONUS_POINT)
        }

        selectedOption.classList.add(rightOrWrong)

        setTimeout(() => {
            selectedOption.classList.remove(rightOrWrong)
            setNextQuestion()
        }, 1000)
        
    })
})


incrementScore = (num) => {
    score += num
    document.querySelector(".score").innerHTML = score
}