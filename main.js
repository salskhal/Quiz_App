let startBtn = document.querySelector(".start--btn")
let category = document.querySelectorAll(".category--grid_card")
let userName = document.querySelector(".user--input")
let beginQuiz = document.querySelector(".category--btn")
let currentActive = ""
let categoryNumber
let currentUser
let questionIndex = 0




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
        if (obj.category === currentActive && currentUser !== "") {
            // console.log(currentUser)
            categoryNumber = obj.categoryNumber
            fetchQuestion(categoryNumber, currentUser)
            document.querySelector(".category-select").classList.add("hidden")
            document.querySelector(".quiz-app").classList.remove("hidden")
        } else {
            document.querySelector(".error").classList.remove("hidden")
        }
    })

}


function fetchQuestion(category, username) {
    const api = `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=medium&type=multiple`
    // console.log(userName)
    fetch(api)
        .then(res => res.json())
        .then(data => {
            let results = data.results
            console.log(results)
            setQuestion(results, username)
        })
}


function setQuestion(fetchedQuiz, name) {
    let showQuiz = ""
    let toDisplay = fetchedQuiz[questionIndex]
    let ansewrs = toDisplay.incorrect_answers.concat(toDisplay.correct_answer)


    let shufler = ansewrs.sort(() => {
        return Math.random() - 0.5
    })

    console.log(ansewrs)
    showQuiz +=
        `
    <h1>${toDisplay.question}</h1>
    `
    shufler.forEach(answer => {
        showQuiz += `
        <div class="option">
            <span>${answer}</span>
        </div>`
    })
    document.querySelector(".quiz-app").innerHTML += showQuiz
}

// function shufler (arr){
//     arr.sort(() =>{
//         res
//     })
// }




{
    /* <li>${ansewrs.sort(()=>{
        return Math.random() - 0.5
    })}</li> */
}



// fetchedQuiz.map(quiz => {
//     let ansewrs = quiz.incorrect_answers.concat(quiz.correct_answer)

//     console.log(ansewrs)
//     let shufler = ansewrs.sort(()=>{
//         return Math.random() - 0.5
//     })


//     // showQuiz += 
//     // `
//     // <h1>${quiz.question}</h1>
//     // `

//     // showQuiz += 
//     // `
//     // <h1>${fetchedQuiz[questionIndex].question}</h1>
//     // `
//     shufler.forEach(answer =>{
//         showQuiz += `
//         <div class="option">
//             <span>${answer}</span>
//         </div>`
//     })
// })