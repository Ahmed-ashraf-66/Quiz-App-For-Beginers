const section = document.querySelector("section")
const time = document.querySelector(".time span")
const point = document.getElementById("point")
let myData;
let questions;
let counter;

// Set All Points
let countPoints = 0
const spanpoint = document.createElement("span")
spanpoint.classList.add("all-points")
spanpoint.innerHTML = `${countPoints} / 300`
point.appendChild(spanpoint)

// Set Category 
const category = document.getElementById("category")
const categoryTitle = document.createElement("p")
categoryTitle.className = "category-title"
category.appendChild(categoryTitle)

// Add Question Count
const countSpan = document.createElement("span")
countSpan.className = "ques-number"
let quesNumber = "30"
countSpan.innerHTML = `${quesNumber} / 30`
document.body.appendChild(countSpan)

// Get All Question In Json File
async function getMyQuistion(api) {
    try {
        const response = await fetch(api)
            // Check API
        if (!response.ok) throw new Error("Conected Fild")
            // Trans To Json Object 
        myData = await response.json()
            // Get Question All Time
        loadNewQuestion(myData)
    } catch (error) {
        console.log(Error("error"))
    }
}
// API
getMyQuistion("node_modules/computer_science_quiz.json")

// Add Timer For next Qusttion
function startTime() {
    clearInterval(counter)
    time.innerHTML = "30"
    counter = setInterval(() => {
        time.innerHTML -= 1
        if (time.innerHTML === "0") {
            clearInterval(counter)
            loadNewQuestion(myData)
            countSpan.innerHTML = `${quesNumber -= 1} / 30`
        }
    }, 1000);
}

function loadNewQuestion(myData) {
    // add the Fainaly Function After Questions end
    if (myData.length === 0) {
        showFinalyResult()
        clearInterval(counter)
        return
    }
    // Get Random Question
    const quesRandom = Math.floor(Math.random() * myData.length)
    const [newQuestion] = myData.splice(quesRandom, 1)
    questions = newQuestion
        //  Timer bigened
    startTime()
        // Empty Question
    answered = false
    section.innerHTML = ' '
    categoryTitle.textContent = questions.category // Add Category Name
        // Add Question agin
    showQuestions(questions)
}

// Chick The Answer Correct And Incorrect
let answered = false
section.addEventListener("click", e => {
    if (e.target.classList.contains("answers") && !answered) {
        clearInterval(counter)
        const correctAnswer = questions.correct_answer
            //disable click of The Answers
        answered = true
        if (e.target.textContent == correctAnswer) {
            e.target.classList.add("true")
            spanpoint.innerHTML = `${countPoints += 10} / 300`
        } else {
            e.target.classList.add("false")
        }
        // Hide All Options After Clicked
        document.querySelectorAll(".answers").forEach(e => {
                e.classList.add("disable")
            })
            // Show the Correct Answer
        document.querySelectorAll(".answers").forEach(e => {
                if (e.textContent == correctAnswer) {
                    e.classList.add("true")
                }
            })
            // Next Questoins After 2 scound
        setTimeout(() => loadNewQuestion(myData), 2000)
        countSpan.innerHTML = `${quesNumber -= 1} / 30`
    }
})

// Set All Question In Section
function showQuestions(question) {
    // Set Question Title
    const quesDiv = document.createElement("div")
    section.appendChild(quesDiv)
    quesDiv.className = "ques_title"
    const quesTitle = document.createTextNode(question.question)
    quesDiv.appendChild(quesTitle)
        // Set All Answer
    for (let i = 1; i <= 4; i++) {
        let span = document.createElement("span")
        span.className = "answers"
        span.dataset.option = `option_${i}`
        const answers = document.createTextNode(question[`option_${i}`])
        span.appendChild(answers)
        section.appendChild(span)
    }
}

// show Result And Gmae Over
function showFinalyResult() {
    const div = document.createElement("div")
    div.className = "popp"
    const h3 = document.createElement("h3")
    div.appendChild(h3)
    const allPoints = document.createElement("span")
    div.appendChild(allPoints)
    const msg = document.createElement("h4")
    msg.className = "msg"
    div.appendChild(msg)
    document.body.appendChild(div)
    if (countPoints === 300) {
        console.log("good")
        h3.textContent = "Perfect Score! 🏆"
        allPoints.textContent = `${countPoints} / 300 `
        msg.textContent = "Flawless! You got every single question right."
    } else if (countPoints >= 250) {
        console.log("good")
        h3.textContent = "Excellent! 🌟"
        allPoints.textContent = `${countPoints} / 300 `
        msg.textContent = "Outstanding performance! You really know your stuff."
    } else if (countPoints >= 200) {
        console.log("good")
        h3.textContent = "Great Job! 🎉"
        allPoints.textContent = `${countPoints} / 300 `
        msg.textContent = "Well done! You have a solid understanding of the topic."
    } else if (countPoints >= 150) {
        console.log("good")
        h3.textContent = "Good Effort! 👍"
        allPoints.textContent = `${countPoints} / 300 `
        msg.textContent = "Not bad! A little more practice and you'll master it."
    } else if (countPoints >= 100) {
        console.log("good")
        h3.textContent = "Keep Going! 💪"
        allPoints.textContent = `${countPoints} / 300 `
        msg.textContent = "You're getting there. Review the topics and try again."
    } else {
        h3.textContent = "Try Again! 📚"
        allPoints.textContent = `${countPoints} / 300 `
        msg.textContent = "Don't give up! Practice makes perfect."
    }
}