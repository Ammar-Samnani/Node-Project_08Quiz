import inquirer from "inquirer";

const apiLink:string = "https://opentdb.com/api.php?amount=5&category=18&difficulty=easy&type=multiple";

let fetchData = async (data:string) => {
    let fetchQuestion:any = await fetch(data)
    let res = await fetchQuestion.json()
    return res.results;
}

let data = await fetchData(apiLink);

let startQuiz = async () => {
    let score:number = 0

    let name = await inquirer.prompt(
    {
        name: "fname",
        type: "input",
        message: "Type Your Full Name: "
    }
    )

    for(let i = 0; i < 5; i++){
        let answers = [...data[i].incorrect_answers, data[i].correct_answer];

        let user_answer = await inquirer.prompt(
        {
        type: "list",
        name: "user_input",
        message: data[i].question,
        choices: answers.map((val: any) => val),
        })

        if(user_answer.user_input == data[i].correct_answer){
            ++score
        }else{
            console.log(`correct answer is ${data[i].correct_answer}`)
        }
    }

    console.log(`${name.fname} your score is ${score} out of 5`)
};

startQuiz()