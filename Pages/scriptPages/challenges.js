let newChallenge = [
    {
        id:0,
        img: "",
        name: "Downtown Challenge",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit atque magnam unde exercitationem possimus harum sint adipisci in cupiditate delectus.",
        info1: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, quisquam.",
        info2: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, quisquam."

    },
    {
        id:1,
        img: "",
        name: "Park Challenge",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit atque magnam unde exercitationem possimus harum sint adipisci in cupiditate delectus.",
        info1: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, quisquam.",
        info2: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, quisquam."

    },
    {
        id:2,
        img: "",
        name: "Beach Challenge",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit atque magnam unde exercitationem possimus harum sint adipisci in cupiditate delectus.",
        info1: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, quisquam.",
        info2: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, quisquam."

    },
    {
        id:3,
        img: "",
        name: "Hill Challenge",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit atque magnam unde exercitationem possimus harum sint adipisci in cupiditate delectus.",
        info1: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, quisquam.",
        info2: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, quisquam."

    }
]

let downtownChallenge = [
    {
        img: "",
        activity: "Drink Coffee",
        activity_desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse minus est animi eius, perferendis nostrum ipsum porro. Nesciunt, dignissimos ex.",
    },
    {
        img: "",
        activity: "Drink Beer",
        activity_desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse minus est animi eius, perferendis nostrum ipsum porro. Nesciunt, dignissimos ex.",
    },
    {
        img: "",
        activity: "Walk by English Bay",
        activity_desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse minus est animi eius, perferendis nostrum ipsum porro. Nesciunt, dignissimos ex.",
    },
    {
        img: "",
        activity: "Gastown steam clock",
        activity_desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse minus est animi eius, perferendis nostrum ipsum porro. Nesciunt, dignissimos ex.",
    }
]

let parkChallenge = [
    {
        img: "",
        activity: "Walk to the river",
        activity_desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse minus est animi eius, perferendis nostrum ipsum porro. Nesciunt, dignissimos ex.",
    },
    {
        img: "",
        activity: "Click pic with a tree",
        activity_desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse minus est animi eius, perferendis nostrum ipsum porro. Nesciunt, dignissimos ex.",
    },
    {
        img: "",
        activity: "Click pic witha bird nest",
        activity_desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse minus est animi eius, perferendis nostrum ipsum porro. Nesciunt, dignissimos ex.",
    },
    {
        img: "",
        activity: "Have lunch in park",
        activity_desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse minus est animi eius, perferendis nostrum ipsum porro. Nesciunt, dignissimos ex.",
    }
]


for (let i=0; i<newChallenge.length; i++) {
    displayChallenge.innerHTML += `
<div class="challenge">
    <div class="challengeStart">
        <div class="challengeImage"><a href="#"><img src="${newChallenge[i].img}" alt="start"></a></div>
        <div class="start_link" onclick="challengeActivity(${newChallenge[i].name})"><p>START</p></div>
    </div>
    <div class="challengeInfo">
        <h2>${newChallenge[i].name}</h2>
        <p>
        ${newChallenge[i].description}
        </p>
        <ul>
            <li>${newChallenge[i].info1}</li>
            <li>${newChallenge[i].info2}</li>
        </ul>
    </div>
</div>
<hr>
`
}

let challengeActivity = (name) => {

    console.log(name)

    displayChallenge.innerHTML == "";

    if(name === "Downtown Challenge") {

        for( let j = 0; j < downtownChallenge.length; j++) {
            displayChallenge.innerHTML += `
        <div class="downtownChallengeContainer">
            <div class="camera"><img src="${downtownChallenge[j].img}" alt="camera"></div>
            <div class="activityInfo">
                <h3>${downtownChallenge[j].activity}</h3>
                <p>${downtownChallenge[j].activity_desc}.</p>
            </div>
            <div><button id="route">See Route</button></div>
        </div>
        <hr>
            `
        }
    }

    else if (name === "Park Challenge") {
        for( let j = 0; j < parkChallenge.length; j++) {
            displayChallenge.innerHTML += `
        <div class="downtownChallengeContainer">
            <div class="camera"><img src="${parkChallenge[j].img}" alt="camera"></div>
            <div class="activityInfo">
                <h3>${parkChallenge[j].activity}</h3>
                <p>${parkChallenge[j].activity_desc}.</p>
            </div>
            <div><button id="route">See Route</button></div>
        </div>
        <hr>
            `
        }
    }

    // for( let j = 0; j < downtownChallenge.length; j++) {
    //     displayChallenge.innerHTML += `
    // <div class="downtownChallengeContainer">
    //     <div class="camera"><img src="${downtownChallenge[j].img}" alt="camera"></div>
    //     <div class="activityInfo">
    //         <h3>${downtownChallenge[j].activity}</h3>
    //         <p>${downtownChallenge[j].activity_desc}.</p>
    //     </div>
    //     <div><button id="route">See Route</button></div>
    // </div>
    // <hr>
    //     `
    // }

}
