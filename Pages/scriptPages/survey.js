const surveyOptions = [
    {
        opt1: 'day',
        opt2: 'night',
    },
    {
        opt1: 'adrenaline',
        opt2: 'relax',
    },
    {
        opt1: 'beach',
        opt2: 'lake',
    },
    {
        opt1: 'famous',
        opt2: 'hidden',
    },
    {
        opt1: 'outdoor',
        opt2: 'indoor',
    },
    {
        opt1: 'history',
        opt2: 'culture',
    },
    {
        opt1: 'bigCity',
        opt2: 'smallCity',
    },
    {
        opt1: 'longWalk',
        opt2: 'shortWalk',
    },
    {
        opt1: 'group',
        opt2: 'individual',
    },
    {
        opt1: 'longTransit',
        opt2: 'shortTransit',
    },
]
console.clear()
const surveyOpt1 = document.getElementById('surveyOpt1')
const surveyOpt2 = document.getElementById('surveyOpt2')
const surveyPrev = document.getElementById('surveyPrev')
const surveyNext = document.getElementById('surveyNext')


let currentOptions = 0

const surveyUpdate = () => {
    surveyOpt1.innerHTML = surveyOptions[currentOptions].opt1
    surveyOpt2.innerHTML = surveyOptions[currentOptions].opt2
    return console.log(currentOptions)
}

surveyPrev.addEventListener('click', () => {
    currentOptions--;
    for (let i = 0; i < surveyOptions.length; i++) {
        if(currentOptions<0){
            currentOptions = surveyOptions.length-1;
            surveyUpdate()
        }
       return surveyUpdate()
    }
})

surveyNext.addEventListener('click', () => {
    currentOptions++;
    for (let i = 0; i < surveyOptions.length; i++) {
        if(currentOptions==(surveyOptions.length)){
            currentOptions = 0;
            surveyUpdate()
        }
       return surveyUpdate()
    }
})

const optionHtmlString = () =>{
    let = `
        
    `
}

surveyUpdate()